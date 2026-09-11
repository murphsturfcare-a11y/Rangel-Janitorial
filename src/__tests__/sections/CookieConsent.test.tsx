import { act, cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
vi.hoisted(() => { process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID = 'G-TEST1234'; });
import { CookieConsent } from '../../components/analytics/CookieConsent';
import { CONSENT_KEY, getAnalyticsConsent } from '@/lib/analytics/gtag';

beforeEach(() => {
  localStorage.clear();
  delete window.rangelAnalyticsConsent;
});
afterEach(() => {
  cleanup();
  delete window.rangelAnalyticsConsent;
  vi.restoreAllMocks();
});

describe('CookieConsent', () => {
  it('offers equal explicit accept/decline choices and a privacy link', () => {
    render(<CookieConsent />);
    expect(screen.getByRole('region', { name: 'Analytics preferences' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Accept analytics' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Decline' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Privacy policy' })).toHaveAttribute('href', '/privacy-policy');
  });

  it.each(['accepted', 'declined'])('restores %s without reprompting and allows settings to reopen', choice => {
    localStorage.setItem(CONSENT_KEY, choice);
    render(<CookieConsent />);
    expect(screen.queryByRole('region')).not.toBeInTheDocument();
    act(() => { window.dispatchEvent(new Event('rangel:privacy-settings')); });
    expect(screen.getByRole('region')).toBeInTheDocument();
  });

  it.each([['Accept analytics', 'accepted'], ['Decline', 'declined']])('persists %s and notifies the analytics loader', (button, expected) => {
    const consentEvent = vi.fn();
    window.addEventListener('rangel:consent', consentEvent);
    render(<CookieConsent />);
    fireEvent.click(screen.getByRole('button', { name: button }));
    expect(localStorage.getItem(CONSENT_KEY)).toBe(expected);
    expect(getAnalyticsConsent()).toBe(expected);
    expect(consentEvent).toHaveBeenCalledTimes(1);
    expect(screen.queryByRole('region')).not.toBeInTheDocument();
    window.removeEventListener('rangel:consent', consentEvent);
  });

  it('lets a prior accepted user revoke consent even if storage becomes unavailable', () => {
    localStorage.setItem(CONSENT_KEY, 'accepted');
    render(<CookieConsent />);
    act(() => { window.dispatchEvent(new Event('rangel:privacy-settings')); });
    vi.mocked(localStorage.setItem).mockImplementationOnce(() => { throw new Error('Blocked'); });
    fireEvent.click(screen.getByRole('button', { name: 'Decline' }));
    expect(getAnalyticsConsent()).toBe('declined');
    expect(screen.queryByRole('region')).not.toBeInTheDocument();
  });
});
