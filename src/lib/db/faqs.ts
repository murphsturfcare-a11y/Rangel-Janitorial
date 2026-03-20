import { createServerClient } from './supabase';
import type { FAQ } from '@/types/database';

export async function getFAQs(category?: string): Promise<FAQ[]> {
  const supabase = await createServerClient();

  let query = supabase
    .from('faqs')
    .select('*')
    .eq('is_published', true);

  if (category) {
    query = query.eq('category', category);
  }

  const { data, error } = await query
    .order('sort_order', { ascending: true })
    .order('created_at', { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function getFAQsByService(slug: string): Promise<FAQ[]> {
  const supabase = await createServerClient();

  const { data, error } = await supabase
    .from('faqs')
    .select('*')
    .eq('service_slug', slug)
    .eq('is_published', true)
    .order('sort_order', { ascending: true });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function getFAQsByLocation(slug: string): Promise<FAQ[]> {
  const supabase = await createServerClient();

  const { data, error } = await supabase
    .from('faqs')
    .select('*')
    .eq('location_slug', slug)
    .eq('is_published', true)
    .order('sort_order', { ascending: true });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
