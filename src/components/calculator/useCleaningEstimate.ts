'use client';

import { useEffect, useState } from 'react';
import type { CleaningEstimate, CleaningEstimateInput } from '@/lib/cleaning-estimate';

type PublicQuote = { estimate: CleaningEstimate; pricingVersion: string };
type QuoteState = { key: string; result: PublicQuote } | { key: string; error: true };

function parsePublicQuote(value: unknown): PublicQuote | null {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return null;
  const body = value as Record<string, unknown>;
  if (body.success !== true || typeof body.pricingVersion !== 'string'
    || !/^[a-zA-Z0-9_-]{1,100}$/.test(body.pricingVersion)
    || !body.estimate || typeof body.estimate !== 'object') return null;
  const estimate = body.estimate as CleaningEstimate;
  if (!Number.isFinite(estimate.hoursPerVisit) || estimate.hoursPerVisit <= 0
    || !Number.isFinite(estimate.visitsPerMonth) || estimate.visitsPerMonth <= 0) return null;
  for (const id of ['standard', 'detailed', 'platinum'] as const) {
    const price = estimate.packages?.[id];
    if (!price || !Number.isFinite(price.costPerVisit) || price.costPerVisit < 0
      || !Number.isFinite(price.monthlyCost) || price.monthlyCost < 0) return null;
  }
  // Retain only the public estimate, even if an unexpected response has other fields.
  return {
    pricingVersion: body.pricingVersion,
    estimate: {
      hoursPerVisit: estimate.hoursPerVisit,
      visitsPerMonth: estimate.visitsPerMonth,
      packages: Object.fromEntries((['standard', 'detailed', 'platinum'] as const).map(id => [id, {
        costPerVisit: estimate.packages[id].costPerVisit,
        monthlyCost: estimate.packages[id].monthlyCost,
      }])) as CleaningEstimate['packages'],
    },
  };
}

/** Only public totals cross the network; pricing assumptions remain on the server. */
export function useCleaningEstimate(input: CleaningEstimateInput | null) {
  const [state, setState] = useState<QuoteState | null>(null);
  const [attempt, setAttempt] = useState(0);
  // One response includes every package, so switching packages needs no extra request.
  const requestBody = input ? JSON.stringify({ ...input, package: 'standard' }) : '';
  const requestKey = `${attempt}:${requestBody}`;

  useEffect(() => {
    if (!requestBody) return;
    const controller = new AbortController();
    let active = true;
    const timer = window.setTimeout(async () => {
      const timeout = window.setTimeout(() => controller.abort(), 12_000);
      try {
        const response = await fetch('/.netlify/functions/cleaning-estimate', {
          method: 'POST', headers: { 'Content-Type': 'application/json' },
          body: requestBody, signal: controller.signal, cache: 'no-store',
        });
        const quote = response.ok ? parsePublicQuote(await response.json()) : null;
        if (!quote) throw new Error('Estimate unavailable');
        if (active) setState({ key: requestKey, result: quote });
      } catch {
        if (active) setState({ key: requestKey, error: true });
      } finally { window.clearTimeout(timeout); }
    }, 200);
    return () => { active = false; window.clearTimeout(timer); controller.abort(); };
  }, [requestBody, requestKey]);

  const current = requestBody && state?.key === requestKey ? state : null;
  const result = current && 'result' in current ? current.result : null;
  const error = !!current && 'error' in current;
  return {
    estimate: result?.estimate ?? null,
    pricingVersion: result?.pricingVersion ?? null,
    loading: !!requestBody && !result && !error,
    error,
    refresh: () => setAttempt(value => value + 1),
  };
}
