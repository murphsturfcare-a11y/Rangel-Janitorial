import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import lead, { config } from '../../netlify/functions/lead.mjs';
import { REQUEST_FOLLOWUP_NOTICE_VERSION } from '@/lib/leads';

const submissionId = '8b75ba63-7b5d-4aa7-8e25-a4b9b3b3ef42';
const valid = {
  submissionId, regionSlug: 'murrieta', formPlacement: 'hero', sourcePage: '/locations/murrieta',
  website: '', firstName: 'Jamie', lastName: "O'Neil", phone: '(951) 555-0100',
  email: 'jamie@example.test', facilityType: 'Office Building', frequency: 'Weekly',
  referralSource: 'Google Search', message: 'Please clean our office.',
  requestType: 'quote',
  requestConsent: { noticeVersion: REQUEST_FOLLOWUP_NOTICE_VERSION, privacyAcknowledged: true, followUpRequested: true },
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
    expect(payload).toMatchObject({ locationId: 'test-office', source: 'Website (organic/direct) - ' + city, lastName: "O'Neil" });
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

describe('request-specific acknowledgment boundary', () => {
  it.each([
    undefined, null, [], true, 'accepted', {},
    { ...valid.requestConsent, noticeVersion: undefined },
    { ...valid.requestConsent, noticeVersion: 'request-followup-v0' },
    { ...valid.requestConsent, noticeVersion: 'request-followup-v1\nSMS allowed' },
    { ...valid.requestConsent, privacyAcknowledged: undefined },
    { ...valid.requestConsent, privacyAcknowledged: false },
    { ...valid.requestConsent, privacyAcknowledged: 'true' },
    { ...valid.requestConsent, privacyAcknowledged: 1 },
    { ...valid.requestConsent, followUpRequested: undefined },
    { ...valid.requestConsent, followUpRequested: false },
    { ...valid.requestConsent, followUpRequested: 'true' },
    { ...valid.requestConsent, followUpRequested: 1 },
  ])('rejects missing or invalid acknowledgment before CRM: %j', async requestConsent => {
    const response = await lead(request({ ...valid, requestConsent }));
    expect(response.status).toBe(400);
    expect(await response.json()).toMatchObject({ outcome: 'rejected', code: 'INVALID_INPUT', retryAllowed: true, submissionId });
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it.each([undefined, null, '', 'Quote', 'quote ', 'marketing', 'walkthrough\nSMS allowed', 1, {}])('rejects an invalid request type before CRM: %j', async requestType => {
    const response = await lead(request({ ...valid, requestType }));
    expect(response.status).toBe(400);
    expect(await response.json()).toMatchObject({ outcome: 'rejected', code: 'INVALID_INPUT' });
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it.each(['quote', 'walkthrough'])('records bounded %s acknowledgment with server receipt time and no advertising requirement', async requestType => {
    vi.useFakeTimers();
    const receivedAt = new Date('2026-10-19T20:30:00.000Z');
    vi.setSystemTime(receivedAt);
    fetchMock.mockResolvedValue(Response.json({ contact: { id: 'contact-test' } }, { status: 201 }));
    const response = await lead(request({
      ...valid, requestType, adAttribution: null, attribution: {},
      requestConsent: {
        ...valid.requestConsent, receivedAt: '1999-01-01T00:00:00.000Z', acknowledgedAt: '2099-01-01T00:00:00.000Z',
        channels: ['sms'], promotionalCampaigns: true, advertising: 'accepted', noticeText: 'untrusted permission text',
      },
    }));
    expect(response.status).toBe(200);
    expect(await response.json()).toMatchObject({ success: true, outcome: 'accepted', submissionId, retryAllowed: false });
    expect(fetchMock).toHaveBeenCalledTimes(1);
    const payload = JSON.parse(fetchMock.mock.calls[0][1]?.body as string);
    const metadata = payload.customFields.find((field: { field_value: string }) => field.field_value.includes('Website request reference:')).field_value;
    expect(metadata).toContain('Request type: ' + requestType);
    expect(metadata).toContain('Request acknowledgment version: request-followup-v1');
    expect(metadata).toContain('Privacy policy acknowledged: yes');
    expect(metadata).toContain('Follow-up requested: phone/email about this ' + requestType + ' only');
    expect(metadata).toContain('Promotional campaigns and SMS: not authorized by this acknowledgment');
    expect(metadata).toContain('Acknowledgment received by server: ' + receivedAt.toISOString());
    expect(metadata).not.toMatch(/1999|2099|untrusted permission|Advertising measurement consent/);
    expect(payload.tags).toEqual(['website-lead', 'location-murrieta', 'lead-channel-website', 'facility-office-building', 'freq-weekly', 'ref-google-search']);
    expect(payload).not.toHaveProperty('requestConsent');
    expect(payload).not.toHaveProperty('requestType');
    expect(JSON.stringify(vi.mocked(console.info).mock.calls)).not.toMatch(/Jamie|example\.test|phone\/email|acknowledg/);
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

describe('paid source and consented click metadata boundary', () => {
  it.each(['murrieta', 'sacramento', 'walnut-creek'])('allows only the matching regional paid source for %s', async regionSlug => {
    fetchMock.mockResolvedValue(Response.json({ contact: { id: 'accepted' } }));
    const response = await lead(request({ ...valid, regionSlug, sourcePage: '/quote/' + regionSlug }));
    expect(response.status).toBe(200);
    const payload = JSON.parse(fetchMock.mock.calls[0][1]?.body as string);
    expect(payload.tags).toContain('location-' + regionSlug);
    expect(JSON.stringify(payload.customFields)).toContain('Page: /quote/' + regionSlug);
  });

  it.each(['/quote/sacramento', '/quote/murrieta?gclid=private', 'https://example.test/quote/murrieta'])('rejects spoofed or unbounded source %s', async sourcePage => {
    expect((await lead(request({ ...valid, sourcePage }))).status).toBe(400);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('preserves validated IDs with consent and timestamp only in CRM request metadata', async () => {
    fetchMock.mockResolvedValue(Response.json({ contact: { id: 'accepted' } }));
    const capturedAt = new Date().toISOString();
    const response = await lead(request({ ...valid, adAttribution: { consent: 'granted', capturedAt, clickIds: { gclid: 'EAIaIQobChMI_12345678901234567890', gbraid: '0AAAA_test_braid', wbraid: 'ClQK_test_braid', email: 'private@example.test' } } }));
    expect(response.status).toBe(200);
    const metadata = JSON.stringify(JSON.parse(fetchMock.mock.calls[0][1]?.body as string).customFields);
    expect(metadata).toContain('gclid: EAIaIQobChMI_12345678901234567890');
    expect(metadata).toContain('gbraid: 0AAAA_test_braid');
    expect(metadata).toContain('wbraid: ClQK_test_braid');
    expect(metadata).toContain('Advertising measurement consent: granted');
    expect(metadata).toContain(capturedAt);
    expect(metadata).not.toContain('private@example.test');
    expect(JSON.stringify(vi.mocked(console.info).mock.calls)).not.toMatch(/EAIaIQ|0AAAA|ClQK/);
    expect(await response.json()).not.toHaveProperty('adAttribution');
  });

  it.each([
    [{ source: 'google', medium: 'cpc', campaign: 'sacramento-cleaning' }, 'Google Ads', 'google-ads'],
    [{ source: 'google', medium: 'organic' }, 'Organic Search', 'organic-search'],
    [{ source: 'bing', medium: 'ppc' }, 'Paid campaign', 'paid-campaign'],
    [{}, 'Website (organic/direct)', 'website'],
  ])('routes %j with its evidenced channel and preserves existing workflow tags', async (attribution, label, channel) => {
    fetchMock.mockResolvedValue(Response.json({ contact: { id: 'accepted' } }));
    const response = await lead(request({ ...valid, regionSlug: 'sacramento', sourcePage: '/quote/sacramento', attribution }));
    expect(response.status).toBe(200);
    const payload = JSON.parse(fetchMock.mock.calls[0][1]?.body as string);
    expect(payload.source).toBe(label + ' - Sacramento');
    expect(payload.tags).toEqual(expect.arrayContaining(['website-lead', 'location-sacramento', 'lead-channel-' + channel]));
    const metadata = JSON.stringify(payload.customFields);
    expect(metadata).toContain('Lead channel: ' + label);
    expect(metadata).toContain('Attribution evidence: ');
  });

  it('does not treat the quote route or self-reported Google Search answer as paid evidence', async () => {
    fetchMock.mockResolvedValue(Response.json({ contact: { id: 'accepted' } }));
    await lead(request({ ...valid, sourcePage: '/quote/murrieta' }));
    const payload = JSON.parse(fetchMock.mock.calls[0][1]?.body as string);
    expect(payload.source).toBe('Website (organic/direct) - Murrieta');
    expect(payload.tags).not.toContain('lead-channel-google-ads');
  });

  it('records a non-identifying current Google label without inventing click identifiers or measurement permission', async () => {
    fetchMock.mockResolvedValue(Response.json({ contact: { id: 'accepted' } }));
    const response = await lead(request({ ...valid, leadOrigin: { channel: 'google-ads', basis: 'current-google-click-marker' } }));
    expect(response.status).toBe(200);
    const payload = JSON.parse(fetchMock.mock.calls[0][1]?.body as string);
    expect(payload.source).toBe('Google Ads - Murrieta');
    expect(payload.tags).toContain('lead-channel-google-ads');
    expect(JSON.stringify(payload.customFields)).toContain('reported by website; advertising attribution not verified');
    expect(JSON.stringify(payload.customFields)).not.toMatch(/gclid:|gbraid:|wbraid:|Advertising measurement consent/);
  });

  it.each([
    'google-ads', [],
    { channel: 'google-ads', basis: 'current-organic-utm' },
    { channel: 'google-ads', basis: 'current-google-click-marker', url: 'https://private.example.test' },
  ])('rejects an invalid current-source boundary before delivery: %j', async leadOrigin => {
    const response = await lead(request({ ...valid, leadOrigin }));
    expect(response.status).toBe(400);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it.each([
    { consent: 'denied', capturedAt: new Date().toISOString(), clickIds: { gclid: 'valid_test_click' } },
    { consent: 'granted', capturedAt: 'bad', clickIds: { gclid: 'valid_test_click' } },
    { consent: 'granted', capturedAt: new Date().toISOString(), clickIds: { gclid: 'person@example.test' } },
    { consent: 'granted', capturedAt: new Date().toISOString(), clickIds: { gclid: 'x'.repeat(513) } },
    [],
  ])('rejects invalid ad metadata without contacting CRM: %j', async adAttribution => {
    expect((await lead(request({ ...valid, adAttribution }))).status).toBe(400);
    expect(fetchMock).not.toHaveBeenCalled();
  });
});

describe('owner-facing notes and request audit separation', () => {
  const messageFieldId = 'V3Is6asWPYYuj2lWnjIG';
  const requestDetailsFieldId = 'swxhJlbYtJHOTPi41zwy';

  it('keeps the customer message readable and writes the complete audit to the configured field', async () => {
    fetchMock.mockResolvedValue(Response.json({ contact: { id: 'accepted' } }));
    const capturedAt = new Date().toISOString();
    const clickId = 'Google_click_test_1234';
    await lead(request({ ...valid, adAttribution: { consent: 'granted', capturedAt, clickIds: { gclid: clickId } } }));
    const payload = JSON.parse(fetchMock.mock.calls[0][1]?.body as string);
    expect(payload.customFields.find((field: { id: string }) => field.id === messageFieldId).field_value).toBe(valid.message);
    const audit = payload.customFields.find((field: { id: string }) => field.id === requestDetailsFieldId).field_value;
    expect(audit).toContain('Website request reference: ' + submissionId);
    expect(audit).toContain('Lead channel: Google Ads');
    expect(audit).toContain('Attribution evidence: Google click identifier present: gclid (format validated)');
    expect(audit).toContain('Page: /locations/murrieta');
    expect(audit).toContain('Request acknowledgment version: ' + REQUEST_FOLLOWUP_NOTICE_VERSION);
    expect(audit).toContain('gclid: ' + clickId);
    expect(audit).toContain(capturedAt);
    expect(audit).not.toContain(valid.message);
  });

  it('uses a clear notes fallback while keeping the audit separate', async () => {
    fetchMock.mockResolvedValue(Response.json({ contact: { id: 'accepted' } }));
    await lead(request({ ...valid, message: '' }));
    const payload = JSON.parse(fetchMock.mock.calls[0][1]?.body as string);
    expect(payload.customFields.find((field: { id: string }) => field.id === messageFieldId).field_value).toBe('No additional notes provided.');
    expect(payload.customFields.find((field: { id: string }) => field.id === requestDetailsFieldId).field_value).toContain(submissionId);
  });

  it('preserves all metadata in the dedicated request field even without any source evidence', async () => {
    fetchMock.mockResolvedValue(Response.json({ contact: { id: 'accepted' } }));
    await lead(request());
    const payload = JSON.parse(fetchMock.mock.calls[0][1]?.body as string);
    const message = payload.customFields.find((field: { id: string }) => field.id === messageFieldId).field_value;
    expect(message).toBe(valid.message);
    const audit = payload.customFields.find((field: { id: string }) => field.id === requestDetailsFieldId).field_value;
    expect(audit).toContain('Website request reference: ' + submissionId);
    expect(audit).toContain('Privacy policy acknowledged: yes');
    expect(audit).toContain('Lead channel: Website (organic/direct)');
    expect(payload.customFields).toHaveLength(5);
  });
});
