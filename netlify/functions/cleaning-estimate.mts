import { normalizeCleaningEstimateInput, type CleaningEstimateResponse } from '../../src/lib/cleaning-estimate';
import { calculateCleaningEstimate, getCleaningPricingVersion, readCleaningPricingPolicy } from '../lib/cleaning-pricing';

declare const Netlify: { env: { get(name: string): string | undefined } };

const MAX_BODY_BYTES = 4096;

export const config = {
  rateLimit: { action: 'rate_limit', aggregateBy: ['ip', 'domain'], windowSize: 60, windowLimit: 120 },
};

class BodyError extends Error {
  constructor(message: string, readonly status = 400) { super(message); }
}

async function readBody(request: Request): Promise<unknown> {
  if (Number(request.headers.get('content-length')) > MAX_BODY_BYTES) throw new BodyError('The estimate request is too large.', 413);
  const reader = request.body?.getReader();
  if (!reader) throw new BodyError('Please provide your cleaning estimate details.');
  const chunks: Uint8Array[] = [];
  let size = 0;
  try {
    for (;;) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > MAX_BODY_BYTES) {
        await reader.cancel();
        throw new BodyError('The estimate request is too large.', 413);
      }
      chunks.push(value);
    }
  } finally { reader.releaseLock(); }
  const bytes = new Uint8Array(size);
  let offset = 0;
  for (const chunk of chunks) { bytes.set(chunk, offset); offset += chunk.byteLength; }
  try { return JSON.parse(new TextDecoder().decode(bytes)); }
  catch { throw new BodyError('Please provide valid cleaning estimate details.'); }
}

/** Public, read-only estimation. It never sends email or contacts a CRM. */
export default async function cleaningEstimate(request: Request): Promise<Response> {
  const headers: Record<string, string> = { 'Content-Type': 'application/json', 'Cache-Control': 'no-store', Vary: 'Origin' };
  const respond = (status: number, body: CleaningEstimateResponse) => new Response(JSON.stringify(body), { status, headers });
  const origin = request.headers.get('origin');
  const allowedOrigins = new Set([new URL(request.url).origin, 'https://rangeljanitorial.com', 'https://www.rangeljanitorial.com']);
  if (origin && !allowedOrigins.has(origin)) return respond(403, { success: false, message: 'Please use the calculator on our website.' });
  if (request.method !== 'POST') {
    headers.Allow = 'POST';
    return respond(405, { success: false, message: 'Method not allowed.' });
  }
  if (request.headers.get('content-type')?.split(';')[0].trim().toLowerCase() !== 'application/json') {
    return respond(415, { success: false, message: 'Please submit the estimate details as JSON.' });
  }
  let input;
  try {
    const normalized = normalizeCleaningEstimateInput(await readBody(request));
    if (!normalized.success) return respond(400, { success: false, message: normalized.error });
    input = normalized.data;
  } catch (error) {
    return respond(error instanceof BodyError ? error.status : 400, {
      success: false, message: error instanceof BodyError ? error.message : 'We could not read the estimate. Please try again.',
    });
  }
  try {
    const policy = readCleaningPricingPolicy(name => typeof Netlify === 'undefined' ? undefined : Netlify.env.get(name));
    return respond(200, { success: true, estimate: calculateCleaningEstimate(input, policy), pricingVersion: getCleaningPricingVersion(policy) });
  } catch {
    return respond(503, { success: false, message: 'Cleaning estimates are temporarily unavailable. Please contact your local office for a quote.' });
  }
}
