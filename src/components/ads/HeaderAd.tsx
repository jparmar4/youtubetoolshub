"use client";

import { useState, useEffect } from "react";

declare global {
    interface Window {
        adsbygoogle: unknown[];
    }
}

export default function HeaderAd() {
    const [isDismissed, setIsDismissed] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        // Check if user dismissed the ad in this session
        const dismissed = sessionStorage.getItem("headerAdDismissed");
        if (dismissed) {
            setIsDismissed(true);
            return;
        }

        // Initialize ad
        try {
            (window.adsbygoogle = window.adsbygoogle || []).push({});
            setIsLoaded(true);
        } catch (err) {
            console.error("AdSense error:", err);
        }

        // Hide on scroll for better UX (show again when at top)
        const handleScroll = () => {
            if (window.scrollY > 100) {
                setIsVisible(false);
            } else {
                setIsVisible(true);
            }
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleDismiss = () => {
        setIsDismissed(true);
        sessionStorage.setItem("headerAdDismissed", "true");
    };

    if (isDismissed) return null;

    return (
        <div
            className={`w-full bg-slate-50 border-b border-slate-200 transition-all duration-300 ${isVisible ? "opacity-100 max-h-32" : "opacity-0 max-h-0 overflow-hidden"
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 relative">
                {/* Dismiss button */}
                <button
                    onClick={handleDismiss}
                    className="absolute top-1 right-1 z-10 w-5 h-5 flex items-center justify-center text-slate-400 hover:text-slate-600 bg-white/80 rounded-full text-xs transition-colors"
                    aria-label="Dismiss ad"
                >
                    ✕
                </button>

                {/* Ad Container - Responsive */}
                <div className="flex justify-center py-2">
                    {/* Desktop Leaderboard (728x90) */}
                    <div className="hidden md:block">
                        <ins
                            className="adsbygoogle"
                            style={{ display: "inline-block", width: 728, height: 90 }}
                            data-ad-client="ca-pub-1328083083403070"
                            data-ad-slot="auto"
                            data-ad-format="horizontal"
                            data-full-width-responsive="false"
                        />
                    </div>

                    {/* Mobile Banner (320x50) */}
                    <div className="block md:hidden">
                        <ins
                            className="adsbygoogle"
                            style={{ display: "inline-block", width: 320, height: 50 }}
                            data-ad-client="ca-pub-1328083083403070"
                            data-ad-slot="auto"
                            data-ad-format="horizontal"
                            data-full-width-responsive="false"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
