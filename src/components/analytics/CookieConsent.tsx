"use client";

import { useState, useEffect } from "react";

const CONSENT_KEY = "rangel_janitorial_cookie_consent";

export function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(CONSENT_KEY);
    if (!consent) {
      setShowBanner(true);
    }
  }, []);

  function handleAccept() {
    localStorage.setItem(CONSENT_KEY, "accepted");
    setShowBanner(false);

    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("consent", "update", {
        analytics_storage: "granted",
        ad_storage: "granted",
        ad_user_data: "granted",
        ad_personalization: "granted",
      });
    }
  }

  function handleDecline() {
    localStorage.setItem(CONSENT_KEY, "declined");
    setShowBanner(false);
  }

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-[60px] lg:bottom-0 left-0 right-0 z-[55] bg-white border-t border-gray-200 p-4 shadow-lg">
      <div className="mx-auto max-w-7xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-gray-700">
          We use cookies to improve your experience and analyze site traffic. By accepting, you
          consent to our use of cookies.
        </p>
        <div className="flex gap-3 shrink-0">
          <button
            onClick={handleDecline}
            className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Decline
          </button>
          <button
            onClick={handleAccept}
            className="rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700 transition-colors"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
