import { act, cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
const state = vi.hoisted(() => {
  process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID = 'G-TEST1234';
  process.env.NEXT_PUBLIC_GOOGLE_ADS_ID = 'AW-123456789';
  process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL = 'test_label';
  return { pathname: '/quote/murrieta' };
});
vi.mock('next/navigation', () => ({ usePathname: () => state.pathname }));
import { CookieConsent } from '../../components/analytics/CookieConsent';
import QuotePrivacySettings from '@/components/quote/QuotePrivacySettings';
import { CONSENT_KEY, ADS_CONSENT_KEY, getAnalyticsConsent, getAdsConsent, setAnalyticsConsent, setAdsConsent } from '@/lib/analytics/gtag';

function openSettings() { act(() => { window.dispatchEvent(new Event('rangel:privacy-settings')); }); }

beforeEach(() => {
  localStorage.clear();
  delete window.rangelAnalyticsConsent;
  delete window.rangelAdsConsent;
  state.pathname = '/quote/murrieta';
  Object.defineProperty(navigator, 'globalPrivacyControl', { configurable: true, get: () => false });
});
afterEach(() => {
  cleanup();
  delete window.rangelAnalyticsConsent;
  delete window.rangelAdsConsent;
  vi.restoreAllMocks();
  Reflect.deleteProperty(navigator, 'globalPrivacyControl');
});

describe('footer privacy settings without an automatic prompt', () => {
  it('stays closed for fresh visitors, route changes and choice notifications without inventing consent', () => {
    const { rerender } = render(<CookieConsent />);
    expect(screen.queryByRole('region')).not.toBeInTheDocument();
    state.pathname = '/services';
    rerender(<CookieConsent />);
    act(() => { window.dispatchEvent(new Event('rangel:consent')); });
    expect(screen.queryByRole('region')).not.toBeInTheDocument();
    expect(getAnalyticsConsent()).toBeNull();
    expect(getAdsConsent()).toBeNull();
    expect(localStorage.getItem(CONSENT_KEY)).toBeNull();
    expect(localStorage.getItem(ADS_CONSENT_KEY)).toBeNull();
  });

  it('opens from the footer without an advertising checkbox and closes without saving consent', () => {
    render(<><CookieConsent /><QuotePrivacySettings /></>);
    fireEvent.click(screen.getByRole('button', { name: 'Privacy settings' }));
    expect(screen.getByRole('region', { name: 'Privacy preferences' })).toHaveClass('bottom-0');
    expect(screen.getByRole('checkbox', { name: /Website analytics/ })).not.toBeChecked();
    expect(screen.queryByRole('checkbox', { name: /Advertising/ })).toBeNull();
    expect(screen.getByRole('button', { name: 'Turn off ad measurement' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Privacy policy' })).toHaveAttribute('href', '/privacy-policy');
    fireEvent.click(screen.getByRole('button', { name: 'Done' }));
    expect(getAnalyticsConsent()).toBeNull();
    expect(getAdsConsent()).toBeNull();
    expect(screen.queryByRole('region')).not.toBeInTheDocument();
  });

  it('keeps closed settings closed when another choice changes', () => {
    render(<CookieConsent />);
    act(() => setAnalyticsConsent('accepted'));
    act(() => setAdsConsent('declined'));
    expect(screen.queryByRole('region')).not.toBeInTheDocument();
  });

  it('changes analytics independently without writing an advertising choice', () => {
    render(<CookieConsent />);
    openSettings();
    fireEvent.click(screen.getByRole('checkbox', { name: /Website analytics/ }));
    expect(getAnalyticsConsent()).toBe('accepted');
    expect(getAdsConsent()).toBeNull();
    fireEvent.click(screen.getByRole('checkbox', { name: /Website analytics/ }));
    expect(getAnalyticsConsent()).toBe('declined');
    expect(getAdsConsent()).toBeNull();
  });

  it('turns off ad measurement and restores that choice when reopened', () => {
    localStorage.setItem(CONSENT_KEY, 'accepted');
    render(<CookieConsent />);
    openSettings();
    fireEvent.click(screen.getByRole('button', { name: 'Turn off ad measurement' }));
    expect(getAdsConsent()).toBe('declined');
    expect(getAnalyticsConsent()).toBe('accepted');
    expect(screen.getByText('Ad measurement is off in this browser.')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Done' }));
    openSettings();
    expect(screen.getByRole('button', { name: 'Enable ad measurement' })).toBeInTheDocument();
  });

  it('requires an explicit enable action to replace a previous advertising opt-out', () => {
    localStorage.setItem(ADS_CONSENT_KEY, 'declined');
    render(<CookieConsent />);
    openSettings();
    fireEvent.click(screen.getByRole('button', { name: 'Enable ad measurement' }));
    expect(getAdsConsent()).toBe('accepted');
    expect(getAnalyticsConsent()).toBeNull();
    expect(screen.getByRole('button', { name: 'Turn off ad measurement' })).toBeInTheDocument();
  });

  it('turns off ads even when persistent storage becomes unavailable', () => {
    localStorage.setItem(ADS_CONSENT_KEY, 'accepted');
    render(<CookieConsent />);
    openSettings();
    vi.mocked(localStorage.setItem).mockImplementationOnce(() => { throw new Error('Blocked'); });
    fireEvent.click(screen.getByRole('button', { name: 'Turn off ad measurement' }));
    expect(getAdsConsent()).toBe('declined');
    expect(screen.getByText('Ad measurement is off in this browser.')).toBeInTheDocument();
  });

  it('shows the browser privacy signal and does not offer to override it', () => {
    Object.defineProperty(navigator, 'globalPrivacyControl', { configurable: true, get: () => true });
    localStorage.setItem(ADS_CONSENT_KEY, 'accepted');
    render(<CookieConsent />);
    openSettings();
    expect(screen.getByText(/browser sends a Global Privacy Control signal/)).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Enable ad measurement' })).toBeNull();
    expect(screen.queryByRole('button', { name: 'Turn off ad measurement' })).toBeNull();
    fireEvent.click(screen.getByRole('button', { name: 'Done' }));
    expect(getAdsConsent()).toBe('accepted');
  });
});
