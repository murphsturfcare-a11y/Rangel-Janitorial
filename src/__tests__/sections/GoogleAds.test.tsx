import { StrictMode } from 'react';
import { act, cleanup, render } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
const state = vi.hoisted(() => {
  delete process.env.NEXT_PUBLIC_GTM_ID;
  process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID = 'G-TEST1234';
  process.env.NEXT_PUBLIC_GOOGLE_ADS_ID = 'AW-123456789';
  process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL = 'test_label';
  return { pathname: '/quote/murrieta' };
});
vi.mock('next/navigation', () => ({ usePathname: () => state.pathname }));
import { GoogleAnalytics } from '@/components/analytics/GoogleAnalytics';
import { ADS_CONSENT_KEY, CONSENT_KEY, setAdsConsent } from '@/lib/analytics/gtag';
import { AD_ATTRIBUTION_KEY } from '@/lib/analytics/ad-attribution';
import { trackAdsLeadConversion } from '@/lib/analytics/ads';

const receipt = { region: 'murrieta', form_placement: 'hero' as const, submission_id: '8b75ba63-7b5d-4aa7-8e25-a4b9b3b3ef42' };
const click = 'EAIaIQobChMI_test-click-1234567890';
function commands() { return (window.dataLayer || []).map(command => Array.from(command as ArrayLike<unknown>)); }
function events(name: string) { return commands().filter(command => command[0] === 'event' && command[1] === name); }
function accept(detail: unknown = receipt) { window.dispatchEvent(new CustomEvent('rangel:lead-accepted', { detail })); }
beforeEach(() => {
  localStorage.clear(); sessionStorage.clear(); window.dataLayer = [];
  delete window.rangelAnalyticsConsent; delete window.rangelAdsConsent; delete window.rangelAdsReceipts;
  delete window.rangelAdsGlobalOverride;
  Reflect.deleteProperty(window.navigator, 'globalPrivacyControl');
  Reflect.deleteProperty(window, 'gtag'); document.getElementById('rangel-ga-script')?.remove();
  window.history.replaceState({}, '', '/quote/murrieta?gclid=' + click + '&email=private@example.test');
  state.pathname = '/quote/murrieta';
});
afterEach(() => {
  cleanup(); vi.restoreAllMocks();
  delete window.rangelAnalyticsConsent; delete window.rangelAdsConsent; delete window.rangelAdsReceipts;
  delete window.rangelAdsGlobalOverride;
  Reflect.deleteProperty(window.navigator, 'globalPrivacyControl');
  document.getElementById('rangel-ga-script')?.remove();
  window.history.replaceState({}, '', '/');
});

describe('native Google Ads accepted-lead dispatch', () => {
  it('loads RDP measurement by default without fabricating consent or storing first-party attribution', () => {
    render(<GoogleAnalytics />); act(() => accept());
    expect(localStorage.getItem(ADS_CONSENT_KEY)).toBeNull();
    expect(sessionStorage.getItem(AD_ATTRIBUTION_KEY)).toBeNull();
    expect(document.getElementById('rangel-ga-script')).toHaveAttribute('src', 'https://www.googletagmanager.com/gtag/js?id=AW-123456789');
    expect(commands().find(command => command[0] === 'config')?.[2]).toMatchObject({ restricted_data_processing: true });
    expect(events('conversion')).toHaveLength(1);
    expect(events('generate_lead')).toHaveLength(0);
    expect(events('page_view')).toHaveLength(0);
  });

  it('analytics acceptance respects a separate Ads opt-out and never stores click attribution', () => {
    localStorage.setItem(CONSENT_KEY, 'accepted');
    localStorage.setItem(ADS_CONSENT_KEY, 'declined');
    render(<GoogleAnalytics />); act(() => accept());
    expect(events('generate_lead')).toHaveLength(1);
    expect(events('conversion')).toHaveLength(0);
    expect(commands().some(command => command[0] === 'config' && command[1] === 'AW-123456789')).toBe(false);
    expect(sessionStorage.getItem(AD_ATTRIBUTION_KEY)).toBeNull();
  });

  it('supports Ads consent while analytics is declined, with one configuration under StrictMode', () => {
    localStorage.setItem(CONSENT_KEY, 'declined'); localStorage.setItem(ADS_CONSENT_KEY, 'accepted');
    render(<StrictMode><GoogleAnalytics /></StrictMode>);
    expect(commands().filter(command => command[0] === 'config')).toHaveLength(1);
    expect(commands().find(command => command[0] === 'config')?.[1]).toBe('AW-123456789');
    expect(document.querySelectorAll('#rangel-ga-script')).toHaveLength(1);
    act(() => { accept(); accept(); });
    expect(events('conversion')).toEqual([['event', 'conversion', {
      send_to: 'AW-123456789/test_label', transaction_id: receipt.submission_id, restricted_data_processing: true,
      page_location: window.location.origin + '/quote/murrieta?gclid=' + click, page_referrer: '',
    }]]);
    expect(events('generate_lead')).toHaveLength(0);
    expect(events('page_view')).toHaveLength(0);
  });

  it('routes GA4 and Ads separately, strips private fields, and deduplicates across navigation', () => {
    localStorage.setItem(CONSENT_KEY, 'accepted'); localStorage.setItem(ADS_CONSENT_KEY, 'accepted');
    const { rerender } = render(<GoogleAnalytics />);
    act(() => { accept({ ...receipt, email: 'private@example.test', phone: '9515550100' }); accept(); });
    state.pathname = '/services'; window.history.replaceState({}, '', '/services'); rerender(<GoogleAnalytics />);
    act(() => accept());
    expect(events('conversion')).toHaveLength(1);
    expect(events('generate_lead')).toEqual([['event', 'generate_lead', { region: 'murrieta', form_placement: 'hero', send_to: 'G-TEST1234', page_location: window.location.origin + '/quote/murrieta', page_referrer: '' }]]);
    const gaConfig = commands().find(command => command[0] === 'config' && command[1] === 'G-TEST1234');
    expect(JSON.stringify(gaConfig)).not.toContain(click);
    expect(JSON.stringify(events('page_view'))).not.toContain(click);
    expect(JSON.stringify(commands())).not.toMatch(/private@example|9515550100|email=/);
  });

  it('never replays opted-out accepted events or treats a form start as a conversion', () => {
    localStorage.setItem(ADS_CONSENT_KEY, 'declined');
    render(<GoogleAnalytics />);
    act(() => { accept(); window.dispatchEvent(new CustomEvent('rangel:lead-started', { detail: receipt })); });
    act(() => setAdsConsent('accepted'));
    act(() => { accept(); accept({ ...receipt, submission_id: 'invalid' }); });
    expect(events('conversion')).toHaveLength(0);
    act(() => accept({ ...receipt, submission_id: '0b75ba63-7b5d-4aa7-8e25-a4b9b3b3ef42' }));
    expect(events('conversion')).toHaveLength(1);
  });

  it('revokes Ads, clears its session attribution/cookies and stops events without disabling GA', () => {
    localStorage.setItem(CONSENT_KEY, 'accepted'); localStorage.setItem(ADS_CONSENT_KEY, 'accepted');
    render(<GoogleAnalytics />); document.cookie = '_gcl_aw=test; path=/';
    act(() => setAdsConsent('declined'));
    act(() => accept());
    expect(events('conversion')).toHaveLength(0);
    expect(events('generate_lead')).toHaveLength(1);
    expect(sessionStorage.getItem(AD_ATTRIBUTION_KEY)).toBeNull();
    expect(document.cookie).not.toMatch(/_gcl_aw=/);
    const consent = commands().filter(command => command[0] === 'consent' && command[1] === 'update').at(-1);
    expect(consent?.[2]).toEqual({ analytics_storage: 'granted', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied' });
  });

  it('honors an Ads revocation from another tab', () => {
    localStorage.setItem(ADS_CONSENT_KEY, 'accepted'); render(<GoogleAnalytics />);
    localStorage.setItem(ADS_CONSENT_KEY, 'declined');
    act(() => window.dispatchEvent(new StorageEvent('storage', { key: ADS_CONSENT_KEY, newValue: 'declined' })));
    act(() => accept());
    expect(events('conversion')).toHaveLength(0);
    expect(sessionStorage.getItem(AD_ATTRIBUTION_KEY)).toBeNull();
  });

  it('the native helper also rejects invalid details and deduplicates accepted receipt IDs', () => {
    window.gtag = vi.fn();
    localStorage.setItem(ADS_CONSENT_KEY, 'declined');
    expect(trackAdsLeadConversion(receipt)).toBe(false);
    localStorage.setItem(ADS_CONSENT_KEY, 'accepted');
    expect(trackAdsLeadConversion({ ...receipt, submission_id: 'private@example.test' })).toBe(false);
    expect(trackAdsLeadConversion(receipt)).toBe(true);
    expect(trackAdsLeadConversion(receipt)).toBe(false);
    expect(window.gtag).toHaveBeenCalledTimes(1);
  });
});
