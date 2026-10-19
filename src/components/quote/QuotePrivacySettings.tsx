'use client';

import { GA_MEASUREMENT_ID } from '@/lib/analytics/gtag';
import { GOOGLE_ADS_CONFIGURED } from '@/lib/analytics/ads';

export default function QuotePrivacySettings() {
  if (!GA_MEASUREMENT_ID && !GOOGLE_ADS_CONFIGURED) return null;

  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event('rangel:privacy-settings'))}
      className="inline-flex min-h-11 items-center rounded underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-forest"
    >
      Privacy settings
    </button>
  );
}
