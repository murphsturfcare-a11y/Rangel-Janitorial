import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/db/supabase';
import { validateLeadForm, sanitizeInput } from '@/lib/validation';
import { leadsRateLimiter } from '@/lib/rate-limit';
import { sendLeadNotification, sendLeadConfirmation } from '@/lib/email';
import type { ApiResponse, Lead } from '@/types';

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

    const { allowed } = leadsRateLimiter.check(clientIp);
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

    const validation = validateLeadForm(body);
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

    const leadData = {
      name: sanitizeInput(body.name as string),
      email: sanitizeInput(body.email as string),
      phone: sanitizeInput(body.phone as string),
      service_type: sanitizeInput(body.serviceType as string),
      property_address: body.propertyAddress ? sanitizeInput(body.propertyAddress as string) : null,
      message: body.message ? sanitizeInput(body.message as string) : null,
      source_url: body.sourceUrl ? sanitizeInput(body.sourceUrl as string) : null,
      utm_source: body.utmSource ? sanitizeInput(body.utmSource as string) : null,
      utm_medium: body.utmMedium ? sanitizeInput(body.utmMedium as string) : null,
      utm_campaign: body.utmCampaign ? sanitizeInput(body.utmCampaign as string) : null,
      utm_term: body.utmTerm ? sanitizeInput(body.utmTerm as string) : null,
      utm_content: body.utmContent ? sanitizeInput(body.utmContent as string) : null,
      status: 'new' as const,
      created_at: now,
      updated_at: now,
    };

    const supabase = await createServerClient();

    const { data, error } = await supabase
      .from('leads')
      .insert(leadData)
      .select()
      .single();

    if (error) {
      console.error('Supabase insert error (leads):', error.message);
      return NextResponse.json(
        {
          success: false,
          message: 'An unexpected error occurred. Please try again later.',
        },
        { status: 500, headers: CORS_HEADERS }
      );
    }

    sendLeadNotification(data as unknown as Lead).catch((err: unknown) => {
      console.error('Failed to send lead notification:', err);
    });

    sendLeadConfirmation(data.email, data.name).catch((err: unknown) => {
      console.error('Failed to send lead confirmation:', err);
    });

    return NextResponse.json(
      {
        success: true,
        message: "Thank you! We'll contact you within 2 hours.",
      },
      { status: 201, headers: CORS_HEADERS }
    );
  } catch (error) {
    console.error('Unexpected error in POST /api/leads:', error);
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
