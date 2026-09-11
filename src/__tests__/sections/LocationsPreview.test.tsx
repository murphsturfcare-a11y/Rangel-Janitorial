import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import LocationsPreview from '@/components/sections/LocationsPreview';

describe('LocationsPreview', () => {
  it('renders section heading', () => {
    render(<LocationsPreview />);
    expect(
      screen.getByText('Serving California Businesses'),
    ).toBeInTheDocument();
  });

  it('renders subtitle', () => {
    render(<LocationsPreview />);
    expect(
      screen.getByText(
        'Professional commercial cleaning in your area',
      ),
    ).toBeInTheDocument();
  });

  it('renders all 3 location city names', () => {
    render(<LocationsPreview />);
    expect(
      screen.getByText('Sacramento'),
    ).toBeInTheDocument();
    expect(
      screen.getByText('Murrieta / Inland Empire'),
    ).toBeInTheDocument();
    expect(screen.getByText('Walnut Creek / East Bay')).toBeInTheDocument();
  });

  it('renders "Learn More" links for each location', () => {
    render(<LocationsPreview />);
    const learnMoreLinks = screen.getAllByText(/Learn More/);
    expect(learnMoreLinks).toHaveLength(3);

    const slugs = [
      'sacramento',
      'murrieta',
      'walnut-creek',
    ];
    for (const slug of slugs) {
      const link = screen
        .getAllByText(/Learn More/)
        .find((el) => el.closest('a')?.getAttribute('href') === `/locations/${slug}`);
      expect(link).toBeDefined();
    }
  });

  it('renders "Get a Quote" links for each location', () => {
    render(<LocationsPreview />);
    const quoteLinks = screen.getAllByText(/Get a Quote/);
    expect(quoteLinks).toHaveLength(3);

    const slugs = [
      'sacramento',
      'murrieta',
      'walnut-creek',
    ];
    for (const slug of slugs) {
      const link = screen
        .getAllByText(/Get a Quote/)
        .find(
          (el) =>
            el.closest('a')?.getAttribute('href') ===
            `/locations/${slug}#quote-form`,
        );
      expect(link).toBeDefined();
    }
  });

  it('renders map placeholder text', () => {
    render(<LocationsPreview />);
    expect(
      screen.getByText('Interactive Map Coming Soon'),
    ).toBeInTheDocument();
  });
});
