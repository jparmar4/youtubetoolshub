"use client";

import { useState, useCallback } from "react";
import {
    canUseTool,
    incrementToolUsage,
    isPremiumUser,
    getUsageStats
} from "@/lib/usage";

export function useUsage() {
    const [limitReachedTool, setLimitReachedTool] = useState<string | null>(null);

    // Check limit without incrementing
    const checkLimit = useCallback((slug: string): boolean => {
        if (!canUseTool(slug)) {
            setLimitReachedTool(slug);
            return false;
        }
        return true;
    }, []);

    // Increment usage
    const increment = useCallback((slug: string) => {
        incrementToolUsage(slug);
    }, []);

    // Check and increment tool usage (Legacy/Convenience)
    const checkAndIncrement = useCallback((slug: string): boolean => {
        if (!checkLimit(slug)) {
            return false;
        }
        increment(slug);
        return true;
    }, [checkLimit, increment]);

    // Close modal
    const closeLimitModal = useCallback(() => {
        setLimitReachedTool(null);
    }, []);

    const getStats = useCallback((slug: string) => {
        return getUsageStats(slug);
    }, []);

    return {
        checkAndIncrement,
        checkLimit,
        increment,
        limitReachedTool, // If not null, show modal for this tool
        closeLimitModal,
        getStats,
        isPro: typeof window !== 'undefined' ? isPremiumUser() : false
    };
}

// Simple hook to check premium status
export function usePremium() {
    // This can stay simple or use the same logic
    return typeof window !== 'undefined' ? isPremiumUser() : false;
}
