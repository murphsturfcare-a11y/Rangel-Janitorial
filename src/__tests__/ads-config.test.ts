import { afterEach, describe, expect, it, vi } from 'vitest';
afterEach(() => { vi.unstubAllEnvs(); vi.resetModules(); });

describe('optional Google Ads configuration', () => {
  it.each([
    ['', ''], ['AW-123456789', ''], ['', 'test_label'], ['G-TEST1234', 'test_label'],
    ['AW-123456789', '<script>'], ['AW-123456789', 'x'.repeat(101)], ['AW-123456789;alert(1)', 'test_label'],
  ])('disables an absent or malformed destination %s / %s', async (id, label) => {
    vi.stubEnv('NEXT_PUBLIC_GOOGLE_ADS_ID', id);
    vi.stubEnv('NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL', label);
    vi.resetModules();
    const config = await import('@/lib/analytics/ads-config');
    expect(config.GOOGLE_ADS_CONFIGURED).toBe(false);
  });
  it('accepts only the explicitly configured destination', async () => {
    vi.stubEnv('NEXT_PUBLIC_GOOGLE_ADS_ID', 'AW-123456789');
    vi.stubEnv('NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL', 'test_label-Ab12');
    vi.resetModules();
    const config = await import('@/lib/analytics/ads-config');
    expect(config.GOOGLE_ADS_CONFIGURED).toBe(true);
    expect(config.GOOGLE_ADS_ID).toBe('AW-123456789');
    expect(config.GOOGLE_ADS_CONVERSION_LABEL).toBe('test_label-Ab12');
  });
});

describe('verified GTM Ads base configuration', () => {
  it.each([
    ['', 'AW-11465582021', 'test_label'],
    ['GTM-UNREVIEWED', 'AW-11465582021', 'test_label'],
    ["GTM-MB764DLF';alert(1)", 'AW-11465582021', 'test_label'],
    ['GTM-MB764DLF', 'AW-123456789', 'test_label'],
    ['GTM-MB764DLF', '', 'test_label'],
    ['GTM-MB764DLF', 'AW-11465582021', ''],
  ])('does not load an absent, unreviewed, or mismatched container %s / %s / %s', async (container, id, label) => {
    vi.stubEnv('NEXT_PUBLIC_GTM_ID', container);
    vi.stubEnv('NEXT_PUBLIC_GOOGLE_ADS_ID', id);
    vi.stubEnv('NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL', label);
    vi.resetModules();
    const config = await import('@/lib/analytics/ads-config');
    expect(config.GOOGLE_TAG_MANAGER_ID).toBe('');
    expect(config.GTM_ADS_CONFIGURED).toBe(false);
  });

  it('enables only the reviewed container and its matching conversion destination', async () => {
    vi.stubEnv('NEXT_PUBLIC_GTM_ID', 'GTM-MB764DLF');
    vi.stubEnv('NEXT_PUBLIC_GOOGLE_ADS_ID', 'AW-11465582021');
    vi.stubEnv('NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL', 'test_label');
    vi.resetModules();
    const config = await import('@/lib/analytics/ads-config');
    expect(config.GOOGLE_TAG_MANAGER_ID).toBe('GTM-MB764DLF');
    expect(config.GTM_ADS_CONFIGURED).toBe(true);
  });
});

describe('separate regional calls-from-website configuration', () => {
  it.each(['', '<script>', 'x'.repeat(101), 'quote_label'])('ignores absent, malformed or reused quote label %s', async label => {
    vi.stubEnv('NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL', 'quote_label');
    vi.stubEnv('NEXT_PUBLIC_GOOGLE_ADS_WEBSITE_CALL_LABEL_SACRAMENTO', label);
    vi.resetModules();
    const { websiteCallLabel } = await import('@/lib/analytics/ads-config');
    expect(websiteCallLabel('sacramento')).toBe('');
  });

  it('keeps the two established regions separate and leaves other regions unconfigured', async () => {
    vi.stubEnv('NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL', 'quote_label');
    vi.stubEnv('NEXT_PUBLIC_GOOGLE_ADS_WEBSITE_CALL_LABEL_SACRAMENTO', 'sacramento_label');
    vi.stubEnv('NEXT_PUBLIC_GOOGLE_ADS_WEBSITE_CALL_LABEL_WALNUT_CREEK', 'walnut_label');
    vi.resetModules();
    const { websiteCallLabel } = await import('@/lib/analytics/ads-config');
    expect(websiteCallLabel('sacramento')).toBe('sacramento_label');
    expect(websiteCallLabel('walnut-creek')).toBe('walnut_label');
    expect(websiteCallLabel('murrieta')).toBe('');
    expect(websiteCallLabel('unknown')).toBe('');
  });
});
