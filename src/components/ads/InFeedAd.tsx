"use client";

import { useEffect, useRef } from "react";

export default function InFeedAd() {
    const adRef = useRef<boolean>(false);

    useEffect(() => {
        if (adRef.current) return;
        try {
            // @ts-ignore
            (window.adsbygoogle = window.adsbygoogle || []).push({});
            adRef.current = true;
        } catch (error) {
            console.error("AdSense error:", error);
        }
    }, []);

    return (
        <div className="w-full my-8 bg-slate-50 rounded-xl border border-slate-200 p-4 overflow-hidden">
            <div className="text-xs text-slate-400 mb-2 uppercase tracking-wide font-medium text-center">Advertisement</div>
            <ins
                className="adsbygoogle"
                style={{ display: "block" }}
                data-ad-format="fluid"
                data-ad-layout-key="-fb+5w+4e-db+86"
                data-ad-client="ca-pub-1328083083403070"
                data-ad-slot="PLACEHOLDER_SLOT_ID"
            />
        </div>
    );
}
// Note: data-ad-layout-key is an example generic key, user needs to generate their own "In-Feed" native ad style in AdSense.
