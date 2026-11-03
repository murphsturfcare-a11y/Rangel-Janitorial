import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import lead from '../../netlify/functions/lead.mjs';
import { REQUEST_FOLLOWUP_NOTICE_VERSION } from '@/lib/leads';

const submissionId = '8b75ba63-7b5d-4aa7-8e25-a4b9b3b3ef42';
const estimate = { industry: 'Office', squareFootage: 10_000, daysPerWeek: 5, tasks: [], package: 'standard' };
const valid = {
  submissionId, regionSlug: 'sacramento', formPlacement: 'bottom', sourcePage: '/',
  website: '', firstName: 'Jamie', lastName: 'Test', phone: '(916) 555-0100', email: 'jamie@example.test',
  facilityType: '', frequency: '', referralSource: '', message: 'Please contact me about our office.',
  requestType: 'quote',
  requestConsent: { noticeVersion: REQUEST_FOLLOWUP_NOTICE_VERSION, privacyAcknowledged: true, followUpRequested: true },
  cleaningEstimate: estimate,
};
const messageFieldId = 'V3Is6asWPYYuj2lWnjIG';
const detailsFieldId = 'swxhJlbYtJHOTPi41zwy';
const fetchMock = vi.fn<typeof fetch>();

function request(body: unknown) {
  return new Request('https://rangeljanitorial.com/.netlify/functions/lead', {
    method: 'POST', headers: { 'Content-Type': 'application/json', Origin: 'https://rangeljanitorial.com' },
    body: JSON.stringify(body),
  });
}

function upstreamPayload() {
  return JSON.parse(fetchMock.mock.calls[0][1]?.body as string);
}

function customField(id: string): string {
  return upstreamPayload().customFields.find((entry: { id: string }) => entry.id === id).field_value;
}

beforeEach(() => {
  vi.stubGlobal('Netlify', { env: { get: (key: string) => ({ GHL_API_KEY: 'test-only-key', GHL_LOCATION_ID: 'test-office' })[key] } });
  vi.stubGlobal('fetch', fetchMock);
  fetchMock.mockReset();
  fetchMock.mockResolvedValue(Response.json({ contact: { id: 'accepted' } }));
  vi.spyOn(console, 'info').mockImplementation(() => {});
  vi.spyOn(console, 'error').mockImplementation(() => {});
});

afterEach(() => {
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});

describe('calculator lead delivery', () => {
  it('preserves customer notes and includes the selected estimate in the existing owner-email and audit fields', async () => {
    const response = await lead(request(valid));
    expect(response.status).toBe(200);
    expect(await response.json()).toMatchObject({ success: true, outcome: 'accepted', submissionId });
    expect(fetchMock).toHaveBeenCalledTimes(1);
    const notes = customField(messageFieldId);
    expect(notes.startsWith(valid.message + '\n\nCleaning calculator estimate (budget only)')).toBe(true);
    expect(notes).toContain('Industry: Office');
    expect(notes).toContain('Facility size: 10,000 sq ft');
    expect(notes).toContain('Cleaning schedule: 5 days per week');
    expect(notes).toContain('Estimated visits per month: 22');
    expect(notes).toContain('Selected tasks: None');
    expect(notes).toContain('Package: Standard');
    expect(notes).toContain('Estimated cost per visit: $180.00');
    expect(notes).toContain('Estimated monthly cost: $3,960.00');
    expect(notes).toContain('not a booking or final quote');
    const audit = customField(detailsFieldId);
    expect(audit).toContain('Page: /\nForm: bottom');
    expect(audit).toContain('Estimated monthly cost: $3,960.00');
    expect(audit).not.toContain(valid.message);
    expect(upstreamPayload().tags).toContain('facility-office-building');
    expect(upstreamPayload().tags).toContain('freq-daily-5x-week-');
  });

  it('recomputes prices and task descriptions instead of trusting client totals or form choices', async () => {
    const response = await lead(request({
      ...valid,
      facilityType: 'Medical / Dental', frequency: 'Monthly',
      cleaningEstimate: {
        ...estimate, package: 'detailed', tasks: ['door-handles', 'baseboards'],
        monthlyCost: 0, costPerVisit: 0, label: 'Platinum free forever',
      },
    }));
    expect(response.status).toBe(200);
    const notes = customField(messageFieldId);
    expect(notes).toContain('Package: Detailed');
    expect(notes).toContain('Estimated cost per visit: $216.70');
    expect(notes).toContain('Estimated monthly cost: $4,767.40');
    expect(notes).toMatch(/Selected tasks: .*Door Handles.*Baseboards/i);
    expect(JSON.stringify(upstreamPayload())).not.toMatch(/Platinum free forever|Medical \/ Dental|freq-monthly/);
    expect(upstreamPayload().tags).toContain('facility-office-building');
  });

  it.each([2, 4, 6, 7])('retains an exact %i-day schedule in CRM and the owner notification', async daysPerWeek => {
    const response = await lead(request({ ...valid, cleaningEstimate: { ...estimate, daysPerWeek } }));
    expect(response.status).toBe(200);
    expect(upstreamPayload().customFields).toContainEqual({ id: 'npSugoNIifW9NuoWENST', field_value: daysPerWeek + 'x per week' });
    expect(customField(messageFieldId)).toContain('Cleaning schedule: ' + daysPerWeek + ' days per week');
  });

  it.each([
    ['Office', 'Office Building'], ['Large Office [10-15]', 'Office Building'],
    ['Large Office [15-20]', 'Office Building'], ['Industrial', 'Industrial / Warehouse'],
    ['Restaurant', 'Other'], ['Dealership', 'Other'],
  ])('routes %s using its server-derived facility category', async (industry, facilityType) => {
    const response = await lead(request({ ...valid, cleaningEstimate: { ...estimate, industry } }));
    expect(response.status).toBe(200);
    expect(upstreamPayload().customFields).toContainEqual({ id: 'fVouV566y2CSCh8GmHzp', field_value: facilityType });
    expect(customField(messageFieldId)).toContain('Industry: ' + industry);
  });

  it.each(['sacramento', 'murrieta', 'walnut-creek'])('preserves paid source metadata for the %s landing page', async regionSlug => {
    const response = await lead(request({
      ...valid, regionSlug, sourcePage: '/quote/' + regionSlug,
      leadOrigin: { channel: 'google-ads', basis: 'current-google-paid-utm' },
    }));
    expect(response.status).toBe(200);
    expect(upstreamPayload().tags).toContain('location-' + regionSlug);
    expect(upstreamPayload().tags).toContain('lead-channel-google-ads');
    expect(customField(detailsFieldId)).toContain('Page: /quote/' + regionSlug);
    expect(customField(messageFieldId)).toContain('Estimated monthly cost: $3,960.00');
  });

  it.each([null, [], {}, false, 'Office',
    { ...estimate, squareFootage: 0 }, { ...estimate, squareFootage: -10 },
    { ...estimate, squareFootage: 1_000_001 }, { ...estimate, daysPerWeek: 8 },
    { ...estimate, industry: '<script>' }, { ...estimate, package: 'free' },
    { ...estimate, tasks: ['unlisted-task'] }, { ...estimate, tasks: ['baseboards', 'baseboards'] },
  ])('rejects a malformed estimate before contacting CRM: %j', async cleaningEstimate => {
    const response = await lead(request({ ...valid, cleaningEstimate }));
    expect(response.status).toBe(400);
    expect(await response.json()).toMatchObject({ success: false, outcome: 'rejected', code: 'INVALID_INPUT', retryAllowed: true });
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('does not extend homepage source permission to ordinary quote requests', async () => {
    const response = await lead(request({ ...valid, cleaningEstimate: undefined }));
    expect(response.status).toBe(400);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('leaves ordinary regional quote notes unchanged', async () => {
    const response = await lead(request({ ...valid, cleaningEstimate: undefined, sourcePage: '/locations/sacramento' }));
    expect(response.status).toBe(200);
    expect(customField(messageFieldId)).toBe(valid.message);
    expect(customField(detailsFieldId)).not.toContain('calculator');
  });

  it('does not invent extra notes when only an estimate was supplied', async () => {
    const response = await lead(request({ ...valid, message: '' }));
    expect(response.status).toBe(200);
    expect(customField(messageFieldId).startsWith('Cleaning calculator estimate (budget only)')).toBe(true);
    expect(customField(messageFieldId)).not.toContain('No additional notes provided');
  });

  it('retains uncertain-delivery handling for calculator leads and never retries an upstream failure', async () => {
    fetchMock.mockResolvedValue(new Response('', { status: 503 }));
    const response = await lead(request(valid));
    expect(response.status).toBe(502);
    expect(await response.json()).toMatchObject({ success: false, outcome: 'unknown', retryAllowed: false });
    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(JSON.stringify(vi.mocked(console.error).mock.calls)).not.toMatch(/Jamie|example\.test|calculator|3,960/);
  });
});
