import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/db/supabase';
import type { ApiResponse } from '@/types';

const VALID_STATUSES = ['new', 'contacted', 'quoted', 'won', 'lost'] as const;
type LeadStatus = (typeof VALID_STATUSES)[number];

function isValidStatus(value: unknown): value is LeadStatus {
  return typeof value === 'string' && VALID_STATUSES.includes(value as LeadStatus);
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
  try {
    const supabase = await createServerClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: 'Unauthorized',
        },
        { status: 401 }
      );
    }

    const { id } = await params;

    let body: Record<string, unknown>;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        {
          success: false,
          message: 'Invalid JSON in request body.',
        },
        { status: 400 }
      );
    }

    const { status, notes } = body;

    // Validate status if provided
    if (status !== undefined && !isValidStatus(status)) {
      return NextResponse.json(
        {
          success: false,
          message: `Invalid status. Must be one of: ${VALID_STATUSES.join(', ')}`,
        },
        { status: 400 }
      );
    }

    // Build update object with only provided fields
    const updateData: Record<string, unknown> = {
      updated_at: new Date().toISOString(),
    };

    if (status !== undefined) {
      updateData.status = status;
    }

    if (notes !== undefined) {
      updateData.notes = notes;
    }

    const { data: updatedLead, error } = await supabase
      .from('leads')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      // Supabase returns PGRST116 when no rows match the query with .single()
      if (error.code === 'PGRST116') {
        return NextResponse.json(
          {
            success: false,
            message: 'Lead not found.',
          },
          { status: 404 }
        );
      }

      console.error('Supabase update error (leads):', error.message);
      return NextResponse.json(
        {
          success: false,
          message: 'Failed to update lead.',
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Lead updated',
        data: updatedLead,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Unexpected error in PATCH /api/admin/leads/[id]:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'An unexpected error occurred. Please try again later.',
      },
      { status: 500 }
    );
  }
}
