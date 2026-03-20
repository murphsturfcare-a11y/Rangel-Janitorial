import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/db/supabase';
import { validateContactForm, sanitizeInput } from '@/lib/validation';
import { contactRateLimiter } from '@/lib/rate-limit';
import { sendContactNotification } from '@/lib/email';
import type { ApiResponse, Contact } from '@/types';

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

    const { allowed } = contactRateLimiter.check(clientIp);
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

    const validation = validateContactForm(body);
    if (!validation.valid) {
      return NextResponse.json(
        {
          success: false,
          message: 'Validation failed.',
          errors: validation.errors,
        },
        { status: 400, headers: CORS_HEADERS }
      );
    }

    const now = new Date().toISOString();

    const contactData = {
      name: sanitizeInput(body.name as string),
      email: sanitizeInput(body.email as string),
      phone: body.phone ? sanitizeInput(body.phone as string) : null,
      subject: sanitizeInput(body.subject as string),
      message: sanitizeInput(body.message as string),
      created_at: now,
    };

    const supabase = await createServerClient();

    const { data, error } = await supabase
      .from('contacts')
      .insert(contactData)
      .select()
      .single();

    if (error) {
      console.error('Supabase insert error (contacts):', error.message);
      return NextResponse.json(
        {
          success: false,
          message: 'An unexpected error occurred. Please try again later.',
        },
        { status: 500, headers: CORS_HEADERS }
      );
    }

    sendContactNotification(data as unknown as Contact).catch((err: unknown) => {
      console.error('Failed to send contact notification:', err);
    });

    return NextResponse.json(
      {
        success: true,
        message:
          "Thank you for reaching out! We'll respond within 24 hours.",
      },
      { status: 201, headers: CORS_HEADERS }
    );
  } catch (error) {
    console.error('Unexpected error in POST /api/contact:', error);
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
