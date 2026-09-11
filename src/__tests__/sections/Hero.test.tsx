import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Hero from '@/components/sections/Hero';

describe('Hero', () => {
  it('renders the headline text', () => {
    render(<Hero />);
    const headlineWords = ['Creating', 'Excellent', 'First', 'Impressions', 'Every', 'Day'];
    for (const word of headlineWords) {
      expect(screen.getByText(word)).toBeInTheDocument();
    }
  });

  it('renders CTA button with correct href', () => {
    render(<Hero />);
    const cta = screen.getByText('Get Your Free Quote');
    expect(cta).toBeInTheDocument();
    expect(cta.closest('a')).toHaveAttribute('href', '/locations');
  });

  it('renders hero image', () => {
    render(<Hero />);
    const img = screen.getByAltText('Professional commercial cleaning by Rangel Janitorial');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', '/images/hero.jpg');
  });

  it('renders all stats labels', () => {
    render(<Hero />);
    expect(screen.getByText('Years Experience')).toBeInTheDocument();
    expect(screen.getByText('Happy Clients')).toBeInTheDocument();
    expect(screen.getByText('Satisfaction Rate')).toBeInTheDocument();
    expect(screen.getByText('Facilities Cleaned')).toBeInTheDocument();
  });

  it('renders subtitle text', () => {
    render(<Hero />);
    expect(
      screen.getByText(/Rangel Janitorial provides reliable, professional commercial cleaning/),
    ).toBeInTheDocument();
  });
});
