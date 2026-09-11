import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
vi.hoisted(() => { delete process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID; });
vi.mock('next/navigation', () => ({ usePathname: () => '/' }));
import { GoogleAnalytics } from '@/components/analytics/GoogleAnalytics';
import { CookieConsent } from '@/components/analytics/CookieConsent';

afterEach(() => cleanup());
describe('unconfigured analytics', () => {
  it('does not fabricate an ID, load a tag, or display an irrelevant cookie banner', () => {
    localStorage.clear();
    window.dataLayer = [];
    const { container } = render(<><GoogleAnalytics /><CookieConsent /></>);
    expect(container).toBeEmptyDOMElement();
    expect(document.getElementById('rangel-ga-script')).toBeNull();
    expect(screen.queryByRole('region', { name: 'Analytics preferences' })).toBeNull();
    expect(window.dataLayer).toEqual([]);
  });
});
