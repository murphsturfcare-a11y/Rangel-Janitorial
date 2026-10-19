import { act, cleanup, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
vi.hoisted(() => {
  delete process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  process.env.NEXT_PUBLIC_GOOGLE_ADS_ID = 'AW-123456789';
  process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL = 'test_label';
});
vi.mock('next/navigation', () => ({ usePathname: () => '/quote/murrieta' }));
import { GoogleAnalytics } from '@/components/analytics/GoogleAnalytics';
import { CookieConsent } from '@/components/analytics/CookieConsent';
import { ADS_CONSENT_KEY } from '@/lib/analytics/gtag';

beforeEach(() => {
  localStorage.clear(); sessionStorage.clear(); window.dataLayer = [];
  delete window.rangelAdsConsent; delete window.rangelAnalyticsConsent; delete window.rangelAdsReceipts;
  Reflect.deleteProperty(window, 'gtag');
});
afterEach(() => { cleanup(); document.getElementById('rangel-ga-script')?.remove(); });
describe('Ads configured without GA4', () => {
  it('offers the advertising choice while omitting unconfigured analytics', () => {
    render(<CookieConsent />);
    expect(screen.getByRole('checkbox', { name: /Advertising measurement/ })).not.toBeChecked();
    expect(screen.queryByRole('checkbox', { name: /Website analytics/ })).toBeNull();
  });
  it('loads and sends an accepted conversion only after advertising consent', () => {
    localStorage.setItem(ADS_CONSENT_KEY, 'accepted');
    render(<GoogleAnalytics />);
    act(() => window.dispatchEvent(new CustomEvent('rangel:lead-accepted', { detail: {
      region: 'murrieta', form_placement: 'hero', submission_id: '8b75ba63-7b5d-4aa7-8e25-a4b9b3b3ef42',
    } })));
    const commands = window.dataLayer.map(command => Array.from(command as ArrayLike<unknown>));
    expect(commands.filter(command => command[0] === 'config').map(command => command[1])).toEqual(['AW-123456789']);
    expect(commands.filter(command => command[0] === 'event').map(command => command[1])).toEqual(['conversion']);
  });
});
