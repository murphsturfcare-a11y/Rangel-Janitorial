'use client';

import { GOOGLE_TAG_MANAGER_ID } from '@/lib/analytics/ads-config';
import { isAdsMeasurementAllowed } from '@/lib/analytics/gtag';

/** Called after the shared queue contains consent and sanitized page settings. */
export function loadGoogleTagManager(): void {
  if (typeof window === 'undefined' || !GOOGLE_TAG_MANAGER_ID || !isAdsMeasurementAllowed() || !window.gtag) return;
  if (document.getElementById('rangel-gtm-script')) return;

  window.dataLayer.push({ 'gtm.start': Date.now(), event: 'gtm.js' });
  const script = document.createElement('script');
  script.id = 'rangel-gtm-script';
  script.async = true;
  script.referrerPolicy = 'origin';
  script.src = 'https://www.googletagmanager.com/gtm.js?id=' + GOOGLE_TAG_MANAGER_ID;
  document.head.appendChild(script);
}

// An unconditional noscript iframe cannot read this site's saved consent.
