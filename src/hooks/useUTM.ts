"use client";

import { useEffect, useMemo, useSyncExternalStore } from "react";
import { useSearchParams } from "next/navigation";
import { type UTMParams, parseUTMFromURL, storeUTMParams, getStoredUTMParams } from "@/lib/analytics/utm";

const UTM_CHANGE_EVENT = "rangel:utm";

function subscribeToStoredUTM(onChange: () => void) {
  window.addEventListener("storage", onChange);
  window.addEventListener(UTM_CHANGE_EVENT, onChange);
  return () => {
    window.removeEventListener("storage", onChange);
    window.removeEventListener(UTM_CHANGE_EVENT, onChange);
  };
}

// A primitive snapshot stays stable when storage contains the same campaign.
function getStoredSnapshot() {
  return JSON.stringify(getStoredUTMParams());
}

function getServerSnapshot() {
  return "null";
}

export function useUTM() {
  const searchParams = useSearchParams();
  const parsed = useMemo(() => parseUTMFromURL(searchParams), [searchParams]);
  const storedSnapshot = useSyncExternalStore(subscribeToStoredUTM, getStoredSnapshot, getServerSnapshot);
  const stored = useMemo(() => JSON.parse(storedSnapshot) as UTMParams | null, [storedSnapshot]);

  useEffect(() => {
    if (parsed) {
      storeUTMParams(parsed);
      // Native storage events do not notify other subscribers in this document.
      window.dispatchEvent(new Event(UTM_CHANGE_EVENT));
    }
  }, [parsed]);

  const utmParams = parsed ?? stored;
  return { utmParams, hasUTM: utmParams !== null };
}
