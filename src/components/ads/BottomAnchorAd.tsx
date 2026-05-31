"use client";

import { useEffect, useRef, useState } from "react";
import { AD_CLIENT, AD_SLOTS } from "@/lib/adsense";

declare global {
  interface Window {
    adsbygoogle: unknown[];
  }
}

export default function BottomAnchorAd() {
  const containerRef = useRef<HTMLDivElement>(null);
  const adInitialized = useRef(false);
  const [isFilled, setIsFilled] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const [hasFailed, setHasFailed] = useState(false);

  useEffect(() => {
    if (adInitialized.current || isDismissed || hasFailed) return;

    const timer = setTimeout(() => {
      try {
        const container = containerRef.current;
        const insElement = container?.querySelector("ins.adsbygoogle");
        if (!insElement) return;

        const status = insElement.getAttribute("data-adsbygoogle-status");
        if (status === "done" || status === "loaded") {
          adInitialized.current = true;
          return;
        }

        (window.adsbygoogle = window.adsbygoogle || []).push({});
        adInitialized.current = true;

        const isAdFilled = () => {
          const iframe = insElement.querySelector("iframe");
          const height = iframe
            ? iframe.getBoundingClientRect().height
            : insElement.getBoundingClientRect().height;
          return height > 10;
        };

        const observer = new MutationObserver(() => {
          const currentStatus = insElement.getAttribute("data-adsbygoogle-status");

          if (currentStatus === "done" || currentStatus === "loaded") {
            requestAnimationFrame(() => {
              if (isAdFilled()) setIsFilled(true);
            });
            observer.disconnect();
          }

          if (currentStatus === "unfilled") {
            setHasFailed(true);
            observer.disconnect();
          }
        });

        observer.observe(insElement, {
          attributes: true,
          attributeFilter: ["data-adsbygoogle-status"],
        });

        setTimeout(() => {
          const finalStatus = insElement.getAttribute("data-adsbygoogle-status");
          if ((finalStatus === "done" || finalStatus === "loaded") && isAdFilled()) {
            setIsFilled(true);
          } else if (!isFilled) {
            setHasFailed(true);
          }
          observer.disconnect();
        }, 4000);
      } catch (err) {
        console.error("[BottomAnchorAd] Error:", err);
        setHasFailed(true);
      }
    }, 800);

    return () => clearTimeout(timer);
  }, [hasFailed, isDismissed, isFilled]);

  if (isDismissed || hasFailed) return null;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 flex flex-col items-center bg-white/95 border-t border-slate-200 shadow-[0_-4px_20px_rgba(0,0,0,0.12)] backdrop-blur transition-all duration-300"
      role="complementary"
      aria-label="Advertisement"
    >
      <div className="flex w-full max-w-[320px] items-center justify-between px-2 pt-1">
        <span className="text-[9px] font-medium uppercase tracking-widest text-slate-400 select-none">
          Advertisement
        </span>
        <button
          onClick={() => setIsDismissed(true)}
          className="rounded p-1 text-slate-400 transition-colors hover:text-slate-600"
          aria-label="Close advertisement"
          title="Close"
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              d="M1 1L11 11M11 1L1 11"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>

      <div ref={containerRef} className="flex w-full justify-center pb-1">
        <ins
          className="adsbygoogle"
          style={{
            display: "inline-block",
            width: "300px",
            height: "50px",
          }}
          data-ad-client={AD_CLIENT}
          data-ad-slot={AD_SLOTS.BOTTOM_STICKY}
        />
      </div>
    </div>
  );
}
