"use client";

/**
 * Right-rail AdSense unit (dispsidebarverticle).
 * Reserves width/height before push and re-inits cleanly on SPA navigation.
 */

import { useEffect, useId, useRef } from "react";
import { usePathname } from "next/navigation";
import { AD_CLIENT, AD_SLOTS } from "@/lib/adsense";

const SLOT = AD_SLOTS.SIDEBAR;

export default function SidebarGoogleAd() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const reactId = useId();

  useEffect(() => {
    const container = containerRef.current;
    if (!container || typeof window === "undefined") return;

    let cancelled = false;
    let pushed = false;
    let tries = 0;
    const maxTries = 50; // ~10s

    const push = () => {
      if (cancelled || pushed) return true;

      const ins = container.querySelector<HTMLElement>("ins.adsbygoogle");
      if (!ins) return false;

      const status = ins.getAttribute("data-adsbygoogle-status");
      if (status === "done" || status === "loaded") {
        pushed = true;
        return true;
      }

      // Wait until the rail has a real width (AdSense skips 0-width nodes)
      const width =
        ins.getBoundingClientRect().width ||
        ins.offsetWidth ||
        container.getBoundingClientRect().width ||
        container.offsetWidth;

      if (width < 2) return false;

      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        pushed = true;
        return true;
      } catch (err) {
        console.error("[SidebarGoogleAd] push failed:", err);
        return false;
      }
    };

    // Give layout one frame, then poll until width + script are ready
    const startId = window.setTimeout(() => {
      if (push()) return;

      const intervalId = window.setInterval(() => {
        tries += 1;
        if (push() || tries >= maxTries || cancelled) {
          window.clearInterval(intervalId);
          if (!pushed && !cancelled) {
            console.warn(
              "[SidebarGoogleAd] could not initialize ad (layout or script)",
              { pathname, reactId },
            );
          }
        }
      }, 200);

      // store on container for cleanup
      (container as HTMLElement & { __adInterval?: number }).__adInterval =
        intervalId;
    }, 100);

    return () => {
      cancelled = true;
      window.clearTimeout(startId);
      const intervalId = (container as HTMLElement & { __adInterval?: number })
        .__adInterval;
      if (intervalId) window.clearInterval(intervalId);
    };
  }, [pathname, reactId]);

  return (
    <div
      ref={containerRef}
      className="sidebar-google-ad w-full"
      style={{
        display: "block",
        width: "100%",
        minWidth: 250,
        minHeight: 600,
      }}
    >
      <ins
        key={`${pathname}-${SLOT}-${reactId}`}
        className="adsbygoogle"
        style={{
          display: "block",
          width: "100%",
          minWidth: 250,
          minHeight: 600,
        }}
        data-ad-client={AD_CLIENT}
        data-ad-slot={SLOT}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}
