'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { GA_MEASUREMENT_ID, getAnalyticsConsent, setAnalyticsConsent, getAdsConsent, setAdsConsent, hasGlobalPrivacyControl } from '@/lib/analytics/gtag';
import { GOOGLE_ADS_CONFIGURED } from '@/lib/analytics/ads';

export function CookieConsent() {
  const pathname = usePathname();
  const [showBanner, setShowBanner] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [adsOff, setAdsOff] = useState(false);
  const [privacySignal, setPrivacySignal] = useState(false);
  useEffect(() => {
    if (!GA_MEASUREMENT_ID && !GOOGLE_ADS_CONFIGURED) return;
    const readChoices = () => {
      setAnalytics(getAnalyticsConsent() === 'accepted');
      const signal = hasGlobalPrivacyControl();
      setPrivacySignal(signal);
      setAdsOff(signal || getAdsConsent() === 'declined');
    };
    const open = () => { readChoices(); setShowBanner(true); };
    window.addEventListener('rangel:privacy-settings', open);
    window.addEventListener('rangel:consent', readChoices);
    return () => {
      window.removeEventListener('rangel:privacy-settings', open);
      window.removeEventListener('rangel:consent', readChoices);
    };
  }, []);
  function done() {
    setShowBanner(false);
  }
  if (!showBanner) return null;
  return <div role="region" aria-label="Privacy preferences" className={`fixed ${pathname.startsWith('/quote/') ? 'bottom-0' : 'bottom-[60px] lg:bottom-0'} left-0 right-0 z-[55] bg-white border-t border-gray-200 p-4 shadow-lg max-h-[70vh] overflow-y-auto`}>
    <div className="mx-auto max-w-7xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <div className="text-sm text-charcoal space-y-2">
        <p className="font-semibold">Privacy settings</p>
        {GOOGLE_ADS_CONFIGURED && <p>{privacySignal
          ? 'Ad measurement is off because your browser sends a Global Privacy Control signal.'
          : adsOff ? 'Ad measurement is off in this browser.'
            : 'We use Google Ads to measure which ads bring in requests, with restricted data processing and personalized advertising off.'}</p>}
        <p>Your request works with measurement off. <Link href="/privacy-policy" className="underline">Privacy policy</Link></p>
        {GA_MEASUREMENT_ID && <label className="flex items-start gap-2"><input className="mt-1 accent-forest" type="checkbox" checked={analytics} onChange={event => setAnalyticsConsent(event.target.checked ? 'accepted' : 'declined')} /><span>Website analytics — understand how the site is used.</span></label>}
      </div>
      <div className="flex flex-wrap gap-3 shrink-0">
        {GOOGLE_ADS_CONFIGURED && !privacySignal && <button type="button" onClick={() => setAdsConsent(adsOff ? 'accepted' : 'declined')} className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-charcoal">{adsOff ? 'Enable ad measurement' : 'Turn off ad measurement'}</button>}
        <button type="button" onClick={done} className="rounded-md bg-forest px-4 py-2 text-sm font-medium text-white">Done</button>
      </div>
    </div>
  </div>;
}
