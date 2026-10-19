import regions from '@/data/regions.json';
import { GOOGLE_ADS_CONFIGURED, GOOGLE_ADS_ID, websiteCallLabel } from './ads-config';
import { adsPageLocation } from './ads';
import { hasAdsConsent, isAdsMeasurementAllowed, safeReferrer } from './gtag';

export interface WebsiteCallPhone { phone: string; phoneHref: string; }

interface PhoneRequest {
  key: string;
  region: string;
  path: string;
  phone: WebsiteCallPhone | null;
}

let active: PhoneRequest | null = null;
const listeners = new Set<() => void>();

export function subscribeWebsiteCallPhone(listener: () => void): () => void {
  listeners.add(listener);
  return () => { listeners.delete(listener); };
}

function publish() { for (const listener of listeners) listener(); }

function measurementAllowed(): boolean {
  return GOOGLE_ADS_CONFIGURED && isAdsMeasurementAllowed()
    && (!window.rangelAdsGlobalOverride || hasAdsConsent());
}

function currentPath(): string { return window.location.pathname.replace(/\/$/, '') || '/'; }

/** Each region keeps its original public number outside its own paid quote route. */
export function getWebsiteCallPhone(region: string): WebsiteCallPhone | null {
  if (typeof window === 'undefined' || !measurementAllowed() || active?.region !== region || active.path !== currentPath()) return null;
  return active.phone;
}

export function resetWebsiteCallTracking(): void {
  if (!active) return;
  active = null;
  publish();
}

function normalizedUSPhone(value: string): string | null {
  const digits = value.replace(/\D/g, '');
  const national = digits.length === 11 && digits.startsWith('1') ? digits.slice(1) : digits;
  return /^[2-9]\d{2}[2-9]\d{6}$/.test(national) ? '+1' + national : null;
}

/** Google supplies both values. Treat them as untrusted and require display/dial parity. */
function forwardingPhone(formatted: unknown, mobile: unknown): WebsiteCallPhone | null {
  if (typeof formatted !== 'string' || typeof mobile !== 'string'
    || formatted.length > 40 || !/^[\d+(). -]+$/.test(formatted)
    || !/^\+?\d{10,11}$/.test(mobile)) return null;
  const number = normalizedUSPhone(mobile);
  if (!number || normalizedUSPhone(formatted) !== number) return null;
  return { phone: formatted, phoneHref: 'tel:' + number };
}

/** Call only after the shared consent/privacy commands and Google base loader are queued. */
export function syncWebsiteCallTracking(pathname: string): void {
  if (typeof window === 'undefined') return;
  const path = pathname.replace(/\/$/, '') || '/';
  const region = regions.find(entry => path === '/quote/' + entry.slug);
  const label = region ? websiteCallLabel(region.slug) : '';
  if (!measurementAllowed() || !region || !label || !window.gtag || currentPath() !== path) {
    resetWebsiteCallTracking();
    return;
  }
  const destination = GOOGLE_ADS_ID + '/' + label;
  const key = path + ':' + destination;
  if (active?.key === key) return;
  const request: PhoneRequest = { key, region: region.slug, path, phone: null };
  active = request;
  publish();
  window.gtag('config', destination, {
    phone_conversion_number: region.phone,
    phone_conversion_callback: (formatted: unknown, mobile: unknown) => {
      // A delayed response must not undo opt-out, follow a route change, or replace another region.
      if (active !== request || !measurementAllowed() || currentPath() !== path) return;
      const phone = forwardingPhone(formatted, mobile);
      if (!phone) return;
      request.phone = phone;
      publish();
    },
    phone_conversion_options: { timeout: 5000, cache: false },
    restricted_data_processing: true,
    allow_ad_personalization_signals: false,
    send_page_view: false,
    page_location: adsPageLocation(),
    page_referrer: safeReferrer(),
  });
}
