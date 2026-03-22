import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

vi.mock('next/link', () => ({
  default: ({ children, href, ...props }: any) => <a href={href} {...props}>{children}</a>,
}));
vi.mock('@/components/seo/JsonLd', () => ({
  JsonLd: () => null,
}));
vi.mock('@/lib/seo/schema', () => ({
  generateBreadcrumbSchema: vi.fn(() => ({})),
}));
vi.mock('@/lib/seo/constants', () => ({
  SITE_URL: 'https://murphysturf.com',
}));

import { Breadcrumbs } from '@/components/seo/Breadcrumbs';

const multipleItems = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'Pet Hair', href: '/services/pet-hair' },
];

describe('Breadcrumbs', () => {
  it('renders nav with aria-label="Breadcrumb"', () => {
    render(<Breadcrumbs items={multipleItems} />);
    const nav = screen.getByRole('navigation', { name: 'Breadcrumb' });
    expect(nav).toBeInTheDocument();
  });

  it('renders all breadcrumb item labels', () => {
    render(<Breadcrumbs items={multipleItems} />);
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Services')).toBeInTheDocument();
    expect(screen.getByText('Pet Hair')).toBeInTheDocument();
  });

  it('last item has aria-current="page"', () => {
    render(<Breadcrumbs items={multipleItems} />);
    const lastItem = screen.getByText('Pet Hair');
    expect(lastItem).toHaveAttribute('aria-current', 'page');
    expect(lastItem.tagName).toBe('SPAN');
    expect(lastItem).toHaveClass('text-gray-900');
  });

  it('non-last items are links with correct hrefs', () => {
    render(<Breadcrumbs items={multipleItems} />);

    const homeLink = screen.getByRole('link', { name: 'Home' });
    expect(homeLink).toHaveAttribute('href', '/');
    expect(homeLink).toHaveClass('hover:text-gray-700');

    const servicesLink = screen.getByRole('link', { name: 'Services' });
    expect(servicesLink).toHaveAttribute('href', '/services');
    expect(servicesLink).toHaveClass('hover:text-gray-700');
  });

  it('separators (/) appear between items', () => {
    render(<Breadcrumbs items={multipleItems} />);
    const separators = screen.getAllByText('/');
    expect(separators).toHaveLength(2);
    separators.forEach((sep) => {
      expect(sep).toHaveAttribute('aria-hidden', 'true');
    });
  });

  it('single item renders without separator', () => {
    render(<Breadcrumbs items={[{ label: 'Home', href: '/' }]} />);
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.queryAllByText('/')).toHaveLength(0);
  });

  it('renders correctly with multiple items (Home -> Services -> Pet Hair)', () => {
    render(<Breadcrumbs items={multipleItems} />);

    const listItems = screen.getAllByRole('listitem');
    expect(listItems).toHaveLength(3);

    // First item: link, no separator
    const homeLink = screen.getByRole('link', { name: 'Home' });
    expect(homeLink).toBeInTheDocument();

    // Second item: link, has separator
    const servicesLink = screen.getByRole('link', { name: 'Services' });
    expect(servicesLink).toBeInTheDocument();

    // Last item: span with aria-current, not a link
    const petHair = screen.getByText('Pet Hair');
    expect(petHair).toHaveAttribute('aria-current', 'page');
    expect(screen.queryByRole('link', { name: 'Pet Hair' })).toBeNull();

    // Two separators total
    const separators = screen.getAllByText('/');
    expect(separators).toHaveLength(2);
  });
});
