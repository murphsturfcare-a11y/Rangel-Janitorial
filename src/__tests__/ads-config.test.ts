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
