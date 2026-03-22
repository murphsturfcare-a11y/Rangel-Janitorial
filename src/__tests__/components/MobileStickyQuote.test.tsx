import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

vi.mock('next/link', () => ({
  default: ({ children, href, ...props }: any) => <a href={href} {...props}>{children}</a>,
}));

import MobileStickyQuote from '@/components/ui/MobileStickyQuote';

describe('MobileStickyQuote', () => {
  it('renders Call Now link with correct tel: href', () => {
    render(<MobileStickyQuote />);
    const callLink = screen.getByRole('link', { name: /call now/i });
    expect(callLink).toHaveAttribute('href', 'tel:9513313300');
  });

  it('renders Get Free Quote link with href /contact', () => {
    render(<MobileStickyQuote />);
    const quoteLink = screen.getByRole('link', { name: /get free quote/i });
    expect(quoteLink).toHaveAttribute('href', '/contact');
  });

  it('has fixed positioning classes', () => {
    const { container } = render(<MobileStickyQuote />);
    const wrapper = container.firstElementChild as HTMLElement;
    expect(wrapper.className).toContain('fixed');
    expect(wrapper.className).toContain('bottom-0');
    expect(wrapper.className).toContain('left-0');
    expect(wrapper.className).toContain('right-0');
    expect(wrapper.className).toContain('z-50');
  });

  it('has lg:hidden class for desktop hiding', () => {
    const { container } = render(<MobileStickyQuote />);
    const wrapper = container.firstElementChild as HTMLElement;
    expect(wrapper.className).toContain('lg:hidden');
  });

  it('renders Phone icon area (Call Now text)', () => {
    render(<MobileStickyQuote />);
    expect(screen.getByText(/call now/i)).toBeInTheDocument();
  });

  it('renders Get Free Quote text', () => {
    render(<MobileStickyQuote />);
    expect(screen.getByText(/get free quote/i)).toBeInTheDocument();
  });
});
