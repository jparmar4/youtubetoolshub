"use client";

import { useEffect, useRef, useState, useId } from "react";
import { AD_CLIENT, AD_SLOTS } from "@/lib/adsense";

declare global {
  interface Window {
    adsbygoogle: unknown[];
  }
}

/**
 * Responsive display unit. Collapses completely if unfilled so Auto ads
 * can place inventory without empty grey boxes.
 */
export default function HorizontalAd() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pushed = useRef(false);
  const reactId = useId();
  const adId = `horizontal-ad-${reactId.replace(/[^a-zA-Z0-9]/g, "")}`;

  const [slotId] = useState(() => {
    const slots = AD_SLOTS.HORIZONTAL;
    return Array.isArray(slots)
      ? slots[Math.floor(Math.random() * slots.length)]
      : slots;
  });
  const [ready, setReady] = useState(false);
  const [filled, setFilled] = useState(false);
  const [failed, setFailed] = useState(false);

  // Near viewport → mount <ins>
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    if (!("IntersectionObserver" in window)) {
      queueMicrotask(() => setReady(true));
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setReady(true);
          io.disconnect();
        }
      },
      { rootMargin: "200px 0px", threshold: 0 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Push once script + ins exist
  useEffect(() => {
    if (!ready || pushed.current || failed) return;

    let cancelled = false;
    let tries = 0;

    const pushWhenReady = () => {
      if (cancelled || pushed.current) return;
      tries += 1;

      const ins = containerRef.current?.querySelector("ins.adsbygoogle");
      if (!ins) {
        if (tries < 40) setTimeout(pushWhenReady, 150);
        return;
      }

      // Wait until AdSense script created the global array
      if (typeof window.adsbygoogle === "undefined") {
        if (tries < 40) setTimeout(pushWhenReady, 150);
        else setFailed(true);
        return;
      }

      const status = ins.getAttribute("data-adsbygoogle-status");
      if (status === "done" || status === "loaded") {
        pushed.current = true;
        setFilled(true);
        return;
      }

      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        pushed.current = true;

        const checkFilled = () => {
          const st = ins.getAttribute("data-adsbygoogle-status");
          const h = ins.getBoundingClientRect().height;
          const hasIframe = !!ins.querySelector("iframe");
          if (st === "unfilled") {
            setFailed(true);
            return;
          }
          if ((st === "done" || st === "loaded" || hasIframe) && h > 20) {
            setFilled(true);
            return;
          }
        };

        const mo = new MutationObserver(checkFilled);
        mo.observe(ins, {
          attributes: true,
          attributeFilter: ["data-adsbygoogle-status"],
          childList: true,
          subtree: true,
        });

        // Poll a few times — Auto ads + manual units can be slow
        let n = 0;
        const poll = setInterval(() => {
          n += 1;
          checkFilled();
          if (n >= 20 || cancelled) {
            clearInterval(poll);
            mo.disconnect();
            if (!filled) {
              const st = ins.getAttribute("data-adsbygoogle-status");
              const h = ins.getBoundingClientRect().height;
              if (st === "unfilled" || h < 20) setFailed(true);
            }
          }
        }, 500);
      } catch {
        setFailed(true);
      }
    };

    const t = setTimeout(pushWhenReady, 100);
    return () => {
      cancelled = true;
      clearTimeout(t);
    };
  }, [ready, failed, filled]);

  if (failed) return null;

  return (
    <div
      ref={containerRef}
      id={adId}
      className={`w-full flex flex-col items-center overflow-hidden ${
        filled ? "my-6" : "my-2"
      }`}
      role="complementary"
      aria-label="Advertisement"
    >
      {filled && (
        <div className="text-[10px] text-slate-400 mb-1 uppercase tracking-wider select-none">
          Advertisement
        </div>
      )}
      <div
        className={`w-full flex items-center justify-center overflow-hidden ${
          ready && !filled ? "min-h-[1px]" : ""
        } ${filled ? "min-h-[90px]" : ""}`}
      >
        {ready && (
          <ins
            className="adsbygoogle"
            style={{
              display: "block",
              width: "100%",
              minHeight: filled ? 90 : 1,
            }}
            data-ad-client={AD_CLIENT}
            data-ad-slot={slotId}
            data-ad-format="auto"
            data-full-width-responsive="true"
          />
        )}
      </div>
    </div>
  );
}
