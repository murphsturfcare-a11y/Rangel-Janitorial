import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import cleaningEstimate, { config } from '../../netlify/functions/cleaning-estimate.mjs';
import { getCleaningPricingVersion, readCleaningPricingPolicy } from '../../netlify/lib/cleaning-pricing';

const valid = { industry: 'Office', squareFootage: 10000, daysPerWeek: 5, tasks: [], package: 'standard' };
let settings: Record<string, string>;
const fetchMock = vi.fn();

function request(body: unknown = valid, headers: Record<string, string> = {}, url = 'https://rangeljanitorial.com/.netlify/functions/cleaning-estimate') {
  return new Request(url, {
    method: 'POST', headers: { 'Content-Type': 'application/json', Origin: 'https://rangeljanitorial.com', ...headers },
    body: typeof body === 'string' ? body : JSON.stringify(body),
  });
}

beforeEach(() => {
  settings = {
    CLEANING_BASE_HOURLY_RATE: '45', CLEANING_OFFICE_MARKUP_PERCENT: '0',
    CALCULATOR_PAYROLL_TAX_INSURANCE_PERCENT: '0', CALCULATOR_OVERHEAD_PERCENT: '0',
    CALCULATOR_PROFIT_MARKUP_PERCENT: '0', CALCULATOR_MISC_MONTHLY_COST: '0',
  };
  vi.stubGlobal('Netlify', { env: { get: (name: string) => settings[name] } });
  vi.stubGlobal('fetch', fetchMock);
  fetchMock.mockReset();
  vi.spyOn(console, 'info').mockImplementation(() => {});
  vi.spyOn(console, 'error').mockImplementation(() => {});
});
afterEach(() => { vi.restoreAllMocks(); vi.unstubAllGlobals(); });

describe('public read-only cleaning estimate endpoint', () => {
  it('returns every package using only public totals and an opaque pricing revision', async () => {
    const response = await cleaningEstimate(request());
    expect(response.status).toBe(200);
    expect(response.headers.get('cache-control')).toBe('no-store');
    expect(response.headers.get('access-control-allow-origin')).toBeNull();
    expect(await response.json()).toEqual({
      success: true,
      estimate: {
        hoursPerVisit: 4, visitsPerMonth: 22,
        packages: {
          standard: { costPerVisit: 180, monthlyCost: 3960 },
          detailed: { costPerVisit: 200, monthlyCost: 4400 },
          platinum: { costPerVisit: 220, monthlyCost: 4840 },
        },
      },
      pricingVersion: getCleaningPricingVersion(readCleaningPricingPolicy(name => settings[name])),
    });
    expect(fetchMock).not.toHaveBeenCalled();
    expect(console.info).not.toHaveBeenCalled();
    expect(console.error).not.toHaveBeenCalled();
  });

  it('prices private expense settings without including them in public output', async () => {
    settings = {
      ...settings, CLEANING_BASE_HOURLY_RATE: '60', CLEANING_OFFICE_MARKUP_PERCENT: '10',
      CALCULATOR_PAYROLL_TAX_INSURANCE_PERCENT: '25', CALCULATOR_OVERHEAD_PERCENT: '26',
      CALCULATOR_PROFIT_MARKUP_PERCENT: '30', CALCULATOR_MISC_MONTHLY_COST: '7',
    };
    const response = await cleaningEstimate(request());
    const body = await response.json();
    expect(response.status).toBe(200);
    expect(body.estimate.packages.standard.monthlyCost).toBeCloseTo(11337.612, 6);
    const serialized = JSON.stringify(body);
    expect(serialized).not.toMatch(/payroll|insurance|overhead|profit|misc|baseHourly|hourlyRate|markup|premium|expense|policy/i);
    expect(Object.keys(body.estimate.packages.standard).sort()).toEqual(['costPerVisit', 'monthlyCost']);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('ignores browser-supplied expense assumptions and prices', async () => {
    const response = await cleaningEstimate(request({
      ...valid, monthlyCost: 1, baseHourlyRate: 1,
      expenses: { payrollTaxInsuranceRate: 0, overheadRate: 0, profitMarkupRate: 0 },
    }));
    expect((await response.json()).estimate.packages.standard.monthlyCost).toBe(3960);
  });

  it.each(['https://rangeljanitorial.com', 'https://www.rangeljanitorial.com'])('accepts production origin %s without enabling cross-origin CORS', async Origin => {
    const response = await cleaningEstimate(request(valid, { Origin }));
    expect(response.status).toBe(200);
    expect(response.headers.get('access-control-allow-origin')).toBeNull();
  });

  it('accepts same-origin deployment previews without production credential access', async () => {
    const origin = 'https://deploy-preview-5--rngl.netlify.app';
    expect((await cleaningEstimate(request(valid, { Origin: origin }, origin + '/.netlify/functions/cleaning-estimate'))).status).toBe(200);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it.each(['https://evil.example', 'null', 'https://rangeljanitorial.com.evil.example'])('blocks unexpected origin %s', async Origin => {
    const response = await cleaningEstimate(request(valid, { Origin }));
    expect(response.status).toBe(403);
    expect(response.headers.get('access-control-allow-origin')).toBeNull();
  });

  it.each(['GET', 'OPTIONS', 'PUT'])('rejects %s without any write or outbound request', async method => {
    const response = await cleaningEstimate(new Request('https://rangeljanitorial.com/.netlify/functions/cleaning-estimate', { method }));
    expect(response.status).toBe(405);
    expect(response.headers.get('allow')).toBe('POST');
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('requires JSON', async () => {
    expect((await cleaningEstimate(request(valid, { 'Content-Type': 'text/plain' }))).status).toBe(415);
  });

  it.each(['{broken', 'null', '[]', '{}'])('rejects malformed input %s', async body => {
    expect((await cleaningEstimate(request(body))).status).toBe(400);
  });

  it('rejects an oversized streamed body even without content length', async () => {
    const response = await cleaningEstimate(request({ ...valid, ignored: 'x'.repeat(5000) }));
    expect(response.status).toBe(413);
  });

  it('rejects an oversized declared length before parsing', async () => {
    expect((await cleaningEstimate(request(valid, { 'content-length': '100000' }))).status).toBe(413);
  });

  it.each([
    ['CALCULATOR_PAYROLL_TAX_INSURANCE_PERCENT', 'NaN'], ['CALCULATOR_OVERHEAD_PERCENT', ''],
    ['CALCULATOR_PROFIT_MARKUP_PERCENT', '-1'], ['CALCULATOR_MISC_MONTHLY_COST', 'Infinity'],
  ])('fails closed without disclosing invalid private configuration %s', async (name, value) => {
    settings[name] = value;
    const response = await cleaningEstimate(request());
    expect(response.status).toBe(503);
    expect(await response.json()).toEqual({ success: false, message: 'Cleaning estimates are temporarily unavailable. Please contact your local office for a quote.' });
    expect(fetchMock).not.toHaveBeenCalled();
    expect(console.error).not.toHaveBeenCalled();
  });

  it('serves the inclusive $72 policy when all pricing environment settings are absent', async () => {
    settings = {};
    const response = await cleaningEstimate(request({ ...valid, squareFootage: 2000, daysPerWeek: 2 }));
    expect(response.status).toBe(200);
    const body = await response.json();
    expect(body.success).toBe(true);
    expect(body.estimate.packages.standard.costPerVisit).toBeCloseTo(79.2, 8);
    expect(body.estimate.packages.standard.monthlyCost).toBeCloseTo(712.8, 8);
    expect(body.pricingVersion).toBe(getCleaningPricingVersion(readCleaningPricingPolicy(() => undefined)));
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('declares rate limiting for the public endpoint', () => {
    expect(config.rateLimit).toEqual({ action: 'rate_limit', aggregateBy: ['ip', 'domain'], windowSize: 60, windowLimit: 120 });
  });
});
