"use client";

import { useEffect, useRef, useState } from "react";

declare global {
    interface Window {
        adsbygoogle: unknown[];
    }
}

export default function SidebarAd() {
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
                console.error("SidebarAd: AdSense error:", error);
                setAdError(true);
            }
        }, 100);

        return () => clearTimeout(timer);
    }, []);

    if (adError) return null;

    return (
        <div
            ref={containerRef}
            className="w-full flex flex-col items-center overflow-hidden bg-slate-50 rounded-2xl border border-slate-100 p-4"
        >
            <div className="text-xs text-slate-400 mb-2 uppercase tracking-wide font-medium">
                Advertisement
            </div>
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
