import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Button from '@/components/ui/Button';

describe('Button', () => {
  it('renders with children text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument();
  });

  it('applies primary variant classes by default', () => {
    render(<Button>Primary</Button>);
    const button = screen.getByRole('button');
    expect(button.className).toContain('bg-forest');
    expect(button.className).toContain('text-white');
    expect(button.className).toContain('hover:bg-forest-dark');
    expect(button.className).toContain('focus:ring-forest/50');
  });

  it('applies secondary variant classes when specified', () => {
    render(<Button variant="secondary">Secondary</Button>);
    const button = screen.getByRole('button');
    expect(button.className).toContain('border-2');
    expect(button.className).toContain('border-forest');
    expect(button.className).toContain('text-forest');
    expect(button.className).toContain('bg-transparent');
  });

  it('applies correct size classes for sm', () => {
    render(<Button size="sm">Small</Button>);
    const button = screen.getByRole('button');
    expect(button.className).toContain('px-4');
    expect(button.className).toContain('py-2');
    expect(button.className).toContain('text-sm');
  });

  it('applies correct size classes for md (default)', () => {
    render(<Button>Medium</Button>);
    const button = screen.getByRole('button');
    expect(button.className).toContain('px-6');
    expect(button.className).toContain('py-3');
    expect(button.className).toContain('text-base');
  });

  it('applies correct size classes for lg', () => {
    render(<Button size="lg">Large</Button>);
    const button = screen.getByRole('button');
    expect(button.className).toContain('px-8');
    expect(button.className).toContain('py-4');
    expect(button.className).toContain('text-lg');
  });

  it('handles onClick callback', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click</Button>);
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('renders as anchor element when as="a"', () => {
    render(
      <Button as="a" href="https://example.com">
        Link
      </Button>,
    );
    const anchor = screen.getByRole('link', { name: 'Link' });
    expect(anchor.tagName).toBe('A');
    expect(anchor).toHaveAttribute('href', 'https://example.com');
  });

  it('disabled state adds disabled attribute and opacity class', () => {
    render(<Button disabled>Disabled</Button>);
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
    expect(button.className).toContain('opacity-50');
    expect(button.className).toContain('cursor-not-allowed');
  });

  it('loading state shows spinner SVG and sets aria-busy', () => {
    render(<Button loading>Loading</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-busy', 'true');
    const spinner = button.querySelector('svg');
    expect(spinner).toBeInTheDocument();
    expect(spinner).toHaveAttribute('aria-hidden', 'true');
  });

  it('loading state disables the button', () => {
    render(<Button loading>Loading</Button>);
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
    expect(button.className).toContain('opacity-50');
    expect(button.className).toContain('cursor-not-allowed');
  });

  it('passes through className prop', () => {
    render(<Button className="my-custom-class">Styled</Button>);
    const button = screen.getByRole('button');
    expect(button.className).toContain('my-custom-class');
  });

  it('anchor element gets aria-disabled when disabled', () => {
    render(
      <Button as="a" disabled href="#">
        Disabled Link
      </Button>,
    );
    const anchor = screen.getByRole('link', { name: 'Disabled Link' });
    expect(anchor).toHaveAttribute('aria-disabled', 'true');
    expect(anchor.className).toContain('opacity-50');
  });
});
