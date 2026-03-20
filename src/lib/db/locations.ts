import { createServerClient } from './supabase';
import type { Location, CreateLocationInput, UpdateLocationInput } from '@/types/database';

export async function getActiveLocations(): Promise<Location[]> {
  const supabase = await createServerClient();

  const { data, error } = await supabase
    .from('locations')
    .select('*')
    .eq('is_active', true)
    .order('name', { ascending: true });

  if (error) {
    throw new Error(error.message);
  }

  return data ?? [];
}

export async function getLocationBySlug(slug: string): Promise<Location | null> {
  const supabase = await createServerClient();

  const { data: location, error } = await supabase
    .from('locations')
    .select('*')
    .eq('slug', slug)
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  return location;
}

export async function createLocation(data: CreateLocationInput): Promise<Location> {
  const supabase = await createServerClient();

  const { data: location, error } = await supabase
    .from('locations')
    .insert(data)
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return location;
}

export async function updateLocation(id: string, data: UpdateLocationInput): Promise<Location> {
  const supabase = await createServerClient();

  const { data: location, error } = await supabase
    .from('locations')
    .update(data)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return location;
}
