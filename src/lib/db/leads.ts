import { createServerClient } from './supabase';
import type { Lead, CreateLeadInput, LeadFilters, LeadStatus } from '@/types/database';

export async function createLead(data: CreateLeadInput): Promise<Lead> {
  const supabase = await createServerClient();

  const { data: lead, error } = await supabase
    .from('leads')
    .insert(data)
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return lead;
}

export async function getLeads(
  filters?: LeadFilters
): Promise<{ data: Lead[]; count: number }> {
  const supabase = await createServerClient();

  const page = filters?.page ?? 1;
  const pageSize = filters?.pageSize ?? 20;
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  let query = supabase
    .from('leads')
    .select('*', { count: 'exact' });

  if (filters?.status) {
    query = query.eq('status', filters.status);
  }

  if (filters?.search) {
    const search = filters.search;
    query = query.or(
      `name.ilike.%${search}%,email.ilike.%${search}%,phone.ilike.%${search}%,property_address.ilike.%${search}%`
    );
  }

  query = query.order('created_at', { ascending: false }).range(from, to);

  const { data, count, error } = await query;

  if (error) {
    throw new Error(error.message);
  }

  return { data: data ?? [], count: count ?? 0 };
}

export async function getLeadById(id: string): Promise<Lead | null> {
  const supabase = await createServerClient();

  const { data: lead, error } = await supabase
    .from('leads')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    if (error.code === 'PGRST116') {
      return null;
    }
    throw new Error(error.message);
  }

  return lead;
}

export async function updateLeadStatus(
  id: string,
  status: LeadStatus,
  notes?: string
): Promise<Lead> {
  const supabase = await createServerClient();

  const updateData: { status: LeadStatus; notes?: string } = { status };
  if (notes !== undefined) {
    updateData.notes = notes;
  }

  const { data: lead, error } = await supabase
    .from('leads')
    .update(updateData)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return lead;
}

export async function getLeadStats(): Promise<{
  total: number;
  new: number;
  contacted: number;
  qualified: number;
  converted: number;
}> {
  const supabase = await createServerClient();

  const { data, error } = await supabase.from('leads').select('status');

  if (error) {
    throw new Error(error.message);
  }

  const leads = data ?? [];

  return {
    total: leads.length,
    new: leads.filter((l) => l.status === 'new').length,
    contacted: leads.filter((l) => l.status === 'contacted').length,
    qualified: leads.filter((l) => l.status === 'qualified').length,
    converted: leads.filter((l) => l.status === 'converted').length,
  };
}
