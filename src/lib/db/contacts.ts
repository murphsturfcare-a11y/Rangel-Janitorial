import { createServerClient } from './supabase';
import type { Contact, CreateContactInput, ContactFilters, ContactStatus } from '@/types/database';

export async function createContact(data: CreateContactInput): Promise<Contact> {
  const supabase = await createServerClient();

  const { data: contact, error } = await supabase
    .from('contacts')
    .insert(data)
    .select()
    .single();

  if (error) {
    throw new Error(`Failed to create contact: ${error.message}`);
  }

  return contact;
}

export async function getContacts(
  filters?: ContactFilters
): Promise<{ data: Contact[]; count: number }> {
  const supabase = await createServerClient();

  const page = filters?.page ?? 1;
  const pageSize = filters?.pageSize ?? 20;
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  let query = supabase
    .from('contacts')
    .select('*', { count: 'exact' })
    .order('created_at', { ascending: false })
    .range(from, to);

  if (filters?.status) {
    query = query.eq('status', filters.status);
  }

  const { data, count, error } = await query;

  if (error) {
    throw new Error(`Failed to fetch contacts: ${error.message}`);
  }

  return { data: data ?? [], count: count ?? 0 };
}

export async function updateContactStatus(
  id: string,
  status: ContactStatus
): Promise<Contact> {
  const supabase = await createServerClient();

  const { data: contact, error } = await supabase
    .from('contacts')
    .update({ status })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    throw new Error(`Failed to update contact status: ${error.message}`);
  }

  return contact;
}
