import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { captureLeadOrigin } from '@/lib/analytics/lead-origin';
import { ADS_CONSENT_KEY, getAdsConsent } from '@/lib/analytics/gtag';

const click = 'Google_click_test_1234567890';

function visit(query: string, path = '/quote/walnut-creek') {
  window.history.replaceState({}, '', path + query);
}

beforeEach(() => {
  localStorage.clear(); sessionStorage.clear(); delete window.rangelAdsConsent;
  Reflect.deleteProperty(window.navigator, 'globalPrivacyControl');
  visit('');
});
afterEach(() => {
  vi.restoreAllMocks(); vi.unstubAllGlobals(); delete window.rangelAdsConsent;
  Reflect.deleteProperty(window.navigator, 'globalPrivacyControl');
  visit('');
});

describe('non-identifying current-request lead origin', () => {
  it.each(['gclid', 'gbraid', 'wbraid'])('reports a valid current %s only as a fixed channel marker', key => {
    visit(`?${key}=${click}&utm_campaign=private-campaign&email=person%40example.test`);
    const origin = captureLeadOrigin();
    expect(origin).toEqual({ channel: 'google-ads', basis: 'current-google-click-marker' });
    expect(JSON.stringify(origin)).not.toMatch(/1234567890|private-campaign|person|example|walnut-creek/);
    expect(getAdsConsent()).toBeNull();
  });

  it.each(['cpc', 'ppc', 'paidsearch', 'paid_search', 'paid-search', 'CPC'])('recognizes explicit current Google paid-search medium %s', medium => {
    visit(`?utm_source=Google&utm_medium=${medium}`);
    expect(captureLeadOrigin()).toEqual({ channel: 'google-ads', basis: 'current-google-paid-utm' });
  });

  it.each([
    '?utm_source=bing&utm_medium=cpc', '?utm_source=facebook&utm_medium=paid_social',
    '?utm_source=instagram&utm_medium=paid-social', '?utm_source=google&utm_medium=display',
    '?utm_medium=ppc', '?utm_medium=paid', '?utm_medium=cpm',
  ])('keeps other explicitly paid arrivals separate from organic: %s', query => {
    visit(query);
    expect(captureLeadOrigin()).toEqual({ channel: 'paid-campaign', basis: 'current-paid-utm' });
  });

  it.each(['google', 'bing', 'duckduckgo', 'yahoo', 'ecosia', 'brave'])('requires current %s organic source and medium together', source => {
    visit(`?utm_source=${source}&utm_medium=organic`);
    expect(captureLeadOrigin()).toEqual({ channel: 'organic-search', basis: 'current-organic-utm' });
    visit(`?utm_source=${source}`);
    expect(captureLeadOrigin()).toBeNull();
  });

  it.each([
    '', '?referralSource=Google+Search', '?utm_source=Google+Search',
    '?utm_source=facebook&utm_medium=referral', '?utm_campaign=Google+cleaning+ads',
    '?gclid=short', '?gclid=person%40example.test', '?gclid=https%3A%2F%2Fexample.test',
    '?utm_source=google&utm_medium=cpc%0A', '?utm_source=google&utm_medium=cpc%00',
    '?utm_source=google&utm_medium=person%40example.test',
    '?utm_source=google&utm_medium=' + 'cpc'.repeat(100),
    '?utm_source=google&utm_medium=paid%20search',
  ])('does not infer paid source from a route, referral answer or malformed query: %s', query => {
    visit(query);
    expect(captureLeadOrigin()).toBeNull();
  });

  it('does not accept a misleading source token as Google Ads or organic search', () => {
    visit('?utm_source=google%0A&utm_medium=cpc');
    expect(captureLeadOrigin()).toEqual({ channel: 'paid-campaign', basis: 'current-paid-utm' });
    visit('?utm_source=google%0A&utm_medium=organic');
    expect(captureLeadOrigin()).toBeNull();
  });

  it('gives a validated Google click marker precedence over conflicting current organic labels', () => {
    visit(`?wbraid=${click}&utm_source=bing&utm_medium=organic`);
    expect(captureLeadOrigin()).toEqual({ channel: 'google-ads', basis: 'current-google-click-marker' });
  });

  it.each(['stored', 'in-memory', 'gpc'])('respects %s measurement opt-out without changing its state', mode => {
    visit(`?gclid=${click}&utm_source=google&utm_medium=cpc`);
    if (mode === 'stored') localStorage.setItem(ADS_CONSENT_KEY, 'declined');
    if (mode === 'in-memory') window.rangelAdsConsent = 'declined';
    if (mode === 'gpc') {
      window.rangelAdsConsent = 'accepted';
      Object.defineProperty(window.navigator, 'globalPrivacyControl', { configurable: true, value: true });
    }
    const choice = getAdsConsent();
    expect(captureLeadOrigin()).toBeNull();
    expect(getAdsConsent()).toBe(choice);
  });

  it('does not retain a previous arrival or consult existing campaign/identifier storage', () => {
    sessionStorage.setItem('rangel_janitorial_utm', JSON.stringify({ source: 'google', medium: 'cpc' }));
    sessionStorage.setItem('rangel_janitorial_ad_click', JSON.stringify({ clickIds: { gclid: click } }));
    visit(`?gclid=${click}`, '/locations/sacramento');
    expect(captureLeadOrigin()?.channel).toBe('google-ads');
    visit('', '/locations/sacramento');
    const getSession = vi.spyOn(Storage.prototype, 'getItem');
    const setSession = vi.spyOn(Storage.prototype, 'setItem');
    const removeSession = vi.spyOn(Storage.prototype, 'removeItem');
    const setLocal = vi.mocked(localStorage.setItem); setLocal.mockClear();
    const removeLocal = vi.mocked(localStorage.removeItem); removeLocal.mockClear();
    const setCookie = vi.spyOn(document, 'cookie', 'set');
    expect(captureLeadOrigin()).toBeNull();
    expect(getSession).not.toHaveBeenCalled();
    expect(setSession).not.toHaveBeenCalled();
    expect(removeSession).not.toHaveBeenCalled();
    expect(setLocal).not.toHaveBeenCalled();
    expect(removeLocal).not.toHaveBeenCalled();
    expect(setCookie).not.toHaveBeenCalled();
    expect(window.rangelAdsConsent).toBeUndefined();
  });

  it('still creates a current marker when session storage is unavailable', () => {
    visit(`?gclid=${click}`);
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => { throw new Error('Blocked'); });
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => { throw new Error('Blocked'); });
    expect(captureLeadOrigin()).toEqual({ channel: 'google-ads', basis: 'current-google-click-marker' });
    expect(getAdsConsent()).toBeNull();
  });

  it('is safe outside the browser', () => {
    vi.stubGlobal('window', undefined);
    expect(captureLeadOrigin()).toBeNull();
  });
});
