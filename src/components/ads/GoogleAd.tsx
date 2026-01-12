"use client";

import { useEffect, useRef } from "react";

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

    useEffect(() => {
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

    return (
        <div className={`google-ad-container w-full flex justify-center my-6 min-h-[280px] ${className || ""}`}>
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
