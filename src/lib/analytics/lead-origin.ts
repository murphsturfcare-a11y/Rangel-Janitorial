import { readAdClickIds } from '@/lib/ad-clicks';
import type { LeadOrigin } from '@/lib/lead-source';
import { isAdsMeasurementAllowed } from './gtag';

const googlePaidMedia = new Set(['cpc', 'ppc', 'paidsearch', 'paid_search', 'paid-search']);
const otherPaidMedia = new Set(['paid', 'paid_social', 'paid-social', 'paidsocial', 'cpm', 'display']);
const searchSources = new Set(['google', 'bing', 'yahoo', 'duckduckgo', 'ecosia', 'brave']);

function campaignToken(value: string | null): string {
  // Only exact, short channel tokens matter. Never return freeform campaign data.
  return value && /^[a-zA-Z][a-zA-Z_-]{0,31}$/.test(value) ? value.toLowerCase() : '';
}

/** Current-request channel hint for the owner; never stores or forwards the underlying URL values. */
export function captureLeadOrigin(): LeadOrigin | null {
  if (typeof window === 'undefined' || !isAdsMeasurementAllowed()) return null;
  const query = new URLSearchParams(window.location.search);
  if (Object.keys(readAdClickIds(Object.fromEntries(query))).length) {
    return { channel: 'google-ads', basis: 'current-google-click-marker' };
  }
  const source = campaignToken(query.get('utm_source'));
  const medium = campaignToken(query.get('utm_medium'));
  if (source === 'google' && googlePaidMedia.has(medium)) {
    return { channel: 'google-ads', basis: 'current-google-paid-utm' };
  }
  if (googlePaidMedia.has(medium) || otherPaidMedia.has(medium)) {
    return { channel: 'paid-campaign', basis: 'current-paid-utm' };
  }
  if (searchSources.has(source) && medium === 'organic') {
    return { channel: 'organic-search', basis: 'current-organic-utm' };
  }
  return null;
}
