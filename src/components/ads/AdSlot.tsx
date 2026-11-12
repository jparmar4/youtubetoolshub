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
    // Compact responsive reserve: fits standard mobile (50–100px) and desktop
    // leaderboard (90px+) banners without pushing primary tools off-screen,
    // while expanding naturally if AdSense serves a taller responsive unit.
    leaderboard:
        "rounded-2xl overflow-hidden shadow-xs border border-slate-200/80 bg-white/95 px-2 py-2 min-h-[76px] sm:min-h-[108px] flex flex-col items-center justify-center",
    "in-article":
        "rounded-2xl overflow-hidden shadow-xs border border-slate-200/80 bg-white/95 px-2 py-2 min-h-[100px] flex flex-col items-center justify-center",
    multiplex:
        "rounded-2xl overflow-hidden shadow-xs border border-slate-200/80 bg-white/95 px-2 py-2 min-h-[220px] flex flex-col items-center justify-center",
    sidebar:
        "rounded-2xl border border-slate-200/80 bg-white/90 p-3 shadow-xs min-h-[120px] flex flex-col items-center justify-center",
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
    const [unfilled, setUnfilled] = useState(false);

    // Collapse when AdSense reports no fill ("unfilled" or "unfill-optimized").
    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const isUnfilled = () =>
            Boolean(
                container.querySelector(
                    "ins.adsbygoogle[data-ad-status='unfilled'], ins.adsbygoogle[data-ad-status='unfill-optimized']",
                ),
            );

        if (isUnfilled()) {
            const id = setTimeout(() => setUnfilled(true), 0);
            return () => clearTimeout(id);
        }

        if (typeof MutationObserver === "undefined") return;

        const observer = new MutationObserver(() => {
            if (isUnfilled()) {
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
            {label && preset !== "bare" && (
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
