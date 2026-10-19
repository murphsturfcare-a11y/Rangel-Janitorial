import { normalizeAdAttribution, readAdClickIds, type AdAttribution } from '@/lib/ad-clicks';
import { hasAdsConsent } from './gtag';
import { GOOGLE_ADS_CONFIGURED } from './ads-config';

export const AD_ATTRIBUTION_KEY = 'rangel_janitorial_ad_click';

export function clearAdAttribution(): void {
  if (typeof window === 'undefined') return;
  try { window.sessionStorage.removeItem(AD_ATTRIBUTION_KEY); }
  catch { /* Consent checks still prevent reading or forwarding inaccessible storage. */ }
}

export function getAdAttribution(): AdAttribution | null {
  if (typeof window === 'undefined' || !GOOGLE_ADS_CONFIGURED || !hasAdsConsent()) return null;
  try {
    const stored = normalizeAdAttribution(JSON.parse(window.sessionStorage.getItem(AD_ATTRIBUTION_KEY) || 'null'));
    if (!stored) clearAdAttribution();
    return stored;
  } catch { return null; }
}

/** Capture only after explicit advertising consent; retain the latest ad click in this tab. */
export function captureAdAttribution(): AdAttribution | null {
  if (typeof window === 'undefined' || !GOOGLE_ADS_CONFIGURED || !hasAdsConsent()) {
    clearAdAttribution();
    return null;
  }
  const params = new URLSearchParams(window.location.search);
  const clickIds = readAdClickIds(Object.fromEntries(params));
  const stored = getAdAttribution();
  if (!Object.keys(clickIds).length) return stored;
  if (stored && JSON.stringify(stored.clickIds) === JSON.stringify(clickIds)) return stored;
  const attribution: AdAttribution = { consent: 'granted', capturedAt: new Date().toISOString(), clickIds };
  try { window.sessionStorage.setItem(AD_ATTRIBUTION_KEY, JSON.stringify(attribution)); }
  catch { /* The current submission can still carry consented attribution without storage. */ }
  return attribution;
}
