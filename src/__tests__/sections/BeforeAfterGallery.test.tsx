import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import BeforeAfterGallery from '@/components/sections/BeforeAfterGallery';

describe('BeforeAfterGallery', () => {
  it('renders section heading', () => {
    render(<BeforeAfterGallery />);
    expect(screen.getByText('See the Difference')).toBeInTheDocument();
  });

  it('renders subtitle', () => {
    render(<BeforeAfterGallery />);
    expect(
      screen.getByText('Real results from real facilities'),
    ).toBeInTheDocument();
  });

  it('renders before/after image with correct src and alt', () => {
    render(<BeforeAfterGallery />);
    const img = screen.getByAltText(
      "Professional commercial cleaning by Rangel Janitorial",
    );
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', '/images/gallery/our-work/rangel-17-6941b0a17109a80798658d66.png');
  });

  it('renders caption text', () => {
    render(<BeforeAfterGallery />);
    expect(
      screen.getByText(
        /30\+ years of experience delivering spotless facilities/,
      ),
    ).toBeInTheDocument();
  });
});
