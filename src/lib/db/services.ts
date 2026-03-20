import { createServerClient } from './supabase';
import type { Service, CreateServiceInput, UpdateServiceInput } from '@/types/database';

export async function getActiveServices(): Promise<Service[]> {
  const supabase = await createServerClient();

  const { data, error } = await supabase
    .from('services')
    .select('*')
    .eq('is_active', true)
    .order('sort_order', { ascending: true });

  if (error) {
    throw new Error(error.message);
  }

  return data ?? [];
}

export async function getServiceBySlug(slug: string): Promise<Service | null> {
  const supabase = await createServerClient();

  const { data: service, error } = await supabase
    .from('services')
    .select('*')
    .eq('slug', slug)
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  return service;
}

export async function createService(data: CreateServiceInput): Promise<Service> {
  const supabase = await createServerClient();

  const { data: service, error } = await supabase
    .from('services')
    .insert(data)
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return service;
}

export async function updateService(id: string, data: UpdateServiceInput): Promise<Service> {
  const supabase = await createServerClient();

  const { data: service, error } = await supabase
    .from('services')
    .update(data)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return service;
}
