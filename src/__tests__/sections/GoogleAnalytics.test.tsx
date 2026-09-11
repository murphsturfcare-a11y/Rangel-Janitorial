import { StrictMode } from 'react';
import { act, cleanup, fireEvent, render } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
const state = vi.hoisted(() => {
  process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID = 'G-TEST1234';
  return { pathname: '/locations/murrieta' };
});
vi.mock('next/navigation', () => ({ usePathname: () => state.pathname }));
import { GoogleAnalytics } from '@/components/analytics/GoogleAnalytics';
import { CONSENT_KEY, GA_DISABLE_KEY, setAnalyticsConsent } from '@/lib/analytics/gtag';

const receipt = { region: 'murrieta', form_placement: 'hero', submission_id: '8b75ba63-7b5d-4aa7-8e25-a4b9b3b3ef42' };
function commands() { return (window.dataLayer || []).map(command => Array.from(command as ArrayLike<unknown>)); }
function eventCommands(name?: string) { return commands().filter(command => command[0] === 'event' && (!name || command[1] === name)); }
function dispatchReceipt(detail: unknown = receipt) { window.dispatchEvent(new CustomEvent('rangel:lead-accepted', { detail })); }
function preventNavigation(event: Event) { event.preventDefault(); }

beforeEach(() => {
  state.pathname = '/locations/murrieta';
  window.history.replaceState({}, '', '/locations/murrieta?email=private@example.test');
  localStorage.clear();
  sessionStorage.clear();
  delete window.rangelAnalyticsConsent;
  delete window[GA_DISABLE_KEY];
  Reflect.deleteProperty(window, 'gtag');
  window.dataLayer = [];
  document.getElementById('rangel-ga-script')?.remove();
  document.addEventListener('click', preventNavigation);
});
afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
  document.getElementById('rangel-ga-script')?.remove();
  document.removeEventListener('click', preventNavigation);
  delete window.rangelAnalyticsConsent;
  delete window[GA_DISABLE_KEY];
  Reflect.deleteProperty(window, 'gtag');
  window.history.replaceState({}, '', '/');
});

describe('GoogleAnalytics consent integration', () => {
  it.each([null, 'declined'])('loads no script or event commands for consent %s', consent => {
    if (consent) localStorage.setItem(CONSENT_KEY, consent);
    render(<GoogleAnalytics />);
    act(() => dispatchReceipt());
    expect(document.getElementById('rangel-ga-script')).toBeNull();
    expect(commands()).toEqual([]);
    expect(window[GA_DISABLE_KEY]).toBe(true);
  });

  it('restores accepted consent with one config, one script, and one pageview under StrictMode', () => {
    localStorage.setItem(CONSENT_KEY, 'accepted');
    vi.spyOn(document, 'referrer', 'get').mockReturnValue('https://example.test/private?email=private@example.test');
    render(<StrictMode><GoogleAnalytics /></StrictMode>);
    expect(document.querySelectorAll('#rangel-ga-script')).toHaveLength(1);
    expect(commands().filter(command => command[0] === 'config')).toHaveLength(1);
    expect(eventCommands('page_view')).toHaveLength(1);
    expect(Object.prototype.toString.call(window.dataLayer[0])).toBe('[object Arguments]');
    const configuration = commands().find(command => command[0] === 'config')?.[2];
    expect(configuration).toMatchObject({ send_page_view: false, page_location: window.location.origin + '/locations/murrieta', page_referrer: 'https://example.test' });
    expect(JSON.stringify(commands())).not.toMatch(/private@example|\?email|\/private/);
    act(() => { window.dispatchEvent(new Event('rangel:consent')); });
    expect(eventCommands('page_view')).toHaveLength(1);
  });

  it('counts an accepted receipt once and never forwards contact fields or its identifier', () => {
    localStorage.setItem(CONSENT_KEY, 'accepted');
    const { rerender } = render(<GoogleAnalytics />);
    act(() => { dispatchReceipt({ ...receipt, email: 'private@example.test', phone: '9515550100' }); dispatchReceipt(); });
    expect(eventCommands('generate_lead')).toEqual([['event', 'generate_lead', { region: 'murrieta', form_placement: 'hero' }]]);
    state.pathname = '/services';
    rerender(<GoogleAnalytics />);
    act(() => dispatchReceipt());
    expect(eventCommands('generate_lead')).toHaveLength(1);
    expect(eventCommands('page_view')).toHaveLength(2);
    expect(JSON.stringify(commands())).not.toMatch(/private@example|9515550100|8b75ba63/);
  });

  it('does not replay pre-consent interactions after the visitor accepts', () => {
    render(<GoogleAnalytics />);
    act(() => dispatchReceipt());
    act(() => setAnalyticsConsent('accepted'));
    act(() => dispatchReceipt());
    expect(eventCommands('generate_lead')).toHaveLength(0);
    act(() => dispatchReceipt({ ...receipt, submission_id: '0b75ba63-7b5d-4aa7-8e25-a4b9b3b3ef42' }));
    expect(eventCommands('generate_lead')).toHaveLength(1);
  });

  it('revokes a loaded tag, removes its cookies, and sends no subsequent events', () => {
    localStorage.setItem(CONSENT_KEY, 'accepted');
    render(<GoogleAnalytics />);
    document.cookie = '_ga=test-cookie; path=/';
    act(() => setAnalyticsConsent('declined'));
    expect(window[GA_DISABLE_KEY]).toBe(true);
    expect(document.cookie).not.toMatch(/_ga=/);
    const count = eventCommands().length;
    act(() => dispatchReceipt());
    const anchor = document.createElement('a');
    anchor.href = 'tel:+19518944222';
    document.body.append(anchor);
    fireEvent.click(anchor);
    anchor.remove();
    expect(eventCommands()).toHaveLength(count);
  });

  it('honors consent changes from another tab', () => {
    localStorage.setItem(CONSENT_KEY, 'accepted');
    render(<GoogleAnalytics />);
    act(() => setAnalyticsConsent('accepted'));
    localStorage.setItem(CONSENT_KEY, 'declined');
    act(() => { window.dispatchEvent(new StorageEvent('storage', { key: CONSENT_KEY, newValue: 'declined' })); });
    expect(window[GA_DISABLE_KEY]).toBe(true);
    act(() => dispatchReceipt());
    expect(eventCommands('generate_lead')).toHaveLength(0);
  });

  it('rejects malformed event details and records quote start separately', () => {
    localStorage.setItem(CONSENT_KEY, 'accepted');
    render(<GoogleAnalytics />);
    act(() => {
      dispatchReceipt({ ...receipt, submission_id: 'customer@example.test' });
      dispatchReceipt({ ...receipt, region: 'unlisted' });
      window.dispatchEvent(new CustomEvent('rangel:lead-started', { detail: receipt }));
      window.dispatchEvent(new CustomEvent('rangel:lead-started', { detail: receipt }));
    });
    expect(eventCommands('generate_lead')).toHaveLength(0);
    expect(eventCommands('quote_start')).toHaveLength(1);
  });

  it('labels clicks on known office numbers without recording a visitor phone number', () => {
    localStorage.setItem(CONSENT_KEY, 'accepted');
    const { getByText } = render(<><GoogleAnalytics /><a href="tel:+19518944222">Office</a><a href="tel:+19515550100">Other</a></>);
    fireEvent.click(getByText('Other'));
    fireEvent.click(getByText('Office'));
    expect(eventCommands('phone_click')).toEqual([['event', 'phone_click', { region: 'murrieta' }]]);
  });
});
