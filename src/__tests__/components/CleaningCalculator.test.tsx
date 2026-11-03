import { cleanup, fireEvent, render, screen, within } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import CleaningCalculator from '@/components/calculator/CleaningCalculator';

const fetchMock = vi.fn<typeof fetch>();

beforeEach(() => {
  vi.stubGlobal('fetch', fetchMock);
  fetchMock.mockReset();
  localStorage.clear();
  sessionStorage.clear();
  window.history.replaceState({}, '', '/');
  Element.prototype.scrollIntoView = vi.fn();
});
afterEach(() => { cleanup(); vi.unstubAllGlobals(); });

function contactDetails() {
  const form = screen.getByRole('form');
  const fields = within(form);
  fireEvent.change(fields.getByLabelText(/First Name/), { target: { value: 'Jamie' } });
  fireEvent.change(fields.getByLabelText(/Last Name/), { target: { value: 'Estimate TEST' } });
  fireEvent.change(fields.getByLabelText(/Phone/, { selector: 'input[type="tel"]' }), { target: { value: '9165550100' } });
  fireEvent.change(fields.getByLabelText(/Email/), { target: { value: 'calculator@example.test' } });
  fireEvent.click(fields.getByRole('checkbox', { name: /I acknowledge/ }));
  return form;
}

describe('CleaningCalculator', () => {
  it('shows the original default estimate and allows comparison without collecting contact details', () => {
    render(<CleaningCalculator regionSlug="sacramento" sourcePage="/quote/sacramento" />);
    expect(screen.getByText('$3,960.00')).toBeInTheDocument();
    expect(screen.getByRole('radio', { name: /Standard Clean/ })).toBeChecked();
    expect(screen.getByRole('radio', { name: /Standard Clean/ })).toHaveAccessibleName('Standard Clean $180.00 per visit');
    expect(screen.getByRole('radio', { name: /Detailed Clean/ })).toHaveAccessibleName('Detailed Clean $200.00 per visit');
    fireEvent.click(screen.getByRole('radio', { name: /Platinum Clean/ }));
    expect(screen.getByText('$4,840.00')).toBeInTheDocument();
    expect(screen.queryByRole('form')).not.toBeInTheDocument();
    expect(screen.queryByLabelText('Your local office')).not.toBeInTheDocument();
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('updates the estimate for task, frequency and industry changes', () => {
    render(<CleaningCalculator regionSlug="sacramento" sourcePage="/quote/sacramento" />);
    fireEvent.click(screen.getByText('Add specific tasks'));
    fireEvent.click(screen.getByRole('checkbox', { name: 'Main Entrance Door' }));
    expect(screen.getByText('$4,125.33')).toBeInTheDocument();
    expect(screen.getByRole('radio', { name: /Detailed Clean/ })).toHaveAccessibleName('Detailed Clean $208.35 per visit');
    fireEvent.click(screen.getByRole('radio', { name: '2 days per week' }));
    fireEvent.change(screen.getByLabelText('Industry type'), { target: { value: 'Industrial' } });
    expect(screen.getByText('$2,176.34')).toBeInTheDocument();
  });

  it.each(['', '-10', '0', '1000001'])('blocks invalid square footage %j and removes stale prices', value => {
    render(<CleaningCalculator regionSlug="sacramento" sourcePage="/quote/sacramento" />);
    fireEvent.change(screen.getByLabelText('Square footage'), { target: { value } });
    expect(screen.getByLabelText('Square footage')).toHaveAttribute('aria-invalid', 'true');
    expect(screen.getByRole('button', { name: 'Send my estimate' })).toBeDisabled();
    expect(screen.queryByText('$3,960.00')).not.toBeInTheDocument();
  });

  it('routes the homepage estimate to the chosen office with the exact package and inputs', async () => {
    fetchMock.mockImplementation(async (_url, options) => Response.json({ success: true, outcome: 'accepted', submissionId: JSON.parse(options?.body as string).submissionId }));
    render(<CleaningCalculator sourcePage="/" />);
    expect(screen.getByRole('button', { name: 'Send my estimate' })).toBeDisabled();
    fireEvent.change(screen.getByLabelText('Your local office'), { target: { value: 'walnut-creek' } });
    fireEvent.click(screen.getByRole('radio', { name: /Detailed Clean/ }));
    fireEvent.click(screen.getByRole('radio', { name: '2 days per week' }));
    fireEvent.click(screen.getByRole('button', { name: 'Send my estimate' }));
    expect(screen.getByLabelText('Square footage')).toBeDisabled();
    fireEvent.submit(contactDetails());
    expect(await screen.findByText('Estimate Request Received!')).toBeInTheDocument();
    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(JSON.parse(fetchMock.mock.calls[0][1]?.body as string)).toMatchObject({
      regionSlug: 'walnut-creek', sourcePage: '/', formPlacement: 'bottom', requestType: 'quote',
      cleaningEstimate: { industry: 'Office', squareFootage: 10000, daysPerWeek: 2, tasks: [], package: 'detailed' },
    });
    expect(screen.getByRole('button', { name: 'Edit estimate' })).toBeDisabled();
  });

  it('retains the contact draft when the estimate is edited, even through temporarily invalid inputs', () => {
    render(<CleaningCalculator regionSlug="sacramento" sourcePage="/quote/sacramento" />);
    fireEvent.click(screen.getByRole('button', { name: 'Send my estimate' }));
    contactDetails();
    fireEvent.click(screen.getByRole('button', { name: 'Edit estimate' }));
    fireEvent.change(screen.getByLabelText('Square footage'), { target: { value: '' } });
    fireEvent.change(screen.getByLabelText('Square footage'), { target: { value: '12000' } });
    fireEvent.click(screen.getByRole('button', { name: 'Send my estimate' }));
    expect(within(screen.getByRole('form')).getByLabelText(/First Name/)).toHaveValue('Jamie');
    expect(screen.getByText(/12,000 sq ft/)).toBeInTheDocument();
  });

  it('locks edits and retries after an uncertain receipt so changing the estimate cannot duplicate the request', async () => {
    fetchMock.mockRejectedValue(new Error('Lost response'));
    render(<CleaningCalculator regionSlug="sacramento" sourcePage="/quote/sacramento" />);
    fireEvent.click(screen.getByRole('button', { name: 'Send my estimate' }));
    const form = contactDetails();
    fireEvent.submit(form);
    expect(await screen.findByRole('alert')).toHaveTextContent('could not confirm receipt');
    expect(screen.getByRole('button', { name: 'Edit estimate' })).toBeDisabled();
    expect(screen.getByRole('button', { name: 'Send estimate request' })).toBeDisabled();
    expect(screen.getByRole('link', { name: /Call/ })).toHaveAttribute('href', 'tel:+19164262311');
    fireEvent.submit(form);
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });
});
