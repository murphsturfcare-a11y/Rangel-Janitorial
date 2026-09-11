import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import MobileStickyQuote from '@/components/ui/MobileStickyQuote';
import regions from '@/data/regions.json';

describe('MobileStickyQuote', () => {
  it('lets visitors choose their regional phone instead of calling an unrelated office', () => {
    render(<MobileStickyQuote />);
    fireEvent.click(screen.getByRole('button', { name: /call now/i }));
    expect(screen.getByRole('heading', { name: 'Call Your Local Office' })).toBeInTheDocument();
    for (const region of regions) {
      const link = screen.getByRole('link', { name: new RegExp(region.name.replace('/', '\\/')) });
      expect(link).toHaveAttribute('href', region.phoneHref);
    }
    fireEvent.click(screen.getByRole('button', { name: 'Close' }));
    expect(screen.queryByRole('heading', { name: 'Call Your Local Office' })).not.toBeInTheDocument();
  });

  it('routes a quote request to the selected region and its form anchor', () => {
    render(<MobileStickyQuote />);
    fireEvent.click(screen.getByRole('button', { name: /get free quote/i }));
    expect(screen.getByRole('heading', { name: 'Select Your Area' })).toBeInTheDocument();
    for (const region of regions) expect(screen.getByRole('link', { name: region.name })).toHaveAttribute('href', `/locations/${region.slug}#quote-form`);
    fireEvent.click(screen.getByRole('link', { name: regions[0].name }));
    expect(screen.queryByRole('heading', { name: 'Select Your Area' })).not.toBeInTheDocument();
  });

  it('keeps the action bar fixed to the bottom only on mobile', () => {
    const { container } = render(<MobileStickyQuote />);
    const wrapper = container.firstElementChild as HTMLElement;
    for (const className of ['fixed', 'bottom-0', 'left-0', 'right-0', 'z-50', 'lg:hidden']) expect(wrapper.classList.contains(className)).toBe(true);
  });
});
