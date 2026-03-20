import { createServerClient } from './supabase';
import type {
  Testimonial,
  CreateTestimonialInput,
  UpdateTestimonialInput,
} from '@/types/database';

export async function getPublishedTestimonials(): Promise<Testimonial[]> {
  const supabase = await createServerClient();

  const { data, error } = await supabase
    .from('testimonials')
    .select('*')
    .eq('is_published', true)
    .order('created_at', { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function getFeaturedTestimonials(): Promise<Testimonial[]> {
  const supabase = await createServerClient();

  const { data, error } = await supabase
    .from('testimonials')
    .select('*')
    .eq('is_published', true)
    .eq('is_featured', true)
    .order('created_at', { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function getTestimonialsByLocation(
  location: string
): Promise<Testimonial[]> {
  const supabase = await createServerClient();

  const { data, error } = await supabase
    .from('testimonials')
    .select('*')
    .eq('is_published', true)
    .ilike('customer_location', `%${location}%`)
    .order('rating', { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function createTestimonial(
  data: CreateTestimonialInput
): Promise<Testimonial> {
  const supabase = await createServerClient();

  const { data: created, error } = await supabase
    .from('testimonials')
    .insert(data)
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return created;
}

export async function updateTestimonial(
  id: string,
  data: UpdateTestimonialInput
): Promise<Testimonial> {
  const supabase = await createServerClient();

  const { data: updated, error } = await supabase
    .from('testimonials')
    .update(data)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return updated;
}

export async function togglePublished(id: string): Promise<void> {
  const supabase = await createServerClient();

  const { data: current, error: fetchError } = await supabase
    .from('testimonials')
    .select('is_published')
    .eq('id', id)
    .single();

  if (fetchError) {
    throw new Error(fetchError.message);
  }

  const { error: updateError } = await supabase
    .from('testimonials')
    .update({ is_published: !current.is_published })
    .eq('id', id);

  if (updateError) {
    throw new Error(updateError.message);
  }
}
