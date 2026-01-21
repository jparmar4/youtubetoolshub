"use client";

import { useEffect, useRef } from "react";

export default function SidebarAd() {
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
        <div className="w-full flex flex-col items-center overflow-hidden bg-slate-50 rounded-2xl border border-slate-100 p-4">
            <div className="text-xs text-slate-400 mb-2 uppercase tracking-wide font-medium">Advertisement</div>
            <div className="w-full min-h-[500px] flex items-center justify-center bg-white rounded-xl">
                <ins
                    className="adsbygoogle"
                    style={{ display: "block", width: "100%" }}
                    data-ad-client="ca-pub-1328083083403070"
                    data-ad-slot="5848325027"
                    data-ad-format="auto"
                    data-full-width-responsive="true"
                />
            </div>
        </div>
    );
}
