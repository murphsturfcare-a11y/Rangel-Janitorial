import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

vi.hoisted(() => { process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID = 'G-TEST1234'; });
import {
  GA_DISABLE_KEY, CONSENT_KEY, getAnalyticsConsent, hasAnalyticsConsent, setAnalyticsConsent,
  analyticsPath, pageview, event, trackPhoneCall, trackScrollDepth,
} from '@/lib/analytics/gtag';

beforeEach(() => {
  localStorage.clear();
  delete window.rangelAnalyticsConsent;
  delete window[GA_DISABLE_KEY];
  window.gtag = vi.fn();
});
afterEach(() => {
  vi.restoreAllMocks();
  vi.unstubAllEnvs();
  delete window.rangelAnalyticsConsent;
});

describe('analytics consent and privacy boundary', () => {
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
    event('generate_lead', {
      region: 'murrieta', form_placement: 'bottom', email: 'person@example.test',
      phone: '9515550100', message: 'private', page_location: 'https://example.test/private?name=Jamie',
      value: 1, currency: 'EUR',
    });
    expect(window.gtag).toHaveBeenCalledExactlyOnceWith('event', 'generate_lead', { region: 'murrieta', form_placement: 'bottom' });
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
    expect(window.gtag).toHaveBeenCalledExactlyOnceWith('event', 'phone_click', { region: 'murrieta' });
  });

  it('limits scroll events to meaningful numeric milestones', () => {
    localStorage.setItem(CONSENT_KEY, 'accepted');
    trackScrollDepth(Number.NaN);
    trackScrollDepth(200);
    trackScrollDepth(75);
    expect(window.gtag).toHaveBeenCalledExactlyOnceWith('event', 'scroll_depth', { depth_percentage: 75 });
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
