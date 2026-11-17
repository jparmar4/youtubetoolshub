"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

function snapScrollToTop() {
  if (typeof window === "undefined" || window.location.hash) return;
  try {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
  } catch {
    window.scrollTo(0, 0);
  }
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
}

/**
 * Ensures soft `<Link>` transitions and initial non-hash page opens always land
 * cleanly at the top of the viewport, even when Next.js App Router's
 * InnerScrollHandler skips scrolling or dynamic chunks/ads resize below fold.
 */
export default function RouteScrollTop() {
  const pathname = usePathname();
  const prevPathnameRef = useRef<string | null>(null);

  useEffect(() => {
    const isRouteChange =
      prevPathnameRef.current !== null && prevPathnameRef.current !== pathname;
    prevPathnameRef.current = pathname;

    if (typeof window === "undefined" || window.location.hash) return;

    if (!isRouteChange) {
      const navEntry = performance.getEntriesByType?.(
        "navigation",
      )?.[0] as PerformanceNavigationTiming | undefined;
      if (navEntry?.type === "back_forward") {
        return;
      }
    }

    let userInteracted = false;
    const markUserScrolled = () => {
      userInteracted = true;
    };

    window.addEventListener("wheel", markUserScrolled, { passive: true, once: true });
    window.addEventListener("touchstart", markUserScrolled, { passive: true, once: true });
    window.addEventListener("pointerdown", markUserScrolled, { passive: true, once: true });

    snapScrollToTop();

    const rafId = window.requestAnimationFrame(() => {
      if (!userInteracted) snapScrollToTop();
    });

    const settleId = window.setTimeout(() => {
      if (!userInteracted && window.scrollY > 0) {
        snapScrollToTop();
      }
    }, 80);

    return () => {
      window.cancelAnimationFrame(rafId);
      window.clearTimeout(settleId);
      window.removeEventListener("wheel", markUserScrolled);
      window.removeEventListener("touchstart", markUserScrolled);
      window.removeEventListener("pointerdown", markUserScrolled);
    };
  }, [pathname]);

  return null;
}
