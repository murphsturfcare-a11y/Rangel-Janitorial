import { randomUUID } from 'node:crypto';
import regions from '../../src/data/regions.json';
import { facilityOptions, frequencyOptions, referralOptions, leadLimits, submissionIdPattern, type LeadResult } from '../../src/lib/leads';

declare const Netlify: { env: { get(name: string): string | undefined } };

const GHL_API_URL = 'https://services.leadconnectorhq.com/contacts/';
const MAX_BODY_BYTES = 16_384;
const UPSTREAM_TIMEOUT_MS = 8_000;
const CUSTOM_FIELD_IDS = {
  facilityType: 'fVouV566y2CSCh8GmHzp',
  frequency: 'npSugoNIifW9NuoWENST',
  referralSource: '35dEadwR8DjeqFd7wiKH',
  message: 'V3Is6asWPYYuj2lWnjIG',
};

// Netlify enforces this across invocations, before calling the function.
// https://docs.netlify.com/manage/security/secure-access-to-sites/rate-limiting/
export const config = {
  rateLimit: { action: 'rate_limit', aggregateBy: ['ip', 'domain'], windowSize: 60, windowLimit: 10 },
};

function getEnv(name: string): string | undefined {
  return typeof Netlify === 'undefined' ? undefined : Netlify.env.get(name);
}

function allowedOrigins(): Set<string> {
  const origins = new Set(['https://rangeljanitorial.com', 'https://www.rangeljanitorial.com', 'http://localhost:3000']);
  // Explicit preview origins only, with sandbox CRM credentials configured for that deploy context.
  for (const value of (getEnv('LEAD_ALLOWED_ORIGINS') || '').split(',')) {
    try {
      const url = new URL(value.trim());
      if (url.protocol === 'https:' && url.origin === value.trim()) origins.add(url.origin);
    } catch { /* Ignore invalid deployment configuration entries. */ }
  }
  return origins;
}

class InputError extends Error {
  constructor(message: string, readonly status = 400) { super(message); }
}

async function readBody(req: Request): Promise<Record<string, unknown>> {
  const declaredLength = Number(req.headers.get('content-length'));
  if (declaredLength > MAX_BODY_BYTES) throw new InputError('The request is too large.', 413);
  const reader = req.body?.getReader();
  if (!reader) throw new InputError('Please complete the quote form.');
  const chunks: Uint8Array[] = [];
  let size = 0;
  try {
    for (;;) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > MAX_BODY_BYTES) {
        await reader.cancel();
        throw new InputError('The request is too large.', 413);
      }
      chunks.push(value);
    }
  } finally { reader.releaseLock(); }
  const bytes = new Uint8Array(size);
  let offset = 0;
  for (const chunk of chunks) { bytes.set(chunk, offset); offset += chunk.byteLength; }
  try {
    const body: unknown = JSON.parse(new TextDecoder().decode(bytes));
    if (!body || typeof body !== 'object' || Array.isArray(body)) throw new Error();
    return body as Record<string, unknown>;
  } catch { throw new InputError('Please submit a valid quote form.'); }
}

function field(body: Record<string, unknown>, key: string, maxLength: number, required = false): string {
  const value = body[key] ?? '';
  if (typeof value !== 'string' || value.length > maxLength || /[<>\u0000-\u0008\u000b\u000c\u000e-\u001f]/.test(value)) {
    throw new InputError('Please check the ' + key.replace(/([A-Z])/g, ' $1').toLowerCase() + ' field.');
  }
  const trimmed = value.trim();
  if (required && !trimmed) throw new InputError('Please fill in all required fields.');
  return trimmed;
}

function choice(body: Record<string, unknown>, key: string, choices: readonly string[]): string {
  const value = field(body, key, 100);
  if (value && !choices.includes(value)) throw new InputError('Please select an available form option.');
  return value;
}

function attribution(body: Record<string, unknown>): string[] {
  // Only conventional campaign labels: never copy arbitrary query strings or URLs into CRM/analytics.
  if (body.attribution == null) return [];
  if (typeof body.attribution !== 'object' || Array.isArray(body.attribution)) throw new InputError('Invalid attribution.');
  const values = body.attribution as Record<string, unknown>;
  return ['source', 'medium', 'campaign'].flatMap(key => {
    const value = values[key];
    if (typeof value !== 'string' || !/^[a-zA-Z0-9][a-zA-Z0-9._ -]{0,79}$/.test(value) || /\d(?:[ ._-]*\d){6,}/.test(value)) return [];
    return [key + ': ' + value];
  });
}

export default async function lead(req: Request): Promise<Response> {
  const origin = req.headers.get('origin') || '';
  const isAllowed = !origin || allowedOrigins().has(origin);
  let submissionId: string = randomUUID();
  const headers: Record<string, string> = {
    'Content-Type': 'application/json', 'Cache-Control': 'no-store', Vary: 'Origin',
    'Access-Control-Allow-Methods': 'POST, OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type',
  };
  if (origin && isAllowed) headers['Access-Control-Allow-Origin'] = origin;
  function respond(status: number, outcome: LeadResult['outcome'], code: string, message: string, retryAllowed = false) {
    return new Response(JSON.stringify({ success: outcome === 'accepted', outcome, code, message, submissionId, retryAllowed } satisfies LeadResult), { status, headers });
  }
  if (!isAllowed) return respond(403, 'rejected', 'ORIGIN_REJECTED', 'Please use the quote form on our website.');
  if (req.method === 'OPTIONS') return new Response(null, { status: 204, headers });
  if (req.method !== 'POST') {
    headers.Allow = 'POST, OPTIONS';
    return respond(405, 'rejected', 'METHOD_NOT_ALLOWED', 'Method not allowed.');
  }
  if (req.headers.get('content-type')?.split(';')[0].trim().toLowerCase() !== 'application/json') {
    return respond(415, 'rejected', 'INVALID_CONTENT_TYPE', 'Please submit the quote form as JSON.');
  }

  let payload: Record<string, unknown>;
  try {
    const body = await readBody(req);
    const submittedId = field(body, 'submissionId', 36, true);
    if (!submissionIdPattern.test(submittedId)) throw new InputError('Please reload the form and try again.');
    submissionId = submittedId;
    if (field(body, 'website', 200)) return respond(400, 'rejected', 'FORM_REJECTED', 'We could not process this form. Please call your local office.');
    const regionSlug = field(body, 'regionSlug', 60, true);
    const region = regions.find(region => region.slug === regionSlug);
    if (!region) throw new InputError('Please choose a valid service region.');
    const placement = field(body, 'formPlacement', 20, true);
    if (!['hero', 'bottom'].includes(placement)) throw new InputError('Please use a current quote form.');
    const sourcePage = field(body, 'sourcePage', 200, true);
    if (sourcePage !== '/locations/' + region.slug) throw new InputError('Please use your regional quote form.');
    const firstName = field(body, 'firstName', leadLimits.name, true);
    const lastName = field(body, 'lastName', leadLimits.name, true);
    const phone = field(body, 'phone', leadLimits.phone, true);
    const email = field(body, 'email', leadLimits.email, true);
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw new InputError('Please enter a valid email address.');
    if (!/^[+()\d\s.-]+$/.test(phone) || phone.replace(/\D/g, '').length < 7 || phone.replace(/\D/g, '').length > 15) {
      throw new InputError('Please enter a valid phone number.');
    }
    const facilityType = choice(body, 'facilityType', facilityOptions);
    const frequency = choice(body, 'frequency', frequencyOptions);
    const referralSource = choice(body, 'referralSource', referralOptions);
    const message = field(body, 'message', leadLimits.message);
    const details = [message, 'Website request reference: ' + submissionId, 'Page: ' + sourcePage, 'Form: ' + placement, ...attribution(body)].filter(Boolean).join('\n');
    const customFields = [
      ...(facilityType ? [{ id: CUSTOM_FIELD_IDS.facilityType, field_value: facilityType }] : []),
      ...(frequency ? [{ id: CUSTOM_FIELD_IDS.frequency, field_value: frequency }] : []),
      ...(referralSource ? [{ id: CUSTOM_FIELD_IDS.referralSource, field_value: referralSource }] : []),
      { id: CUSTOM_FIELD_IDS.message, field_value: details },
    ];
    payload = {
      firstName, lastName, phone, email,
      source: 'Website - ' + region.city,
      tags: ['website-lead', 'location-' + region.slug,
        facilityType ? 'facility-' + facilityType.toLowerCase().replace(/[\s\/]+/g, '-') : '',
        frequency ? 'freq-' + frequency.toLowerCase().replace(/[\s\/()]+/g, '-') : '',
        referralSource ? 'ref-' + referralSource.toLowerCase().replace(/\s+/g, '-') : '',
      ].filter(Boolean),
      customFields,
    };
  } catch (error) {
    if (error instanceof InputError) return respond(error.status, 'rejected', 'INVALID_INPUT', error.message, true);
    return respond(400, 'rejected', 'INVALID_INPUT', 'We could not read the form. Please try again.', true);
  }

  const apiKey = getEnv('GHL_API_KEY');
  const locationId = getEnv('GHL_LOCATION_ID');
  if (!apiKey || !locationId) {
    console.error('lead_delivery', { submissionId, code: 'CONFIGURATION_MISSING' });
    return respond(503, 'rejected', 'SERVICE_UNAVAILABLE', 'Online quotes are temporarily unavailable. Please call your local office.');
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), UPSTREAM_TIMEOUT_MS);
  try {
    // Keep the existing API version and create contract. Never retry a POST automatically.
    const result = await fetch(GHL_API_URL, {
      method: 'POST', signal: controller.signal,
      headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + apiKey, Version: '2021-07-28' },
      body: JSON.stringify({ ...payload, locationId }),
    });
    if (!result.ok) {
      console.error('lead_delivery', { submissionId, code: 'PROVIDER_REJECTED', status: result.status });
      // A server-side provider failure may happen after creating the contact.
      if (result.status >= 500 || result.status === 408) return respond(502, 'unknown', 'DELIVERY_UNCONFIRMED', 'We could not confirm receipt. Please call your local office before submitting again.');
      if (result.status === 429) {
        headers['Retry-After'] = '60';
        return respond(429, 'rejected', 'RATE_LIMITED', 'Please wait a minute before trying again, or call your local office.', true);
      }
      return respond(502, 'rejected', 'PROVIDER_REJECTED', 'Your request was not accepted. Please call your local office so we can help.');
    }
    const receipt: unknown = await result.json();
    const contact = receipt && typeof receipt === 'object' && 'contact' in receipt ? receipt.contact : null;
    if (!contact || typeof contact !== 'object' || !('id' in contact) || typeof contact.id !== 'string' || !contact.id.trim()) {
      console.error('lead_delivery', { submissionId, code: 'INVALID_PROVIDER_RECEIPT' });
      return respond(502, 'unknown', 'DELIVERY_UNCONFIRMED', 'We could not confirm receipt. Please call your local office before submitting again.');
    }
    console.info('lead_delivery', { submissionId, code: 'ACCEPTED' });
    return respond(200, 'accepted', 'ACCEPTED', 'Your quote request has been received.');
  } catch {
    // Do not log the provider body, contact details, credentials, or exception text.
    console.error('lead_delivery', { submissionId, code: controller.signal.aborted ? 'UPSTREAM_TIMEOUT' : 'DELIVERY_UNCONFIRMED' });
    return respond(controller.signal.aborted ? 504 : 502, 'unknown', 'DELIVERY_UNCONFIRMED', 'We could not confirm receipt. Please call your local office before submitting again.');
  } finally { clearTimeout(timeout); }
}
