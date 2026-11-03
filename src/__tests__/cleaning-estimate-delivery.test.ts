import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import lead from '../../netlify/functions/lead.mjs';
import { REQUEST_FOLLOWUP_NOTICE_VERSION } from '@/lib/leads';
import { getCleaningPricingVersion, readCleaningPricingPolicy } from '../../netlify/lib/cleaning-pricing';

const submissionId = '8b75ba63-7b5d-4aa7-8e25-a4b9b3b3ef42';
const pricingSettings: Record<string, string> = {
  CLEANING_BASE_HOURLY_RATE: '45', CLEANING_OFFICE_MARKUP_PERCENT: '0',
  CALCULATOR_PAYROLL_TAX_INSURANCE_PERCENT: '0', CALCULATOR_OVERHEAD_PERCENT: '0',
  CALCULATOR_PROFIT_MARKUP_PERCENT: '0', CALCULATOR_MISC_MONTHLY_COST: '0',
};
const estimateVersion = getCleaningPricingVersion(readCleaningPricingPolicy(name => pricingSettings[name]));
let settings: Record<string, string>;
const estimate = { industry: 'Office', squareFootage: 10_000, daysPerWeek: 5, tasks: [], package: 'standard' };
const valid = {
  submissionId, regionSlug: 'sacramento', formPlacement: 'bottom', sourcePage: '/',
  website: '', firstName: 'Jamie', lastName: 'Test', phone: '(916) 555-0100', email: 'jamie@example.test',
  facilityType: '', frequency: '', referralSource: '', message: 'Please contact me about our office.',
  requestType: 'quote',
  requestConsent: { noticeVersion: REQUEST_FOLLOWUP_NOTICE_VERSION, privacyAcknowledged: true, followUpRequested: true },
  cleaningEstimate: estimate, cleaningEstimateVersion: estimateVersion,
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
  settings = { ...pricingSettings, GHL_API_KEY: 'test-only-key', GHL_LOCATION_ID: 'test-office' };
  vi.stubGlobal('Netlify', { env: { get: (key: string) => settings[key] } });
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

  it.each([undefined, null, '', '   ', 0, {}, []])('requires a reload for a missing or unusable preview revision: %j', async cleaningEstimateVersion => {
    const response = await lead(request({ ...valid, cleaningEstimateVersion }));
    expect(response.status).toBe(409);
    expect(await response.json()).toMatchObject({
      success: false, outcome: 'rejected', code: 'ESTIMATE_EXPIRED', retryAllowed: false,
      message: 'Please reload this page and review your refreshed estimate before sending it.',
    });
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it.each(['old-revision', estimateVersion + ' '])('allows edit-and-refresh for a stale known preview revision: %j', async cleaningEstimateVersion => {
    const response = await lead(request({ ...valid, cleaningEstimateVersion }));
    expect(response.status).toBe(409);
    expect(await response.json()).toMatchObject({
      success: false, outcome: 'rejected', code: 'ESTIMATE_EXPIRED', retryAllowed: true,
      message: 'Your estimate needs to be refreshed. Please edit your estimate and review the updated price before sending it.',
    });
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('rejects an old estimate after private pricing changes, without delivering a different quote', async () => {
    settings.CALCULATOR_OVERHEAD_PERCENT = '26';
    const response = await lead(request(valid));
    expect(response.status).toBe(409);
    expect(await response.json()).toMatchObject({ code: 'ESTIMATE_EXPIRED' });
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('accepts a refreshed preview and applies private costs without exposing the assumptions in customer-facing details', async () => {
    settings = {
      ...settings, CLEANING_BASE_HOURLY_RATE: '60', CLEANING_OFFICE_MARKUP_PERCENT: '10',
      CALCULATOR_PAYROLL_TAX_INSURANCE_PERCENT: '25', CALCULATOR_OVERHEAD_PERCENT: '26',
      CALCULATOR_PROFIT_MARKUP_PERCENT: '30',
    };
    const cleaningEstimateVersion = getCleaningPricingVersion(readCleaningPricingPolicy(name => settings[name]));
    const response = await lead(request({
      ...valid, cleaningEstimateVersion, cleaningEstimate: { ...estimate, squareFootage: 2000, daysPerWeek: 2 },
    }));
    expect(response.status).toBe(200);
    expect(customField(messageFieldId)).toContain('Estimated cost per visit: $128.70');
    expect(customField(messageFieldId)).toContain('Estimated monthly cost: $1,158.30');
    expect(customField(detailsFieldId)).toContain('Estimate pricing revision: ' + cleaningEstimateVersion);
    expect(customField(messageFieldId)).not.toMatch(/payroll|insurance|overhead|profit|misc|markup/i);
  });

  it.each([
    ['CALCULATOR_PAYROLL_TAX_INSURANCE_PERCENT', 'NaN'], ['CALCULATOR_OVERHEAD_PERCENT', ''],
    ['CALCULATOR_PROFIT_MARKUP_PERCENT', '-1'], ['CALCULATOR_MISC_MONTHLY_COST', 'Infinity'],
  ])('does not send a calculator lead with invalid private configuration %s', async (name, value) => {
    settings[name] = value;
    const response = await lead(request(valid));
    expect(response.status).toBe(503);
    expect(await response.json()).toMatchObject({ success: false, outcome: 'rejected', code: 'ESTIMATE_UNAVAILABLE', retryAllowed: true });
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('delivers a matching inclusive estimate when all pricing environment settings are absent', async () => {
    settings = { GHL_API_KEY: 'test-only-key', GHL_LOCATION_ID: 'test-office' };
    const cleaningEstimateVersion = getCleaningPricingVersion(readCleaningPricingPolicy(() => undefined));
    const response = await lead(request({
      ...valid, cleaningEstimateVersion, cleaningEstimate: { ...estimate, squareFootage: 2000, daysPerWeek: 2 },
    }));
    expect(response.status).toBe(200);
    expect(customField(messageFieldId)).toContain('Estimated cost per visit: $79.20');
    expect(customField(messageFieldId)).toContain('Estimated monthly cost: $712.80');
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it('keeps ordinary regional lead delivery available when calculator configuration is absent', async () => {
    settings = { GHL_API_KEY: 'test-only-key', GHL_LOCATION_ID: 'test-office' };
    const response = await lead(request({
      ...valid, sourcePage: '/locations/sacramento', cleaningEstimate: undefined, cleaningEstimateVersion: undefined,
    }));
    expect(response.status).toBe(200);
    expect(customField(messageFieldId)).toBe(valid.message);
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });
});
