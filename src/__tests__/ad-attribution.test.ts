vi.hoisted(() => { process.env.NEXT_PUBLIC_GOOGLE_ADS_ID = 'AW-123456789'; process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL = 'test_label'; });
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { adAttributionMaxAgeMs, normalizeAdAttribution, validAdClickId } from '@/lib/ad-clicks';
import { AD_ATTRIBUTION_KEY, captureAdAttribution, getAdAttribution } from '@/lib/analytics/ad-attribution';
import { ADS_CONSENT_KEY, CONSENT_KEY, setAdsConsent } from '@/lib/analytics/gtag';
import { getStoredUTMParams, storeUTMParams } from '@/lib/analytics/utm';
import { adsPageLocation } from '@/lib/analytics/ads';

const click = 'EAIaIQobChMI_test-click-12345678901234567890';
beforeEach(() => {
  localStorage.clear(); sessionStorage.clear(); delete window.rangelAdsConsent;
  Reflect.deleteProperty(window.navigator, 'globalPrivacyControl');
  window.history.replaceState({}, '', '/quote/murrieta?gclid=' + click + '&email=private@example.test');
});
afterEach(() => {
  vi.restoreAllMocks(); vi.useRealTimers(); delete window.rangelAdsConsent;
  Reflect.deleteProperty(window.navigator, 'globalPrivacyControl');
  window.history.replaceState({}, '', '/');
});

describe('consented, bounded first-party ad attribution', () => {
  it('default Ads page context uses only validated current IDs without reading or writing first-party attribution', () => {
    sessionStorage.setItem(AD_ATTRIBUTION_KEY, JSON.stringify({ consent: 'granted', capturedAt: new Date().toISOString(), clickIds: { wbraid: 'ClQK_previous123' } }));
    window.history.replaceState({}, '', '/quote/murrieta?gclid=' + click + '&gbraid=person%40example.test&email=private@example.test');
    const stored = sessionStorage.getItem(AD_ATTRIBUTION_KEY);
    expect(adsPageLocation()).toBe(window.location.origin + '/quote/murrieta?gclid=' + click);
    expect(sessionStorage.getItem(AD_ATTRIBUTION_KEY)).toBe(stored);
    window.history.replaceState({}, '', '/quote/murrieta');
    expect(adsPageLocation()).toBe(window.location.origin + '/quote/murrieta');
    expect(localStorage.getItem(ADS_CONSENT_KEY)).toBeNull();
  });

  it('GPC overrides an old grant for first-party click IDs, campaign storage, and Ads URL context', () => {
    localStorage.setItem(ADS_CONSENT_KEY, 'accepted');
    captureAdAttribution();
    Object.defineProperty(window.navigator, 'globalPrivacyControl', { configurable: true, value: true });
    expect(captureAdAttribution()).toBeNull();
    expect(getAdAttribution()).toBeNull();
    storeUTMParams({ source: 'google', medium: 'cpc', campaign: 'commercial', term: '', content: '' });
    expect(getStoredUTMParams()).toBeNull();
    expect(adsPageLocation()).toBe(window.location.origin + '/quote/murrieta');
    expect(sessionStorage.getItem(AD_ATTRIBUTION_KEY)).toBeNull();
  });

  it.each([null, 'declined'])('does not capture or forward identifiers or store UTM labels with ads consent %s', choice => {
    localStorage.setItem(CONSENT_KEY, 'accepted');
    if (choice) localStorage.setItem(ADS_CONSENT_KEY, choice);
    sessionStorage.setItem(AD_ATTRIBUTION_KEY, JSON.stringify({ consent: 'granted', capturedAt: new Date().toISOString(), clickIds: { gclid: click } }));
    expect(getAdAttribution()).toBeNull();
    expect(captureAdAttribution()).toBeNull();
    expect(sessionStorage.getItem(AD_ATTRIBUTION_KEY)).toBeNull();
    storeUTMParams({ source: 'google', medium: 'cpc', campaign: 'commercial', term: '', content: '' });
    expect(getStoredUTMParams()).toBeNull();
    expect(sessionStorage.getItem('rangel_janitorial_utm')).toBeNull();
  });

  it('captures all three identifiers separately and keeps only them and a capture timestamp', () => {
    localStorage.setItem(ADS_CONSENT_KEY, 'accepted');
    window.history.replaceState({}, '', '/quote/murrieta?gclid=' + click + '&gbraid=0AAAA_test_braid123&wbraid=ClQK_test_braid456&email=private@example.test#private');
    const result = captureAdAttribution();
    expect(result).toEqual({ consent: 'granted', capturedAt: expect.any(String), clickIds: { gclid: click, gbraid: '0AAAA_test_braid123', wbraid: 'ClQK_test_braid456' } });
    expect(sessionStorage.getItem(AD_ATTRIBUTION_KEY)).not.toMatch(/email|private|quote/);
    window.history.replaceState({}, '', '/locations/murrieta');
    expect(captureAdAttribution()).toEqual(result);
  });

  it('replaces the prior click without mixing identifiers from different arrivals', () => {
    localStorage.setItem(ADS_CONSENT_KEY, 'accepted');
    captureAdAttribution();
    window.history.replaceState({}, '', '/quote/murrieta?wbraid=ClQK_new-click123');
    expect(captureAdAttribution()?.clickIds).toEqual({ wbraid: 'ClQK_new-click123' });
  });

  it('does not extend the capture timestamp when reading the same click again', () => {
    vi.useFakeTimers();
    localStorage.setItem(ADS_CONSENT_KEY, 'accepted');
    const initial = captureAdAttribution();
    vi.advanceTimersByTime(60_000);
    expect(captureAdAttribution()).toEqual(initial);
  });

  it.each(['a'.repeat(513), 'person@example.test', 'https://example.test', 'line\nbreak', 'short', ['valid_click123']])('rejects malformed identifiers %j', value => {
    expect(validAdClickId(value)).toBe(false);
  });

  it('rejects future, expired, denied and malformed records', () => {
    const base = { consent: 'granted', capturedAt: new Date().toISOString(), clickIds: { gclid: click } };
    expect(normalizeAdAttribution({ ...base, consent: 'denied' })).toBeNull();
    expect(normalizeAdAttribution({ ...base, capturedAt: 'bad-date' })).toBeNull();
    expect(normalizeAdAttribution({ ...base, capturedAt: new Date(Date.now() + 120_000).toISOString() })).toBeNull();
    expect(normalizeAdAttribution({ ...base, capturedAt: new Date(Date.now() - adAttributionMaxAgeMs - 1).toISOString() })).toBeNull();
    localStorage.setItem(ADS_CONSENT_KEY, 'accepted');
    sessionStorage.setItem(AD_ATTRIBUTION_KEY, '{bad-json');
    expect(getAdAttribution()).toBeNull();
  });

  it('revocation prevents forwarding even if storage writes fail', () => {
    localStorage.setItem(ADS_CONSENT_KEY, 'accepted'); captureAdAttribution();
    vi.mocked(localStorage.setItem).mockImplementationOnce(() => { throw new Error('Blocked'); });
    setAdsConsent('declined');
    expect(getAdAttribution()).toBeNull();
  });

  it('a blocked browser store does not prevent a consenting visitor from submitting', () => {
    localStorage.setItem(ADS_CONSENT_KEY, 'accepted');
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => { throw new Error('Blocked'); });
    expect(captureAdAttribution()?.clickIds).toEqual({ gclid: click });
  });
});
