import { act, cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { QuoteWizardButton, QuoteWizardProvider } from '@/components/quote/QuoteWizard';

const fetchMock = vi.fn<typeof fetch>();
const accepted = vi.fn();
const originalMethods = ['showModal', 'close'].map(name => [name, Object.getOwnPropertyDescriptor(HTMLDialogElement.prototype, name)] as const);
beforeEach(() => {
  Object.defineProperty(HTMLDialogElement.prototype, 'showModal', { configurable: true, value: function (this: HTMLDialogElement) { this.open = true; } });
  Object.defineProperty(HTMLDialogElement.prototype, 'close', { configurable: true, value: function (this: HTMLDialogElement) { this.open = false; this.dispatchEvent(new Event('close')); } });
  localStorage.clear(); sessionStorage.clear(); delete window.rangelAdsConsent;
  fetchMock.mockReset(); accepted.mockReset(); vi.stubGlobal('fetch', fetchMock);
  window.addEventListener('rangel:lead-accepted', accepted);
});
afterEach(() => {
  cleanup(); vi.unstubAllGlobals(); vi.restoreAllMocks();
  for (const [name, descriptor] of originalMethods) {
    if (descriptor) Object.defineProperty(HTMLDialogElement.prototype, name, descriptor);
    else Reflect.deleteProperty(HTMLDialogElement.prototype, name);
  }
  window.removeEventListener('rangel:lead-accepted', accepted);
  document.body.style.overflow = '';
});
function renderWizard() {
  render(<QuoteWizardProvider regionSlug="murrieta"><QuoteWizardButton>Request a quote</QuoteWizardButton></QuoteWizardProvider>);
}
function open() { fireEvent.click(screen.getByRole('button', { name: 'Request a quote' })); }
function close() { fireEvent.click(screen.getByRole('button', { name: 'Close quote wizard' })); }
function finishChoices() {
  fireEvent.click(screen.getByRole('button', { name: 'Office Building' }));
  fireEvent.click(screen.getByRole('button', { name: 'Weekly' }));
}
function fill() {
  fireEvent.change(screen.getByLabelText(/First Name/), { target: { value: 'Jamie' } });
  fireEvent.change(screen.getByLabelText(/Last Name/), { target: { value: 'Test' } });
  fireEvent.change(screen.getByLabelText(/Phone/), { target: { value: '9515550100' } });
  fireEvent.change(screen.getByLabelText(/Email/), { target: { value: 'jamie@example.test' } });
  const consent = screen.getByRole('checkbox', { name: /I acknowledge the Privacy Policy/ });
  if (!(consent as HTMLInputElement).checked) fireEvent.click(consent);
}
function payload() { return JSON.parse(fetchMock.mock.calls[0][1]?.body as string); }
function deferRequest() {
  let resolve!: (response: Response) => void;
  fetchMock.mockReturnValue(new Promise<Response>(done => { resolve = done; }));
  return (response: Response) => act(async () => resolve(response));
}

describe('real quote dialog with the lead wizard', () => {
  it('preserves in-flight state through close/reopen and focuses one accepted result while open', async () => {
    const resolve = deferRequest(); renderWizard(); open(); finishChoices(); fill();
    fireEvent.click(screen.getByRole('button', { name: 'Request my free walkthrough' }));
    close(); expect(screen.getByRole('button', { name: 'Request a quote' })).toHaveFocus();
    open();
    expect(screen.getByRole('button', { name: 'Submitting...' })).toBeDisabled();
    expect(screen.getByLabelText(/Email/)).toHaveValue('jamie@example.test');
    expect(screen.getByRole('checkbox', { name: /I acknowledge the Privacy Policy/ })).toBeChecked();
    fireEvent.submit(screen.getByRole('form'));
    expect(fetchMock).toHaveBeenCalledTimes(1);
    await resolve(Response.json({ success: true, outcome: 'accepted', submissionId: payload().submissionId }));
    expect(screen.getByRole('status')).toHaveFocus();
    expect(accepted).toHaveBeenCalledTimes(1);
    close(); open();
    expect(screen.getByRole('status')).toHaveTextContent('Walkthrough Request Received');
    expect(screen.getByRole('status')).toHaveFocus();
    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(accepted).toHaveBeenCalledTimes(1);
  });

  it('a success received while closed does not steal launcher focus and is focused on reopening', async () => {
    const resolve = deferRequest(); renderWizard(); open(); finishChoices(); fill();
    fireEvent.click(screen.getByRole('button', { name: 'Request my free walkthrough' })); close();
    await resolve(Response.json({ success: true, outcome: 'accepted', submissionId: payload().submissionId }));
    expect(screen.queryByRole('dialog')).toBeNull();
    expect(screen.getByRole('button', { name: 'Request a quote' })).toHaveFocus();
    expect(accepted).toHaveBeenCalledTimes(1);
    open(); expect(screen.getByRole('status')).toHaveFocus();
    expect(accepted).toHaveBeenCalledTimes(1);
  });

  it('an unknown receipt stays locked after close/reopen, with draft and call fallback intact', async () => {
    const resolve = deferRequest(); renderWizard(); open(); finishChoices(); fill();
    fireEvent.click(screen.getByRole('button', { name: 'Request my free walkthrough' })); close();
    await resolve(Response.json({ success: true, outcome: 'accepted', submissionId: 'wrong-reference' }));
    expect(screen.getByRole('button', { name: 'Request a quote' })).toHaveFocus();
    open();
    expect(screen.getByRole('alert')).toHaveFocus();
    expect(screen.getByRole('alert')).toHaveTextContent('could not confirm receipt');
    expect(screen.getByLabelText(/Email/)).toHaveValue('jamie@example.test');
    expect(screen.getByRole('button', { name: 'Request my free walkthrough' })).toBeDisabled();
    expect(screen.getByRole('link', { name: /Call/ })).toHaveAttribute('href', 'tel:+19518944222');
    fireEvent.submit(screen.getByRole('form'));
    await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(1));
    expect(accepted).not.toHaveBeenCalled();
  });

  it('retains a partial draft and chosen answers while closing and using Back', () => {
    renderWizard(); open(); finishChoices(); fill(); close(); open();
    expect(screen.getByRole('heading', { name: 'How can we arrange your walkthrough?' })).toHaveFocus();
    fireEvent.click(screen.getByRole('button', { name: 'Back to cleaning frequency' }));
    expect(screen.getByRole('button', { name: 'Weekly' })).toHaveAttribute('aria-pressed', 'true');
    close(); open();
    expect(screen.getByRole('heading', { name: 'How often do you need cleaning?' })).toHaveFocus();
    fireEvent.click(screen.getByRole('button', { name: 'Weekly' }));
    expect(screen.getByLabelText(/Email/)).toHaveValue('jamie@example.test');
    expect(fetchMock).not.toHaveBeenCalled();
    expect(accepted).not.toHaveBeenCalled();
  });

  it('keeps the contact draft while editing summary answers and sends only the revised choices', async () => {
    const resolve = deferRequest(); renderWizard(); open(); finishChoices(); fill();
    fireEvent.change(screen.getByLabelText(/Company, facility city/), { target: { value: 'Acme, Murrieta; evening cleaning.' } });
    expect(screen.getByRole('group', { name: 'Your cleaning details' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /^Change facility type/ })).toHaveTextContent('Office Building');
    expect(screen.getByRole('button', { name: /^Change cleaning frequency/ })).toHaveTextContent('Weekly');
    expect(screen.getByRole('button', { name: /^Change facility type/ })).toHaveAccessibleName(/Office Building/);
    expect(screen.getByRole('button', { name: /^Change cleaning frequency/ })).toHaveAccessibleName(/Weekly/);

    fireEvent.click(screen.getByRole('button', { name: /^Change facility type/ }));
    expect(screen.getByRole('heading', { name: 'What type of facility needs cleaning?' })).toHaveFocus();
    expect(screen.getByLabelText(/Email/)).toBeDisabled();
    fireEvent.click(screen.getByRole('button', { name: 'Medical / Dental' }));
    expect(screen.getByRole('button', { name: 'Weekly' })).toHaveAttribute('aria-pressed', 'true');
    fireEvent.click(screen.getByRole('button', { name: 'Monthly' }));

    fireEvent.click(screen.getByRole('button', { name: /^Change cleaning frequency/ }));
    expect(screen.getByRole('heading', { name: 'How often do you need cleaning?' })).toHaveFocus();
    fireEvent.click(screen.getByRole('button', { name: 'One-Time Deep Clean' }));
    close(); open();
    expect(screen.getByRole('button', { name: /^Change facility type/ })).toHaveTextContent('Medical / Dental');
    expect(screen.getByRole('button', { name: /^Change cleaning frequency/ })).toHaveTextContent('One-Time Deep Clean');
    expect(screen.getByRole('button', { name: /^Change facility type/ })).toHaveAccessibleName(/Medical \/ Dental/);
    expect(screen.getByRole('button', { name: /^Change cleaning frequency/ })).toHaveAccessibleName(/One-Time Deep Clean/);
    expect(screen.getByLabelText(/First Name/)).toHaveValue('Jamie');
    expect(screen.getByLabelText(/Last Name/)).toHaveValue('Test');
    expect(screen.getByLabelText(/Phone/)).toHaveValue('9515550100');
    expect(screen.getByLabelText(/Email/)).toHaveValue('jamie@example.test');
    expect(screen.getByLabelText(/Company, facility city/)).toHaveValue('Acme, Murrieta; evening cleaning.');
    const draft = new FormData(screen.getByRole('form') as HTMLFormElement);
    expect(draft.getAll('facilityType')).toEqual(['Medical / Dental']);
    expect(draft.getAll('frequency')).toEqual(['One-Time Deep Clean']);
    expect(fetchMock).not.toHaveBeenCalled();
    expect(accepted).not.toHaveBeenCalled();

    fireEvent.click(screen.getByRole('button', { name: 'Request my free walkthrough' }));
    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(payload()).toMatchObject({
      regionSlug: 'murrieta', sourcePage: '/quote/murrieta', formPlacement: 'hero',
      requestType: 'walkthrough', requestConsent: { noticeVersion: 'request-followup-v1', privacyAcknowledged: true, followUpRequested: true },
      facilityType: 'Medical / Dental', frequency: 'One-Time Deep Clean',
      firstName: 'Jamie', lastName: 'Test', phone: '9515550100', email: 'jamie@example.test',
      message: 'Acme, Murrieta; evening cleaning.',
    });
    await resolve(Response.json({ success: true, outcome: 'accepted', submissionId: payload().submissionId }));
    expect(accepted).toHaveBeenCalledTimes(1);
  });

  it('locks summary edits during delivery and after an unknown result, including after reopening', async () => {
    const resolve = deferRequest(); renderWizard(); open(); finishChoices(); fill();
    fireEvent.click(screen.getByRole('button', { name: 'Request my free walkthrough' }));
    for (const name of [/^Change facility type/, /^Change cleaning frequency/]) {
      const edit = screen.getByRole('button', { name });
      expect(edit).toHaveAttribute('type', 'button');
      expect(edit).toBeDisabled();
      fireEvent.click(edit);
    }
    expect(screen.getByRole('heading', { name: 'How can we arrange your walkthrough?' })).toBeInTheDocument();
    close(); open();
    expect(screen.getByRole('button', { name: /^Change facility type/ })).toBeDisabled();
    expect(screen.getByRole('button', { name: /^Change cleaning frequency/ })).toBeDisabled();
    expect(fetchMock).toHaveBeenCalledTimes(1);

    await resolve(Response.json({ success: false, outcome: 'unknown', submissionId: payload().submissionId }));
    close(); open();
    for (const name of [/^Change facility type/, /^Change cleaning frequency/]) {
      const edit = screen.getByRole('button', { name });
      expect(edit).toBeDisabled();
      fireEvent.click(edit);
    }
    expect(screen.getByRole('heading', { name: 'How can we arrange your walkthrough?' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Request my free walkthrough' })).toBeDisabled();
    expect(screen.getByLabelText(/Email/)).toHaveValue('jamie@example.test');
    fireEvent.submit(screen.getByRole('form'));
    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(accepted).not.toHaveBeenCalled();
  });

  it('advances one step per decorative icon click without submitting or recording acceptance', () => {
    renderWizard(); open();
    const facility = screen.getByRole('button', { name: 'Office Building' });
    const facilityIcon = facility.querySelector('svg')!;
    expect(facilityIcon).toHaveAttribute('aria-hidden', 'true');
    expect(facility).toHaveAccessibleName('Office Building');
    fireEvent.click(facilityIcon);
    expect(screen.getByText('Step 2 of 3')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'How often do you need cleaning?' })).toHaveFocus();
    expect(screen.getByLabelText(/Email/)).toBeDisabled();
    expect(fetchMock).not.toHaveBeenCalled();
    expect(accepted).not.toHaveBeenCalled();

    const frequency = screen.getByRole('button', { name: 'Weekly' });
    const frequencyIcon = frequency.querySelector('svg')!;
    expect(frequencyIcon).toHaveAttribute('aria-hidden', 'true');
    fireEvent.click(frequencyIcon);
    expect(screen.getByText('Step 3 of 3')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'How can we arrange your walkthrough?' })).toHaveFocus();
    const draft = new FormData(screen.getByRole('form') as HTMLFormElement);
    expect(draft.getAll('facilityType')).toEqual(['Office Building']);
    expect(draft.getAll('frequency')).toEqual(['Weekly']);
    expect(fetchMock).not.toHaveBeenCalled();
    expect(accepted).not.toHaveBeenCalled();
  });
});
