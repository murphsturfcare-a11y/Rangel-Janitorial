import { analyticsPath, hasAdsConsent, isAdsMeasurementAllowed, safeReferrer } from './gtag';
import { isLeadEventDetail, type LeadEventDetail } from './conversion';
import { captureAdAttribution } from './ad-attribution';
import { readAdClickIds } from '@/lib/ad-clicks';
import { GOOGLE_ADS_CONFIGURED, GOOGLE_ADS_ID, GOOGLE_ADS_CONVERSION_LABEL } from './ads-config';
export { GOOGLE_ADS_CONFIGURED, GOOGLE_ADS_ID, GOOGLE_ADS_CONVERSION_LABEL } from './ads-config';

declare global { interface Window { rangelAdsReceipts?: Set<string>; } }

/** Ads alone may receive validated click IDs; arbitrary query fields never leave the page. */
export function adsPageLocation(): string {
  if (typeof window === 'undefined') return '';
  const url = new URL(analyticsPath(window.location.pathname), window.location.origin);
  if (GOOGLE_ADS_CONFIGURED && isAdsMeasurementAllowed()) {
    const clickIds = hasAdsConsent()
      ? captureAdAttribution()?.clickIds
      : readAdClickIds(Object.fromEntries(new URLSearchParams(window.location.search)));
    for (const [key, value] of Object.entries(clickIds || {})) url.searchParams.set(key, value);
  }
  return url.href;
}

/** Only called for the form's matching accepted receipt. No contact data enters Google tags. */
export function trackAdsLeadConversion(detail: LeadEventDetail): boolean {
  if (typeof window === 'undefined' || !GOOGLE_ADS_CONFIGURED || !isAdsMeasurementAllowed() || !window.gtag || !isLeadEventDetail(detail)) return false;
  const destination = GOOGLE_ADS_ID + '/' + GOOGLE_ADS_CONVERSION_LABEL;
  const key = destination + ':' + detail.submission_id;
  const receipts = window.rangelAdsReceipts ??= new Set<string>();
  if (receipts.has(key)) return false;
  window.gtag('event', 'conversion', {
    send_to: destination,
    transaction_id: detail.submission_id,
    restricted_data_processing: true,
    page_location: adsPageLocation(),
    page_referrer: safeReferrer(),
  });
  receipts.add(key);
  if (receipts.size > 100) receipts.delete(receipts.values().next().value!);
  return true;
}
