"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { FaCookie } from "react-icons/fa";
import { isLikelyGdprTimezone } from "@/config/index-policy";

export default function CookieConsent() {
    const [showBanner, setShowBanner] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem("cookieConsent");
        if (consent) return;

        // Only show a blocking banner in likely GDPR/UK regions.
        // Elsewhere Consent Mode already grants ads (see layout.tsx).
        if (!isLikelyGdprTimezone()) {
            localStorage.setItem("cookieConsent", "accepted");
            window.dispatchEvent(new Event("cookie-consent-changed"));
            return;
        }

        const timer = setTimeout(() => setShowBanner(true), 800);
        return () => clearTimeout(timer);
    }, []);

    const acceptCookies = () => {
        localStorage.setItem("cookieConsent", "accepted");
        setShowBanner(false);
        window.dispatchEvent(new Event("cookie-consent-changed"));
    };

    const declineCookies = () => {
        localStorage.setItem("cookieConsent", "declined");
        setShowBanner(false);
        window.dispatchEvent(new Event("cookie-consent-changed"));
    };

    if (!showBanner) return null;

    return (
        <div className="fixed bottom-0 left-0 right-0 z-[60] p-4 md:p-6 glass-premium border-t border-slate-200 dark:border-slate-800 shadow-2xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-md">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-start gap-4">
                    <div className="hidden sm:flex w-10 h-10 rounded-lg bg-orange-100 items-center justify-center text-orange-500 flex-shrink-0">
                        <FaCookie className="w-5 h-5" />
                    </div>
                    <div>
                        <p className="text-slate-600 text-sm md:text-base">
                            We use cookies for ads and analytics so we can keep these YouTube tools free.{" "}
                            <Link href="/privacy-policy" className="text-emerald-600 hover:underline">
                                Privacy policy
                            </Link>
                        </p>
                    </div>
                </div>
                <div className="flex gap-3 flex-shrink-0">
                    <button
                        onClick={declineCookies}
                        className="px-4 py-2 text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors"
                    >
                        Decline
                    </button>
                    <button
                        onClick={acceptCookies}
                        className="px-6 py-2 text-sm font-medium bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg transition-colors shadow-lg shadow-emerald-500/20"
                    >
                        Accept
                    </button>
                </div>
            </div>
        </div>
    );
}
