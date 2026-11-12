"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import GoogleAd from "./GoogleAd";
import { AD_SLOTS } from "@/lib/adsense";
import { FaTimes } from "react-icons/fa";

import { isLikelyGdprTimezone } from "@/config/index-policy";

/** Ad stays hidden until consent is settled in GDPR zones, or shows immediately in non-GDPR zones. */
function getSnapshot(): boolean {
  try {
    const dismissed = sessionStorage.getItem("bottomAdDismissed") === "true";
    if (dismissed) return false;

    const consent = localStorage.getItem("cookieConsent");
    if (consent === "declined" || consent === "accepted") return true;

    // Non-GDPR traffic (USA, Canada, Australia, India, etc.) has Consent Mode v2 granted by default
    if (!isLikelyGdprTimezone()) {
      return true;
    }

    return false;
  } catch {
    return false;
  }
}

function getServerSnapshot(): boolean {
  return false;
}

function subscribe(callback: () => void) {
  window.addEventListener("cookie-consent-changed", callback);
  window.addEventListener("bottom-ad-dismissed", callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener("cookie-consent-changed", callback);
    window.removeEventListener("bottom-ad-dismissed", callback);
    window.removeEventListener("storage", callback);
  };
}

export default function StickyBottomAd() {
  const pathname = usePathname();
  const isEmbed = pathname?.startsWith("/embed");

  const visible = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const [isReady, setIsReady] = useState(false);
  const [unfilled, setUnfilled] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Mount sticky anchor ad on initial scroll, first interaction (tap/click/key),
  // or post-LCP idle (1500ms) so zero-scroll tool visitors see the unit without
  // impacting initial paint / LCP.
  useEffect(() => {
    if (isEmbed || !visible || isReady) return;

    const activate = () => setIsReady(true);

    const onScroll = () => {
      if (window.scrollY > 40) activate();
    };

    if (window.scrollY > 40) {
      const id = setTimeout(activate, 0);
      return () => clearTimeout(id);
    }

    const idleTimer = setTimeout(activate, 1500);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("pointerdown", activate, { passive: true, once: true });
    window.addEventListener("keydown", activate, { passive: true, once: true });
    return () => {
      clearTimeout(idleTimer);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pointerdown", activate);
      window.removeEventListener("keydown", activate);
    };
  }, [isEmbed, visible, isReady]);

  // Auto-collapse anchor bar if AdSense reports unfilled / unfill-optimized.
  useEffect(() => {
    const el = containerRef.current;
    if (!el || !isReady || typeof MutationObserver === "undefined") return;

    const checkUnfilled = () => {
      if (
        el.querySelector(
          "ins.adsbygoogle[data-ad-status='unfilled'], ins.adsbygoogle[data-ad-status='unfill-optimized']",
        )
      ) {
        setUnfilled(true);
        return true;
      }
      return false;
    };

    if (checkUnfilled()) return;

    const observer = new MutationObserver(() => {
      if (checkUnfilled()) observer.disconnect();
    });
    observer.observe(el, {
      subtree: true,
      attributes: true,
      attributeFilter: ["data-ad-status"],
      childList: true,
    });
    return () => observer.disconnect();
  }, [isReady]);

  const handleDismiss = () => {
    try {
      sessionStorage.setItem("bottomAdDismissed", "true");
      window.dispatchEvent(new Event("bottom-ad-dismissed"));
    } catch {
      /* ignore */
    }
  };

  if (isEmbed || !visible || !isReady || unfilled) return null;

  return (
    <div
      ref={containerRef}
      role="complementary"
      aria-label="Advertisement"
      className="fixed bottom-0 left-0 right-0 z-40 flex flex-col items-center justify-center bg-white/95 backdrop-blur-md border-t border-slate-200 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] py-1 px-2"
      style={{ contain: "layout", transform: "translateZ(0)", maxHeight: "105px" }}
    >
      <div className="relative w-full max-w-4xl flex items-center justify-center min-h-[50px] max-h-[90px]">
        {/* Ad Tag & Close Button */}
        <div className="absolute -top-6 right-2 z-20 flex items-center gap-1.5">
          <span className="text-[11px] font-bold text-slate-600 uppercase tracking-wider bg-white/95 px-2 py-0.5 rounded-t border border-b-0 border-slate-200 shadow-xs">
            Ad
          </span>
          <button
            type="button"
            onClick={handleDismiss}
            aria-label="Close Advertisement"
            className="flex items-center justify-center w-6 h-6 rounded-full bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 text-[11px] transition-colors shadow-sm cursor-pointer"
          >
            <FaTimes />
          </button>
        </div>

        {/* AdSense Unit — responsive=false respects maxHeight 90px anchor sizing */}
        <div className="w-full flex justify-center overflow-hidden max-h-[90px]">
          <GoogleAd
            slot={AD_SLOTS.BOTTOM_STICKY}
            format="horizontal"
            responsive={false}
            lazy={false}
            className="w-full text-center"
            style={{ display: "block", width: "100%", height: "60px", maxHeight: "90px" }}
          />
        </div>
      </div>
    </div>
  );
}