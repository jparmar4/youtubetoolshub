"use client";

import { useEffect, useRef, useState } from "react";

declare global {
    interface Window {
        adsbygoogle: unknown[];
    }
}

export default function InFeedAd() {
    const adRef = useRef<boolean>(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const [adError, setAdError] = useState(false);

    useEffect(() => {
        if (adRef.current) return;

        const timer = setTimeout(() => {
            try {
                if (typeof window !== "undefined" && containerRef.current) {
                    const insElement =
                        containerRef.current.querySelector("ins.adsbygoogle");

                    if (
                        insElement &&
                        !insElement.getAttribute("data-adsbygoogle-status")
                    ) {
                        (window.adsbygoogle = window.adsbygoogle || []).push({});
                        adRef.current = true;

                        // Watch for status changes to detect "unfilled" state
                        const observer = new MutationObserver((mutations) => {
                            mutations.forEach((mutation) => {
                                if (
                                    mutation.type === "attributes" &&
                                    mutation.attributeName === "data-adsbygoogle-status"
                                ) {
                                    const currentStatus = insElement.getAttribute(
                                        "data-adsbygoogle-status",
                                    );
                                    if (currentStatus === "unfilled") {
                                        setAdError(true);
                                        observer.disconnect();
                                    }
                                }
                            });
                        });

                        observer.observe(insElement, {
                            attributes: true,
                            attributeFilter: ["data-adsbygoogle-status"],
                        });

                        // Backup timer
                        setTimeout(() => {
                            const status = insElement.getAttribute("data-adsbygoogle-status");
                            const adContent = insElement.innerHTML.trim();
                            if (
                                status === "unfilled" ||
                                (status === "done" && adContent === "")
                            ) {
                                setAdError(true);
                                observer.disconnect();
                            }
                        }, 3000);
                    }
                }
            } catch (error) {
                console.error("InFeedAd: AdSense error:", error);
                setAdError(true);
            }
        }, 100);

        return () => clearTimeout(timer);
    }, []);

    if (adError) return null;

    return (
        <div
            ref={containerRef}
            className="w-full my-8 bg-slate-50 rounded-xl border border-slate-200 p-4 overflow-hidden"
        >
            <div className="text-xs text-slate-400 mb-2 uppercase tracking-wide font-medium text-center">
                Advertisement
            </div>
            <ins
                className="adsbygoogle"
                style={{ display: "block" }}
                data-ad-format="fluid"
                data-ad-layout-key="-6t+ed+2i-1n-4w"
                data-ad-client="ca-pub-1328083083403070"
                data-ad-slot="2197690717"
            />
        </div>
    );
}

