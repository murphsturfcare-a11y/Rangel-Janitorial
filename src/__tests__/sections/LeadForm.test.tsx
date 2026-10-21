vi.hoisted(() => { process.env.NEXT_PUBLIC_GOOGLE_ADS_ID = 'AW-123456789'; process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL = 'test_label'; });
import { act, cleanup, fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { ADS_CONSENT_KEY, getAdsConsent } from '@/lib/analytics/gtag';
import { REQUEST_FOLLOWUP_NOTICE_VERSION } from '@/lib/leads';
import LeadForm from '@/components/forms/LeadForm';

const fetchMock = vi.fn<typeof fetch>();
const acceptedEvent = vi.fn();
const startedEvent = vi.fn();

function fill(container: HTMLElement = document.body) {
  const scope = within(container);
  fireEvent.change(scope.getByLabelText(/First Name/), { target: { value: 'Jamie' } });
  fireEvent.change(scope.getByLabelText(/Last Name/), { target: { value: "O'Neil" } });
  fireEvent.change(scope.getByLabelText(/Phone/), { target: { value: '(951) 555-0100' } });
  fireEvent.change(scope.getByLabelText(/Email/), { target: { value: 'jamie@example.test' } });
  const consent = scope.getByRole('checkbox', { name: /I acknowledge the Privacy Policy/ });
  if (!(consent as HTMLInputElement).checked) fireEvent.click(consent);
}
function submit() { fireEvent.submit(screen.getByRole('form')); }
function accept() {
  fetchMock.mockImplementation(async (_url, options) => {
    const payload = JSON.parse(options?.body as string);
    return Response.json({ success: true, outcome: 'accepted', submissionId: payload.submissionId });
  });
}

beforeEach(() => {
  vi.stubGlobal('fetch', fetchMock);
  fetchMock.mockReset();
  acceptedEvent.mockReset();
  startedEvent.mockReset();
  sessionStorage.clear();
  localStorage.clear();
  delete window.rangelAdsConsent;
  window.history.replaceState({}, '', '/');
  window.addEventListener('rangel:lead-accepted', acceptedEvent);
  window.addEventListener('rangel:lead-started', startedEvent);
});
afterEach(() => {
  cleanup();
  window.removeEventListener('rangel:lead-accepted', acceptedEvent);
  window.removeEventListener('rangel:lead-started', startedEvent);
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe('LeadForm', () => {
  it.each(['standard', 'compact', 'wizard'] as const)('requires a fresh request acknowledgment in the %s form without granting advertising consent', variant => {
    render(<LeadForm regionSlug="murrieta" variant={variant} />);
    if (variant === 'wizard') {
      expect(screen.queryByRole('checkbox', { name: /I acknowledge/ })).not.toBeInTheDocument();
      fireEvent.click(screen.getByRole('button', { name: 'Office Building' }));
      fireEvent.click(screen.getByRole('button', { name: 'Weekly' }));
    }
    const acknowledgment = screen.getByRole('checkbox', { name: /I acknowledge the Privacy Policy/ });
    expect(acknowledgment).toBeRequired();
    expect(acknowledgment).not.toBeChecked();
    fireEvent.click(acknowledgment);
    expect(getAdsConsent()).toBeNull();
    expect(fetchMock).not.toHaveBeenCalled();
    expect(acceptedEvent).not.toHaveBeenCalled();
  });

  it('rejects submission without acknowledgment even if native validation is bypassed', () => {
    render(<LeadForm regionSlug="murrieta" />);
    fill();
    fireEvent.click(screen.getByRole('checkbox', { name: /I acknowledge the Privacy Policy/ }));
    submit();
    expect(screen.getByRole('alert')).toHaveTextContent('Please acknowledge the privacy policy');
    expect(fetchMock).not.toHaveBeenCalled();
    expect(acceptedEvent).not.toHaveBeenCalled();
  });

  it('submits legitimate fast autofill and emits exactly one accepted event', async () => {
    accept();
    render(<LeadForm regionSlug="murrieta" formPlacement="hero" />);
    fill();
    submit();
    expect(await screen.findByRole('status')).toHaveTextContent('Quote Request Received');
    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(acceptedEvent).toHaveBeenCalledTimes(1);
    expect(startedEvent).toHaveBeenCalledTimes(1);
    const detail = (acceptedEvent.mock.calls[0][0] as CustomEvent).detail;
    expect(detail).toMatchObject({ region: 'murrieta', form_placement: 'hero' });
    expect(Object.keys(detail).sort()).toEqual(['form_placement', 'region', 'submission_id']);
    const payload = JSON.parse(fetchMock.mock.calls[0][1]?.body as string);
    expect(payload).toMatchObject({ regionSlug: 'murrieta', formPlacement: 'hero', website: '', sourcePage: '/locations/murrieta', requestType: 'quote', requestConsent: { noticeVersion: REQUEST_FOLLOWUP_NOTICE_VERSION, privacyAcknowledged: true, followUpRequested: true } });
  });

  it('gives both form instances distinct label associations', () => {
    const { container } = render(<><LeadForm regionSlug="murrieta" formPlacement="hero" /><LeadForm regionSlug="murrieta" formPlacement="bottom" /></>);
    const ids = Array.from(container.querySelectorAll('[id]')).map(el => el.id);
    expect(new Set(ids).size).toBe(ids.length);
    const inputs = screen.getAllByLabelText(/First Name/);
    expect(inputs).toHaveLength(2);
    expect(inputs[0].id).not.toBe(inputs[1].id);
  });

  it('preserves input and regional call fallback for a rejected CRM inquiry', async () => {
    fetchMock.mockResolvedValue(Response.json({ success: false, outcome: 'rejected', message: 'Your request was not accepted.', retryAllowed: false }, { status: 502 }));
    render(<LeadForm regionSlug="sacramento" formPlacement="bottom" />);
    fill();
    submit();
    expect(await screen.findByRole('alert')).toHaveTextContent('Your request was not accepted.');
    expect(screen.getByLabelText(/Email/)).toHaveValue('jamie@example.test');
    expect(screen.getByRole('link', { name: /Call/ })).toHaveAttribute('href', 'tel:+19164262311');
    expect(screen.getByRole('button')).toBeDisabled();
    expect(acceptedEvent).not.toHaveBeenCalled();
  });

  it.each([
    { success: true },
    { success: true, outcome: 'accepted', submissionId: 'wrong-reference' },
    { success: false, outcome: 'unknown', message: 'Uncertain.' },
  ])('requires an explicit matching receipt before success: %j', async result => {
    fetchMock.mockResolvedValue(Response.json(result));
    render(<LeadForm regionSlug="murrieta" />);
    fill();
    submit();
    expect(await screen.findByRole('alert')).toHaveTextContent('could not confirm receipt');
    expect(screen.getByRole('button')).toBeDisabled();
    submit();
    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(acceptedEvent).not.toHaveBeenCalled();
  });

  it('does not automatically retry a lost network response', async () => {
    fetchMock.mockRejectedValue(new Error('Lost connection'));
    render(<LeadForm regionSlug="walnut-creek" />);
    fill();
    submit();
    expect(await screen.findByRole('alert')).toHaveTextContent('before submitting again');
    expect(screen.getByRole('link', { name: /Call/ })).toHaveAttribute('href', 'tel:+19256559008');
    expect(screen.getByLabelText(/First Name/)).toHaveValue('Jamie');
    submit();
    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(acceptedEvent).not.toHaveBeenCalled();
  });

  it('permits a manual retry only after a known rejection and reuses its reference', async () => {
    fetchMock.mockResolvedValueOnce(Response.json({ success: false, outcome: 'rejected', message: 'Please check your details.', retryAllowed: true }, { status: 400 }));
    render(<LeadForm regionSlug="murrieta" />);
    fill();
    submit();
    expect(await screen.findByRole('alert')).toHaveTextContent('Please check your details.');
    expect(screen.getByRole('button')).toBeEnabled();
    accept();
    submit();
    expect(await screen.findByRole('status')).toHaveTextContent('Quote Request Received');
    const first = JSON.parse(fetchMock.mock.calls[0][1]?.body as string);
    const second = JSON.parse(fetchMock.mock.calls[1][1]?.body as string);
    expect(second.submissionId).toBe(first.submissionId);
    expect(acceptedEvent).toHaveBeenCalledTimes(1);
  });

  it('handles Netlify text rate-limit responses without reporting success', async () => {
    fetchMock.mockResolvedValue(new Response('Too many requests', { status: 429 }));
    render(<LeadForm regionSlug="murrieta" />);
    fill();
    submit();
    expect(await screen.findByRole('alert')).toHaveTextContent('wait a minute');
    expect(screen.getByRole('button')).toBeEnabled();
    expect(acceptedEvent).not.toHaveBeenCalled();
  });

  it('sends the honeypot to the server instead of faking success', async () => {
    fetchMock.mockResolvedValue(Response.json({ success: false, outcome: 'rejected', message: 'Form rejected.', retryAllowed: false }, { status: 400 }));
    const { container } = render(<LeadForm regionSlug="murrieta" />);
    fill();
    fireEvent.change(container.querySelector('[name="website"]')!, { target: { value: 'spam.example' } });
    submit();
    expect(await screen.findByRole('alert')).toHaveTextContent('Form rejected.');
    expect(JSON.parse(fetchMock.mock.calls[0][1]?.body as string).website).toBe('spam.example');
    expect(acceptedEvent).not.toHaveBeenCalled();
  });

  it('suppresses double submission while delivery is pending', async () => {
    let resolve: (value: Response) => void;
    fetchMock.mockReturnValue(new Promise<Response>(done => { resolve = done; }));
    render(<LeadForm regionSlug="murrieta" />);
    fill();
    submit();
    submit();
    expect(fetchMock).toHaveBeenCalledTimes(1);
    const payload = JSON.parse(fetchMock.mock.calls[0][1]?.body as string);
    await act(async () => resolve(Response.json({ success: true, outcome: 'accepted', submissionId: payload.submissionId })));
    await waitFor(() => expect(acceptedEvent).toHaveBeenCalledTimes(1));
  });

  it('keeps conventional stored attribution while dropping freeform or personal values', async () => {
    localStorage.setItem(ADS_CONSENT_KEY, 'accepted');
    sessionStorage.setItem('rangel_janitorial_utm', JSON.stringify({ source: 'google', medium: 'cpc', campaign: 'jane@example.test', term: 'personal details' }));
    accept();
    render(<LeadForm regionSlug="murrieta" />);
    fill();
    submit();
    await screen.findByRole('status');
    expect(JSON.parse(fetchMock.mock.calls[0][1]?.body as string).attribution).toEqual({ source: 'google', medium: 'cpc' });
  });
});

describe('paid landing form and attribution', () => {
  it('sends only the current channel marker without granting consent or forwarding ad IDs for a default visitor', async () => {
    const click = 'EAIaIQobChMI_test-click123';
    window.history.replaceState({}, '', '/quote/murrieta?gclid=' + click + '&utm_source=google&utm_medium=cpc');
    accept(); render(<LeadForm regionSlug="murrieta" sourcePage="/quote/murrieta" variant="compact" />);
    fill(); submit(); await screen.findByRole('status');
    const payload = JSON.parse(fetchMock.mock.calls[0][1]?.body as string);
    expect(payload.leadOrigin).toEqual({ channel: 'google-ads', basis: 'current-google-click-marker' });
    expect(payload.attribution).toEqual({});
    expect(payload.adAttribution).toBeNull();
    expect(JSON.stringify(payload)).not.toContain(click);
    expect(getAdsConsent()).toBeNull();
    expect(sessionStorage.getItem('rangel_janitorial_ad_click')).toBeNull();
    expect(sessionStorage.getItem('rangel_janitorial_utm')).toBeNull();
  });

  it('does not mark an untagged quote-page visit as a paid lead', async () => {
    window.history.replaceState({}, '', '/quote/murrieta');
    accept(); render(<LeadForm regionSlug="murrieta" sourcePage="/quote/murrieta" variant="compact" />);
    fill(); submit(); await screen.findByRole('status');
    const payload = JSON.parse(fetchMock.mock.calls[0][1]?.body as string);
    expect(payload.leadOrigin).toBeNull();
  });

  it('submits a compact quote with the explicit paid source and consented ad metadata', async () => {
    localStorage.setItem(ADS_CONSENT_KEY, 'accepted');
    window.history.replaceState({}, '', '/quote/murrieta?gclid=EAIaIQobChMI_test-click123&utm_source=google&utm_medium=cpc&email=private@example.test');
    accept();
    render(<LeadForm regionSlug="murrieta" sourcePage="/quote/murrieta" variant="compact" />);
    expect(screen.queryByLabelText(/How Did You Hear/)).toBeNull();
    expect(screen.getByLabelText(/Company, facility city/)).not.toBeRequired();
    expect(screen.getByLabelText(/First Name/)).toHaveClass('text-base');
    fill(); submit();
    await screen.findByRole('status');
    const payload = JSON.parse(fetchMock.mock.calls[0][1]?.body as string);
    expect(payload).toMatchObject({ sourcePage: '/quote/murrieta', referralSource: null, attribution: { source: 'google', medium: 'cpc' }, adAttribution: { consent: 'granted', clickIds: { gclid: 'EAIaIQobChMI_test-click123' } } });
    expect(JSON.stringify(payload.adAttribution)).not.toContain('private@example');
    const detail = (acceptedEvent.mock.calls[0][0] as CustomEvent).detail;
    expect(Object.keys(detail).sort()).toEqual(['form_placement', 'region', 'submission_id']);
  });

  it('submits normally without collecting ad IDs or UTM labels when advertising is declined', async () => {
    localStorage.setItem(ADS_CONSENT_KEY, 'declined');
    window.history.replaceState({}, '', '/quote/murrieta?gclid=EAIaIQobChMI_test-click123&utm_source=google');
    accept(); render(<LeadForm regionSlug="murrieta" sourcePage="/quote/murrieta" variant="compact" />);
    fill(); submit(); await screen.findByRole('status');
    const payload = JSON.parse(fetchMock.mock.calls[0][1]?.body as string);
    expect(payload.attribution).toEqual({});
    expect(payload.adAttribution).toBeNull();
    expect(payload.leadOrigin).toBeNull();
  });
});

describe('popup quote wizard', () => {
  function wizard(closed = false) {
    return <div hidden={closed}><LeadForm regionSlug="murrieta" sourcePage="/quote/murrieta" formPlacement="hero" variant="wizard" /></div>;
  }
  function chooseOptions() {
    fireEvent.click(screen.getByRole('button', { name: 'Office Building' }));
    fireEvent.click(screen.getByRole('button', { name: 'Weekly' }));
  }

  it('keeps hidden contact controls disabled and sends nothing before the final step', () => {
    const { container } = render(wizard());
    expect(screen.getByText('Step 1 of 3')).toBeInTheDocument();
    expect(screen.getByText('Choose the closest match. One tap takes you to the next step.')).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /Send quote request/ })).toBeNull();
    const firstName = container.querySelector<HTMLInputElement>('[name="firstName"]')!;
    expect(firstName).not.toBeVisible();
    expect(firstName).toBeDisabled();
    expect(firstName.checkValidity()).toBe(true);
    expect(new FormData(screen.getByRole('form') as HTMLFormElement).has('email')).toBe(false);
    submit();
    expect(fetchMock).not.toHaveBeenCalled();
    expect(acceptedEvent).not.toHaveBeenCalled();
  });

  it('does not autofocus or start an inquiry when mounted inside a closed popup', () => {
    const trigger = document.createElement('button');
    document.body.append(trigger); trigger.focus();
    render(wizard(true));
    expect(trigger).toHaveFocus();
    expect(startedEvent).not.toHaveBeenCalled();
    trigger.remove();
  });

  it('advances after one choice, focuses each question, and enables contact fields only on step 3', () => {
    render(wizard());
    fireEvent.click(screen.getByRole('button', { name: 'Medical / Dental' }));
    expect(screen.getByText('Step 2 of 3')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'How often do you need cleaning?' })).toHaveFocus();
    expect(screen.getByLabelText(/First Name/)).toBeDisabled();
    submit();
    expect(fetchMock).not.toHaveBeenCalled();
    fireEvent.click(screen.getByRole('button', { name: '3x per week' }));
    expect(screen.getByText('Step 3 of 3')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Where can we send your quote?' })).toHaveFocus();
    expect(screen.getByLabelText(/First Name/)).toBeVisible();
    expect(screen.getByLabelText(/First Name/)).toBeEnabled();
    expect(screen.getByLabelText(/First Name/)).toBeRequired();
    expect(screen.queryByRole('combobox')).toBeNull();
    expect(screen.getByRole('button', { name: 'Send quote request' })).toHaveAttribute('type', 'submit');
    expect(startedEvent).toHaveBeenCalledTimes(1);
    expect(acceptedEvent).not.toHaveBeenCalled();
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('supports keyboard choice activation while Enter on an earlier question cannot submit', async () => {
    const user = userEvent.setup();
    render(wizard());
    screen.getByRole('button', { name: 'Office Building' }).focus();
    await user.keyboard('{Enter}');
    expect(screen.getByText('Step 2 of 3')).toBeInTheDocument();
    await user.keyboard('{Enter}');
    expect(screen.getByText('Step 2 of 3')).toBeInTheDocument();
    expect(fetchMock).not.toHaveBeenCalled();
    screen.getByRole('button', { name: 'Not Sure' }).focus();
    await user.keyboard(' ');
    expect(screen.getByText('Step 3 of 3')).toBeInTheDocument();
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('preserves selections and contact details through Back, changes and popup close/reopen', () => {
    const { rerender } = render(wizard()); chooseOptions(); fill();
    fireEvent.change(screen.getByLabelText(/Company, facility city/), { target: { value: 'Acme, Murrieta; evening cleaning.' } });
    fireEvent.click(screen.getByRole('button', { name: 'Back to cleaning frequency' }));
    expect(screen.getByRole('button', { name: 'Weekly' })).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByLabelText(/Email/)).toBeDisabled();
    fireEvent.click(screen.getByRole('button', { name: 'Back to facility type' }));
    expect(screen.getByRole('button', { name: 'Office Building' })).toHaveAttribute('aria-pressed', 'true');
    fireEvent.click(screen.getByRole('button', { name: 'Medical / Dental' }));
    fireEvent.click(screen.getByRole('button', { name: 'Daily (5x/week)' }));
    rerender(wizard(true)); rerender(wizard());
    expect(screen.getByText('Step 3 of 3')).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/)).toHaveValue('jamie@example.test');
    expect(screen.getByLabelText(/Company, facility city/)).toHaveValue('Acme, Murrieta; evening cleaning.');
    const data = new FormData(screen.getByRole('form') as HTMLFormElement);
    expect(data.getAll('facilityType')).toEqual(['Medical / Dental']);
    expect(data.getAll('frequency')).toEqual(['Daily (5x/week)']);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('submits selected validated values only on final confirmation and accepts a matching receipt once', async () => {
    accept(); render(wizard()); chooseOptions(); fill();
    fireEvent.change(screen.getByLabelText(/Company, facility city/), { target: { value: 'Acme, Murrieta; evening cleaning.' } });
    fireEvent.click(screen.getByRole('button', { name: 'Send quote request' }));
    expect(await screen.findByRole('status')).toHaveTextContent('Quote Request Received');
    expect(screen.getByRole('status')).toHaveAttribute('tabindex', '-1');
    expect(fetchMock).toHaveBeenCalledTimes(1);
    const payload = JSON.parse(fetchMock.mock.calls[0][1]?.body as string);
    expect(payload).toMatchObject({ sourcePage: '/quote/murrieta', formPlacement: 'hero', regionSlug: 'murrieta', facilityType: 'Office Building', frequency: 'Weekly', firstName: 'Jamie', email: 'jamie@example.test', message: 'Acme, Murrieta; evening cleaning.', referralSource: null });
    expect(acceptedEvent).toHaveBeenCalledTimes(1);
    expect(Object.keys((acceptedEvent.mock.calls[0][0] as CustomEvent).detail).sort()).toEqual(['form_placement', 'region', 'submission_id']);
  });

  it('preserves an in-flight submission when the popup closes and prevents duplicate delivery', async () => {
    let resolve!: (value: Response) => void;
    fetchMock.mockReturnValue(new Promise<Response>(done => { resolve = done; }));
    const { rerender } = render(wizard()); chooseOptions(); fill(); submit(); submit();
    expect(screen.getByRole('button', { name: 'Back to cleaning frequency' })).toBeDisabled();
    rerender(wizard(true)); rerender(wizard()); submit();
    expect(fetchMock).toHaveBeenCalledTimes(1);
    const payload = JSON.parse(fetchMock.mock.calls[0][1]?.body as string);
    await act(async () => resolve(Response.json({ success: true, outcome: 'accepted', submissionId: payload.submissionId })));
    rerender(wizard(true)); rerender(wizard());
    expect(screen.getByRole('status')).toHaveTextContent('Quote Request Received');
    expect(acceptedEvent).toHaveBeenCalledTimes(1);
  });

  it('keeps an unknown outcome locked with entered details and a call fallback after reopening', async () => {
    fetchMock.mockRejectedValue(new Error('Lost response'));
    const { rerender } = render(wizard()); chooseOptions(); fill(); submit();
    expect(await screen.findByRole('alert')).toHaveTextContent('could not confirm receipt');
    rerender(wizard(true)); rerender(wizard());
    expect(screen.getByLabelText(/Email/)).toHaveValue('jamie@example.test');
    expect(screen.getByRole('button', { name: 'Send quote request' })).toBeDisabled();
    expect(screen.getByRole('button', { name: 'Back to cleaning frequency' })).toBeDisabled();
    expect(screen.getByRole('link', { name: /Call/ })).toHaveAttribute('href', 'tel:+19518944222');
    submit(); expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(acceptedEvent).not.toHaveBeenCalled();
  });

  it('keeps a known rejection editable and retries with the same submission reference', async () => {
    fetchMock.mockResolvedValueOnce(Response.json({ success: false, outcome: 'rejected', message: 'Please check your details.', retryAllowed: true }, { status: 400 }));
    render(wizard()); chooseOptions(); fill(); submit();
    expect(await screen.findByRole('alert')).toHaveTextContent('Please check your details');
    expect(acceptedEvent).not.toHaveBeenCalled();
    fireEvent.click(screen.getByRole('button', { name: 'Back to cleaning frequency' }));
    fireEvent.click(screen.getByRole('button', { name: 'Monthly' }));
    accept(); submit();
    expect(await screen.findByRole('status')).toHaveTextContent('Quote Request Received');
    const first = JSON.parse(fetchMock.mock.calls[0][1]?.body as string);
    const retry = JSON.parse(fetchMock.mock.calls[1][1]?.body as string);
    expect(retry.submissionId).toBe(first.submissionId);
    expect(retry.frequency).toBe('Monthly');
    expect(acceptedEvent).toHaveBeenCalledTimes(1);
  });
});
