import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { QuoteWizardButton, QuoteWizardProvider } from '@/components/quote/QuoteWizard';

vi.mock('@/components/forms/LeadForm', () => ({
  default: () => <form><h3 tabIndex={-1} data-wizard-heading>Choose your facility</h3><input aria-label="Draft details" /><fieldset hidden><div role="alert" tabIndex={-1}>An error from a later step</div></fieldset></form>,
}));

const originalMethods = ['showModal', 'close'].map(name => [name, Object.getOwnPropertyDescriptor(HTMLDialogElement.prototype, name)] as const);

beforeEach(() => {
  // jsdom has dialog elements but does not implement the browser's top-layer API.
  Object.defineProperty(HTMLDialogElement.prototype, 'showModal', { configurable: true, value: function (this: HTMLDialogElement) { this.open = true; } });
  Object.defineProperty(HTMLDialogElement.prototype, 'close', { configurable: true, value: function (this: HTMLDialogElement) {
    this.open = false;
    this.dispatchEvent(new Event('close'));
  } });
});
afterEach(() => {
  cleanup();
  for (const [name, descriptor] of originalMethods) {
    if (descriptor) Object.defineProperty(HTMLDialogElement.prototype, name, descriptor);
    else Reflect.deleteProperty(HTMLDialogElement.prototype, name);
  }
  document.body.style.overflow = '';
});

function renderWizard() {
  return render(<QuoteWizardProvider regionSlug="walnut-creek">
    <QuoteWizardButton>Start quote</QuoteWizardButton>
    <QuoteWizardButton>Request quote below</QuoteWizardButton>
  </QuoteWizardProvider>);
}

describe('quote wizard dialog', () => {
  it('starts closed and focuses the visible question rather than a hidden error', () => {
    renderWizard();
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Start quote' }));
    const dialog = screen.getByRole('dialog', { name: 'Your free walkthrough' });
    expect(dialog).toHaveAttribute('open');
    expect(screen.getByRole('heading', { name: 'Choose your facility' })).toHaveFocus();
    expect(document.body.style.overflow).toBe('hidden');
    expect(screen.getByRole('button', { name: 'Start quote' })).toHaveAttribute('aria-controls', dialog.id);
  });

  it('preserves the draft, restores scroll and returns focus to the most recent launcher', () => {
    document.body.style.overflow = 'auto';
    renderWizard();
    fireEvent.click(screen.getByRole('button', { name: 'Start quote' }));
    fireEvent.change(screen.getByLabelText('Draft details'), { target: { value: 'Office in Concord' } });
    fireEvent.click(screen.getByRole('button', { name: 'Close quote wizard' }));
    expect(document.body.style.overflow).toBe('auto');
    expect(screen.getByRole('button', { name: 'Start quote' })).toHaveFocus();

    fireEvent.click(screen.getByRole('button', { name: 'Request quote below' }));
    expect(screen.getByLabelText('Draft details')).toHaveValue('Office in Concord');
    fireEvent.click(screen.getByRole('button', { name: 'Close quote wizard' }));
    expect(screen.getByRole('button', { name: 'Request quote below' })).toHaveFocus();
    expect(screen.getByRole('button', { name: 'Request quote below' })).toHaveAttribute('aria-expanded', 'false');
  });

  it('wraps Tab at both dialog boundaries without including hidden controls', () => {
    renderWizard();
    fireEvent.click(screen.getByRole('button', { name: 'Start quote' }));
    const close = screen.getByRole('button', { name: 'Close quote wizard' });
    const last = screen.getByLabelText('Draft details');
    close.focus();
    fireEvent.keyDown(close, { key: 'Tab', shiftKey: true });
    expect(last).toHaveFocus();
    fireEvent.keyDown(last, { key: 'Tab' });
    expect(close).toHaveFocus();
  });

  it('handles native close events and unlocks scrolling when the route unmounts', () => {
    const { unmount } = renderWizard();
    fireEvent.click(screen.getByRole('button', { name: 'Start quote' }));
    const dialog = screen.getByRole('dialog');
    fireEvent(dialog, new Event('close'));
    expect(document.body.style.overflow).toBe('');
    expect(screen.getByRole('button', { name: 'Start quote' })).toHaveFocus();
    (dialog as HTMLDialogElement).open = false;
    fireEvent.click(screen.getByRole('button', { name: 'Start quote' }));
    expect(document.body.style.overflow).toBe('hidden');
    unmount();
    expect(document.body.style.overflow).toBe('');
  });
});
