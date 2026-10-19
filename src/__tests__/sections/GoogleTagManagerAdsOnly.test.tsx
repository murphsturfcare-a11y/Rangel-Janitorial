import { act, cleanup, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
vi.hoisted(() => {
  delete process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  process.env.NEXT_PUBLIC_GOOGLE_ADS_ID = 'AW-11465582021';
  process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL = 'test_label';
  process.env.NEXT_PUBLIC_GTM_ID = 'GTM-MB764DLF';
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
afterEach(() => {
  cleanup(); document.getElementById('rangel-ga-script')?.remove(); document.getElementById('rangel-gtm-script')?.remove();
});

describe('GTM Ads without a GA4 destination', () => {
  it('opens privacy settings only on request while default measurement loads with no fabricated choice', () => {
    render(<><GoogleAnalytics /><CookieConsent /></>);
    expect(screen.queryByRole('region')).toBeNull();
    expect(document.getElementById('rangel-gtm-script')).not.toBeNull();
    expect(localStorage.getItem(ADS_CONSENT_KEY)).toBeNull();
    act(() => window.dispatchEvent(new Event('rangel:privacy-settings')));
    expect(screen.queryByRole('checkbox', { name: /Advertising measurement/ })).toBeNull();
    expect(screen.getByRole('button', { name: 'Turn off ad measurement' })).toBeInTheDocument();
    expect(screen.queryByRole('checkbox', { name: /Website analytics/ })).toBeNull();
    expect(document.getElementById('rangel-ga-script')).toBeNull();
    expect(document.getElementById('rangel-gtm-script')).not.toBeNull();
    expect(localStorage.getItem(ADS_CONSENT_KEY)).toBeNull();
  });

  it('loads only GTM by default and sends the sole accepted-lead conversion explicitly', () => {
    render(<GoogleAnalytics />);
    act(() => window.dispatchEvent(new CustomEvent('rangel:lead-accepted', { detail: {
      region: 'murrieta', form_placement: 'hero', submission_id: '8b75ba63-7b5d-4aa7-8e25-a4b9b3b3ef42',
    } })));
    const commands = window.dataLayer.filter(item => Object.prototype.toString.call(item) === '[object Arguments]').map(item => Array.from(item as ArrayLike<unknown>));
    expect(document.getElementById('rangel-gtm-script')).not.toBeNull();
    expect(document.getElementById('rangel-ga-script')).toBeNull();
    expect(commands.filter(command => command[0] === 'config')).toHaveLength(0);
    expect(commands.filter(command => command[0] === 'event').map(command => command[1])).toEqual(['conversion']);
    expect(commands.find(command => command[0] === 'event')?.[2]).toMatchObject({ send_to: 'AW-11465582021/test_label', transaction_id: '8b75ba63-7b5d-4aa7-8e25-a4b9b3b3ef42', restricted_data_processing: true });
  });
});
