"use client";

import { useEffect, useRef } from "react";

declare global {
    interface Window {
        adsbygoogle: unknown[];
    }
}

export default function MultiplexAd() {
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
        <div className="w-full py-8">
            <div className="text-xs text-slate-400 mb-2 uppercase tracking-wide font-medium text-center">Sponsored Links</div>
            <ins
                className="adsbygoogle block"
                data-ad-format="autorelaxed"
                data-ad-client="ca-pub-1328083083403070"
                data-ad-slot="3104734850"
            />
        </div>
    );
}
