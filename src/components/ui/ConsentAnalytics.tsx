"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import { isLikelyGdprTimezone } from "@/config/index-policy";

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

type Consent = "accepted" | "declined" | null;

function readConsent(): Consent {
  if (typeof window === "undefined") return null;
  try {
    const v = localStorage.getItem("cookieConsent");
    if (v === "accepted" || v === "declined") return v;
  } catch {
    /* ignore */
  }
  return null;
}

/**
 * Consent Mode commands must reach gtag.js as an `arguments` object, not a plain
 * array — gtag.js identifies its own commands by that shape and ignores arrays.
 * Prefer the global `gtag` that layout.tsx already defines (it pushes
 * `arguments`); only fall back to a local shim if that script has not run yet.
 * Getting this wrong silently pins EEA/UK visitors at `denied` even after they
 * click Accept, which caps AdSense to non-personalized ads in the highest-RPM
 * markets on the site.
 */
function gtag(...args: unknown[]) {
  if (typeof window.gtag === "function") {
    window.gtag(...args);
    return;
  }
  window.dataLayer = window.dataLayer || [];
  (function () {
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer.push(arguments);
  })(...(args as []));
}

function grantConsent() {
  gtag("consent", "update", {
    ad_storage: "granted",
    ad_user_data: "granted",
    ad_personalization: "granted",
    analytics_storage: "granted",
  });
}

function denyConsent() {
  gtag("consent", "update", {
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
    analytics_storage: "denied",
  });
}

/**
 * Loads GA + Clarity and implements Google Consent Mode v2.
 * Non-GDPR visitors get personalized ads by default (layout.tsx region defaults).
 * GDPR visitors stay denied until they accept.
 */
export default function ConsentAnalytics() {
  const [consent, setConsent] = useState<Consent>(null);

  useEffect(() => {
    const apply = (value: Consent) => {
      setConsent(value);
      if (value === "accepted") grantConsent();
      if (value === "declined") denyConsent();
    };

    const initialConsent = readConsent();
    if (initialConsent) {
      apply(initialConsent);
    } else if (!isLikelyGdprTimezone()) {
      apply("accepted");
    }

    const onStorage = (e: StorageEvent) => {
      if (e.key === "cookieConsent") apply(readConsent());
    };
    const onCustom = () => apply(readConsent());

    window.addEventListener("storage", onStorage);
    window.addEventListener("cookie-consent-changed", onCustom);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("cookie-consent-changed", onCustom);
    };
  }, []);

  return (
    <>
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-14MEY3M1CN"
        strategy="afterInteractive"
      />

      {consent === "accepted" && (
        <Script id="clarity-script" strategy="lazyOnload">
          {`
            (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i+"?ref=bwt";
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "uy2cawi8r0");
          `}
        </Script>
      )}
    </>
  );
}
