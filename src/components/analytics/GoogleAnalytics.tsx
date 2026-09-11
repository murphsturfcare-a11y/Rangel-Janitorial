'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { GA_MEASUREMENT_ID, GA_DISABLE_KEY, CONSENT_KEY, event, pageview, hasAnalyticsConsent, analyticsPath, safeReferrer } from '@/lib/analytics/gtag';
import { isLeadEventDetail, trackLeadConversion, trackQuoteRequest } from '@/lib/analytics/conversion';
import { parseUTMFromURL, storeUTMParams } from '@/lib/analytics/utm';
import regions from '@/data/regions.json';

export function GoogleAnalytics() {
  const pathname = usePathname();
  const configured = useRef(false);
  const lastPage = useRef('');
  const receipts = useRef(new Set<string>());
  const starts = useRef(new Set<string>());

  useEffect(() => {
    // Attribution is bounded campaign labels; contact fields never enter these events.
    const utm = parseUTMFromURL(new URLSearchParams(window.location.search));
    if (utm) storeUTMParams(utm);
    if (!GA_MEASUREMENT_ID) return;

    function syncConsent() {
      const consent = hasAnalyticsConsent();
      // Google's collection kill switch also stops a tag already loaded before revocation.
      window[GA_DISABLE_KEY] = !consent;
      if (!consent) {
        if (configured.current) {
          window.gtag?.('consent', 'update', { analytics_storage: 'denied' });
          clearAnalyticsCookies();
        }
        lastPage.current = '';
        return;
      }
      if (!configured.current) {
        window.dataLayer = window.dataLayer || [];
        if (!window.gtag) {
          window.gtag = function () {
            // Google commands use Arguments objects, not plain arrays.
            // eslint-disable-next-line prefer-rest-params
            window.dataLayer.push(arguments);
          };
        }
        window.gtag('consent', 'default', { analytics_storage: 'denied', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied' });
        window.gtag('consent', 'update', { analytics_storage: 'granted' });
        window.gtag('js', new Date());
        window.gtag('config', GA_MEASUREMENT_ID, {
          send_page_view: false,
          allow_google_signals: false,
          allow_ad_personalization_signals: false,
          page_location: window.location.origin + analyticsPath(window.location.pathname),
          page_referrer: safeReferrer(),
        });
        // The GA stream must also disable Enhanced Measurement history pageviews.
        // https://developers.google.com/analytics/devguides/collection/ga4/views
        if (!document.getElementById('rangel-ga-script')) {
          const script = document.createElement('script');
          script.id = 'rangel-ga-script';
          script.async = true;
          script.referrerPolicy = 'origin';
          script.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_MEASUREMENT_ID;
          document.head.appendChild(script);
        }
        configured.current = true;
      } else window.gtag('consent', 'update', { analytics_storage: 'granted' });
      const path = analyticsPath(pathname);
      // Keep later events on the current sanitized page after client navigation.
      window.gtag('set', { page_location: window.location.origin + path, page_referrer: safeReferrer() });
      if (lastPage.current !== path && pageview(path)) lastPage.current = path;
    }
    function leadEvent(raw: Event) {
      const detail: unknown = (raw as CustomEvent).detail;
      if (!isLeadEventDetail(detail)) return;
      const seen = raw.type === 'rangel:lead-accepted' ? receipts.current : starts.current;
      if (seen.has(detail.submission_id)) return;
      // Do not replay interactions recorded before consent if consent is granted later.
      seen.add(detail.submission_id);
      if (raw.type === 'rangel:lead-accepted') trackLeadConversion(detail);
      else trackQuoteRequest(detail);
    }
    function clickEvent(raw: MouseEvent) {
      if (!(raw.target instanceof Element)) return;
      const anchor = raw.target.closest('a[href]');
      const href = anchor?.getAttribute('href');
      if (!href) return;
      if (href.startsWith('tel:')) {
        const digits = href.replace(/\D/g, '').replace(/^1(?=\d{10}$)/, '');
        const region = regions.find(item => item.phone.replace(/\D/g, '') === digits);
        if (region) event('phone_click', { region: region.slug });
      } else if (/^\/locations(?:\/[^/?#]+)?(?:#quote-form)?$/.test(href)) {
        event('quote_cta_click', { page_path: pathname });
      }
    }
    function syncStorage(raw: StorageEvent) {
      if (raw.key !== null && raw.key !== CONSENT_KEY) return;
      delete window.rangelAnalyticsConsent;
      window.dispatchEvent(new Event('rangel:consent'));
    }
    syncConsent();
    window.addEventListener('rangel:consent', syncConsent);
    window.addEventListener('storage', syncStorage);
    window.addEventListener('rangel:lead-accepted', leadEvent);
    window.addEventListener('rangel:lead-started', leadEvent);
    document.addEventListener('click', clickEvent);
    return () => {
      window.removeEventListener('rangel:consent', syncConsent);
      window.removeEventListener('storage', syncStorage);
      window.removeEventListener('rangel:lead-accepted', leadEvent);
      window.removeEventListener('rangel:lead-started', leadEvent);
      document.removeEventListener('click', clickEvent);
    };
  }, [pathname]);
  return null;
}

function clearAnalyticsCookies() {
  const names = document.cookie.split(';').map(cookie => cookie.trim().split('=')[0]).filter(name => /^_ga(?:_|$)/.test(name));
  const labels = window.location.hostname.split('.');
  for (const name of names) {
    document.cookie = name + '=; Max-Age=0; path=/';
    for (let index = 0; index < labels.length - 1; index++) {
      document.cookie = name + '=; Max-Age=0; path=/; domain=' + labels.slice(index).join('.');
    }
  }
}
