"use client";

import { useEffect, useRef } from "react";

declare global {
    interface Window {
        adsbygoogle: unknown[];
    }
}

export default function HorizontalAd() {
    const adRef = useRef<boolean>(false);

    useEffect(() => {
        if (adRef.current) return;
        try {
            (window.adsbygoogle = window.adsbygoogle || []).push({});
            adRef.current = true;
        } catch (error) {
            console.error("AdSense error:", error);
        }
    }, []);

    return (
        <div className="w-full flex flex-col items-center my-8 overflow-hidden">
            <div className="text-xs text-slate-400 mb-1">Advertisement</div>
            <ins
                className="adsbygoogle block w-full"
                data-ad-client="ca-pub-1328083083403070"
                data-ad-slot="5848325027"
                data-ad-format="auto"
                data-full-width-responsive="true"
            />
        </div>
    );
}
