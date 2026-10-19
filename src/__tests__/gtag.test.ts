import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

vi.hoisted(() => { process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID = 'G-TEST1234'; });
import {
  GA_DISABLE_KEY, CONSENT_KEY, getAnalyticsConsent, hasAnalyticsConsent, setAnalyticsConsent,
  analyticsPath, pageview, event, trackPhoneCall, trackScrollDepth,
  ADS_CONSENT_KEY, getAdsConsent, hasAdsConsent, hasGlobalPrivacyControl, isAdsMeasurementAllowed,
} from '@/lib/analytics/gtag';

beforeEach(() => {
  window.history.replaceState({}, '', '/');
  localStorage.clear();
  delete window.rangelAnalyticsConsent;
  delete window.rangelAdsConsent;
  Reflect.deleteProperty(window.navigator, 'globalPrivacyControl');
  delete window[GA_DISABLE_KEY];
  window.gtag = vi.fn();
});
afterEach(() => {
  window.history.replaceState({}, '', '/');
  vi.restoreAllMocks();
  vi.unstubAllEnvs();
  delete window.rangelAnalyticsConsent;
  delete window.rangelAdsConsent;
  Reflect.deleteProperty(window.navigator, 'globalPrivacyControl');
});

describe('analytics consent and privacy boundary', () => {
  it('distinguishes default measurement eligibility from an explicit consent grant', () => {
    expect(isAdsMeasurementAllowed()).toBe(true);
    expect(getAdsConsent()).toBeNull();
    expect(hasAdsConsent()).toBe(false);
    expect(localStorage.getItem(ADS_CONSENT_KEY)).toBeNull();
    localStorage.setItem(ADS_CONSENT_KEY, 'declined');
    expect(isAdsMeasurementAllowed()).toBe(false);
    localStorage.setItem(ADS_CONSENT_KEY, 'accepted');
    expect(isAdsMeasurementAllowed()).toBe(true);
    expect(hasAdsConsent()).toBe(true);
  });

  it('GPC overrides a saved or in-memory explicit advertising acceptance', () => {
    localStorage.setItem(ADS_CONSENT_KEY, 'accepted');
    window.rangelAdsConsent = 'accepted';
    Object.defineProperty(window.navigator, 'globalPrivacyControl', { configurable: true, value: true });
    expect(hasGlobalPrivacyControl()).toBe(true);
    expect(isAdsMeasurementAllowed()).toBe(false);
    expect(hasAdsConsent()).toBe(false);
    expect(getAdsConsent()).toBe('accepted');
  });

  it('does not deliver events before explicit consent or after declining', () => {
    pageview('/locations');
    event('generate_lead', { region: 'murrieta', form_placement: 'hero' });
    localStorage.setItem(CONSENT_KEY, 'declined');
    pageview('/');
    expect(window.gtag).not.toHaveBeenCalled();
  });

  it('restores accepted consent but respects the Google collection disable flag', () => {
    localStorage.setItem(CONSENT_KEY, 'accepted');
    expect(hasAnalyticsConsent()).toBe(true);
    window[GA_DISABLE_KEY] = true;
    expect(pageview('/')).toBe(false);
    expect(window.gtag).not.toHaveBeenCalled();
  });

  it('keeps revocation effective even when persistent storage fails', () => {
    localStorage.setItem(CONSENT_KEY, 'accepted');
    vi.mocked(localStorage.setItem).mockImplementationOnce(() => { throw new Error('Storage blocked'); });
    setAnalyticsConsent('declined');
    expect(getAnalyticsConsent()).toBe('declined');
    expect(event('phone_click', { region: 'murrieta' })).toBe(false);
    expect(window.gtag).not.toHaveBeenCalled();
  });

  it('omits arbitrary event fields, full URLs, contact data, and monetary defaults', () => {
    localStorage.setItem(CONSENT_KEY, 'accepted');
    window.history.replaceState({}, '', '/quote/sacramento?gclid=ValidClickId123&email=person@example.test#private');
    vi.spyOn(document, 'referrer', 'get').mockReturnValue('https://example.test/private?email=person@example.test');
    event('generate_lead', {
      region: 'murrieta', form_placement: 'bottom', email: 'person@example.test',
      phone: '9515550100', message: 'private', page_location: 'https://example.test/private?name=Jamie',
      value: 1, currency: 'EUR',
    });
    expect(window.gtag).toHaveBeenCalledExactlyOnceWith('event', 'generate_lead', {
      region: 'murrieta', form_placement: 'bottom', send_to: 'G-TEST1234',
      page_location: window.location.origin + '/quote/sacramento', page_referrer: 'https://example.test',
    });
    expect(JSON.stringify(vi.mocked(window.gtag).mock.calls)).not.toMatch(/ValidClickId123|gclid|person@|9515550100|private|Jamie/);
  });

  it('reduces an unrecognized current path and non-web referrer on non-pageview events', () => {
    localStorage.setItem(CONSENT_KEY, 'accepted');
    window.history.replaceState({}, '', '/person@example.test?gclid=ValidClickId123');
    vi.spyOn(document, 'referrer', 'get').mockReturnValue('data:text/plain,person@example.test');
    trackScrollDepth(50);
    expect(window.gtag).toHaveBeenCalledExactlyOnceWith('event', 'scroll_depth', {
      depth_percentage: 50, send_to: 'G-TEST1234',
      page_location: window.location.origin + '/404', page_referrer: '',
    });
  });

  it('does not accept unknown actions, regions, or arbitrary conversion locations', () => {
    localStorage.setItem(CONSENT_KEY, 'accepted');
    event('person@example.test', {});
    event('generate_lead', { region: 'unknown', form_placement: 'hero' });
    event('generate_lead', { region: 'murrieta', form_placement: 'personal information' });
    expect(window.gtag).not.toHaveBeenCalled();
  });

  it('uses one manual page_view, stripping query/hash and reducing referrer to origin', () => {
    localStorage.setItem(CONSENT_KEY, 'accepted');
    vi.spyOn(document, 'referrer', 'get').mockReturnValue('https://example.test/private?email=person@example.test');
    pageview('/locations/murrieta?email=person@example.test#private');
    expect(window.gtag).toHaveBeenCalledExactlyOnceWith('event', 'page_view', {
      page_path: '/locations/murrieta',
      page_location: window.location.origin + '/locations/murrieta',
      page_referrer: 'https://example.test',
      send_to: 'G-TEST1234',
    });
  });

  it('reports unknown or arbitrary paths only as 404', () => {
    expect(analyticsPath('/person@example.test')).toBe('/404');
    expect(analyticsPath('https://evil.example/private')).toBe('/404');
    expect(analyticsPath('/blog/page/2?private=yes')).toBe('/blog/page/2');
  });

  it('maps only public regional phone links to regions without sending a phone number', () => {
    localStorage.setItem(CONSENT_KEY, 'accepted');
    trackPhoneCall('(951) 555-0100');
    expect(window.gtag).not.toHaveBeenCalled();
    trackPhoneCall('tel:+19518944222');
    expect(window.gtag).toHaveBeenCalledExactlyOnceWith('event', 'phone_click', { region: 'murrieta', send_to: 'G-TEST1234', page_location: window.location.origin + '/', page_referrer: '' });
  });

  it('limits scroll events to meaningful numeric milestones', () => {
    localStorage.setItem(CONSENT_KEY, 'accepted');
    trackScrollDepth(Number.NaN);
    trackScrollDepth(200);
    trackScrollDepth(75);
    expect(window.gtag).toHaveBeenCalledExactlyOnceWith('event', 'scroll_depth', { depth_percentage: 75, send_to: 'G-TEST1234', page_location: window.location.origin + '/', page_referrer: '' });
  });

  it('returns safely when storage cannot be read or gtag is absent', () => {
    vi.mocked(localStorage.getItem).mockImplementationOnce(() => { throw new Error('Storage blocked'); });
    expect(getAnalyticsConsent()).toBeNull();
    Reflect.deleteProperty(window, 'gtag');
    expect(() => pageview('/')).not.toThrow();
  });

  it.each(['', 'GTM-INVALID', 'G-X";alert(1)//', 'not-a-measurement-id'])('does not activate a missing or malformed measurement ID: %s', async id => {
    vi.stubEnv('NEXT_PUBLIC_GA_MEASUREMENT_ID', id);
    vi.resetModules();
    const analyticsModule = await import('@/lib/analytics/gtag');
    expect(analyticsModule.GA_MEASUREMENT_ID).toBe('');
  });
});
