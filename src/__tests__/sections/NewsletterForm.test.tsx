import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import NewsletterForm from '../../components/forms/NewsletterForm';

describe('Footer contact resources', () => {
  it('offers working contact and guide links without collecting email or promising a subscription', () => {
    const { container } = render(<NewsletterForm />);
    expect(screen.getByRole('link', { name: 'Contact your local office' })).toHaveAttribute('href', '/locations');
    expect(screen.getByRole('link', { name: 'Read cleaning guides' })).toHaveAttribute('href', '/blog');
    expect(container.querySelector('form, input, button')).toBeNull();
    expect(container.textContent).not.toMatch(/subscrib|newsletter|email/i);
  });
});
