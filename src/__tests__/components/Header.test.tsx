import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import Header from '@/components/layout/Header';

describe('Header', () => {
  it('renders the logo with Rangel Janitorial text', () => {
    render(<Header />);
    const homeLinks = screen.getAllByLabelText(/Rangel Janitorial.*Home/i);
    expect(homeLinks.length).toBeGreaterThanOrEqual(1);
    expect(homeLinks[0]).toHaveAttribute('href', '/');
  });

  it('renders desktop navigation links (Home, Services, Locations, Blog)', () => {
    render(<Header />);
    const navLabels = ['Home', 'Services', 'Locations', 'Blog'];
    for (const label of navLabels) {
      const links = screen.getAllByText(label);
      expect(links.length).toBeGreaterThanOrEqual(1);
    }
  });

  it('renders Get Free Quote CTA button', () => {
    render(<Header />);
    const ctaLinks = screen.getAllByText('Get Free Quote');
    expect(ctaLinks.length).toBeGreaterThanOrEqual(1);
    expect(ctaLinks[0]).toHaveAttribute('href', '/locations');
  });

  it('renders mobile menu toggle button with aria-label "Open menu"', () => {
    render(<Header />);
    const openButton = screen.getByLabelText('Open menu');
    expect(openButton).toBeInTheDocument();
  });

  it('clicking Open menu shows the mobile drawer', () => {
    render(<Header />);
    const openButton = screen.getByLabelText('Open menu');
    fireEvent.click(openButton);
    const drawer = screen.getByRole('dialog');
    expect(drawer).toBeInTheDocument();
    expect(drawer).toHaveAttribute('aria-modal', 'true');
    expect(drawer).toHaveAttribute('aria-label', 'Mobile navigation');
  });

  it('mobile drawer has Close menu button', () => {
    render(<Header />);
    const openButton = screen.getByLabelText('Open menu');
    fireEvent.click(openButton);
    const closeButton = screen.getByLabelText('Close menu');
    expect(closeButton).toBeInTheDocument();
  });

  it('nav element has aria-label "Main navigation"', () => {
    render(<Header />);
    const nav = screen.getByRole('navigation', { name: 'Main navigation' });
    expect(nav).toBeInTheDocument();
  });
});
