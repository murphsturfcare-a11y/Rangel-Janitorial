export interface UTMParams { source: string; medium: string; campaign: string; term: string; content: string; }
const UTM_STORAGE_KEY = 'rangel_janitorial_utm';
const fields = ['source', 'medium', 'campaign', 'term', 'content'] as const;

function campaignValue(value: unknown): string {
  if (typeof value !== 'string') return '';
  const trimmed = value.trim();
  return /^[a-zA-Z0-9][a-zA-Z0-9 ._-]{0,79}$/.test(trimmed) && !/\d(?:[ ._-]*\d){6,}/.test(trimmed) ? trimmed : '';
}
function normalize(value: unknown): UTMParams | null {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return null;
  const record = value as Record<string, unknown>;
  const result = Object.fromEntries(fields.map((field) => [field, campaignValue(record[field])])) as unknown as UTMParams;
  return result.source || result.medium || result.campaign ? result : null;
}
export function parseUTMFromURL(searchParams: URLSearchParams): UTMParams | null {
  return normalize(Object.fromEntries(fields.map((field) => [field, searchParams.get(`utm_${field}`)])));
}
export function storeUTMParams(params: UTMParams): void {
  if (typeof window === 'undefined') return;
  const clean = normalize(params);
  try { if (clean) sessionStorage.setItem(UTM_STORAGE_KEY, JSON.stringify(clean)); }
  catch { /* Attribution is optional when browser storage is unavailable. */ }
}
export function getStoredUTMParams(): UTMParams | null {
  if (typeof window === 'undefined') return null;
  try { return normalize(JSON.parse(sessionStorage.getItem(UTM_STORAGE_KEY) || 'null')); }
  catch { return null; }
}
export function appendUTMToFormData<T extends Record<string, unknown>>(formData: T): T & Record<string, unknown> {
  const utm = getStoredUTMParams();
  return utm ? {...formData, ...Object.fromEntries(fields.map((field) => [`utm_${field}`, utm[field]]))} : formData;
}
