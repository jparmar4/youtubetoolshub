"use client";

import dynamic from "next/dynamic";

const ScrollToTop = dynamic(() => import("@/components/ui/ScrollToTop"), { ssr: false });
const ToastContainer = dynamic(() => import("@/components/ui/Toast"), { ssr: false });
const CookieConsent = dynamic(() => import("@/components/ui/CookieConsent"), { ssr: false });
const ExitIntentPopup = dynamic(() => import("@/components/ui/ExitIntentPopup"), { ssr: false });
const StickyBottomAd = dynamic(() => import("@/components/ads/StickyBottomAd"), { ssr: false });
const PWAInstallPrompt = dynamic(() => import("@/components/ui/PWAInstallPrompt"), { ssr: false });
const VideoPackDrawer = dynamic(() => import("@/components/video-pack/VideoPackDrawer"), { ssr: false });
const FloatingVideoPackPill = dynamic(() => import("@/components/video-pack/FloatingVideoPackPill"), { ssr: false });

export default function DeferredLayoutWidgets() {
  return (
    <>
      <ScrollToTop />
      <ToastContainer />
      <CookieConsent />
      <ExitIntentPopup />
      <StickyBottomAd />
      <PWAInstallPrompt />
      <FloatingVideoPackPill />
      <VideoPackDrawer />
    </>
  );
}

