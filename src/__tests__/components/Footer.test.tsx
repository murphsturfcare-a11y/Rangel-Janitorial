import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

vi.mock('next/link', () => ({
  default: ({ children, href, ...props }: any) => <a href={href} {...props}>{children}</a>,
}));
vi.mock('next/image', () => ({
  default: (props: any) => <img {...props} />,
}));
vi.mock('@/components/forms/NewsletterForm', () => ({
  default: () => <div data-testid="newsletter-form">Newsletter Form</div>,
}));

import Footer from '@/components/layout/Footer';

describe('Footer', () => {
  it('renders footer with role="contentinfo"', () => {
    render(<Footer />);
    const footer = screen.getByRole('contentinfo');
    expect(footer).toBeInTheDocument();
  });

  it('renders Our Services heading and all service links', () => {
    render(<Footer />);
    expect(screen.getByText('Our Services')).toBeInTheDocument();

    const serviceLinks = [
      { label: 'Pet Hair & Debris Removal', href: '/services/pet-hair-debris' },
      { label: 'Blooming & De-Compacting', href: '/services/blooming-decompacting' },
      { label: 'Disinfect & Deodorize', href: '/services/disinfect-deodorize' },
      { label: 'Poop Scooping & Removal', href: '/services/poop-scooping' },
      { label: 'Powered By OxyTurf', href: '/services/oxyturf' },
    ];

    for (const { label, href } of serviceLinks) {
      const link = screen.getByRole('link', { name: label });
      expect(link).toHaveAttribute('href', href);
    }
  });

  it('renders Service Areas heading and all location links', () => {
    render(<Footer />);
    expect(screen.getByText('Service Areas')).toBeInTheDocument();

    const locationLinks = [
      { label: 'Huntington Beach / LA Area', href: '/locations/huntington-beach' },
      { label: 'Murrieta / Inland Empire', href: '/locations/murrieta' },
      { label: 'Martinez / Bay Area', href: '/locations/martinez' },
      { label: 'Greater Sacramento', href: '/locations/sacramento' },
    ];

    for (const { label, href } of locationLinks) {
      const link = screen.getByRole('link', { name: label });
      expect(link).toHaveAttribute('href', href);
    }
  });

  it('renders social media links (Instagram, Facebook, YouTube via aria-label)', () => {
    render(<Footer />);

    const instagram = screen.getByLabelText('Instagram');
    expect(instagram).toHaveAttribute('href', 'https://www.instagram.com/murphysturfcare/');

    const facebook = screen.getByLabelText('Facebook');
    expect(facebook).toHaveAttribute('href', 'https://www.facebook.com/profile.php?id=100090088264095');

    const youtube = screen.getByLabelText('YouTube');
    expect(youtube).toHaveAttribute('href', 'https://www.youtube.com/@murphysturfcare/featured');
  });

  it('renders company description text', () => {
    render(<Footer />);
    expect(
      screen.getByText(/California's trusted artificial turf cleaning experts/),
    ).toBeInTheDocument();
  });

  it('renders copyright text', () => {
    render(<Footer />);
    const year = new Date().getFullYear();
    expect(
      screen.getByText(new RegExp(`© ${year} Murphy's Turf`)),
    ).toBeInTheDocument();
  });

  it('renders newsletter section heading', () => {
    render(<Footer />);
    expect(
      screen.getByText('Stay Updated with Turf Care Tips'),
    ).toBeInTheDocument();
  });

  it('renders the logo image', () => {
    render(<Footer />);
    const logo = screen.getByAltText("Murphy's Turf");
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute('src', '/images/logo.png');
  });
});
