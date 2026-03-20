import { createServerClient } from './supabase';
import type { NewsletterSubscriber } from '@/types/database';

export async function subscribe(
  email: string
): Promise<{ success: boolean; alreadySubscribed?: boolean }> {
  const supabase = await createServerClient();

  // Check if subscriber already exists
  const { data: existing, error: lookupError } = await supabase
    .from('newsletter_subscribers')
    .select('*')
    .eq('email', email)
    .maybeSingle();

  if (lookupError) {
    throw new Error(`Failed to check subscriber: ${lookupError.message}`);
  }

  // Already exists and active
  if (existing && existing.is_active) {
    return { success: true, alreadySubscribed: true };
  }

  // Exists but inactive — reactivate
  if (existing && !existing.is_active) {
    const { error: updateError } = await supabase
      .from('newsletter_subscribers')
      .update({
        is_active: true,
        unsubscribed_at: null,
        subscribed_at: new Date().toISOString(),
      })
      .eq('id', existing.id);

    if (updateError) {
      throw new Error(`Failed to reactivate subscriber: ${updateError.message}`);
    }

    return { success: true };
  }

  // New subscriber
  const { error: insertError } = await supabase
    .from('newsletter_subscribers')
    .insert({ email });

  if (insertError) {
    throw new Error(`Failed to subscribe: ${insertError.message}`);
  }

  return { success: true };
}

export async function unsubscribe(
  email: string
): Promise<{ success: boolean }> {
  const supabase = await createServerClient();

  const { error } = await supabase
    .from('newsletter_subscribers')
    .update({
      is_active: false,
      unsubscribed_at: new Date().toISOString(),
    })
    .eq('email', email);

  if (error) {
    throw new Error(`Failed to unsubscribe: ${error.message}`);
  }

  return { success: true };
}

export async function getSubscribers(): Promise<NewsletterSubscriber[]> {
  const supabase = await createServerClient();

  const { data, error } = await supabase
    .from('newsletter_subscribers')
    .select('*')
    .eq('is_active', true)
    .order('subscribed_at', { ascending: false });

  if (error) {
    throw new Error(`Failed to fetch subscribers: ${error.message}`);
  }

  return data ?? [];
}
