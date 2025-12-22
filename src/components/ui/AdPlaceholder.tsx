"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { FaCrown } from "react-icons/fa";
import { isPremiumUser } from "@/lib/usage";

interface AdPlaceholderProps {
    size?: "banner" | "sidebar" | "inline";
    className?: string;
}

export default function AdPlaceholder({ size = "inline", className = "" }: AdPlaceholderProps) {
    const [isPro, setIsPro] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setMounted(true);
        setIsPro(isPremiumUser());
    }, []);

    // For Pro users, we want to return null to remove the ad space completely.
    // However, to prevent CLS, we should only do this if we are SURE they are pro (client-side).
    // On server (not mounted), we must render the placeholder to reserve space (or empty div with correct height).
    // Actually, improved strategy: Always render the container with correct height.
    // If Pro, render NOTHING inside it or `display: none`.
    // Better for CLS: The ad space *collapsing* is also a shift.
    // If the user IS pro, they shouldn't see ads. Collapsing is "good" shift if it happens instantly?
    // No, shrinking content is annoying.
    // Best practice: If we can't know for sure on server, assume Free (show placeholder).
    // If client loads and says "I'm Pro", then we can remove it.
    // BUT that causes a shift.
    // Ideally, `isPremiumUser` would be known server-side (cookies).
    // Since we are client-side only for now:
    // We will render the empty container to reserve space.
    // If Pro, we might just hide the *content* but keep the space? No, that looks broken.
    // We will accept the "good" CLS of removing the ad if they are Pro, but ensure the INITIAL render reserves space.

    const sizes = {
        banner: "h-24 w-full",
        sidebar: "h-64 w-full max-w-[300px]",
        inline: "h-32 w-full",
    };

    if (mounted && isPro) {
        return null;
    }

    return (
        <div
            className={`
                ${sizes[size]}
                border-2 border-dashed border-gray-300 dark:border-gray-600
                rounded-xl
                bg-gray-50 dark:bg-gray-800/50
                flex items-center justify-center
                transition-all duration-300
                ${className}
            `}
        >
            <div className="text-center px-4">
                <span className="text-gray-400 dark:text-gray-500 text-sm font-medium">
                    Ad Space
                </span>
                <p className="text-gray-300 dark:text-gray-600 text-xs mt-1">
                    {size === "banner" ? "728 x 90" : size === "sidebar" ? "300 x 250" : "468 x 60"}
                </p>
                <Link
                    href="/pricing"
                    className="inline-flex items-center gap-1 mt-2 text-xs text-red-500 hover:text-red-600"
                >
                    <FaCrown className="w-3 h-3" />
                    Remove ads with Pro
                </Link>
            </div>
        </div>
    );
}
