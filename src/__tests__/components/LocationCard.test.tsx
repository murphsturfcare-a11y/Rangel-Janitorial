import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import LocationCard from '@/components/cards/LocationCard';

vi.mock('next/link', () => ({
  default: ({ children, href, ...props }: any) => <a href={href} {...props}>{children}</a>,
}));

describe('LocationCard', () => {
  const defaultProps = {
    city: 'Dublin',
    description: 'Premium artificial grass installation in Dublin.',
    slug: 'dublin',
  };

  it('renders city name in heading', () => {
    render(<LocationCard {...defaultProps} />);
    const heading = screen.getByRole('heading', { level: 3, name: 'Dublin' });
    expect(heading).toBeInTheDocument();
    expect(heading.className).toContain('font-heading');
    expect(heading.className).toContain('font-semibold');
    expect(heading.className).toContain('text-lg');
    expect(heading.className).toContain('text-charcoal');
    expect(heading.className).toContain('mb-2');
  });

  it('renders description text', () => {
    render(<LocationCard {...defaultProps} />);
    expect(
      screen.getByText('Premium artificial grass installation in Dublin.'),
    ).toBeInTheDocument();
  });

  it('renders Learn More link with correct href', () => {
    render(<LocationCard {...defaultProps} />);
    const learnMore = screen.getByRole('link', { name: /Learn More/ });
    expect(learnMore).toHaveAttribute('href', '/locations/dublin');
  });

  it('renders Get a Quote link with correct href including #quote-form anchor', () => {
    render(<LocationCard {...defaultProps} />);
    const getQuote = screen.getByRole('link', { name: /Get a Quote/ });
    expect(getQuote).toHaveAttribute('href', '/locations/dublin#quote-form');
    expect(getQuote.className).toContain('bg-sage');
    expect(getQuote.className).toContain('text-white');
  });

  it('different slugs generate correct hrefs', () => {
    render(
      <LocationCard
        city="Cork"
        description="Artificial turf services in Cork."
        slug="cork-city"
      />,
    );
    const learnMore = screen.getByRole('link', { name: /Learn More/ });
    const getQuote = screen.getByRole('link', { name: /Get a Quote/ });
    expect(learnMore).toHaveAttribute('href', '/locations/cork-city');
    expect(getQuote).toHaveAttribute('href', '/locations/cork-city#quote-form');
  });

  it('has left border accent (border-l-4)', () => {
    const { container } = render(<LocationCard {...defaultProps} />);
    const card = container.firstElementChild as HTMLElement;
    expect(card.className).toContain('border-l-4');
    expect(card.className).toContain('border-forest');
  });
});
