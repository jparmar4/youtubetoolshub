"use client";

import { useEffect, useState } from "react";
import Script from "next/script";

declare global {
  interface Window {
    dataLayer: unknown[];
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
 * Loads GA + Clarity and implements Google Consent Mode v2.
 * Scripts are loaded globally, but default to 'denied' (cookieless pings)
 * until the user explicitly accepts cookies.
 */
export default function ConsentAnalytics() {
  const [consent, setConsent] = useState<Consent>(null);

  useEffect(() => {
    // Read initial consent on mount
    const initialConsent = readConsent();
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setConsent(initialConsent);
    
    // Helper function for gtag
    const updateConsent = () => {
      window.dataLayer = window.dataLayer || [];
      function gtag(...args: unknown[]) {
        window.dataLayer.push(args);
      }
      gtag('consent', 'update', {
        'ad_storage': 'granted',
        'ad_user_data': 'granted',
        'ad_personalization': 'granted',
        'analytics_storage': 'granted'
      });
    };

    // Update dataLayer if already accepted
    if (initialConsent === "accepted") {
      updateConsent();
    }

    const onStorage = (e: StorageEvent) => {
      if (e.key === "cookieConsent") {
        const newConsent = readConsent();
        setConsent(newConsent);
        if (newConsent === "accepted") {
          updateConsent();
        }
      }
    };
    
    // Same-tab updates from CookieConsent
    const onCustom = () => {
      const newConsent = readConsent();
      setConsent(newConsent);
      if (newConsent === "accepted") {
        updateConsent();
      }
    };

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

      {/* Clarity is only loaded if consent is explicitly granted because it records sessions */}
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
