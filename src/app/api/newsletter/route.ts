import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/db/supabase';
import { validateEmail, sanitizeInput } from '@/lib/validation';
import { newsletterRateLimiter } from '@/lib/rate-limit';
import type { ApiResponse } from '@/types';

const SECURITY_HEADERS = {
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
} as const;

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
  ...SECURITY_HEADERS,
} as const;

function getClientIp(request: NextRequest): string {
  return (
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    request.headers.get('x-real-ip') ||
    'unknown'
  );
}

export async function POST(
  request: NextRequest
): Promise<NextResponse<ApiResponse>> {
  try {
    const clientIp = getClientIp(request);

    const { allowed } = newsletterRateLimiter.check(clientIp);
    if (!allowed) {
      return NextResponse.json(
        {
          success: false,
          message: 'Too many requests. Please try again later.',
        },
        { status: 429, headers: CORS_HEADERS }
      );
    }

    let body: Record<string, unknown>;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        {
          success: false,
          message: 'Invalid JSON in request body.',
        },
        { status: 400, headers: CORS_HEADERS }
      );
    }

    const { email } = body;

    if (!email || typeof email !== 'string' || !validateEmail(email)) {
      return NextResponse.json(
        {
          success: false,
          message: 'Please provide a valid email address.',
        },
        { status: 400, headers: CORS_HEADERS }
      );
    }

    const sanitizedEmail = sanitizeInput(email);

    const supabase = await createServerClient();

    // Check for existing subscriber
    const { data: existing, error: lookupError } = await supabase
      .from('newsletter_subscribers')
      .select('*')
      .eq('email', sanitizedEmail)
      .maybeSingle();

    if (lookupError) {
      console.error('Supabase lookup error (newsletter_subscribers):', lookupError.message);
      return NextResponse.json(
        {
          success: false,
          message: 'An unexpected error occurred. Please try again later.',
        },
        { status: 500, headers: CORS_HEADERS }
      );
    }

    // Already subscribed and active
    if (existing && existing.is_active) {
      return NextResponse.json(
        {
          success: true,
          message: "You're already subscribed!",
        },
        { status: 200, headers: CORS_HEADERS }
      );
    }

    // Previously unsubscribed — reactivate
    if (existing && !existing.is_active) {
      const { error: updateError } = await supabase
        .from('newsletter_subscribers')
        .update({ is_active: true })
        .eq('id', existing.id);

      if (updateError) {
        console.error('Supabase update error (newsletter_subscribers):', updateError.message);
        return NextResponse.json(
          {
            success: false,
            message: 'An unexpected error occurred. Please try again later.',
          },
          { status: 500, headers: CORS_HEADERS }
        );
      }

      return NextResponse.json(
        {
          success: true,
          message: "Welcome back! You've been re-subscribed to our newsletter.",
        },
        { status: 200, headers: CORS_HEADERS }
      );
    }

    // New subscriber
    const { error: insertError } = await supabase
      .from('newsletter_subscribers')
      .insert({
        email: sanitizedEmail,
        subscribed_at: new Date().toISOString(),
        active: true,
      });

    if (insertError) {
      console.error('Supabase insert error (newsletter_subscribers):', insertError.message);
      return NextResponse.json(
        {
          success: false,
          message: 'An unexpected error occurred. Please try again later.',
        },
        { status: 500, headers: CORS_HEADERS }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Welcome! You've been subscribed to our newsletter.",
      },
      { status: 201, headers: CORS_HEADERS }
    );
  } catch (error) {
    console.error('Unexpected error in POST /api/newsletter:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'An unexpected error occurred. Please try again later.',
      },
      { status: 500, headers: CORS_HEADERS }
    );
  }
}

export async function OPTIONS(): Promise<NextResponse> {
  return new NextResponse(null, {
    status: 204,
    headers: CORS_HEADERS,
  });
}
