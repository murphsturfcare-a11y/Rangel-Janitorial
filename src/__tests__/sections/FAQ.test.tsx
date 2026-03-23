import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import FAQ from '@/components/sections/FAQ';

const defaultQuestions = [
  'How much does artificial turf cleaning cost?',
  'How often should I have my turf cleaned?',
  'Do you offer free estimates?',
  'Is your cleaning solution safe for pets and children?',
  'What areas do you serve?',
  "What if I'm not satisfied with the service?",
];

describe('FAQ', () => {
  it('renders section heading', () => {
    render(<FAQ />);
    expect(
      screen.getByRole('heading', { name: /frequently asked questions/i })
    ).toBeInTheDocument();
  });

  it('renders all 6 FAQ questions', () => {
    render(<FAQ />);
    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(6);
    for (const question of defaultQuestions) {
      expect(screen.getByText(question)).toBeInTheDocument();
    }
  });

  it('all items start collapsed', () => {
    render(<FAQ />);
    const buttons = screen.getAllByRole('button');
    for (const button of buttons) {
      expect(button).toHaveAttribute('aria-expanded', 'false');
    }
  });

  it('clicking a question expands it', async () => {
    const user = userEvent.setup();
    render(<FAQ />);
    const firstButton = screen.getByRole('button', {
      name: /how much does artificial turf cleaning cost/i,
    });

    await user.click(firstButton);

    expect(firstButton).toHaveAttribute('aria-expanded', 'true');
  });

  it('clicking an expanded question collapses it', async () => {
    const user = userEvent.setup();
    render(<FAQ />);
    const firstButton = screen.getByRole('button', {
      name: /how much does artificial turf cleaning cost/i,
    });

    await user.click(firstButton);
    expect(firstButton).toHaveAttribute('aria-expanded', 'true');

    await user.click(firstButton);
    expect(firstButton).toHaveAttribute('aria-expanded', 'false');
  });

  it('only one item is open at a time (accordion behavior)', async () => {
    const user = userEvent.setup();
    render(<FAQ />);
    const buttons = screen.getAllByRole('button');

    await user.click(buttons[0]);
    expect(buttons[0]).toHaveAttribute('aria-expanded', 'true');

    await user.click(buttons[2]);
    expect(buttons[0]).toHaveAttribute('aria-expanded', 'false');
    expect(buttons[2]).toHaveAttribute('aria-expanded', 'true');
  });

  it('accepts custom items prop', () => {
    const customItems = [
      { question: 'Custom question one?', answer: 'Custom answer one.' },
      { question: 'Custom question two?', answer: 'Custom answer two.' },
    ];
    render(<FAQ items={customItems} />);

    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(2);
    expect(screen.getByText('Custom question one?')).toBeInTheDocument();
    expect(screen.getByText('Custom question two?')).toBeInTheDocument();
  });
});
