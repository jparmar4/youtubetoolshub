"use client";

import { useEffect, useState } from "react";
import Script from "next/script";

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
 * Loads GA + Clarity only after the user accepts cookies.
 * Decline / no choice = no analytics scripts (AdSense remains independent).
 */
export default function ConsentAnalytics() {
  const [consent, setConsent] = useState<Consent>(null);

  useEffect(() => {
    queueMicrotask(() => setConsent(readConsent()));

    const onStorage = (e: StorageEvent) => {
      if (e.key === "cookieConsent") setConsent(readConsent());
    };
    // Same-tab updates from CookieConsent
    const onCustom = () => setConsent(readConsent());
    window.addEventListener("storage", onStorage);
    window.addEventListener("cookie-consent-changed", onCustom);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("cookie-consent-changed", onCustom);
    };
  }, []);

  if (consent !== "accepted") return null;

  return (
    <>
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-14MEY3M1CN"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-14MEY3M1CN');
        `}
      </Script>
      <Script id="clarity-script" strategy="lazyOnload">
        {`
          (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i+"?ref=bwt";
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "uy2cawi8r0");
        `}
      </Script>
    </>
  );
}
