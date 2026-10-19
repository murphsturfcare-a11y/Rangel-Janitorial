import { act, cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
vi.hoisted(() => {
  process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID = 'G-TEST1234';
  process.env.NEXT_PUBLIC_GOOGLE_ADS_ID = 'AW-123456789';
  process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL = 'test_label';
});
vi.mock('next/navigation', () => ({ usePathname: () => '/quote/murrieta' }));
import { CookieConsent } from '../../components/analytics/CookieConsent';
import { CONSENT_KEY, ADS_CONSENT_KEY, getAnalyticsConsent, getAdsConsent } from '@/lib/analytics/gtag';

beforeEach(() => {
  localStorage.clear();
  delete window.rangelAnalyticsConsent;
  delete window.rangelAdsConsent;
});
afterEach(() => {
  cleanup();
  delete window.rangelAnalyticsConsent;
  delete window.rangelAdsConsent;
  vi.restoreAllMocks();
});

describe('independent optional measurement choices', () => {
  it('starts both options off and offers an explicit save and decline', () => {
    render(<CookieConsent />);
    expect(screen.getByRole('region', { name: 'Privacy preferences' })).toHaveClass('bottom-0');
    expect(screen.getByRole('checkbox', { name: /Website analytics/ })).not.toBeChecked();
    expect(screen.getByRole('checkbox', { name: /Advertising measurement/ })).not.toBeChecked();
    expect(screen.getByRole('button', { name: 'Decline optional' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Privacy policy' })).toHaveAttribute('href', '/privacy-policy');
    fireEvent.click(screen.getByRole('button', { name: 'Save preferences' }));
    expect(getAnalyticsConsent()).toBe('declined');
    expect(getAdsConsent()).toBe('declined');
  });

  it('does not upgrade old analytics acceptance to advertising consent', () => {
    localStorage.setItem(CONSENT_KEY, 'accepted');
    render(<CookieConsent />);
    expect(screen.getByRole('checkbox', { name: /Website analytics/ })).toBeChecked();
    expect(screen.getByRole('checkbox', { name: /Advertising measurement/ })).not.toBeChecked();
    fireEvent.click(screen.getByRole('button', { name: 'Save preferences' }));
    expect(getAnalyticsConsent()).toBe('accepted');
    expect(getAdsConsent()).toBe('declined');
  });

  it('can accept advertising measurement while declining analytics', () => {
    render(<CookieConsent />);
    fireEvent.click(screen.getByRole('checkbox', { name: /Advertising measurement/ }));
    fireEvent.click(screen.getByRole('button', { name: 'Save preferences' }));
    expect(localStorage.getItem(CONSENT_KEY)).toBe('declined');
    expect(localStorage.getItem(ADS_CONSENT_KEY)).toBe('accepted');
    expect(screen.queryByRole('region')).not.toBeInTheDocument();
  });

  it.each(['accepted', 'declined'])('restores %s choices and supports reopening settings', choice => {
    localStorage.setItem(CONSENT_KEY, choice);
    localStorage.setItem(ADS_CONSENT_KEY, choice);
    render(<CookieConsent />);
    expect(screen.queryByRole('region')).not.toBeInTheDocument();
    act(() => { window.dispatchEvent(new Event('rangel:privacy-settings')); });
    expect(screen.getByRole('region')).toBeInTheDocument();
  });

  it('revokes both choices even when persistent storage becomes unavailable', () => {
    localStorage.setItem(CONSENT_KEY, 'accepted');
    localStorage.setItem(ADS_CONSENT_KEY, 'accepted');
    render(<CookieConsent />);
    act(() => { window.dispatchEvent(new Event('rangel:privacy-settings')); });
    vi.mocked(localStorage.setItem).mockImplementation(() => { throw new Error('Blocked'); });
    fireEvent.click(screen.getByRole('button', { name: 'Decline optional' }));
    expect(getAnalyticsConsent()).toBe('declined');
    expect(getAdsConsent()).toBe('declined');
    expect(screen.queryByRole('region')).not.toBeInTheDocument();
  });
});
