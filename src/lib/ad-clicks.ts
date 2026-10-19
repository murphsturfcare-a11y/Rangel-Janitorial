/** Opaque ad identifiers have a separate boundary from human-readable campaign labels. */
export const adClickKeys = ['gclid', 'gbraid', 'wbraid'] as const;
export type AdClickIds = Partial<Record<(typeof adClickKeys)[number], string>>;
export const adAttributionMaxAgeMs = 30 * 24 * 60 * 60 * 1000;

export interface AdAttribution {
  consent: 'granted';
  capturedAt: string;
  clickIds: AdClickIds;
}

export function validAdClickId(value: unknown): value is string {
  return typeof value === 'string' && /^[A-Za-z0-9_-]{10,512}$/.test(value);
}

export function readAdClickIds(value: unknown): AdClickIds {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return {};
  const record = value as Record<string, unknown>;
  return Object.fromEntries(adClickKeys.flatMap(key => validAdClickId(record[key]) ? [[key, record[key]]] : []));
}

export function normalizeAdAttribution(value: unknown, now = Date.now()): AdAttribution | null {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return null;
  const record = value as Record<string, unknown>;
  if (record.consent !== 'granted' || typeof record.capturedAt !== 'string') return null;
  const captured = Date.parse(record.capturedAt);
  if (!Number.isFinite(captured) || captured > now + 60_000 || now - captured > adAttributionMaxAgeMs) return null;
  const clickIds = readAdClickIds(record.clickIds);
  if (!Object.keys(clickIds).length) return null;
  return { consent: 'granted', capturedAt: new Date(captured).toISOString(), clickIds };
}
