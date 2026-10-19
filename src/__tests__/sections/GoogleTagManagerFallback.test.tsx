import { cleanup, render } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
vi.hoisted(() => {
  delete process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  process.env.NEXT_PUBLIC_GOOGLE_ADS_ID = 'AW-123456789';
  process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL = 'test_label';
  process.env.NEXT_PUBLIC_GTM_ID = 'GTM-MB764DLF';
});
vi.mock('next/navigation', () => ({ usePathname: () => '/quote/murrieta' }));
import { GoogleAnalytics } from '@/components/analytics/GoogleAnalytics';
import { ADS_CONSENT_KEY } from '@/lib/analytics/gtag';

beforeEach(() => {
  localStorage.clear(); sessionStorage.clear(); window.dataLayer = [];
  delete window.rangelAdsConsent; delete window.rangelAnalyticsConsent;
  Reflect.deleteProperty(window, 'gtag');
});
afterEach(() => {
  cleanup(); document.getElementById('rangel-ga-script')?.remove(); document.getElementById('rangel-gtm-script')?.remove();
});

describe('GTM destination mismatch', () => {
  it('keeps the existing consented direct Ads path without executing a different account container', () => {
    localStorage.setItem(ADS_CONSENT_KEY, 'accepted');
    render(<GoogleAnalytics />);
    expect(document.getElementById('rangel-gtm-script')).toBeNull();
    expect(document.getElementById('rangel-ga-script')).toHaveAttribute('src', 'https://www.googletagmanager.com/gtag/js?id=AW-123456789');
    const commands = window.dataLayer.map(item => Array.from(item as ArrayLike<unknown>));
    expect(commands.filter(command => command[0] === 'config').map(command => command[1])).toEqual(['AW-123456789']);
    expect(window.dataLayer.some(item => item && typeof item === 'object' && 'event' in item && item.event === 'gtm.js')).toBe(false);
  });
});
