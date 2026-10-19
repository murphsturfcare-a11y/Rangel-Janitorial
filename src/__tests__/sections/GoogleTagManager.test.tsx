import { StrictMode } from 'react';
import { act, cleanup, render } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

const state = vi.hoisted(() => {
  process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID = 'G-TEST1234';
  process.env.NEXT_PUBLIC_GOOGLE_ADS_ID = 'AW-11465582021';
  process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL = 'test_label';
  process.env.NEXT_PUBLIC_GTM_ID = 'GTM-MB764DLF';
  return { pathname: '/quote/murrieta' };
});
vi.mock('next/navigation', () => ({ usePathname: () => state.pathname }));
import { GoogleAnalytics } from '@/components/analytics/GoogleAnalytics';
import { ADS_CONSENT_KEY, CONSENT_KEY, setAdsConsent, setAnalyticsConsent } from '@/lib/analytics/gtag';
import { AD_ATTRIBUTION_KEY } from '@/lib/analytics/ad-attribution';

const receipt = { region: 'murrieta', form_placement: 'hero' as const, submission_id: '8b75ba63-7b5d-4aa7-8e25-a4b9b3b3ef42' };
const click = 'EAIaIQobChMI_test-click-1234567890';
function commands() { return window.dataLayer.filter(item => Object.prototype.toString.call(item) === '[object Arguments]').map(item => Array.from(item as ArrayLike<unknown>)); }
function events(name: string) { return commands().filter(command => command[0] === 'event' && command[1] === name); }
function starts() { return window.dataLayer.filter(item => item && typeof item === 'object' && 'event' in item && item.event === 'gtm.js'); }
function accept(detail: unknown = receipt) { window.dispatchEvent(new CustomEvent('rangel:lead-accepted', { detail })); }
function removeScripts() { document.getElementById('rangel-ga-script')?.remove(); document.getElementById('rangel-gtm-script')?.remove(); }

beforeEach(() => {
  localStorage.clear(); sessionStorage.clear(); window.dataLayer = [];
  delete window.rangelAnalyticsConsent; delete window.rangelAdsConsent; delete window.rangelAdsReceipts;
  delete window.rangelAdsGlobalOverride;
  Reflect.deleteProperty(window.navigator, 'globalPrivacyControl');
  Reflect.deleteProperty(window, 'gtag'); removeScripts();
  state.pathname = '/quote/murrieta';
  window.history.replaceState({}, '', '/quote/murrieta?gclid=' + click + '&email=private@example.test');
});
afterEach(() => {
  cleanup(); vi.restoreAllMocks(); removeScripts();
  delete window.rangelAnalyticsConsent; delete window.rangelAdsConsent; delete window.rangelAdsReceipts;
  delete window.rangelAdsGlobalOverride;
  Reflect.deleteProperty(window.navigator, 'globalPrivacyControl');
  window.history.replaceState({}, '', '/');
});

describe('restricted-data-processing GTM Ads base', () => {
  it('keeps regional Ads defaults intact during analytics-only updates and retains Google cookies', () => {
    document.cookie = '_gcl_aw=regional-cookie; path=/';
    render(<GoogleAnalytics />);
    act(() => { setAnalyticsConsent('accepted'); setAnalyticsConsent('declined'); });
    const updates = commands().filter(command => command[0] === 'consent' && command[1] === 'update');
    expect(updates).toHaveLength(3);
    for (const update of updates) {
      expect(update[2]).not.toHaveProperty('ad_storage');
      expect(update[2]).not.toHaveProperty('ad_user_data');
    }
    expect(document.cookie).toContain('_gcl_aw=regional-cookie');
    expect(sessionStorage.getItem(AD_ATTRIBUTION_KEY)).toBeNull();
    expect(starts()).toHaveLength(1);
    document.cookie = '_gcl_aw=; Max-Age=0; path=/';
  });

  it.each(['remove', 'clear'])('denies Ads storage when an explicit choice is removed by cross-tab %s', action => {
    localStorage.setItem(ADS_CONSENT_KEY, 'accepted');
    render(<GoogleAnalytics />);
    document.cookie = '_gcl_aw=previous-grant; path=/';
    if (action === 'remove') localStorage.removeItem(ADS_CONSENT_KEY);
    else localStorage.clear();
    act(() => window.dispatchEvent(new StorageEvent('storage', { key: action === 'remove' ? ADS_CONSENT_KEY : null, newValue: null })));
    act(() => setAnalyticsConsent('accepted'));
    expect(commands().filter(command => command[0] === 'consent' && command[1] === 'update').at(-1)?.[2]).toEqual({
      analytics_storage: 'granted', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied',
    });
    expect(document.cookie).not.toMatch(/_gcl_aw=/);
    expect(sessionStorage.getItem(AD_ATTRIBUTION_KEY)).toBeNull();
    act(() => setAdsConsent('accepted'));
    expect(commands().filter(command => command[0] === 'consent' && command[1] === 'update').at(-1)?.[2]).toMatchObject({ ad_storage: 'granted', ad_user_data: 'granted' });
    expect(starts()).toHaveLength(1);
  });

  it.each([null, 'accepted'])('GPC blocks Ads despite a prior %s choice while allowing opted-in GA', choice => {
    if (choice) localStorage.setItem(ADS_CONSENT_KEY, choice);
    localStorage.setItem(CONSENT_KEY, 'accepted');
    sessionStorage.setItem(AD_ATTRIBUTION_KEY, 'prior-attribution');
    sessionStorage.setItem('rangel_janitorial_utm', 'prior-campaign');
    document.cookie = '_gcl_aw=prior-cookie; path=/';
    Object.defineProperty(window.navigator, 'globalPrivacyControl', { configurable: true, value: true });
    render(<GoogleAnalytics />); act(() => accept());
    expect(document.getElementById('rangel-gtm-script')).toBeNull();
    expect(document.getElementById('rangel-ga-script')).not.toBeNull();
    expect(events('conversion')).toHaveLength(0);
    expect(events('generate_lead')).toHaveLength(1);
    expect(sessionStorage.getItem(AD_ATTRIBUTION_KEY)).toBeNull();
    expect(sessionStorage.getItem('rangel_janitorial_utm')).toBeNull();
    expect(document.cookie).not.toMatch(/_gcl_aw=/);
    expect(commands().filter(command => command[0] === 'consent' && command[1] === 'update').at(-1)?.[2]).toMatchObject({ ad_storage: 'denied', ad_user_data: 'denied' });
    expect(JSON.stringify(events('generate_lead'))).not.toContain(click);
  });

  it('adds clean page context to every GA event even when the global Ads URL includes a click ID', () => {
    localStorage.setItem(CONSENT_KEY, 'accepted');
    render(<GoogleAnalytics />);
    act(() => { accept(); window.dispatchEvent(new CustomEvent('rangel:lead-started', { detail: receipt })); });
    expect(commands()).toContainEqual(['set', expect.objectContaining({ page_location: window.location.origin + '/quote/murrieta?gclid=' + click })]);
    const gaEvents = commands().filter(command => command[0] === 'event' && command[1] !== 'conversion');
    expect(gaEvents.map(command => command[1])).toEqual(['page_view', 'generate_lead', 'quote_start']);
    for (const command of gaEvents) expect(command[2]).toMatchObject({ page_location: window.location.origin + '/quote/murrieta', page_referrer: '', send_to: 'G-TEST1234' });
    expect(JSON.stringify(gaEvents)).not.toMatch(/gclid|private@example/);
  });

  it('loads neither GTM nor an iframe after an explicit Ads opt-out', () => {
    localStorage.setItem(ADS_CONSENT_KEY, 'declined');
    render(<GoogleAnalytics />); act(() => accept());
    expect(document.querySelector('script[src*="googletagmanager.com"]')).toBeNull();
    expect(document.querySelector('iframe')).toBeNull();
    expect(window.dataLayer).toEqual([]);
    expect(sessionStorage.getItem(AD_ATTRIBUTION_KEY)).toBeNull();
  });

  it('keeps analytics on the direct GA path when Ads is explicitly declined', () => {
    localStorage.setItem(CONSENT_KEY, 'accepted');
    localStorage.setItem(ADS_CONSENT_KEY, 'declined');
    render(<GoogleAnalytics />); act(() => accept());
    expect(document.getElementById('rangel-ga-script')).toHaveAttribute('src', 'https://www.googletagmanager.com/gtag/js?id=G-TEST1234');
    expect(document.getElementById('rangel-gtm-script')).toBeNull();
    expect(starts()).toHaveLength(0);
    expect(commands().filter(command => command[0] === 'config').map(command => command[1])).toEqual(['G-TEST1234']);
    expect(events('generate_lead')).toHaveLength(1);
    expect(events('conversion')).toHaveLength(0);
    expect(sessionStorage.getItem(AD_ATTRIBUTION_KEY)).toBeNull();
  });

  it('queues global denial, US RDP defaults and sanitized Ads URLs before loading GTM once without a saved choice', () => {
    localStorage.setItem(CONSENT_KEY, 'declined');
    vi.spyOn(document, 'referrer', 'get').mockReturnValue('https://example.test/private?email=private@example.test');
    const append = document.head.appendChild.bind(document.head);
    let queueAtLoad: unknown[] = [];
    vi.spyOn(document.head, 'appendChild').mockImplementation(node => {
      if (node instanceof HTMLScriptElement && node.id === 'rangel-gtm-script') queueAtLoad = [...window.dataLayer];
      return append(node);
    });
    render(<StrictMode><GoogleAnalytics /></StrictMode>);
    const queued = queueAtLoad.slice(0, -1).map(item => Array.from(item as ArrayLike<unknown>));
    expect(queued[0]).toEqual(['consent', 'default', { analytics_storage: 'denied', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied' }]);
    expect(queued[1]).toEqual(['consent', 'default', { region: ['US'], ad_storage: 'granted', ad_user_data: 'granted', ad_personalization: 'denied' }]);
    expect(queued).toContainEqual(['set', { restricted_data_processing: true, ads_data_redaction: true, url_passthrough: false }]);
    expect(queued).toContainEqual(['consent', 'update', { analytics_storage: 'denied', ad_personalization: 'denied' }]);
    expect(localStorage.getItem(ADS_CONSENT_KEY)).toBeNull();
    expect(sessionStorage.getItem(AD_ATTRIBUTION_KEY)).toBeNull();
    expect(queued.at(-1)).toEqual(['set', {
      page_location: window.location.origin + '/quote/murrieta?gclid=' + click, page_referrer: 'https://example.test',
      send_page_view: false, allow_google_signals: false, allow_ad_personalization_signals: false, restricted_data_processing: true,
    }]);
    expect(queueAtLoad.at(-1)).toMatchObject({ event: 'gtm.js', 'gtm.start': expect.any(Number) });
    expect(document.querySelectorAll('#rangel-gtm-script')).toHaveLength(1);
    expect(document.getElementById('rangel-gtm-script')).toHaveAttribute('src', 'https://www.googletagmanager.com/gtm.js?id=GTM-MB764DLF');
    expect(document.getElementById('rangel-gtm-script')).toHaveProperty('referrerPolicy', 'origin');
    expect(document.getElementById('rangel-ga-script')).toBeNull();
    expect(commands().filter(command => command[0] === 'config')).toHaveLength(0);
    expect(events('page_view')).toHaveLength(0);
    expect(starts()).toHaveLength(1);
    expect(JSON.stringify(queued)).not.toMatch(/private@example|email=|\/private/);
  });

  it('keeps one accepted conversion and one GA lead event across repeated receipts and navigation', () => {
    localStorage.setItem(ADS_CONSENT_KEY, 'accepted'); localStorage.setItem(CONSENT_KEY, 'accepted');
    const { rerender } = render(<StrictMode><GoogleAnalytics /></StrictMode>);
    act(() => { accept({ ...receipt, email: 'private@example.test', phone: '9515550100' }); accept(); });
    state.pathname = '/services'; window.history.replaceState({}, '', '/services'); rerender(<StrictMode><GoogleAnalytics /></StrictMode>);
    act(() => { window.dispatchEvent(new Event('rangel:consent')); accept(); });
    expect(events('conversion')).toEqual([['event', 'conversion', {
      send_to: 'AW-11465582021/test_label', transaction_id: receipt.submission_id, restricted_data_processing: true,
      page_location: window.location.origin + '/quote/murrieta?gclid=' + click, page_referrer: '',
    }]]);
    expect(events('generate_lead')).toEqual([['event', 'generate_lead', { region: 'murrieta', form_placement: 'hero', send_to: 'G-TEST1234', page_location: window.location.origin + '/quote/murrieta', page_referrer: '' }]]);
    expect(commands().filter(command => command[0] === 'config').map(command => command[1])).toEqual(['G-TEST1234']);
    expect(document.querySelectorAll('#rangel-gtm-script')).toHaveLength(1);
    expect(document.querySelectorAll('#rangel-ga-script')).toHaveLength(1);
    expect(starts()).toHaveLength(1);
    expect(events('page_view')).toHaveLength(2);
    expect(JSON.stringify(window.dataLayer)).not.toMatch(/private@example|9515550100|email=/);
    expect(window.dataLayer.filter(item => item && typeof item === 'object' && 'event' in item)).toEqual(starts());
  });

  it('does not replay opted-out receipts or convert starts, rejected or unknown outcomes', () => {
    localStorage.setItem(ADS_CONSENT_KEY, 'declined');
    render(<GoogleAnalytics />);
    act(() => accept());
    act(() => setAdsConsent('accepted'));
    act(() => {
      accept(); accept({ ...receipt, submission_id: 'invalid' });
      for (const type of ['rangel:lead-started', 'rangel:lead-rejected', 'rangel:lead-unknown']) window.dispatchEvent(new CustomEvent(type, { detail: receipt }));
    });
    expect(events('conversion')).toHaveLength(0);
    act(() => accept({ ...receipt, submission_id: '0b75ba63-7b5d-4aa7-8e25-a4b9b3b3ef42' }));
    expect(events('conversion')).toHaveLength(1);
  });

  it('withdraws Ads consent, clears storage and suppresses receipts without restarting GTM', () => {
    localStorage.setItem(ADS_CONSENT_KEY, 'accepted'); localStorage.setItem(CONSENT_KEY, 'accepted');
    render(<GoogleAnalytics />); document.cookie = '_gcl_aw=test; path=/';
    act(() => setAdsConsent('declined'));
    act(() => accept());
    expect(events('conversion')).toHaveLength(0);
    expect(events('generate_lead')).toHaveLength(1);
    expect(sessionStorage.getItem(AD_ATTRIBUTION_KEY)).toBeNull();
    expect(document.cookie).not.toMatch(/_gcl_aw=/);
    expect(commands().filter(command => command[0] === 'consent' && command[1] === 'update').at(-1)?.[2]).toEqual({ analytics_storage: 'granted', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied' });
    act(() => { setAdsConsent('accepted'); accept(); });
    expect(events('conversion')).toHaveLength(0);
    expect(starts()).toHaveLength(1);
  });

  it('applies cross-tab revocation and can later enable GA without a second AW configuration', () => {
    localStorage.setItem(ADS_CONSENT_KEY, 'accepted'); render(<GoogleAnalytics />);
    localStorage.setItem(ADS_CONSENT_KEY, 'declined');
    act(() => window.dispatchEvent(new StorageEvent('storage', { key: ADS_CONSENT_KEY, newValue: 'declined' })));
    act(() => { accept(); setAnalyticsConsent('accepted'); });
    expect(events('conversion')).toHaveLength(0);
    expect(sessionStorage.getItem(AD_ATTRIBUTION_KEY)).toBeNull();
    expect(commands().filter(command => command[0] === 'config').map(command => command[1])).toEqual(['G-TEST1234']);
    expect(document.querySelectorAll('#rangel-ga-script')).toHaveLength(1);
    expect(starts()).toHaveLength(1);
  });

  it('can re-enable advertising after analytics without restarting GA or configuring AW directly', () => {
    localStorage.setItem(CONSENT_KEY, 'accepted');
    localStorage.setItem(ADS_CONSENT_KEY, 'declined');
    render(<GoogleAnalytics />);
    expect(document.getElementById('rangel-gtm-script')).toBeNull();
    act(() => setAdsConsent('accepted'));
    expect(commands().filter(command => command[0] === 'config').map(command => command[1])).toEqual(['G-TEST1234']);
    expect(events('page_view')).toHaveLength(1);
    expect(document.querySelectorAll('#rangel-ga-script')).toHaveLength(1);
    expect(starts()).toHaveLength(1);
    act(() => accept());
    expect(events('conversion')).toHaveLength(1);
    expect(events('generate_lead')).toHaveLength(1);
  });

  it('does not reload the container or recount an Ads receipt after a real component remount', () => {
    localStorage.setItem(ADS_CONSENT_KEY, 'accepted');
    const { unmount } = render(<GoogleAnalytics />);
    act(() => accept());
    unmount();
    render(<GoogleAnalytics />);
    act(() => accept());
    expect(document.querySelectorAll('#rangel-gtm-script')).toHaveLength(1);
    expect(document.getElementById('rangel-ga-script')).toBeNull();
    expect(starts()).toHaveLength(1);
    expect(events('conversion')).toHaveLength(1);
    expect(commands().filter(command => command[0] === 'config')).toHaveLength(0);
  });
});
