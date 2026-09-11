import { render, screen, within } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import ServiceOverview from '@/components/sections/ServiceOverview';
import services from '@/data/service-index.json';

describe('ServiceOverview', () => {
  it('renders a commercial-cleaning heading and every service', () => {
    render(<ServiceOverview />);
    expect(screen.getByRole('heading', { name: 'Our Commercial Cleaning Services' })).toBeInTheDocument();
    for (const service of services) expect(screen.getByRole('heading', { name: service.name })).toBeInTheDocument();
  });

  it('gives each service a useful description and its actual service-page link', () => {
    render(<ServiceOverview />);
    const links = screen.getAllByRole('link', { name: /Learn More/ });
    expect(links).toHaveLength(services.length);
    for (const service of services) {
      const heading = screen.getByRole('heading', { name: service.name });
      const card = heading.parentElement!;
      expect(card.querySelector('p')?.textContent?.trim().length).toBeGreaterThan(30);
      expect(within(card).getByRole('link', { name: /Learn More/ })).toHaveAttribute('href', `/services/${service.slug}`);
    }
  });
});
