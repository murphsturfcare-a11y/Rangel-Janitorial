import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/db/supabase';
import type { ApiResponse } from '@/types';

export async function GET(
  request: NextRequest
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
        } satisfies ApiResponse,
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);

    const status = searchParams.get('status');
    const page = Math.max(1, parseInt(searchParams.get('page') || '1', 10));
    const limit = Math.min(100, Math.max(1, parseInt(searchParams.get('limit') || '20', 10)));
    const search = searchParams.get('search');

    // Build the data query
    let query = supabase.from('leads').select('*');

    if (status) {
      query = query.eq('status', status as 'new' | 'contacted' | 'qualified' | 'converted' | 'lost');
    }

    if (search) {
      query = query.or(
        `name.ilike.%${search}%,email.ilike.%${search}%,phone.ilike.%${search}%`
      );
    }

    query = query.order('created_at', { ascending: false });

    const from = (page - 1) * limit;
    const to = from + limit - 1;
    query = query.range(from, to);

    const { data: leads, error } = await query;

    if (error) {
      console.error('Supabase query error (leads):', error.message);
      return NextResponse.json(
        {
          success: false,
          message: 'Failed to fetch leads.',
        },
        { status: 500 }
      );
    }

    // Get total count for pagination
    let countQuery = supabase
      .from('leads')
      .select('*', { count: 'exact', head: true });

    if (status) {
      countQuery = countQuery.eq('status', status as 'new' | 'contacted' | 'qualified' | 'converted' | 'lost');
    }

    if (search) {
      countQuery = countQuery.or(
        `name.ilike.%${search}%,email.ilike.%${search}%,phone.ilike.%${search}%`
      );
    }

    const { count, error: countError } = await countQuery;

    if (countError) {
      console.error('Supabase count error (leads):', countError.message);
      return NextResponse.json(
        {
          success: false,
          message: 'Failed to fetch lead count.',
        },
        { status: 500 }
      );
    }

    const total = count ?? 0;
    const totalPages = Math.ceil(total / limit);

    return NextResponse.json(
      {
        success: true,
        message: 'Leads retrieved successfully',
        data: {
          leads,
          total,
          page,
          limit,
          totalPages,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Unexpected error in GET /api/admin/leads:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'An unexpected error occurred. Please try again later.',
      },
      { status: 500 }
    );
  }
}
