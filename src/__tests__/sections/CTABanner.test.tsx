import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import CTABanner from '@/components/sections/CTABanner';

describe('CTABanner', () => {
  it('renders heading text', () => {
    render(<CTABanner />);
    expect(
      screen.getByText('Ready for a Spotless Facility?')
    ).toBeInTheDocument();
  });

  it('renders description text', () => {
    render(<CTABanner />);
    expect(
      screen.getByText(
        /Get a free quote today and see the difference professional janitorial/
      )
    ).toBeInTheDocument();
  });

  it('renders CTA link with correct href and text', () => {
    render(<CTABanner />);
    const link = screen.getByRole('link', { name: 'Get Your Free Quote' });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/locations');
  });
});
