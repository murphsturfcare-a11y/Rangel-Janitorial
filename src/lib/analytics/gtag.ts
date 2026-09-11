import regions from '@/data/regions.json';
import { SERVICE_SLUGS } from '@/lib/seo/constants';
import { BLOG_SLUGS, BLOG_PAGE_COUNT } from '@/content/blog-index';

const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || '';
export const GA_MEASUREMENT_ID = /^G-[A-Z0-9]{4,20}$/.test(measurementId) ? measurementId : '';
export const GA_DISABLE_KEY = `ga-disable-${GA_MEASUREMENT_ID}` as const;
export const CONSENT_KEY = 'rangel_janitorial_cookie_consent';
export type ConsentChoice = 'accepted' | 'declined';

declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
    dataLayer: unknown[];
    rangelAnalyticsConsent?: ConsentChoice;
    [key: `ga-disable-${string}`]: boolean | undefined;
  }
}

export function getAnalyticsConsent(): ConsentChoice | null {
  if (typeof window === 'undefined') return null;
  if (window.rangelAnalyticsConsent) return window.rangelAnalyticsConsent;
  try {
    const stored = window.localStorage.getItem(CONSENT_KEY);
    return stored === 'accepted' || stored === 'declined' ? stored : null;
  } catch { return null; }
}

export function hasAnalyticsConsent(): boolean { return getAnalyticsConsent() === 'accepted'; }

export function setAnalyticsConsent(choice: ConsentChoice): void {
  if (typeof window === 'undefined') return;
  // A declined choice takes effect immediately even if persistent storage fails.
  window.rangelAnalyticsConsent = choice;
  try { window.localStorage.setItem(CONSENT_KEY, choice); }
  catch { /* The choice remains in effect for this tab. */ }
  window.dispatchEvent(new Event('rangel:consent'));
}

const knownPaths = new Set([
  '/', '/services', '/locations', '/blog', '/privacy-policy', '/terms-of-service',
  ...SERVICE_SLUGS.map(slug => '/services/' + slug),
  ...BLOG_SLUGS.map(slug => '/blog/' + slug),
  ...Array.from({ length: Math.max(0, BLOG_PAGE_COUNT - 1) }, (_, index) => '/blog/page/' + (index + 2)),
  ...regions.flatMap(region => ['/locations/' + region.slug, ...region.cities.map(city => '/locations/' + region.slug + '/' + city.slug)]),
]);

/** Unknown paths may contain user input. Report them only as /404. */
export function analyticsPath(path: string): string {
  const clean = path.split(/[?#]/)[0].replace(/\/$/, '') || '/';
  return knownPaths.has(clean) ? clean : '/404';
}

export function safeReferrer(): string {
  if (typeof document === 'undefined') return '';
  try {
    const url = new URL(document.referrer);
    return ['http:', 'https:'].includes(url.protocol) ? url.origin : '';
  } catch { return ''; }
}

function regionSlug(value: unknown): string | undefined {
  return typeof value === 'string' ? regions.find(region => region.slug === value || region.city === value)?.slug : undefined;
}

export function pageview(path: string): boolean {
  if (typeof window === 'undefined') return false;
  return event('page_view', { page_path: analyticsPath(path) });
}

/** Only established event fields reach GA; callers cannot pass contact or arbitrary URL data. */
export function event(action: string, params: Record<string, unknown>): boolean {
  if (typeof window === 'undefined' || !GA_MEASUREMENT_ID || !window.gtag || !hasAnalyticsConsent() || window[GA_DISABLE_KEY]) return false;
  const clean: Record<string, string | number> = {};
  switch (action) {
    case 'page_view':
    case 'quote_cta_click': {
      const path = typeof params.page_path === 'string' ? analyticsPath(params.page_path) : analyticsPath(window.location.pathname);
      clean.page_path = path;
      if (action === 'page_view') {
        clean.page_location = window.location.origin + path;
        clean.page_referrer = safeReferrer();
      }
      break;
    }
    case 'generate_lead':
    case 'quote_start':
    case 'phone_click': {
      const region = regionSlug(params.region);
      if (!region) return false;
      clean.region = region;
      if (action !== 'phone_click') {
        if (params.form_placement !== 'hero' && params.form_placement !== 'bottom') return false;
        clean.form_placement = params.form_placement;
      }
      break;
    }
    case 'scroll_depth':
      if (typeof params.depth_percentage !== 'number' || ![25, 50, 75, 100].includes(params.depth_percentage)) return false;
      clean.depth_percentage = params.depth_percentage;
      break;
    case 'service_page_view':
      if (typeof params.service_name !== 'string' || !SERVICE_SLUGS.some(slug => slug === params.service_name)) return false;
      clean.service_name = params.service_name;
      break;
    case 'location_page_view': {
      const region = regionSlug(params.location_name);
      if (!region) return false;
      clean.region = region;
      break;
    }
    case 'cta_click':
      if (typeof params.cta_name !== 'string' || !['get_quote', 'contact_office', 'view_services'].includes(params.cta_name)) return false;
      if (typeof params.cta_location !== 'string' || !['header', 'hero', 'bottom', 'footer'].includes(params.cta_location)) return false;
      clean.cta_name = params.cta_name;
      clean.cta_location = params.cta_location;
      break;
    case 'form_submission':
      // Compatibility helper records an interaction, never an accepted inquiry.
      if (params.form_name !== 'quote' || (params.form_location !== 'hero' && params.form_location !== 'bottom')) return false;
      clean.form_name = 'quote';
      clean.form_location = params.form_location;
      break;
    default: return false;
  }
  window.gtag('event', action, clean);
  return true;
}

export function trackFormSubmission(formName: string, formLocation: string): void { event('form_submission', { form_name: formName, form_location: formLocation }); }
export function trackCTAClick(ctaName: string, ctaLocation: string): void { event('cta_click', { cta_name: ctaName, cta_location: ctaLocation }); }
export function trackPhoneCall(phoneNumber: string): void {
  const digits = phoneNumber.replace(/\D/g, '').replace(/^1(?=\d{10}$)/, '');
  const region = regions.find(region => region.phone.replace(/\D/g, '') === digits);
  if (region) event('phone_click', { region: region.slug });
}
export function trackServicePageView(serviceName: string): void { event('service_page_view', { service_name: serviceName }); }
export function trackLocationPageView(locationName: string): void { event('location_page_view', { location_name: locationName }); }
export function trackScrollDepth(percentage: number): void { event('scroll_depth', { depth_percentage: percentage }); }
