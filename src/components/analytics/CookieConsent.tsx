'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { GA_MEASUREMENT_ID, getAnalyticsConsent, setAnalyticsConsent, getAdsConsent, setAdsConsent } from '@/lib/analytics/gtag';
import { GOOGLE_ADS_CONFIGURED } from '@/lib/analytics/ads';

export function CookieConsent() {
  const pathname = usePathname();
  const [showBanner, setShowBanner] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [advertising, setAdvertising] = useState(false);
  useEffect(() => {
    if (!GA_MEASUREMENT_ID && !GOOGLE_ADS_CONFIGURED) return;
    const readChoices = () => {
      setAnalytics(getAnalyticsConsent() === 'accepted');
      setAdvertising(getAdsConsent() === 'accepted');
    };
    const refresh = () => {
      readChoices();
      setShowBanner(Boolean(GA_MEASUREMENT_ID && getAnalyticsConsent() === null) || (GOOGLE_ADS_CONFIGURED && getAdsConsent() === null));
    };
    const open = () => { readChoices(); setShowBanner(true); };
    refresh();
    window.addEventListener('rangel:privacy-settings', open);
    window.addEventListener('rangel:consent', refresh);
    return () => {
      window.removeEventListener('rangel:privacy-settings', open);
      window.removeEventListener('rangel:consent', refresh);
    };
  }, []);
  function choose(decline = false) {
    if (GA_MEASUREMENT_ID) setAnalyticsConsent(!decline && analytics ? 'accepted' : 'declined');
    if (GOOGLE_ADS_CONFIGURED) setAdsConsent(!decline && advertising ? 'accepted' : 'declined');
    setShowBanner(false);
  }
  if (!showBanner) return null;
  return <div role="region" aria-label="Privacy preferences" className={`fixed ${pathname.startsWith('/quote/') ? 'bottom-0' : 'bottom-[60px] lg:bottom-0'} left-0 right-0 z-[55] bg-white border-t border-gray-200 p-4 shadow-lg max-h-[70vh] overflow-y-auto`}>
    <div className="mx-auto max-w-7xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <div className="text-sm text-charcoal space-y-2">
        <p>Choose optional measurement. Your quote request works with either option off. <Link href="/privacy-policy" className="underline">Privacy policy</Link></p>
        {GA_MEASUREMENT_ID && <label className="flex items-start gap-2"><input className="mt-1 accent-forest" type="checkbox" checked={analytics} onChange={event => setAnalytics(event.target.checked)} /><span>Website analytics — understand how the site is used.</span></label>}
        {GOOGLE_ADS_CONFIGURED && <label className="flex items-start gap-2"><input className="mt-1 accent-forest" type="checkbox" checked={advertising} onChange={event => setAdvertising(event.target.checked)} /><span>Advertising measurement — save ad click identifiers and share confirmed quote events with Google Ads. No personalized advertising.</span></label>}
      </div>
      <div className="flex flex-wrap gap-3 shrink-0">
        <button type="button" onClick={() => choose(true)} className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-charcoal">Decline optional</button>
        <button type="button" onClick={() => choose()} className="rounded-md bg-forest px-4 py-2 text-sm font-medium text-white">Save preferences</button>
      </div>
    </div>
  </div>;
}
