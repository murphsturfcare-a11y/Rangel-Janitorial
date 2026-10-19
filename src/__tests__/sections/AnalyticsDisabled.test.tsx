import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
vi.hoisted(() => { delete process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID; delete process.env.NEXT_PUBLIC_GOOGLE_ADS_ID; delete process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL; });
vi.mock('next/navigation', () => ({ usePathname: () => '/' }));
import { GoogleAnalytics } from '@/components/analytics/GoogleAnalytics';
import { CookieConsent } from '@/components/analytics/CookieConsent';
import LeadForm from '@/components/forms/LeadForm';
import { ADS_CONSENT_KEY } from '@/lib/analytics/gtag';
import { AD_ATTRIBUTION_KEY } from '@/lib/analytics/ad-attribution';

afterEach(() => {
  cleanup(); vi.unstubAllGlobals();
  delete window.rangelAdsConsent;
  window.history.replaceState({}, '', '/');
});
describe('unconfigured analytics', () => {
  it('does not fabricate an ID, load a tag, or display an irrelevant cookie banner', () => {
    localStorage.clear();
    window.dataLayer = [];
    const { container } = render(<><GoogleAnalytics /><CookieConsent /></>);
    expect(container).toBeEmptyDOMElement();
    expect(document.getElementById('rangel-ga-script')).toBeNull();
    expect(screen.queryByRole('region', { name: 'Privacy preferences' })).toBeNull();
    expect(window.dataLayer).toEqual([]);
  });

  it('does not forward advertising data from an old accepted preference when Ads configuration is disabled', async () => {
    localStorage.setItem(ADS_CONSENT_KEY, 'accepted');
    const click = 'EAIaIQobChMI_old-click123';
    sessionStorage.setItem(AD_ATTRIBUTION_KEY, JSON.stringify({ consent: 'granted', capturedAt: new Date().toISOString(), clickIds: { gclid: click } }));
    sessionStorage.setItem('rangel_janitorial_utm', JSON.stringify({ source: 'google', medium: 'cpc' }));
    window.history.replaceState({}, '', '/quote/murrieta?gclid=' + click + '&utm_source=google');
    const fetchMock = vi.fn<typeof fetch>(async (_url, options) => {
      const payload = JSON.parse(options?.body as string);
      return Response.json({ success: true, outcome: 'accepted', submissionId: payload.submissionId });
    });
    vi.stubGlobal('fetch', fetchMock);
    render(<LeadForm regionSlug="murrieta" sourcePage="/quote/murrieta" />);
    fireEvent.change(screen.getByLabelText(/First Name/), { target: { value: 'Test' } });
    fireEvent.change(screen.getByLabelText(/Last Name/), { target: { value: 'Visitor' } });
    fireEvent.change(screen.getByLabelText(/Phone/), { target: { value: '9515550100' } });
    fireEvent.change(screen.getByLabelText(/Email/), { target: { value: 'test@example.test' } });
    fireEvent.click(screen.getByRole('checkbox', { name: /I acknowledge the Privacy Policy/ }));
    fireEvent.submit(screen.getByRole('form'));
    await screen.findByRole('status');
    const payload = JSON.parse(fetchMock.mock.calls[0][1]?.body as string);
    expect(payload.attribution).toEqual({});
    expect(payload.adAttribution).toBeNull();
    expect(sessionStorage.getItem(AD_ATTRIBUTION_KEY)).toBeNull();
  });
});
