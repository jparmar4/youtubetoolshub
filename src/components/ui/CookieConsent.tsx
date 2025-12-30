"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { FaCookie } from "react-icons/fa";

export default function CookieConsent() {
    const [showBanner, setShowBanner] = useState(false);

    useEffect(() => {
        // Check if user has already consented
        const consent = localStorage.getItem("cookieConsent");
        if (!consent) {
            // Show banner after a short delay for better UX
            const timer = setTimeout(() => setShowBanner(true), 1000);
            return () => clearTimeout(timer);
        }
    }, []);

    const acceptCookies = () => {
        localStorage.setItem("cookieConsent", "accepted");
        setShowBanner(false);
    };

    const declineCookies = () => {
        localStorage.setItem("cookieConsent", "declined");
        setShowBanner(false);
    };

    if (!showBanner) return null;

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6 glass-premium border-t border-slate-200 shadow-2xl bg-white/90 backdrop-blur-md">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-start gap-4">
                    <div className="hidden sm:flex w-10 h-10 rounded-lg bg-orange-100 items-center justify-center text-orange-500 flex-shrink-0">
                        <FaCookie className="w-5 h-5" />
                    </div>
                    <div>
                        <p className="text-slate-600 text-sm md:text-base">
                            We use cookies to enhance your browsing experience and analyze site traffic.{" "}
                            <Link href="/privacy-policy" className="text-emerald-600 hover:underline">
                                Learn more
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
