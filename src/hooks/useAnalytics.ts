"use client";

import { useCallback } from "react";
import * as gtag from "@/lib/analytics/gtag";

export function useAnalytics() {
  const trackEvent = useCallback((action: string, params: Parameters<typeof gtag.event>[1]) => {
    gtag.event(action, params);
  }, []);

  const trackFormSubmission = useCallback((formName: string, formLocation: string) => {
    gtag.trackFormSubmission(formName, formLocation);
  }, []);

  const trackCTAClick = useCallback((ctaName: string, ctaLocation: string) => {
    gtag.trackCTAClick(ctaName, ctaLocation);
  }, []);

  const trackPhoneCall = useCallback((phoneNumber: string) => {
    gtag.trackPhoneCall(phoneNumber);
  }, []);

  return { trackEvent, trackFormSubmission, trackCTAClick, trackPhoneCall };
}
