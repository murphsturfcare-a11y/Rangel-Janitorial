import { afterEach, describe, expect, it, vi } from 'vitest';
import { classifyLeadSource, normalizeCampaignLabels, normalizeLeadOrigin } from '@/lib/lead-source';

afterEach(() => vi.useRealTimers());

describe('lead channel attribution', () => {
  it.each(['gclid', 'gbraid', 'wbraid'])('recognizes a current, consented %s without exposing its value in the evidence', key => {
    const value = 'Google_click_test_1234';
    const result = classifyLeadSource({ source: 'bing', medium: 'organic' }, {
      consent: 'granted', capturedAt: new Date().toISOString(), clickIds: { [key]: value },
    });
    expect(result).toMatchObject({ channel: 'google-ads', label: 'Google Ads' });
    expect(result.evidence).toContain(key);
    expect(result.evidence).not.toContain(value);
  });

  it.each(['cpc', 'ppc', 'paidsearch', 'paid_search', 'paid-search', 'CPC'])('recognizes google with explicit paid-search medium %s', medium => {
    expect(classifyLeadSource({ source: 'Google', medium }, null).channel).toBe('google-ads');
  });

  it.each([
    { source: 'bing', medium: 'cpc' },
    { source: 'facebook', medium: 'paid_social' },
    { source: 'instagram', medium: 'paid-social' },
    { source: 'google', medium: 'display' },
    { medium: 'ppc' },
  ])('does not label another paid campaign as organic or Google Ads: %j', campaign => {
    expect(classifyLeadSource(campaign, null)).toMatchObject({ channel: 'paid-campaign', label: 'Paid campaign' });
  });

  it.each(['google', 'bing', 'duckduckgo', 'yahoo', 'ecosia', 'brave'])('recognizes %s organic search only with explicit organic evidence', source => {
    expect(classifyLeadSource({ source, medium: 'organic' }, null)).toMatchObject({ channel: 'organic-search', label: 'Organic Search' });
    expect(classifyLeadSource({ source }, null).channel).toBe('website');
  });

  it.each([
    null, {}, { source: 'Google Search' }, { source: 'google' },
    { campaign: 'Google cleaning ads' }, { source: 'facebook', medium: 'referral' },
    { source: 'person@example.test', medium: 'organic' },
    { source: 'google', medium: 'organic\npaid' },
  ])('uses an honest organic/direct fallback when channel evidence is insufficient: %j', campaign => {
    expect(classifyLeadSource(campaign, null)).toMatchObject({ channel: 'website', label: 'Website (organic/direct)' });
  });

  it('ignores denied, malformed and expired click identifiers as classification evidence', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-10-21T12:00:00Z'));
    const click = { consent: 'granted', capturedAt: new Date().toISOString(), clickIds: { gclid: 'Google_click_test_1234' } };
    for (const invalid of [
      { ...click, consent: 'denied' },
      { ...click, capturedAt: '2026-08-01T00:00:00Z' },
      { ...click, capturedAt: 'invalid' },
      { ...click, clickIds: { gclid: 'customer@example.test' } },
      { ...click, clickIds: { gclid: 'short' } },
    ]) expect(classifyLeadSource({}, invalid).channel).toBe('website');
  });

  it('keeps only bounded campaign labels, never arbitrary query terms or personal details', () => {
    expect(normalizeCampaignLabels({ source: 'google', medium: 'cpc', campaign: 'regional-cleaning', term: 'private search' }))
      .toEqual({ source: 'google', medium: 'cpc', campaign: 'regional-cleaning' });
    expect(normalizeCampaignLabels({ source: 'https://example.test', medium: 'person@example.test', campaign: 'Call 951-555-1234' })).toEqual({});
  });

  it.each([
    { channel: 'google-ads', basis: 'current-google-click-marker' },
    { channel: 'google-ads', basis: 'current-google-paid-utm' },
    { channel: 'paid-campaign', basis: 'current-paid-utm' },
    { channel: 'organic-search', basis: 'current-organic-utm' },
  ])('accepts the bounded current-visit label %j without calling it verified attribution', origin => {
    expect(normalizeLeadOrigin(origin)).toEqual(origin);
    const result = classifyLeadSource({}, null, origin);
    expect(result.channel).toBe(origin.channel);
    expect(result.evidence).toContain('reported by website');
    expect(result.evidence).toContain('advertising attribution not verified');
  });

  it.each([
    'google-ads', [], true, { channel: 'google-ads' },
    { channel: 'google-ads', basis: 'current-organic-utm' },
    { channel: 'organic-search', basis: 'current-google-click-marker' },
    { channel: 'website', basis: 'current-paid-utm' },
    { channel: 'google-ads', basis: 'customer@example.test' },
    { channel: 'google-ads', basis: 'current-google-click-marker', gclid: 'Google_click_test_1234' },
  ])('rejects invalid, mismatched or expanded current-visit labels: %j', origin => {
    expect(normalizeLeadOrigin(origin)).toBeNull();
    expect(classifyLeadSource({}, null, origin).channel).toBe('website');
  });

  it('retains stronger normalized campaign evidence before a current-visit fallback', () => {
    expect(classifyLeadSource({ source: 'bing', medium: 'ppc' }, null,
      { channel: 'google-ads', basis: 'current-google-click-marker' }).channel).toBe('paid-campaign');
    expect(classifyLeadSource({ source: 'google', medium: 'organic' }, null,
      { channel: 'paid-campaign', basis: 'current-paid-utm' }).channel).toBe('organic-search');
  });
});
