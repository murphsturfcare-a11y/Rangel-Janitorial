import { event } from './gtag';
import regions from '@/data/regions.json';
import { submissionIdPattern, type FormPlacement } from '@/lib/leads';

export interface LeadEventDetail { region: string; form_placement: FormPlacement; submission_id: string; }

export function isLeadEventDetail(value: unknown): value is LeadEventDetail {
  if (!value || typeof value !== 'object') return false;
  const detail = value as Record<string, unknown>;
  return regions.some(region => region.slug === detail.region)
    && (detail.form_placement === 'hero' || detail.form_placement === 'bottom')
    && typeof detail.submission_id === 'string' && submissionIdPattern.test(detail.submission_id);
}

/** Called only for an accepted delivery event, with no contact details or invented values. */
export function trackLeadConversion(detail: LeadEventDetail): boolean {
  if (!isLeadEventDetail(detail)) return false;
  return event('generate_lead', { region: detail.region, form_placement: detail.form_placement });
}
export function trackQuoteRequest(detail: LeadEventDetail): boolean {
  if (!isLeadEventDetail(detail)) return false;
  return event('quote_start', { region: detail.region, form_placement: detail.form_placement });
}
