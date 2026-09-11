import { act, cleanup, fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
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
    expect(payload).toMatchObject({ regionSlug: 'murrieta', formPlacement: 'hero', website: '', sourcePage: '/locations/murrieta' });
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
    sessionStorage.setItem('rangel_janitorial_utm', JSON.stringify({ source: 'google', medium: 'cpc', campaign: 'jane@example.test', term: 'personal details' }));
    accept();
    render(<LeadForm regionSlug="murrieta" />);
    fill();
    submit();
    await screen.findByRole('status');
    expect(JSON.parse(fetchMock.mock.calls[0][1]?.body as string).attribution).toEqual({ source: 'google', medium: 'cpc' });
  });
});
