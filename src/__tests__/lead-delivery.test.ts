import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import lead, { config } from '../../netlify/functions/lead.mjs';

const submissionId = '8b75ba63-7b5d-4aa7-8e25-a4b9b3b3ef42';
const valid = {
  submissionId, regionSlug: 'murrieta', formPlacement: 'hero', sourcePage: '/locations/murrieta',
  website: '', firstName: 'Jamie', lastName: "O'Neil", phone: '(951) 555-0100',
  email: 'jamie@example.test', facilityType: 'Office Building', frequency: 'Weekly',
  referralSource: 'Google Search', message: 'Please clean our office.',
};
const fetchMock = vi.fn<typeof fetch>();
let settings: Record<string, string>;

function request(body: unknown = valid, headers: Record<string, string> = {}) {
  return new Request('https://rangeljanitorial.com/.netlify/functions/lead', {
    method: 'POST', headers: { 'Content-Type': 'application/json', Origin: 'https://rangeljanitorial.com', ...headers },
    body: typeof body === 'string' ? body : JSON.stringify(body),
  });
}

beforeEach(() => {
  settings = { GHL_API_KEY: 'test-only-key', GHL_LOCATION_ID: 'test-office' };
  vi.stubGlobal('Netlify', { env: { get: (key: string) => settings[key] } });
  vi.stubGlobal('fetch', fetchMock);
  fetchMock.mockReset();
  vi.spyOn(console, 'error').mockImplementation(() => {});
  vi.spyOn(console, 'info').mockImplementation(() => {});
});
afterEach(() => {
  vi.useRealTimers();
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});

describe('lead delivery contract', () => {
  it.each([
    ['murrieta', 'Murrieta'], ['sacramento', 'Sacramento'], ['walnut-creek', 'Walnut Creek'],
  ])('confirms a valid receipt and routes %s from server records', async (regionSlug, city) => {
    fetchMock.mockResolvedValue(Response.json({ contact: { id: 'contact-test', locationId: 'test-office' } }, { status: 201 }));
    const res = await lead(request({ ...valid, regionSlug, sourcePage: '/locations/' + regionSlug, location: 'untrusted-region' }));
    expect(res.status).toBe(200);
    expect(res.headers.get('cache-control')).toBe('no-store');
    expect(await res.json()).toMatchObject({ success: true, outcome: 'accepted', submissionId, retryAllowed: false });
    const [, options] = fetchMock.mock.calls[0];
    expect(options?.headers).toMatchObject({ Version: '2021-07-28' });
    const payload = JSON.parse(options?.body as string);
    expect(payload).toMatchObject({ locationId: 'test-office', source: 'Website - ' + city, lastName: "O'Neil" });
    expect(payload.tags).toContain('location-' + regionSlug);
    expect(JSON.stringify(payload.customFields)).toContain(submissionId);
    expect(payload).not.toHaveProperty('companyName'); // A facility category is not a company name.
  });

  it.each([400, 401, 403, 409, 422, 429, 500, 503])('never claims success for provider %s and does not retry', async status => {
    fetchMock.mockResolvedValue(new Response('private provider details jamie@example.test test-only-key', { status }));
    const res = await lead(request());
    const result = await res.json();
    expect(result.success).toBe(false);
    expect(result.outcome).toBe(status >= 500 ? 'unknown' : 'rejected');
    expect(result.retryAllowed).toBe(status === 429);
    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(JSON.stringify(vi.mocked(console.error).mock.calls)).not.toMatch(/jamie|test-only-key|private provider/);
  });

  it.each([{}, { success: true }, { contact: {} }, { contact: { id: '' } }, null])('does not accept an invalid provider receipt %j', async body => {
    fetchMock.mockResolvedValue(Response.json(body));
    const res = await lead(request());
    expect(await res.json()).toMatchObject({ success: false, outcome: 'unknown', retryAllowed: false });
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it('does not accept a malformed JSON receipt', async () => {
    fetchMock.mockResolvedValue(new Response('<html>OK</html>', { status: 200 }));
    expect(await (await lead(request())).json()).toMatchObject({ outcome: 'unknown', success: false });
  });

  it('bounds an upstream timeout and reports an uncertain outcome without retrying', async () => {
    vi.useFakeTimers();
    fetchMock.mockImplementation((_url, options) => new Promise((_resolve, reject) => {
      options?.signal?.addEventListener('abort', () => reject(new DOMException('Timeout', 'AbortError')));
    }));
    const pending = lead(request());
    await vi.advanceTimersByTimeAsync(8001);
    const res = await pending;
    expect(res.status).toBe(504);
    expect(await res.json()).toMatchObject({ outcome: 'unknown', retryAllowed: false });
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it('treats network failures as uncertain, without logging the exception', async () => {
    fetchMock.mockRejectedValue(new Error('private customer details'));
    expect(await (await lead(request())).json()).toMatchObject({ outcome: 'unknown', retryAllowed: false });
    expect(JSON.stringify(vi.mocked(console.error).mock.calls)).not.toContain('private customer');
  });

  it('fails safely before delivery when configuration is missing', async () => {
    settings = {};
    const res = await lead(request());
    expect(res.status).toBe(503);
    expect(await res.json()).toMatchObject({ success: false, outcome: 'rejected' });
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('retains safe campaign labels and omits URLs, emails, and unbounded query fields', async () => {
    fetchMock.mockResolvedValue(Response.json({ contact: { id: 'accepted' } }));
    await lead(request({ ...valid, attribution: { source: 'google', medium: 'user@example.test', campaign: 'https://example.test', term: 'private search' } }));
    const body = JSON.stringify(JSON.parse(fetchMock.mock.calls[0][1]?.body as string).customFields);
    expect(body).toContain('source: google');
    expect(body).not.toMatch(/user@example|https:|private search/);
  });
});

describe('server input and abuse protection', () => {
  it.each([
    { firstName: 7 }, { lastName: {} }, { phone: 'not-a-phone' }, { email: 'bad' },
    { regionSlug: 'unrecognized' }, { formPlacement: 'injected' }, { sourcePage: '/admin' },
    { facilityType: 'unlisted value' }, { message: 'x'.repeat(2001) }, { submissionId: 'user@example.test' },
    { attribution: [] }, { message: '<script>alert(1)</script>' },
  ])('rejects invalid input before contacting CRM: %j', async invalid => {
    const res = await lead(request({ ...valid, ...invalid }));
    expect(res.status).toBe(400);
    expect(await res.json()).toMatchObject({ success: false, outcome: 'rejected' });
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('checks the honeypot on the server and never fakes success', async () => {
    const res = await lead(request({ ...valid, website: 'spam.example' }));
    expect(await res.json()).toMatchObject({ code: 'FORM_REJECTED', success: false });
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it.each(['{broken', 'null', '[]'])('rejects malformed or non-object JSON %s', async body => {
    expect((await lead(request(body))).status).toBe(400);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('rejects a large body even with no content-length header', async () => {
    const res = await lead(request({ ...valid, message: 'x'.repeat(17_000) }));
    expect(res.status).toBe(413);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('rejects a declared large body before parsing', async () => {
    expect((await lead(request(valid, { 'content-length': '100000' }))).status).toBe(413);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('blocks unexpected origins including preflight and accepts only configured preview origins', async () => {
    expect((await lead(request(valid, { Origin: 'https://evil.example' }))).status).toBe(403);
    const blocked = await lead(new Request('https://rangeljanitorial.com/.netlify/functions/lead', { method: 'OPTIONS', headers: { Origin: 'https://evil.example' } }));
    expect(blocked.status).toBe(403);
    expect(blocked.headers.get('access-control-allow-origin')).toBeNull();
    settings.LEAD_ALLOWED_ORIGINS = 'https://deploy-preview-7--rangel-test.netlify.app';
    const allowed = await lead(new Request('https://rangeljanitorial.com/.netlify/functions/lead', { method: 'OPTIONS', headers: { Origin: settings.LEAD_ALLOWED_ORIGINS } }));
    expect(allowed.status).toBe(204);
    expect(allowed.headers.get('access-control-allow-origin')).toBe(settings.LEAD_ALLOWED_ORIGINS);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('requires JSON and keeps GET read-only', async () => {
    expect((await lead(request(valid, { 'Content-Type': 'text/plain' }))).status).toBe(415);
    const get = await lead(new Request('https://rangeljanitorial.com/.netlify/functions/lead'));
    expect(get.status).toBe(405);
    expect(get.headers.get('allow')).toBe('POST, OPTIONS');
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('declares platform rate limiting rather than process-local counters', () => {
    expect(config.rateLimit).toMatchObject({ aggregateBy: ['ip', 'domain'], windowSize: 60, windowLimit: 10, action: 'rate_limit' });
  });
});
