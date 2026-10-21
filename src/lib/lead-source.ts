import { adClickKeys, normalizeAdAttribution } from './ad-clicks';

export const campaignLabelKeys = ['source', 'medium', 'campaign'] as const;
export type CampaignLabels = Partial<Record<(typeof campaignLabelKeys)[number], string>>;
export type LeadChannel = 'google-ads' | 'organic-search' | 'paid-campaign' | 'website';
export type LeadOrigin =
  | { channel: 'google-ads'; basis: 'current-google-click-marker' | 'current-google-paid-utm' }
  | { channel: 'paid-campaign'; basis: 'current-paid-utm' }
  | { channel: 'organic-search'; basis: 'current-organic-utm' };

export interface LeadSource {
  channel: LeadChannel;
  label: string;
  evidence: string;
}

/** Campaign labels can appear in owner notifications; exclude URLs, personal details and control characters. */
export function normalizeCampaignLabels(value: unknown): CampaignLabels {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return {};
  const record = value as Record<string, unknown>;
  return Object.fromEntries(campaignLabelKeys.flatMap(key => {
    const label = record[key];
    return typeof label === 'string' && /^[a-zA-Z0-9][a-zA-Z0-9._ -]{0,79}$/.test(label)
      && !/\d(?:[ ._-]*\d){6,}/.test(label) ? [[key, label]] : [];
  }));
}

const paidSearchMedia = new Set(['cpc', 'ppc', 'paidsearch', 'paid_search', 'paid-search']);
const otherPaidMedia = new Set(['paid', 'paid_social', 'paid-social', 'paidsocial', 'cpm', 'display']);
const searchSources = new Set(['google', 'bing', 'yahoo', 'duckduckgo', 'ecosia', 'brave']);

/** Only a non-identifying current-visit label crosses this boundary; raw URLs and identifiers do not. */
export function normalizeLeadOrigin(value: unknown): LeadOrigin | null {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return null;
  const record = value as Record<string, unknown>;
  if (Object.keys(record).some(key => key !== 'channel' && key !== 'basis')) return null;
  if (record.channel === 'google-ads' && (record.basis === 'current-google-click-marker' || record.basis === 'current-google-paid-utm')) {
    return { channel: record.channel, basis: record.basis };
  }
  if (record.channel === 'paid-campaign' && record.basis === 'current-paid-utm') return { channel: record.channel, basis: record.basis };
  if (record.channel === 'organic-search' && record.basis === 'current-organic-utm') return { channel: record.channel, basis: record.basis };
  return null;
}

/** Classify supplied evidence without guessing from the landing-page route or a self-reported referral answer. */
export function classifyLeadSource(campaign: unknown, adAttribution: unknown, leadOrigin?: unknown): LeadSource {
  const labels = normalizeCampaignLabels(campaign);
  const source = labels.source?.trim().toLowerCase() || '';
  const medium = labels.medium?.trim().toLowerCase() || '';
  const click = normalizeAdAttribution(adAttribution);
  if (click) {
    const keys = adClickKeys.filter(key => click.clickIds[key]);
    return { channel: 'google-ads', label: 'Google Ads', evidence: 'Google click identifier present: ' + keys.join(', ') + ' (format validated)' };
  }
  if (source === 'google' && paidSearchMedia.has(medium)) {
    return { channel: 'google-ads', label: 'Google Ads', evidence: 'Campaign source google with paid-search medium ' + medium };
  }
  if (paidSearchMedia.has(medium) || otherPaidMedia.has(medium)) {
    return { channel: 'paid-campaign', label: 'Paid campaign', evidence: 'Campaign medium ' + medium + (source ? ' from ' + source : '') };
  }
  if (searchSources.has(source) && medium === 'organic') {
    return { channel: 'organic-search', label: 'Organic Search', evidence: 'Campaign source ' + source + ' with organic medium' };
  }
  const origin = normalizeLeadOrigin(leadOrigin);
  if (origin) {
    const label = origin.channel === 'google-ads' ? 'Google Ads' : origin.channel === 'paid-campaign' ? 'Paid campaign' : 'Organic Search';
    return { channel: origin.channel, label, evidence: 'Current-visit label: ' + origin.basis + ' (reported by website; advertising attribution not verified)' };
  }
  return { channel: 'website', label: 'Website (organic/direct)', evidence: 'No paid-campaign or confirmed organic-search evidence provided' };
}
