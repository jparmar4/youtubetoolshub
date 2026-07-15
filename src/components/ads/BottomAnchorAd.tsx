"use client";

import { useEffect, useRef, useState } from "react";
import { AD_CLIENT, AD_SLOTS } from "@/lib/adsense";

declare global {
  interface Window {
    adsbygoogle: unknown[];
  }
}

/**
 * Bottom anchor — only visible after the ad unit actually fills.
 * Avoids a permanent empty bar when Auto ads / inventory is empty.
 */
export default function BottomAnchorAd() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pushed = useRef(false);
  const [filled, setFilled] = useState(false);
  const [failed, setFailed] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (dismissed || failed || pushed.current) return;

    let cancelled = false;
    let tries = 0;

    const attempt = () => {
      if (cancelled || pushed.current) return;
      tries += 1;

      if (typeof window.adsbygoogle === "undefined") {
        if (tries < 50) setTimeout(attempt, 200);
        else setFailed(true);
        return;
      }

      const ins = containerRef.current?.querySelector("ins.adsbygoogle");
      if (!ins) {
        if (tries < 50) setTimeout(attempt, 200);
        return;
      }

      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        pushed.current = true;

        const check = () => {
          const st = ins.getAttribute("data-adsbygoogle-status");
          const h = ins.getBoundingClientRect().height;
          const hasIframe = !!ins.querySelector("iframe");
          if (st === "unfilled") {
            setFailed(true);
            return true;
          }
          if ((hasIframe || st === "done" || st === "loaded") && h > 10) {
            setFilled(true);
            return true;
          }
          return false;
        };

        const mo = new MutationObserver(() => {
          if (check()) mo.disconnect();
        });
        mo.observe(ins, {
          attributes: true,
          childList: true,
          subtree: true,
        });

        let n = 0;
        const poll = setInterval(() => {
          n += 1;
          if (check() || n >= 16) {
            clearInterval(poll);
            mo.disconnect();
            if (!check()) setFailed(true);
          }
        }, 500);
      } catch {
        setFailed(true);
      }
    };

    // Slight delay so Auto ads script can boot first
    const t = setTimeout(attempt, 1200);
    return () => {
      cancelled = true;
      clearTimeout(t);
    };
  }, [dismissed, failed]);

  if (dismissed || failed) return null;

  return (
    <div
      className={
        filled
          ? "fixed bottom-0 left-0 right-0 z-40 flex flex-col items-center bg-white/95 border-t border-slate-200 shadow-[0_-4px_20px_rgba(0,0,0,0.12)] backdrop-blur"
          : "fixed left-[-9999px] top-0 w-[320px] h-[50px] overflow-hidden opacity-0 pointer-events-none"
      }
      role="complementary"
      aria-label="Advertisement"
      aria-hidden={!filled}
    >
      {filled && (
        <div className="flex w-full max-w-[320px] items-center justify-between px-2 pt-1">
          <span className="text-[9px] font-medium uppercase tracking-widest text-slate-400 select-none">
            Advertisement
          </span>
          <button
            type="button"
            onClick={() => setDismissed(true)}
            className="rounded p-1 text-slate-400 hover:text-slate-600"
            aria-label="Close advertisement"
          >
            ×
          </button>
        </div>
      )}
      <div ref={containerRef} className="flex w-full justify-center pb-1">
        <ins
          className="adsbygoogle"
          style={{ display: "inline-block", width: "300px", height: "50px" }}
          data-ad-client={AD_CLIENT}
          data-ad-slot={AD_SLOTS.BOTTOM_STICKY}
        />
      </div>
    </div>
  );
}
