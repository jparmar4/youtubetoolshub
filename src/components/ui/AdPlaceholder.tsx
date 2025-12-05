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

    // Don't render on server or for premium users
    if (!mounted) return null;
    if (isPro) return null;

    const sizes = {
        banner: "h-24 w-full",
        sidebar: "h-64 w-full max-w-[300px]",
        inline: "h-32 w-full",
    };

    return (
        <div
            className={`
                ${sizes[size]}
                border-2 border-dashed border-gray-300 dark:border-gray-600
                rounded-xl
                bg-gray-50 dark:bg-gray-800/50
                flex items-center justify-center
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
