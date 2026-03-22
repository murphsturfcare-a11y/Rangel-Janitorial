import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import StarRating from '@/components/ui/StarRating';

describe('StarRating', () => {
  it('renders correct aria-label for rating 4 out of 5', () => {
    render(<StarRating rating={4} />);
    const container = screen.getByRole('img');
    expect(container).toHaveAttribute('aria-label', '4 out of 5 stars');
  });

  it('renders 5 stars by default', () => {
    render(<StarRating rating={3} />);
    const container = screen.getByRole('img');
    // Each star is rendered as an SVG with aria-hidden="true"
    const stars = container.querySelectorAll(':scope > svg, :scope > span');
    expect(stars).toHaveLength(5);
  });

  it('renders all filled stars when rating equals maxStars', () => {
    render(<StarRating rating={5} />);
    const container = screen.getByRole('img');
    const svgs = container.querySelectorAll(':scope > svg');
    expect(svgs).toHaveLength(5);
    svgs.forEach((svg) => {
      expect(svg).toHaveClass('text-gold', 'fill-gold');
    });
  });

  it('renders all empty stars when rating is 0', () => {
    render(<StarRating rating={0} />);
    const container = screen.getByRole('img');
    const svgs = container.querySelectorAll(':scope > svg');
    expect(svgs).toHaveLength(5);
    svgs.forEach((svg) => {
      expect(svg).toHaveClass('text-gray-300');
      expect(svg).not.toHaveClass('fill-gold');
    });
  });

  it('renders 3 filled and 2 empty stars for rating of 3', () => {
    render(<StarRating rating={3} />);
    const container = screen.getByRole('img');
    const children = container.querySelectorAll(':scope > svg, :scope > span');
    expect(children).toHaveLength(5);

    // First 3 should be filled SVG stars
    const filledStars = Array.from(children).slice(0, 3);
    filledStars.forEach((star) => {
      expect(star.tagName.toLowerCase()).toBe('svg');
      expect(star).toHaveClass('text-gold', 'fill-gold');
    });

    // Last 2 should be empty SVG stars
    const emptyStars = Array.from(children).slice(3);
    emptyStars.forEach((star) => {
      expect(star.tagName.toLowerCase()).toBe('svg');
      expect(star).toHaveClass('text-gray-300');
      expect(star).not.toHaveClass('fill-gold');
    });
  });

  it('clamps rating above maxStars', () => {
    render(<StarRating rating={10} maxStars={5} />);
    const container = screen.getByRole('img');
    // Clamped rating should be 5, so aria-label reflects that
    expect(container).toHaveAttribute('aria-label', '5 out of 5 stars');
    // All 5 stars should be filled
    const svgs = container.querySelectorAll(':scope > svg');
    expect(svgs).toHaveLength(5);
    svgs.forEach((svg) => {
      expect(svg).toHaveClass('text-gold', 'fill-gold');
    });
  });

  it('clamps rating below 0', () => {
    render(<StarRating rating={-3} />);
    const container = screen.getByRole('img');
    // Clamped rating should be 0
    expect(container).toHaveAttribute('aria-label', '0 out of 5 stars');
    // All 5 stars should be empty
    const svgs = container.querySelectorAll(':scope > svg');
    expect(svgs).toHaveLength(5);
    svgs.forEach((svg) => {
      expect(svg).toHaveClass('text-gray-300');
    });
  });

  it('renders a partial star for fractional rating', () => {
    render(<StarRating rating={3.5} />);
    const container = screen.getByRole('img');
    expect(container).toHaveAttribute('aria-label', '3.5 out of 5 stars');

    const children = container.querySelectorAll(':scope > svg, :scope > span');
    expect(children).toHaveLength(5);

    // First 3 should be fully filled SVG stars
    for (let i = 0; i < 3; i++) {
      expect(children[i].tagName.toLowerCase()).toBe('svg');
      expect(children[i]).toHaveClass('text-gold', 'fill-gold');
    }

    // 4th star should be a partial star rendered inside a <span> wrapper
    const partialStar = children[3];
    expect(partialStar.tagName.toLowerCase()).toBe('span');
    // The partial star span should contain a clipPath for the fractional fill
    const clipPath = partialStar.querySelector('clipPath');
    expect(clipPath).not.toBeNull();

    // Last star should be empty
    expect(children[4].tagName.toLowerCase()).toBe('svg');
    expect(children[4]).toHaveClass('text-gray-300');
  });

  it('supports custom maxStars', () => {
    render(<StarRating rating={7} maxStars={10} />);
    const container = screen.getByRole('img');
    expect(container).toHaveAttribute('aria-label', '7 out of 10 stars');

    const children = container.querySelectorAll(':scope > svg, :scope > span');
    expect(children).toHaveLength(10);

    // First 7 should be filled
    for (let i = 0; i < 7; i++) {
      expect(children[i]).toHaveClass('text-gold', 'fill-gold');
    }

    // Last 3 should be empty
    for (let i = 7; i < 10; i++) {
      expect(children[i]).toHaveClass('text-gray-300');
    }
  });
});
