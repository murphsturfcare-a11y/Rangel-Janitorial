import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import { act, cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

const state = vi.hoisted(() => {
  process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID = 'G-TEST1234';
  process.env.NEXT_PUBLIC_GOOGLE_ADS_ID = 'AW-11465582021';
  process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL = 'quote_label';
  process.env.NEXT_PUBLIC_GTM_ID = 'GTM-MB764DLF';
  process.env.NEXT_PUBLIC_GOOGLE_ADS_WEBSITE_CALL_LABEL_SACRAMENTO = 'sacramento_call_label';
  process.env.NEXT_PUBLIC_GOOGLE_ADS_WEBSITE_CALL_LABEL_WALNUT_CREEK = 'walnut_call_label';
  return { pathname: '/quote/sacramento' };
});
vi.mock('next/navigation', () => ({ usePathname: () => state.pathname }));
import { GoogleAnalytics } from '@/components/analytics/GoogleAnalytics';
import WebsiteCallLink from '@/components/analytics/WebsiteCallLink';
import { resetWebsiteCallTracking, syncWebsiteCallTracking } from '@/lib/analytics/website-calls';
import { ADS_CONSENT_KEY, CONSENT_KEY, setAdsConsent } from '@/lib/analytics/gtag';
import { AD_ATTRIBUTION_KEY } from '@/lib/analytics/ad-attribution';
import regions from '@/data/regions.json';

type PhoneConfig = { phone_conversion_number: string; phone_conversion_callback: (formatted: unknown, mobile: unknown) => void };
const sacramento = regions.find(region => region.slug === 'sacramento')!;
const walnut = regions.find(region => region.slug === 'walnut-creek')!;
const forwarding = { phone: '(800) 555-0199', phoneHref: 'tel:+18005550199' };
const click = 'EAIaIQobChMI_test-click-1234567890';
function commands() {
  return window.dataLayer.filter(item => Object.prototype.toString.call(item) === '[object Arguments]')
    .map(item => Array.from(item as ArrayLike<unknown>));
}
function configs() {
  return commands().filter(command => command[0] === 'config' && typeof command[2] === 'object' && command[2] && 'phone_conversion_number' in command[2]);
}
function callback(index = -1) { return (configs().at(index)?.[2] as PhoneConfig).phone_conversion_callback; }
function choosePath(path: string) {
  state.pathname = path;
  window.history.replaceState({}, '', path);
}
function App({ region = 'sacramento', fallback = false }: { region?: string; fallback?: boolean }) {
  return <><GoogleAnalytics /><WebsiteCallLink regionSlug={region} label="Call our team " />{fallback && <WebsiteCallLink regionSlug={region} label="Call after a form error " />}</>;
}
function expectPhone(phone: { phone: string; phoneHref: string }) {
  const links = screen.getAllByRole('link');
  for (const link of links) {
    expect(link).toHaveAttribute('href', phone.phoneHref);
    expect(link).toHaveTextContent(phone.phone);
  }
}

beforeEach(() => {
  localStorage.clear(); sessionStorage.clear(); window.dataLayer = [];
  delete window.rangelAnalyticsConsent; delete window.rangelAdsConsent; delete window.rangelAdsReceipts;
  delete window.rangelAdsGlobalOverride;
  Reflect.deleteProperty(window.navigator, 'globalPrivacyControl');
  Reflect.deleteProperty(window, 'gtag');
  document.getElementById('rangel-ga-script')?.remove();
  document.getElementById('rangel-gtm-script')?.remove();
  resetWebsiteCallTracking();
  choosePath('/quote/sacramento');
});
afterEach(() => {
  cleanup(); resetWebsiteCallTracking(); vi.restoreAllMocks();
  document.getElementById('rangel-ga-script')?.remove();
  document.getElementById('rangel-gtm-script')?.remove();
  Reflect.deleteProperty(window.navigator, 'globalPrivacyControl');
  delete window.rangelAnalyticsConsent; delete window.rangelAdsConsent; delete window.rangelAdsGlobalOverride;
  for (const name of ['gwcc', '_gcl_aw']) document.cookie = name + '=; Max-Age=0; path=/';
  choosePath('/');
});

describe('actual calls from paid regional quote pages', () => {
  it('server-renders the original business number even after a client forwarding callback', () => {
    render(<App />);
    act(() => callback()(forwarding.phone, '+18005550199'));
    expectPhone(forwarding);
    const html = renderToString(<WebsiteCallLink regionSlug="sacramento" />);
    expect(html).toContain(sacramento.phoneHref);
    expect(html).toContain(sacramento.phone);
    expect(html).not.toContain(forwarding.phone);
  });

  it.each([sacramento, walnut])('configures only the actual $city call action and keeps the original until a valid response', region => {
    choosePath('/quote/' + region.slug);
    render(<App region={region.slug} />);
    expectPhone(region);
    expect(configs()).toHaveLength(1);
    expect(configs()[0][1]).toBe('AW-11465582021/' + (region.slug === 'sacramento' ? 'sacramento_call_label' : 'walnut_call_label'));
    expect(configs()[0][2]).toMatchObject({
      phone_conversion_number: region.phone,
      phone_conversion_options: { timeout: 5000, cache: false },
      restricted_data_processing: true, allow_ad_personalization_signals: false, send_page_view: false,
    });
    act(() => callback()(forwarding.phone, '18005550199'));
    expectPhone(forwarding);
    expect(commands().filter(command => command[0] === 'event')).toHaveLength(0);
  });

  it('queues privacy and regional defaults before the GTM base and call config, without a second AW base', () => {
    window.history.replaceState({}, '', '/quote/sacramento?gclid=' + click + '&email=private@example.test#private');
    render(<App />);
    const queue = window.dataLayer.map(item => Object.prototype.toString.call(item) === '[object Arguments]' ? Array.from(item as ArrayLike<unknown>) : item);
    const phoneIndex = queue.findIndex(item => Array.isArray(item) && item[0] === 'config' && item[1] === 'AW-11465582021/sacramento_call_label');
    const baseIndex = queue.findIndex(item => item && typeof item === 'object' && 'event' in item && item.event === 'gtm.js');
    expect(baseIndex).toBeGreaterThan(0);
    expect(phoneIndex).toBeGreaterThan(baseIndex);
    expect(queue.slice(0, baseIndex)).toContainEqual(['consent', 'default', expect.objectContaining({ region: ['US'], ad_storage: 'granted' })]);
    expect(queue.slice(0, baseIndex)).toContainEqual(['set', expect.objectContaining({ restricted_data_processing: true })]);
    expect(commands().filter(command => command[0] === 'config' && command[1] === 'AW-11465582021')).toHaveLength(0);
    expect(configs()[0][2]).toMatchObject({ page_location: window.location.origin + '/quote/sacramento?gclid=' + click, page_referrer: '' });
    expect(JSON.stringify(queue)).not.toContain('private');
    expect(localStorage.getItem(ADS_CONSENT_KEY)).toBeNull();
    expect(sessionStorage.getItem(AD_ATTRIBUTION_KEY)).toBeNull();
  });

  it('reuses one request across StrictMode, remounts and later error links', () => {
    const first = render(<StrictMode><App /></StrictMode>);
    act(() => callback()(forwarding.phone, '+18005550199'));
    first.unmount();
    render(<App fallback />);
    expect(configs()).toHaveLength(1);
    expectPhone(forwarding);
  });

  it.each([
    ['<img src=x onerror=alert(1)>', '+18005550199'],
    ['(800) 555-0199', 'javascript:alert(1)'],
    ['(800) 555-0199', '+18005550198'],
    ['(800) 555-0199 ext. 1', '+18005550199'],
    ['(000) 000-0000', '0000000000'],
    [null, '+18005550199'],
  ])('rejects malformed or mismatched forwarding values (%s)', (formatted, mobile) => {
    render(<App />);
    act(() => callback()(formatted, mobile));
    expectPhone(sacramento);
  });

  it.each(['declined', 'gpc'])('keeps original numbers and creates no request for %s', choice => {
    localStorage.setItem(CONSENT_KEY, 'accepted');
    localStorage.setItem(ADS_CONSENT_KEY, choice === 'declined' ? 'declined' : 'accepted');
    if (choice === 'gpc') Object.defineProperty(window.navigator, 'globalPrivacyControl', { configurable: true, value: true });
    render(<App />);
    expect(configs()).toHaveLength(0);
    expectPhone(sacramento);
    expect(document.getElementById('rangel-gtm-script')).toBeNull();
    expect(commands().some(command => command[0] === 'config' && command[1] === 'G-TEST1234')).toBe(true);
  });

  it('restores originals and clears phone-cache cookies on opt-out, ignoring every delayed old callback', () => {
    render(<App fallback />);
    const oldResponse = callback();
    act(() => oldResponse(forwarding.phone, '+18005550199'));
    document.cookie = 'gwcc=cached; path=/';
    act(() => setAdsConsent('declined'));
    expectPhone(sacramento);
    expect(document.cookie).not.toContain('gwcc=');
    act(() => oldResponse(forwarding.phone, '+18005550199'));
    expectPhone(sacramento);
    act(() => setAdsConsent('accepted'));
    expect(configs()).toHaveLength(2);
    act(() => oldResponse('(800) 555-0101', '+18005550101'));
    expectPhone(sacramento);
    act(() => callback()(forwarding.phone, '+18005550199'));
    expectPhone(forwarding);
  });

  it('restores originals when GPC becomes active and does not let an accepted setting override it', () => {
    render(<App />);
    const response = callback();
    act(() => response(forwarding.phone, '+18005550199'));
    Object.defineProperty(window.navigator, 'globalPrivacyControl', { configurable: true, value: true });
    act(() => setAdsConsent('accepted'));
    act(() => response(forwarding.phone, '+18005550199'));
    expectPhone(sacramento);
    expect(configs()).toHaveLength(1);
  });

  it.each(['declined', null])('restores originals on cross-tab choice change to %s', choice => {
    localStorage.setItem(ADS_CONSENT_KEY, 'accepted');
    render(<App />);
    const response = callback();
    act(() => response(forwarding.phone, '+18005550199'));
    if (choice) localStorage.setItem(ADS_CONSENT_KEY, choice); else localStorage.clear();
    act(() => window.dispatchEvent(new StorageEvent('storage', { key: choice ? ADS_CONSENT_KEY : null, newValue: choice })));
    act(() => response(forwarding.phone, '+18005550199'));
    expectPhone(sacramento);
  });

  it('changes regional requests on navigation and never lets the previous region callback win', () => {
    const { rerender } = render(<App />);
    const oldResponse = callback();
    act(() => oldResponse(forwarding.phone, '+18005550199'));
    choosePath('/quote/walnut-creek');
    rerender(<App region="walnut-creek" />);
    expectPhone(walnut);
    expect(configs()).toHaveLength(2);
    act(() => oldResponse(forwarding.phone, '+18005550199'));
    expectPhone(walnut);
    act(() => callback()('(888) 555-0123', '+18885550123'));
    expectPhone({ phone: '(888) 555-0123', phoneHref: 'tel:+18885550123' });
    choosePath('/locations/walnut-creek');
    rerender(<App region="walnut-creek" />);
    expectPhone(walnut);
    act(() => callback()('(888) 555-0123', '+18885550123'));
    expectPhone(walnut);
  });

  it.each(['/quote/murrieta', '/locations/sacramento', '/quote/unserved-city'])('does not request a forwarding number for %s', path => {
    choosePath(path);
    render(<App />);
    expect(configs()).toHaveLength(0);
    expectPhone(sacramento);
  });

  it('does not queue a phone request until the shared Google loader has initialized gtag', () => {
    syncWebsiteCallTracking('/quote/sacramento');
    expect(window.dataLayer).toEqual([]);
  });

  it('a forwarding-number click is only a sanitized GA interaction, never a lead or Ads conversion', () => {
    localStorage.setItem(CONSENT_KEY, 'accepted');
    render(<App />);
    act(() => callback()(forwarding.phone, '+18005550199'));
    const link = screen.getByRole('link');
    link.addEventListener('click', event => event.preventDefault());
    fireEvent.click(link);
    const clicks = commands().filter(command => command[0] === 'event' && command[1] === 'phone_click');
    expect(clicks).toEqual([['event', 'phone_click', {
      region: 'sacramento', send_to: 'G-TEST1234', page_location: window.location.origin + '/quote/sacramento', page_referrer: '',
    }]]);
    expect(commands().filter(command => command[0] === 'event' && ['conversion', 'generate_lead'].includes(command[1] as string))).toHaveLength(0);
  });
});
