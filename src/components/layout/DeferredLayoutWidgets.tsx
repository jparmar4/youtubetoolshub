"use client";

import dynamic from "next/dynamic";

const ScrollToTop = dynamic(() => import("@/components/ui/ScrollToTop"), { ssr: false });
const ToastContainer = dynamic(() => import("@/components/ui/Toast"), { ssr: false });
const CookieConsent = dynamic(() => import("@/components/ui/CookieConsent"), { ssr: false });
const PrivacyH1Fix = dynamic(() => import("@/components/seo/PrivacyH1Fix"), { ssr: false });
const ExitIntentPopup = dynamic(() => import("@/components/ui/ExitIntentPopup"), { ssr: false });
const StickyBottomAd = dynamic(() => import("@/components/ads/StickyBottomAd"), { ssr: false });
const PWAInstallPrompt = dynamic(() => import("@/components/ui/PWAInstallPrompt"), { ssr: false });

export default function DeferredLayoutWidgets() {
  return (
    <>
      <ScrollToTop />
      <ToastContainer />
      <CookieConsent />
      <PrivacyH1Fix />
      <ExitIntentPopup />
      <StickyBottomAd />
      <PWAInstallPrompt />
    </>
  );
}

