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

    // Check and increment tool usage
    const checkAndIncrement = useCallback((slug: string): boolean => {
        if (!canUseTool(slug)) {
            setLimitReachedTool(slug);
            return false;
        }
        incrementToolUsage(slug);
        return true;
    }, []);

    // Close modal
    const closeLimitModal = useCallback(() => {
        setLimitReachedTool(null);
    }, []);

    const getStats = useCallback((slug: string) => {
        return getUsageStats(slug);
    }, []);

    return {
        checkAndIncrement,
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
