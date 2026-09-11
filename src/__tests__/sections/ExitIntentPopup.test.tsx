import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import ExitIntentPopup from '../../components/ExitIntentPopup';

describe('ExitIntentPopup', () => {
  it('does not render popup content initially', () => {
    render(<ExitIntentPopup />);

    expect(screen.queryByText('Wait! Get 10% Off Your First Cleaning Service')).not.toBeInTheDocument();
  });

  it('shows popup on mouseleave with clientY <= 0', () => {
    render(<ExitIntentPopup />);

    fireEvent.mouseLeave(document, { clientY: -10 });

    expect(screen.getByText('Wait! Get 10% Off Your First Cleaning Service')).toBeInTheDocument();
  });

  it('renders popup heading and CTA when visible', () => {
    render(<ExitIntentPopup />);

    fireEvent.mouseLeave(document, { clientY: 0 });

    expect(screen.getByText('Wait! Get 10% Off Your First Cleaning Service')).toBeInTheDocument();
    const ctaLink = screen.getByRole('link', { name: 'Find Your Local Office' });
    expect(ctaLink).toBeInTheDocument();
    expect(ctaLink).toHaveAttribute('href', '/locations');
  });

  it('close button hides popup', async () => {
    const user = userEvent.setup();
    render(<ExitIntentPopup />);

    fireEvent.mouseLeave(document, { clientY: -10 });
    expect(screen.getByText('Wait! Get 10% Off Your First Cleaning Service')).toBeInTheDocument();

    await user.click(screen.getByLabelText('Close popup'));

    await waitFor(() => {
      expect(screen.queryByText('Wait! Get 10% Off Your First Cleaning Service')).not.toBeInTheDocument();
    });
  });

  it('"No thanks" button hides popup', async () => {
    const user = userEvent.setup();
    render(<ExitIntentPopup />);

    fireEvent.mouseLeave(document, { clientY: -10 });
    expect(screen.getByText('Wait! Get 10% Off Your First Cleaning Service')).toBeInTheDocument();

    await user.click(screen.getByText("No thanks, I'll pass"));

    await waitFor(() => {
      expect(screen.queryByText('Wait! Get 10% Off Your First Cleaning Service')).not.toBeInTheDocument();
    });
  });

  it('only shows once', async () => {
    const user = userEvent.setup();
    render(<ExitIntentPopup />);

    // Trigger popup the first time
    fireEvent.mouseLeave(document, { clientY: -10 });
    expect(screen.getByText('Wait! Get 10% Off Your First Cleaning Service')).toBeInTheDocument();

    // Close it
    await user.click(screen.getByLabelText('Close popup'));
    await waitFor(() => {
      expect(screen.queryByText('Wait! Get 10% Off Your First Cleaning Service')).not.toBeInTheDocument();
    });

    // Trigger mouseleave again — popup should not appear
    fireEvent.mouseLeave(document, { clientY: -10 });
    expect(screen.queryByText('Wait! Get 10% Off Your First Cleaning Service')).not.toBeInTheDocument();
  });
});
