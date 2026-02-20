"use client";

import { useEffect, useRef, useState } from "react";
import { AD_CLIENT } from "@/lib/adsense";

/**
 * InFeedAd - Native text/display ad designed to fit naturally in a list of items
 * Uses the specific layout key provided by the user.
 */

let infeedAdCounter = 0;

export default function InFeedAd() {
    const containerRef = useRef<HTMLDivElement>(null);
    const adInitialized = useRef(false);
    const observerRef = useRef<IntersectionObserver | null>(null);

    // Create a unique instance ID for this ad to prevent double-push conflicts
    const [adId] = useState(() => `infeed-ad-${++infeedAdCounter}`);
    const [isNearViewport, setIsNearViewport] = useState(false);
    const [hasError, setHasError] = useState(false);

    // Lazy Loading Setup: Start loading the ad 800px before it enters the viewport
    // to maximize impressions
    useEffect(() => {
        const container = containerRef.current;
        if (!container || adInitialized.current) return;

        if ("IntersectionObserver" in window) {
            observerRef.current = new IntersectionObserver(
                (entries) => {
                    const entry = entries[0];
                    if (entry && entry.isIntersecting) {
                        setIsNearViewport(true);
                        observerRef.current?.disconnect();
                    }
                },
                {
                    rootMargin: "800px 0px", // High threshold to pre-load before scroll
                    threshold: 0,
                },
            );

            observerRef.current.observe(container);
        } else {
            setIsNearViewport(true);
        }

        return () => {
            observerRef.current?.disconnect();
        };
    }, []);

    // Initialize the ad when near viewport
    useEffect(() => {
        if (!isNearViewport || adInitialized.current || hasError) return;

        const container = containerRef.current;
        if (!container) return;

        // Small delay to ensure the DOM is ready 
        const timer = setTimeout(() => {
            try {
                const insElement = container.querySelector("ins.adsbygoogle");

                if (!insElement) return;

                // AdSense already processed checking
                const status = insElement.getAttribute("data-adsbygoogle-status");
                if (status === "done" || status === "loaded") {
                    adInitialized.current = true;
                    return;
                }

                // Must have dimensions layout checking
                const rect = insElement.getBoundingClientRect();
                if (rect.width === 0) {
                    requestAnimationFrame(() => {
                        if (!adInitialized.current) {
                            try {
                                (window.adsbygoogle = window.adsbygoogle || []).push({});
                                adInitialized.current = true;
                            } catch (retryErr) {
                                console.error(`[InFeedAd] Retry failed for ${adId}:`, retryErr);
                                setHasError(true);
                            }
                        }
                    });
                    return;
                }

                // Fire the ad request
                (window.adsbygoogle = window.adsbygoogle || []).push({});
                adInitialized.current = true;

                // MutationObserver to hide gracefully if ad comes back unfilled
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
                                setHasError(true);
                                observer.disconnect();
                            }
                        }
                    });
                });

                observer.observe(insElement, {
                    attributes: true,
                    attributeFilter: ["data-adsbygoogle-status"],
                });

            } catch (error) {
                console.error(`[InFeedAd] AdSense error for ${adId}:`, error);
                setHasError(true);
            }
        }, 150);

        return () => clearTimeout(timer);
    }, [isNearViewport, adId, hasError]);

    if (hasError) {
        return <div className="hidden" aria-hidden="true" />;
    }

    return (
        <div
            ref={containerRef}
            className="w-full h-full flex flex-col justify-center items-center rounded-2xl border border-slate-100 bg-slate-50/50 p-4 transition-all"
            id={adId}
            role="complementary"
            aria-label="Sponsored content"
        >
            <div className="text-[10px] text-slate-400 mb-2 uppercase tracking-wide font-medium w-full text-center">
                Advertisement
            </div>

            <div className="w-full flex-grow flex items-center justify-center min-h-[150px]">
                {isNearViewport && (
                    <ins
                        className="adsbygoogle"
                        style={{ display: "block", width: "100%" }}
                        data-ad-format="fluid"
                        data-ad-layout-key="-gw-3+1f-3d+2z"
                        data-ad-client={AD_CLIENT}
                        data-ad-slot="4701075871"
                    />
                )}
            </div>
        </div>
    );
}

// Add the TypeScript type for adsbygoogle
declare global {
    interface Window {
        adsbygoogle: unknown[];
    }
}
