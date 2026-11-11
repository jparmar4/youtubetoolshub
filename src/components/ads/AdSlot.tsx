"use client";

import { useEffect, useRef, useState } from "react";
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
    // Responsive reserve: a full-width responsive unit renders ~100px tall on
    // mobile and up to ~250-280px on desktop, so a fixed 268px reserve left a
    // large blank block on small screens.
    leaderboard:
        "rounded-2xl overflow-hidden shadow-xs border border-slate-200/80 bg-white p-2 min-h-[110px] sm:min-h-[260px] flex flex-col items-center justify-center",
    "in-article":
        "rounded-2xl overflow-hidden shadow-xs border border-slate-200/80 bg-white p-2 min-h-[100px] flex flex-col items-center justify-center",
    multiplex:
        "rounded-2xl overflow-hidden shadow-xs border border-slate-200/80 bg-white p-2 min-h-[240px] flex flex-col items-center justify-center",
    sidebar: "",
    bare: "",
};

/**
 * Unified ad container: one card treatment + "Advertisement" label for every
 * AdSense unit on the site. When AdSense marks the unit unfilled, the whole
 * container collapses instead of leaving a blank reserved block.
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
    const [unfilled, setUnfilled] = useState(false);

    // Collapse when AdSense reports no fill. The <ins> element itself is
    // hidden by globals.css; this removes the leftover reserved height too.
    useEffect(() => {
        const container = containerRef.current;
        if (!container || typeof MutationObserver === "undefined") return;

        const observer = new MutationObserver(() => {
            const ins = container.querySelector("ins.adsbygoogle[data-ad-status='unfilled']");
            if (ins) {
                setUnfilled(true);
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
    }, []);

    if (unfilled) return null;

    const defaults = PRESET_DEFAULTS[preset];

    return (
        <div
            ref={containerRef}
            className={`${PRESET_CHROME[preset]} ${className}`}
            data-ad-slot-container={preset}
        >
            {label && preset !== "sidebar" && preset !== "bare" && (
                <p className="mb-1 text-center text-[11px] font-bold uppercase tracking-wider text-slate-500">
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
