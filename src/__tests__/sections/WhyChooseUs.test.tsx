import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import WhyChooseUs from '@/components/sections/WhyChooseUs';

describe('WhyChooseUs', () => {
  it('renders section heading', () => {
    render(<WhyChooseUs />);
    expect(
      screen.getByRole('heading', { name: /why choose rangel janitorial/i })
    ).toBeInTheDocument();
  });

  it('renders all 3 benefit titles', () => {
    render(<WhyChooseUs />);
    expect(screen.getByText('Reliable, Professional Crews')).toBeInTheDocument();
    expect(screen.getByText('Fully Bonded & Insured')).toBeInTheDocument();
    expect(screen.getByText('Satisfaction Guaranteed')).toBeInTheDocument();
  });

  it('renders all 3 benefit descriptions', () => {
    render(<WhyChooseUs />);
    expect(
      screen.getByText(
        /Every team member is thoroughly trained and vetted/i
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        /We carry comprehensive liability insurance and bonding/i
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        /not happy with our work\? we.ll come back and make it right/i
      )
    ).toBeInTheDocument();
  });

  it('renders icons with aria-hidden', () => {
    const { container } = render(<WhyChooseUs />);
    const hiddenIcons = container.querySelectorAll('[aria-hidden="true"]');
    expect(hiddenIcons.length).toBe(3);
  });
});
