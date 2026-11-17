"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import GoogleAd from "./GoogleAd";

/** Visual/behavioural presets for ad containers across the site. */
export type AdSlotPreset = "leaderboard" | "in-article" | "multiplex" | "sidebar" | "bare";

interface AdSlotProps {
    slot: string;
    preset?: AdSlotPreset;
    /** AdSense format override (each preset has a sensible default). */
    format?: string;
    layout?: string;
    layoutKey?: string;
    responsive?: boolean;
    /** Load only when near viewport (default: true, except leaderboard). */
    lazy?: boolean;
    /** "Advertisement" label text; pass null to hide. */
    label?: string | null;
    className?: string;
}

const PRESET_DEFAULTS: Record<AdSlotPreset, { format: string; layout?: string; lazy?: boolean }> = {
    leaderboard: { format: "auto", lazy: false },
    "in-article": { format: "fluid", layout: "in-article" },
    multiplex: { format: "autorelaxed" },
    sidebar: { format: "auto" },
    bare: { format: "auto" },
};

const PRESET_CHROME: Record<AdSlotPreset, string> = {
    // Reserved min-height containers + 24px (my-6) vertical breathing room prevent
    // Cumulative Layout Shift (CLS) and accidental taps across mobile & desktop.
    leaderboard:
        "my-6 rounded-2xl overflow-hidden shadow-xs border border-slate-200/80 bg-white/95 px-3 py-2.5 min-h-[100px] flex flex-col items-center justify-center",
    "in-article":
        "my-6 rounded-2xl overflow-hidden shadow-xs border border-slate-200/80 bg-white/95 px-3 py-3 min-h-[280px] flex flex-col items-center justify-center",
    multiplex:
        "my-6 rounded-2xl overflow-hidden shadow-xs border border-slate-200/80 bg-white/95 px-3 py-3 min-h-[280px] flex flex-col items-center justify-center",
    sidebar:
        "my-6 rounded-2xl border border-slate-200/80 bg-white/95 p-3 shadow-xs min-h-[280px] flex flex-col items-center justify-center",
    bare: "",
};

/**
 * Unified ad container: one card treatment + "Advertisement" label for every
 * AdSense unit on the site. When AdSense marks the unit unfilled (or
 * unfill-optimized), the whole container collapses cleanly.
 */
export default function AdSlot({
    slot,
    preset = "leaderboard",
    format,
    layout,
    layoutKey,
    responsive = true,
    lazy,
    label = "Advertisement",
    className = "",
}: AdSlotProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const pathname = usePathname();
    const [consentRev, setConsentRev] = useState(0);
    const currentKey = `${pathname ?? ""}:${slot}:${consentRev}`;
    const [unfilledKey, setUnfilledKey] = useState<string | null>(null);
    const unfilled = unfilledKey === currentKey;

    useEffect(() => {
        const onConsentChanged = () => {
            setConsentRev((r) => r + 1);
        };
        window.addEventListener("cookie-consent-changed", onConsentChanged);
        return () => window.removeEventListener("cookie-consent-changed", onConsentChanged);
    }, []);

    // Collapse when AdSense reports no fill ("unfilled" or "unfill-optimized").
    useEffect(() => {
        const container = containerRef.current;
        if (!container || unfilled) return;

        const isUnfilled = () =>
            Boolean(
                container.querySelector(
                    "ins.adsbygoogle[data-ad-status='unfilled'], ins.adsbygoogle[data-ad-status='unfill-optimized']",
                ),
            );

        if (isUnfilled()) {
            const id = setTimeout(() => setUnfilledKey(currentKey), 0);
            return () => clearTimeout(id);
        }

        if (typeof MutationObserver === "undefined") return;

        const observer = new MutationObserver(() => {
            if (isUnfilled()) {
                setUnfilledKey(currentKey);
                observer.disconnect();
            }
        });
        observer.observe(container, {
            subtree: true,
            attributes: true,
            attributeFilter: ["data-ad-status"],
            childList: true,
        });
        return () => observer.disconnect();
    }, [currentKey, unfilled]);

    if (unfilled) return null;

    const defaults = PRESET_DEFAULTS[preset];

    return (
        <div
            ref={containerRef}
            className={`${PRESET_CHROME[preset]} ${className}`}
            data-ad-slot-container={preset}
        >
            {label && preset !== "bare" && (
                <p className="mb-2 text-center text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400 select-none">
                    {label}
                </p>
            )}
            <GoogleAd
                slot={slot}
                format={format ?? defaults.format}
                layout={layout ?? defaults.layout}
                layoutKey={layoutKey}
                responsive={responsive}
                lazy={lazy ?? defaults.lazy ?? true}
            />
        </div>
    );
}
