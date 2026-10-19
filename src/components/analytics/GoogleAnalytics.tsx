'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { GA_MEASUREMENT_ID, GA_DISABLE_KEY, CONSENT_KEY, ADS_CONSENT_KEY, event, pageview, hasAnalyticsConsent, hasAdsConsent, analyticsPath, safeReferrer } from '@/lib/analytics/gtag';
import { isLeadEventDetail, trackLeadConversion, trackQuoteRequest } from '@/lib/analytics/conversion';
import { GOOGLE_ADS_CONFIGURED, GOOGLE_ADS_ID, adsPageLocation, trackAdsLeadConversion } from '@/lib/analytics/ads';
import { captureAdAttribution, clearAdAttribution } from '@/lib/analytics/ad-attribution';
import { parseUTMFromURL, storeUTMParams, clearUTMParams } from '@/lib/analytics/utm';
import regions from '@/data/regions.json';

export function GoogleAnalytics() {
  const pathname = usePathname();
  const initialized = useRef(false);
  const gaConfigured = useRef(false);
  const adsConfigured = useRef(false);
  const lastPage = useRef('');
  const receipts = useRef(new Set<string>());
  const starts = useRef(new Set<string>());

  useEffect(() => {
    function syncConsent() {
      const analytics = Boolean(GA_MEASUREMENT_ID) && hasAnalyticsConsent();
      const ads = GOOGLE_ADS_CONFIGURED && hasAdsConsent();
      window[GA_DISABLE_KEY] = !analytics;
      if (!analytics) {
        clearMeasurementCookies(/^_ga(?:_|$)/);
        lastPage.current = '';
      }
      if (ads) {
        captureAdAttribution();
        const utm = parseUTMFromURL(new URLSearchParams(window.location.search));
        if (utm) storeUTMParams(utm);
      } else {
        clearAdAttribution();
        clearUTMParams();
        clearMeasurementCookies(/^_gcl_/);
      }
      // With no prior consent, neither Google tag nor advertising storage is initialized.
      if (!analytics && !ads && !initialized.current) return;
      if (!initialized.current) {
        window.dataLayer = window.dataLayer || [];
        if (!window.gtag) {
          window.gtag = function () {
            // Google commands use Arguments objects, not plain arrays.
            // eslint-disable-next-line prefer-rest-params
            window.dataLayer.push(arguments);
          };
        }
        window.gtag('consent', 'default', { analytics_storage: 'denied', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied' });
        window.gtag('set', { ads_data_redaction: true, url_passthrough: false });
        window.gtag('js', new Date());
        initialized.current = true;
      }
      window.gtag('consent', 'update', {
        analytics_storage: analytics ? 'granted' : 'denied',
        ad_storage: ads ? 'granted' : 'denied',
        ad_user_data: ads ? 'granted' : 'denied',
        ad_personalization: 'denied',
      });
      if (!analytics && !ads) return;
      const path = analyticsPath(pathname);
      const page = { page_location: window.location.origin + path, page_referrer: safeReferrer() };
      window.gtag('set', page);
      const privacy = { ...page, send_page_view: false, allow_google_signals: false, allow_ad_personalization_signals: false };
      if (analytics && !gaConfigured.current) {
        window.gtag('config', GA_MEASUREMENT_ID, { ...privacy, groups: 'analytics' });
        gaConfigured.current = true;
      }
      if (ads && !adsConfigured.current) {
        window.gtag('config', GOOGLE_ADS_ID, { ...privacy, page_location: adsPageLocation(), groups: 'ads' });
        adsConfigured.current = true;
      }
      if (!document.getElementById('rangel-ga-script')) {
        const script = document.createElement('script');
        script.id = 'rangel-ga-script';
        script.async = true;
        script.referrerPolicy = 'origin';
        script.src = 'https://www.googletagmanager.com/gtag/js?id=' + (analytics ? GA_MEASUREMENT_ID : GOOGLE_ADS_ID);
        document.head.appendChild(script);
      }
      // The GA stream must also disable Enhanced Measurement history pageviews.
      if (analytics && lastPage.current !== path && pageview(path)) lastPage.current = path;
    }
    function leadEvent(raw: Event) {
      const detail: unknown = (raw as CustomEvent).detail;
      if (!isLeadEventDetail(detail)) return;
      const seen = raw.type === 'rangel:lead-accepted' ? receipts.current : starts.current;
      if (seen.has(detail.submission_id)) return;
      // Do not replay pre-consent interactions after a later consent change.
      seen.add(detail.submission_id);
      if (raw.type === 'rangel:lead-accepted') {
        trackLeadConversion(detail);
        trackAdsLeadConversion(detail);
      } else trackQuoteRequest(detail);
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
      } else if (/^\/(?:locations|quote)(?:\/[^/?#]+)?(?:#quote-form)?$/.test(href)) {
        event('quote_cta_click', { page_path: pathname });
      }
    }
    function syncStorage(raw: StorageEvent) {
      if (raw.key !== null && raw.key !== CONSENT_KEY && raw.key !== ADS_CONSENT_KEY) return;
      delete window.rangelAnalyticsConsent;
      delete window.rangelAdsConsent;
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

function clearMeasurementCookies(pattern: RegExp) {
  const names = document.cookie.split(';').map(cookie => cookie.trim().split('=')[0]).filter(name => pattern.test(name));
  const labels = window.location.hostname.split('.');
  for (const name of names) {
    document.cookie = name + '=; Max-Age=0; path=/';
    for (let index = 0; index < labels.length - 1; index++) {
      document.cookie = name + '=; Max-Age=0; path=/; domain=' + labels.slice(index).join('.');
    }
  }
}
