"use client";

import { useState, useEffect, useRef } from "react";
import { FaTimes } from "react-icons/fa";

declare global {
    interface Window {
        adsbygoogle: unknown[];
    }
}

export default function BottomStickyAd() {
    // Hidden by default until mounted to prevent hydration mismatch/flashing
    const [isVisible, setIsVisible] = useState(false);
    const [isClosed, setIsClosed] = useState(false);
    const adRef = useRef<boolean>(false);

    useEffect(() => {
        // Delay appearance slightly
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 3000);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        if (!isVisible || isClosed || adRef.current) return;
        try {
            (window.adsbygoogle = window.adsbygoogle || []).push({});
            adRef.current = true;
        } catch (error) {
            console.error("AdSense error:", error);
        }
    }, [isVisible, isClosed]);

    if (!isVisible || isClosed) return null;

    return (
        <div className="fixed bottom-0 left-0 w-full z-50 animate-fade-in-up">
            {/* Ad Container */}
            <div className="relative w-full bg-slate-50 border-t border-slate-200 shadow-[0_-4px_20px_rgba(0,0,0,0.1)] pb-safe-area-inset-bottom">

                {/* Close Button */}
                <div className="absolute -top-10 right-4">
                    <button
                        onClick={() => setIsClosed(true)}
                        className="bg-slate-800 hover:bg-slate-700 text-white rounded-full p-2 shadow-lg transition-transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2 group"
                        aria-label="Close ad"
                    >
                        <span className="text-[10px] uppercase font-bold tracking-wider px-1 opacity-100 max-w-[100px] overflow-hidden whitespace-nowrap transition-all">Close</span>
                        <FaTimes className="text-sm" />
                    </button>
                </div>

                <div className="w-full h-[100px] md:h-[90px] flex items-center justify-center overflow-hidden">
                    {/* Label */}
                    <div className="absolute top-0 left-2 text-[8px] md:text-[10px] text-slate-400 uppercase tracking-widest pointer-events-none">Advertisement</div>

                    <ins
                        className="adsbygoogle"
                        style={{ display: "block", width: "100%", height: "100%", maxHeight: "90px" }}
                        data-ad-client="ca-pub-1328083083403070"
                        data-ad-slot="5848325027"
                        data-ad-format="horizontal"
                        data-full-width-responsive="true"
                    />
                </div>
            </div>
        </div>
    );
}
