"use client";

import { useEffect, useRef } from "react";

declare global {
    interface Window {
        adsbygoogle: unknown[];
    }
}

export default function InArticleAd() {
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
        <div className="w-full my-8 flex flex-col items-center">
            <div className="text-[10px] text-slate-300 mb-1 uppercase tracking-wider">Advertisement</div>
            <div className="w-full min-h-[100px] flex items-center justify-center bg-slate-50/50 rounded-lg overflow-hidden">
                <ins
                    className="adsbygoogle"
                    style={{ display: "block", textAlign: "center", width: "100%" }}
                    data-ad-layout="in-article"
                    data-ad-format="fluid"
                    data-ad-client="ca-pub-1328083083403070"
                    data-ad-slot="5441130911"
                />
            </div>
        </div>
    );
}
