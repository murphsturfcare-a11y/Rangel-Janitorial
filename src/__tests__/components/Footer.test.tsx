import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

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
      { label: 'Janitorial Cleaning', href: '/services/janitorial-cleaning' },
      { label: 'Day Porter', href: '/services/day-porter' },
      { label: 'Electrostatic Disinfection', href: '/services/electrostatic-disinfection' },
      { label: 'Floor Care', href: '/services/floor-care' },
      { label: 'Office Cleaning', href: '/services/office-cleaning' },
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
      { label: 'Sacramento', href: '/locations/sacramento' },
      { label: 'Murrieta / Inland Empire', href: '/locations/murrieta' },
      { label: 'Walnut Creek / East Bay', href: '/locations/walnut-creek' },
    ];

    for (const { label, href } of locationLinks) {
      const link = screen.getByRole('link', { name: label });
      expect(link).toHaveAttribute('href', href);
    }
  });

  it('renders social media links (Instagram, Facebook, YouTube via aria-label)', () => {
    render(<Footer />);

    const instagram = screen.getByLabelText('Instagram');
    expect(instagram).toHaveAttribute('href', 'https://www.instagram.com/rangeljanitorial/');

    const facebook = screen.getByLabelText('Facebook');
    expect(facebook).toHaveAttribute('href', 'https://www.facebook.com/profile.php?id=100090088264095');

    const youtube = screen.getByLabelText('YouTube');
    expect(youtube).toHaveAttribute('href', 'https://www.youtube.com/@rangeljanitorial/featured');
  });

  it('renders company description text', () => {
    render(<Footer />);
    expect(
      screen.getByText(/California's trusted commercial cleaning experts/),
    ).toBeInTheDocument();
  });

  it('renders copyright text', () => {
    render(<Footer />);
    const year = new Date().getFullYear();
    expect(
      screen.getByText(new RegExp(`© ${year} Rangel Janitorial`)),
    ).toBeInTheDocument();
  });

  it('renders cleaning resources and legal links', () => {
    render(<Footer />);
    expect(
      screen.getByText('Cleaning Resources'),
    ).toBeInTheDocument();
    expect(screen.getByRole('link', {name: 'Privacy Policy'})).toHaveAttribute('href','/privacy-policy');
    expect(screen.getByRole('link', {name: 'Terms of Service'})).toHaveAttribute('href','/terms-of-service');
  });

  it('renders the logo image', () => {
    render(<Footer />);
    const logo = screen.getByAltText("Rangel Janitorial");
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute('src', '/images/logo-small.webp');
  });
});
