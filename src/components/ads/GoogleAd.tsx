"use client";

import { useEffect, useRef, useState } from "react";
import { isPremiumUser } from "@/lib/usage";

declare global {
    interface Window {
        adsbygoogle: any[];
    }
}

interface GoogleAdProps {
    slot: string;
    client?: string;
    format?: "auto" | "fluid" | "rectangle" | "horizontal" | "vertical";
    layout?: string;
    responsive?: boolean;
    style?: React.CSSProperties;
    className?: string;
}

export default function GoogleAd({
    slot,
    client = "ca-pub-1328083083403070",
    format = "auto",
    layout,
    responsive = true,
    style,
    className,
}: GoogleAdProps) {
    const adRef = useRef<HTMLModElement>(null);
    const [shouldShowAd, setShouldShowAd] = useState(true);

    useEffect(() => {
        // Check premium status
        if (isPremiumUser()) {
            setShouldShowAd(false);
            return;
        }

        try {
            if (typeof window !== "undefined") {
                const adElement = adRef.current;
                // Check if the ad slot is already filled to prevent duplicate pushes
                // We look for the data-ad-status attribute which AdSense adds, or if content exists
                if (adElement && !adElement.getAttribute("data-ad-status")) {
                    (window.adsbygoogle = window.adsbygoogle || []).push({});
                }
            }
        } catch (err) {
            console.error("AdsByGoogle error:", err);
        }
    }, [slot]); // Re-run if slot changes

    if (!shouldShowAd) {
        return null;
    }

    const isDev = process.env.NODE_ENV === "development";

    return (
        <div className={`google-ad-container w-full flex justify-center my-6 min-h-[280px] relative ${className || ""}`}>
            {isDev && (
                <div className="absolute inset-0 flex items-center justify-center bg-stripes-gray opacity-50 z-0 pointer-events-none border-2 border-dashed border-red-300">
                    <div className="text-center p-2 bg-white/90 rounded shadow-sm z-10">
                        <p className="text-xs font-bold text-red-500 uppercase">Dev Mode: Ad Slot</p>
                        <p className="text-[10px] text-slate-500 font-mono mt-0.5">{slot} ({format})</p>
                    </div>
                </div>
            )}
            <ins
                ref={adRef}
                className="adsbygoogle"
                style={{ display: "block", ...style }}
                data-ad-client={client}
                data-ad-slot={slot}
                data-ad-format={format}
                data-full-width-responsive={responsive}
                {...(layout ? { "data-ad-layout": layout } : {})}
            />
        </div>
    );
}
