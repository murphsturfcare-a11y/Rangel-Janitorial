import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import TestimonialCard from '@/components/cards/TestimonialCard';

const defaultProps = {
  rating: 5,
  quote: 'Amazing service and beautiful results!',
  name: 'John Murphy',
  location: 'Dublin, Ireland',
};

describe('TestimonialCard', () => {
  it('renders customer name', () => {
    render(<TestimonialCard {...defaultProps} />);
    expect(screen.getByText('John Murphy')).toBeInTheDocument();
  });

  it('renders customer location', () => {
    render(<TestimonialCard {...defaultProps} />);
    expect(screen.getByText('Dublin, Ireland')).toBeInTheDocument();
  });

  it('renders review quote text', () => {
    render(<TestimonialCard {...defaultProps} />);
    expect(
      screen.getByText(
        (_, element) =>
          element?.textContent ===
          '\u201CAmazing service and beautiful results!\u201D',
      ),
    ).toBeInTheDocument();
  });

  it('renders StarRating with correct rating', () => {
    render(<TestimonialCard {...defaultProps} />);
    const starRating = screen.getByRole('img', {
      name: '5 out of 5 stars',
    });
    expect(starRating).toBeInTheDocument();
  });

  it('renders with different ratings', () => {
    const { rerender } = render(
      <TestimonialCard {...defaultProps} rating={3} />,
    );
    expect(
      screen.getByRole('img', { name: '3 out of 5 stars' }),
    ).toBeInTheDocument();

    rerender(<TestimonialCard {...defaultProps} rating={4} />);
    expect(
      screen.getByRole('img', { name: '4 out of 5 stars' }),
    ).toBeInTheDocument();

    rerender(<TestimonialCard {...defaultProps} rating={1} />);
    expect(
      screen.getByRole('img', { name: '1 out of 5 stars' }),
    ).toBeInTheDocument();
  });

  it('has blockquote element for the review', () => {
    render(<TestimonialCard {...defaultProps} />);
    const blockquote = document.querySelector('blockquote');
    expect(blockquote).toBeInTheDocument();
    expect(blockquote?.textContent).toContain(
      'Amazing service and beautiful results!',
    );
  });
});
