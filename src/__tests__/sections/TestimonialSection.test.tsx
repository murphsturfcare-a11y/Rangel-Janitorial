import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import TestimonialSection from '@/components/sections/TestimonialSection';

describe('TestimonialSection', () => {
  it('renders section heading', () => {
    render(<TestimonialSection />);
    expect(
      screen.getByText('What Our Clients Say')
    ).toBeInTheDocument();
  });

  it('renders rating summary text', () => {
    render(<TestimonialSection />);
    expect(
      screen.getByText('4.9 out of 5 based on 200+ reviews')
    ).toBeInTheDocument();
  });

  it('renders all 3 testimonial names', () => {
    render(<TestimonialSection />);
    expect(screen.getByText('Sarah Johnson')).toBeInTheDocument();
    expect(screen.getByText('Mike Rodriguez')).toBeInTheDocument();
    expect(screen.getByText('Jennifer Walsh')).toBeInTheDocument();
  });

  it('renders all 3 testimonial locations', () => {
    render(<TestimonialSection />);
    expect(screen.getByText('Murrieta, CA')).toBeInTheDocument();
    expect(screen.getByText('Sacramento, CA')).toBeInTheDocument();
    expect(screen.getByText('Walnut Creek, CA')).toBeInTheDocument();
  });

  it('renders testimonial quotes', () => {
    render(<TestimonialSection />);
    expect(
      screen.getByText(
        /Rangel Janitorial keeps our corporate offices immaculate/
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        /Best commercial cleaning service in California/
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        /Incredible attention to detail/
      )
    ).toBeInTheDocument();
  });
});
