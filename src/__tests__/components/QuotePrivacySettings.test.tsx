import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import QuotePrivacySettings from '@/components/quote/QuotePrivacySettings';

const tracking = vi.hoisted(() => ({ analytics: '', ads: false }));
vi.mock('@/lib/analytics/gtag', () => ({ get GA_MEASUREMENT_ID() { return tracking.analytics; } }));
vi.mock('@/lib/analytics/ads', () => ({ get GOOGLE_ADS_CONFIGURED() { return tracking.ads; } }));

afterEach(() => { cleanup(); vi.restoreAllMocks(); });

describe('paid-page privacy settings', () => {
  it('does not render an inert control when optional tracking is unconfigured', () => {
    tracking.analytics = '';
    tracking.ads = false;
    render(<QuotePrivacySettings />);
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it.each([
    { analytics: 'G-TEST123', ads: false },
    { analytics: '', ads: true },
    { analytics: 'G-TEST123', ads: true },
  ])('reopens the shared preferences for $analytics / ads=$ads', ({ analytics, ads }) => {
    tracking.analytics = analytics;
    tracking.ads = ads;
    const dispatch = vi.spyOn(window, 'dispatchEvent');
    render(<QuotePrivacySettings />);
    fireEvent.click(screen.getByRole('button', { name: 'Cookie settings' }));
    expect(dispatch).toHaveBeenCalledWith(expect.objectContaining({ type: 'rangel:privacy-settings' }));
  });
});
