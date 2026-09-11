'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { GA_MEASUREMENT_ID, getAnalyticsConsent, setAnalyticsConsent, type ConsentChoice } from '@/lib/analytics/gtag';

export function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);
  useEffect(() => {
    if (!GA_MEASUREMENT_ID) return;
    const refresh = () => setShowBanner(getAnalyticsConsent() === null);
    const open = () => setShowBanner(true);
    refresh();
    window.addEventListener('rangel:privacy-settings', open);
    window.addEventListener('rangel:consent', refresh);
    return () => {
      window.removeEventListener('rangel:privacy-settings', open);
      window.removeEventListener('rangel:consent', refresh);
    };
  }, []);
  function choose(value: ConsentChoice) {
    setAnalyticsConsent(value);
    setShowBanner(false);
  }
  if (!showBanner) return null;
  return <div role="region" aria-label="Analytics preferences" className="fixed bottom-[60px] lg:bottom-0 left-0 right-0 z-[55] bg-white border-t border-gray-200 p-4 shadow-lg">
    <div className="mx-auto max-w-7xl flex flex-col sm:flex-row items-center justify-between gap-4">
      <p className="text-sm text-gray-700">Allow optional analytics cookies to help us understand how the website is used? <Link href="/privacy-policy" className="underline">Privacy policy</Link></p>
      <div className="flex gap-3 shrink-0">
        <button type="button" onClick={() => choose('declined')} className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700">Decline</button>
        <button type="button" onClick={() => choose('accepted')} className="rounded-md bg-forest px-4 py-2 text-sm font-medium text-white">Accept analytics</button>
      </div>
    </div>
  </div>;
}
