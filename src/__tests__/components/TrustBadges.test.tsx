import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import TrustBadges from '@/components/ui/TrustBadges';

describe('TrustBadges', () => {
  it('renders the trust badges section with correct aria-label', () => {
    render(<TrustBadges />);
    expect(
      screen.getByRole('region', { name: 'Trust badges' }),
    ).toBeInTheDocument();
  });

  it('renders all 4 badge labels', () => {
    render(<TrustBadges />);
    const section = screen.getByRole('region', { name: 'Trust badges' });
    const badges = section.querySelectorAll('.flex.items-center.gap-2');
    expect(badges).toHaveLength(4);
  });

  it("renders 'Licensed & Insured' text", () => {
    render(<TrustBadges />);
    expect(screen.getByText('Licensed & Insured')).toBeInTheDocument();
  });

  it("renders '5-Star Rated' text", () => {
    render(<TrustBadges />);
    expect(screen.getByText('5-Star Rated')).toBeInTheDocument();
  });

  it("renders '100% Satisfaction' text", () => {
    render(<TrustBadges />);
    expect(screen.getByText('100% Satisfaction')).toBeInTheDocument();
  });

  it("renders 'Eco-Friendly' text", () => {
    render(<TrustBadges />);
    expect(screen.getByText('Eco-Friendly')).toBeInTheDocument();
  });
});
