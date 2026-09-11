import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { forwardRef } from 'react';
import type { LucideProps } from 'lucide-react';
import ServiceCard from '@/components/cards/ServiceCard';

const MockIcon = forwardRef<SVGSVGElement, LucideProps>(function MockIcon(props, ref) {
  return <svg ref={ref} data-testid="service-icon" {...props} />;
});

const defaultProps = {
  icon: MockIcon,
  name: 'Lawn Care',
  description: 'Professional lawn maintenance services.',
  slug: 'lawn-care',
};

describe('ServiceCard', () => {
  it('renders service name in heading', () => {
    render(<ServiceCard {...defaultProps} />);
    const heading = screen.getByRole('heading', { level: 3, name: 'Lawn Care' });
    expect(heading).toBeInTheDocument();
    expect(heading.className).toContain('font-heading');
    expect(heading.className).toContain('font-semibold');
    expect(heading.className).toContain('text-lg');
    expect(heading.className).toContain('text-charcoal');
    expect(heading.className).toContain('mb-2');
  });

  it('renders service description', () => {
    render(<ServiceCard {...defaultProps} />);
    expect(screen.getByText('Professional lawn maintenance services.')).toBeInTheDocument();
    const description = screen.getByText('Professional lawn maintenance services.');
    expect(description.tagName).toBe('P');
  });

  it('renders Learn More link with correct href using slug', () => {
    render(<ServiceCard {...defaultProps} />);
    const link = screen.getByRole('link', { name: /learn more/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/services/lawn-care');
  });

  it('renders icon with aria-hidden', () => {
    render(<ServiceCard {...defaultProps} />);
    const icon = screen.getByTestId('service-icon');
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveAttribute('aria-hidden', 'true');
    expect(icon).toHaveAttribute('size', '40');
  });

  it('different slugs generate correct hrefs', () => {
    const slugs = ['artificial-turf', 'hardscaping', 'irrigation-systems'];
    slugs.forEach((slug) => {
      const { unmount } = render(<ServiceCard {...defaultProps} slug={slug} />);
      const link = screen.getByRole('link', { name: /learn more/i });
      expect(link).toHaveAttribute('href', `/services/${slug}`);
      unmount();
    });
  });
});
