vi.hoisted(() => {
  process.env.NEXT_PUBLIC_GOOGLE_ADS_ID = 'AW-123456789';
  process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL = 'test_label';
});
import { act, cleanup, fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import CleaningCalculator from '@/components/calculator/CleaningCalculator';
import type { CleaningEstimate, CleaningEstimateInput } from '@/lib/cleaning-estimate';

const fetchMock = vi.fn<typeof fetch>();
const pricingVersion = 'pricing-public-fixture-v2';
// These are controlled public endpoint responses, not a copy of private pricing logic.
const publicEstimate: CleaningEstimate = {
  hoursPerVisit: 4,
  visitsPerMonth: 22,
  packages: {
    standard: { costPerVisit: 180, monthlyCost: 3960 },
    detailed: { costPerVisit: 200, monthlyCost: 4400 },
    platinum: { costPerVisit: 220, monthlyCost: 4840 },
  },
};
let quoteResponder: (input: CleaningEstimateInput) => Promise<Response>;
let leadResponder: (payload: Record<string, unknown>) => Promise<Response>;

function quoteResponse(estimate = publicEstimate, version = pricingVersion) {
  return Response.json({ success: true, estimate, pricingVersion: version });
}
function requests(route: 'cleaning-estimate' | 'lead') {
  return fetchMock.mock.calls.filter(([url]) => String(url) === `/.netlify/functions/${route}`);
}
function latestPayload(route: 'cleaning-estimate' | 'lead') {
  const calls = requests(route);
  return JSON.parse(calls[calls.length - 1][1]?.body as string);
}
async function ready() {
  await screen.findByText('$3,960.00');
}
function contactDetails() {
  const form = screen.getByRole('form');
  const fields = within(form);
  fireEvent.change(fields.getByLabelText(/First Name/), { target: { value: 'Jamie' } });
  fireEvent.change(fields.getByLabelText(/Last Name/), { target: { value: 'Estimate TEST' } });
  fireEvent.change(fields.getByLabelText(/Phone/, { selector: 'input[type="tel"]' }), { target: { value: '9165550100' } });
  fireEvent.change(fields.getByLabelText(/Email/), { target: { value: 'calculator@example.test' } });
  const acknowledgment = fields.getByRole('checkbox', { name: /I acknowledge/ });
  if (!(acknowledgment as HTMLInputElement).checked) fireEvent.click(acknowledgment);
  return form;
}
function task() {
  fireEvent.click(screen.getByText('Add specific tasks'));
  fireEvent.click(screen.getByRole('checkbox', { name: 'Main Entrance Door' }));
}

beforeEach(() => {
  vi.stubGlobal('fetch', fetchMock);
  fetchMock.mockReset();
  quoteResponder = async () => quoteResponse();
  leadResponder = async payload => Response.json({ success: true, outcome: 'accepted', submissionId: payload.submissionId });
  fetchMock.mockImplementation(async (url, options) => {
    const payload = JSON.parse(options?.body as string);
    if (String(url) === '/.netlify/functions/cleaning-estimate') return quoteResponder(payload);
    if (String(url) === '/.netlify/functions/lead') return leadResponder(payload);
    throw new Error('Unexpected request: ' + String(url));
  });
  localStorage.clear();
  sessionStorage.clear();
  delete window.rangelAdsConsent;
  window.history.replaceState({}, '', '/');
  Element.prototype.scrollIntoView = vi.fn();
});
afterEach(() => { cleanup(); vi.unstubAllGlobals(); vi.restoreAllMocks(); });

describe('CleaningCalculator public estimate flow', () => {
  it('waits for public totals and compares packages immediately without another request', async () => {
    render(<CleaningCalculator regionSlug="sacramento" sourcePage="/quote/sacramento" />);
    expect(screen.getByRole('button', { name: 'Send my estimate' })).toBeDisabled();
    expect(screen.getByRole('radio', { name: /Standard Clean/ })).toBeDisabled();
    expect(screen.queryByText('$3,960.00')).not.toBeInTheDocument();
    await ready();
    expect(screen.getByRole('radio', { name: /Standard Clean/ })).toBeChecked();
    expect(screen.getByRole('radio', { name: /Standard Clean/ })).toHaveAccessibleName('Standard Clean $180.00 per visit');
    expect(screen.getByRole('radio', { name: /Detailed Clean/ })).toHaveAccessibleName('Detailed Clean $200.00 per visit');
    fireEvent.click(screen.getByRole('radio', { name: /Platinum Clean/ }));
    expect(screen.getByText('$4,840.00')).toBeInTheDocument();
    expect(requests('cleaning-estimate')).toHaveLength(1);
    expect(requests('lead')).toHaveLength(0);
    expect(screen.queryByRole('form')).not.toBeInTheDocument();
    expect(screen.queryByLabelText('Your local office')).not.toBeInTheDocument();
  });

  it('invalidates old totals immediately when quote inputs change and sends the exact choices', async () => {
    render(<CleaningCalculator regionSlug="sacramento" sourcePage="/quote/sacramento" />);
    await ready();
    const changed = { ...publicEstimate, packages: { ...publicEstimate.packages, standard: { costPerVisit: 321, monthlyCost: 2889 } } };
    quoteResponder = async () => quoteResponse(changed);
    fireEvent.change(screen.getByLabelText('Industry type'), { target: { value: 'Industrial' } });
    expect(screen.queryByText('$3,960.00')).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Send my estimate' })).toBeDisabled();
    fireEvent.change(screen.getByLabelText('Square footage'), { target: { value: '12000' } });
    fireEvent.click(screen.getByRole('radio', { name: '2 days per week' }));
    task();
    await screen.findByText('$2,889.00');
    expect(latestPayload('cleaning-estimate')).toEqual({
      industry: 'Industrial', squareFootage: 12000, daysPerWeek: 2, tasks: ['entrance-door'], package: 'standard',
    });
    expect(requests('lead')).toHaveLength(0);
  });

  it('discards a slow response for an earlier area instead of restoring stale prices', async () => {
    render(<CleaningCalculator regionSlug="sacramento" sourcePage="/quote/sacramento" />);
    await ready();
    let resolveEarlier!: (response: Response) => void;
    let resolveCurrent!: (response: Response) => void;
    quoteResponder = input => new Promise(resolve => {
      if (input.squareFootage === 12000) resolveEarlier = resolve;
      else resolveCurrent = resolve;
    });
    fireEvent.change(screen.getByLabelText('Square footage'), { target: { value: '12000' } });
    await waitFor(() => expect(requests('cleaning-estimate')).toHaveLength(2));
    fireEvent.change(screen.getByLabelText('Square footage'), { target: { value: '20000' } });
    expect(screen.getByRole('button', { name: 'Send my estimate' })).toBeDisabled();
    await waitFor(() => expect(requests('cleaning-estimate')).toHaveLength(3));
    await act(async () => resolveCurrent(quoteResponse({ ...publicEstimate, packages: { ...publicEstimate.packages, standard: { costPerVisit: 400, monthlyCost: 8800 } } })));
    expect(await screen.findByText('$8,800.00')).toBeInTheDocument();
    await act(async () => resolveEarlier(quoteResponse({ ...publicEstimate, packages: { ...publicEstimate.packages, standard: { costPerVisit: 240, monthlyCost: 5280 } } })));
    expect(screen.getByText('$8,800.00')).toBeInTheDocument();
    expect(screen.queryByText('$5,280.00')).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Send my estimate' })).toBeEnabled();
  });

  it.each(['', '-10', '0', '1000001'])('blocks invalid square footage %j and removes stale prices', async value => {
    render(<CleaningCalculator regionSlug="sacramento" sourcePage="/quote/sacramento" />);
    await ready();
    fireEvent.change(screen.getByLabelText('Square footage'), { target: { value } });
    expect(screen.getByLabelText('Square footage')).toHaveAttribute('aria-invalid', 'true');
    expect(screen.getByRole('button', { name: 'Send my estimate' })).toBeDisabled();
    expect(screen.queryByText('$3,960.00')).not.toBeInTheDocument();
    expect(requests('cleaning-estimate')).toHaveLength(1);
  });

  it.each(['network', 'malformed', 'invalid-version'] as const)('offers an explicit retry after a %s quote error', async failure => {
    quoteResponder = async () => {
      if (failure === 'network') throw new Error('Offline');
      if (failure === 'invalid-version') return quoteResponse(publicEstimate, 'private version with spaces');
      return Response.json({ success: true, pricingVersion, estimate: { hoursPerVisit: 4, visitsPerMonth: 22, packages: {} } });
    };
    render(<CleaningCalculator regionSlug="sacramento" sourcePage="/quote/sacramento" />);
    expect(await screen.findByRole('alert')).toHaveTextContent('couldn’t be calculated');
    expect(screen.getByRole('button', { name: 'Send my estimate' })).toBeDisabled();
    expect(screen.queryByText('$3,960.00')).not.toBeInTheDocument();
    quoteResponder = async () => quoteResponse();
    fireEvent.click(screen.getByRole('button', { name: 'Try again' }));
    await ready();
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Send my estimate' })).toBeEnabled();
    expect(requests('cleaning-estimate')).toHaveLength(2);
    expect(requests('lead')).toHaveLength(0);
  });

  it('routes the homepage request to its selected office with exact inputs and the public pricing version', async () => {
    render(<CleaningCalculator sourcePage="/" />);
    await ready();
    expect(screen.getByRole('button', { name: 'Send my estimate' })).toBeDisabled();
    fireEvent.change(screen.getByLabelText('Your local office'), { target: { value: 'walnut-creek' } });
    fireEvent.click(screen.getByRole('radio', { name: '2 days per week' }));
    task();
    await waitFor(() => expect(screen.getByRole('button', { name: 'Send my estimate' })).toBeEnabled());
    fireEvent.click(screen.getByRole('radio', { name: /Detailed Clean/ }));
    fireEvent.click(screen.getByRole('button', { name: 'Send my estimate' }));
    expect(screen.getByLabelText('Square footage')).toBeDisabled();
    const form = contactDetails();
    fireEvent.submit(form);
    expect(await screen.findByText('Estimate Request Received!')).toBeInTheDocument();
    expect(requests('lead')).toHaveLength(1);
    expect(latestPayload('lead')).toMatchObject({
      regionSlug: 'walnut-creek', sourcePage: '/', formPlacement: 'bottom', requestType: 'quote', cleaningEstimateVersion: pricingVersion,
      cleaningEstimate: { industry: 'Office', squareFootage: 10000, daysPerWeek: 2, tasks: ['entrance-door'], package: 'detailed' },
    });
    expect(latestPayload('lead').cleaningEstimate).not.toHaveProperty('monthlyCost');
    expect(screen.getByRole('button', { name: 'Edit estimate' })).toBeDisabled();
    fireEvent.submit(form);
    expect(requests('lead')).toHaveLength(1);
  });

  it('keeps the landing region and current Google Ads channel on the lead without forwarding an unconsented click ID', async () => {
    const clickId = 'EAIaIQobChMI_test-click123';
    window.history.replaceState({}, '', '/quote/sacramento?gclid=' + clickId);
    render(<CleaningCalculator regionSlug="sacramento" sourcePage="/quote/sacramento" variant="landing" />);
    await ready();
    fireEvent.click(screen.getByRole('button', { name: 'Send my estimate' }));
    fireEvent.submit(contactDetails());
    await screen.findByText('Estimate Request Received!');
    expect(latestPayload('lead')).toMatchObject({
      regionSlug: 'sacramento', sourcePage: '/quote/sacramento', cleaningEstimateVersion: pricingVersion,
      leadOrigin: { channel: 'google-ads', basis: 'current-google-click-marker' },
      adAttribution: null,
    });
    expect(JSON.stringify(latestPayload('lead'))).not.toContain(clickId);
    expect(latestPayload('cleaning-estimate')).not.toHaveProperty('leadOrigin');
  });

  it('retains a contact draft through edits, a quote refresh and temporarily invalid area', async () => {
    render(<CleaningCalculator regionSlug="sacramento" sourcePage="/quote/sacramento" />);
    await ready();
    fireEvent.click(screen.getByRole('button', { name: 'Send my estimate' }));
    contactDetails();
    fireEvent.click(screen.getByRole('button', { name: 'Edit estimate' }));
    fireEvent.change(screen.getByLabelText('Square footage'), { target: { value: '' } });
    expect(screen.getByRole('button', { name: 'Send my estimate' })).toBeDisabled();
    fireEvent.change(screen.getByLabelText('Square footage'), { target: { value: '12000' } });
    await waitFor(() => expect(screen.getByRole('button', { name: 'Send my estimate' })).toBeEnabled());
    fireEvent.click(screen.getByRole('button', { name: 'Send my estimate' }));
    const fields = within(screen.getByRole('form'));
    expect(fields.getByLabelText(/First Name/)).toHaveValue('Jamie');
    expect(fields.getByLabelText(/Email/)).toHaveValue('calculator@example.test');
    expect(fields.getByRole('checkbox', { name: /I acknowledge/ })).toBeChecked();
    expect(screen.getByText(/12,000 sq ft/)).toBeInTheDocument();
    fireEvent.submit(screen.getByRole('form'));
    await screen.findByText('Estimate Request Received!');
    expect(latestPayload('lead').cleaningEstimate.squareFootage).toBe(12000);
  });

  it('locks edits and retries after an uncertain receipt so a changed estimate cannot duplicate a request', async () => {
    leadResponder = async () => { throw new Error('Lost response'); };
    render(<CleaningCalculator regionSlug="sacramento" sourcePage="/quote/sacramento" />);
    await ready();
    fireEvent.click(screen.getByRole('button', { name: 'Send my estimate' }));
    const form = contactDetails();
    fireEvent.submit(form);
    expect(await screen.findByRole('alert')).toHaveTextContent('could not confirm receipt');
    expect(screen.getByRole('button', { name: 'Edit estimate' })).toBeDisabled();
    expect(screen.getByRole('button', { name: 'Send estimate request' })).toBeDisabled();
    expect(screen.getByRole('link', { name: /Call/ })).toHaveAttribute('href', 'tel:+19164262311');
    expect(within(form).getByLabelText(/Email/)).toHaveValue('calculator@example.test');
    fireEvent.submit(form);
    expect(requests('lead')).toHaveLength(1);
  });
});
