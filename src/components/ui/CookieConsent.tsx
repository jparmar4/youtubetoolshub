"use client";

import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";
import { FaCookie } from "react-icons/fa";
import { isLikelyGdprTimezone } from "@/config/index-policy";

export default function CookieConsent() {
  const pathname = usePathname();
  const isEmbed = pathname?.startsWith("/embed");

    const [showBanner, setShowBanner] = useState(false);

    useEffect(() => {
        if (isEmbed) return;

        const handleOpenSettings = () => {
            setShowBanner(true);
        };
        window.addEventListener("open-cookie-consent", handleOpenSettings);

        const consent = localStorage.getItem("cookieConsent");
        let timer: ReturnType<typeof setTimeout> | undefined;

        if (!consent) {
            // Only show a blocking banner in likely GDPR/UK regions.
            // Elsewhere Consent Mode already grants ads (see layout.tsx).
            if (!isLikelyGdprTimezone()) {
                localStorage.setItem("cookieConsent", "accepted");
                window.dispatchEvent(new Event("cookie-consent-changed"));
            } else {
                timer = setTimeout(() => setShowBanner(true), 800);
            }
        }

        return () => {
            window.removeEventListener("open-cookie-consent", handleOpenSettings);
            if (timer) clearTimeout(timer);
        };
    }, [isEmbed]);

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

    if (isEmbed || !showBanner) return null;

    return (
        <div
            role="region"
            aria-label="Cookie consent"
            className="fixed bottom-0 left-0 right-0 z-[60] p-4 md:p-6 glass-premium border-t border-slate-200 shadow-2xl bg-white/95 backdrop-blur-md"
        >
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-start gap-4">
                    <div className="hidden sm:flex w-10 h-10 rounded-lg bg-orange-100 items-center justify-center text-orange-600 flex-shrink-0">
                        <FaCookie className="w-5 h-5" />
                    </div>
                    <div>
                        <p className="text-slate-700 text-sm md:text-base">
                            We use cookies for personalized ads and analytics to keep these YouTube creator tools free. You can update your choice anytime in Cookie Settings.{" "}
                            <Link href="/privacy-policy" className="text-emerald-700 font-semibold hover:underline">
                                Privacy policy
                            </Link>
                        </p>
                    </div>
                </div>
                <div className="flex gap-3 flex-shrink-0">
                    <button
                        type="button"
                        onClick={declineCookies}
                        className="px-4 py-2 text-sm font-semibold text-slate-700 hover:text-slate-950 border border-slate-300 hover:bg-slate-50 rounded-lg transition-colors"
                    >
                        Decline Non-Essential
                    </button>
                    <button
                        type="button"
                        onClick={acceptCookies}
                        className="px-6 py-2 text-sm font-semibold bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg transition-colors shadow-lg shadow-emerald-600/20"
                    >
                        Accept All Cookies
                    </button>
                </div>
            </div>
        </div>
    );
}