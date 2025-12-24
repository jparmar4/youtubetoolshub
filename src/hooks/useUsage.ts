"use client";

import { useState, useCallback, useEffect } from "react";
import {
    fetchUserUsage,
    incrementUserUsage,
    fetchSubscriptionStatus,
    getToolLimit,
    getLocalUsage,
    incrementLocalUsage,
    isPremiumUser as isPremiumUserLegacy // Fallback
} from "@/lib/usage";

export function useUsage() {
    const [usageMap, setUsageMap] = useState<Record<string, number>>({});
    const [isPro, setIsPro] = useState(false);
    const [loading, setLoading] = useState(true);
    const [limitReachedTool, setLimitReachedTool] = useState<string | null>(null);

    // Initial Load
    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            // Parallel fetch for speed
            const [usageData, proStatus] = await Promise.all([
                fetchUserUsage(),
                fetchSubscriptionStatus()
            ]);

            if (usageData) {
                setUsageMap(usageData);
            } else {
                // FALLBACK: No user or error -> Check local storage
                console.log("No server usage data (guest?), using local storage");
                setUsageMap(getLocalUsage());
            }

            setIsPro(proStatus);

            // Sync local storage for purely UI helpers that might rely on it sync (optional)
            if (typeof window !== 'undefined') {
                localStorage.setItem('yt_tools_pro', proStatus.toString());
            }

        } catch (error) {
            console.error("Failed to load usage/sub:", error);
            // Fallback on error
            setUsageMap(getLocalUsage());
        } finally {
            setLoading(false);
        }
    };

    // Check limit
    const checkLimit = useCallback((slug: string): boolean => {
        // If loading, assume allowed or wait (here we allow to specific prevents blocking, 
        // but robust apps might show spinner. We'll rely on optimistic UI).
        const limit = getToolLimit(slug, isPro);
        if (limit === Infinity) return true;

        const used = usageMap[slug] || 0;

        if (used >= limit) {
            setLimitReachedTool(slug);
            return false;
        }
        return true;
    }, [usageMap, isPro]);

    // Increment usage
    const increment = useCallback(async (slug: string) => {
        // Optimistic update
        setUsageMap(prev => ({
            ...prev,
            [slug]: (prev[slug] || 0) + 1
        }));

        try {
            // Server update
            await incrementUserUsage(slug);

            // If not Pro (i.e. Guest likely), also update local storage as backup/primary
            if (!isPro) {
                incrementLocalUsage(slug);
            }
        } catch (e) {
            console.error("Server increment failed:", e);
            incrementLocalUsage(slug); // Fallback
        }
    }, [isPro]);

    const checkAndIncrement = useCallback(async (slug: string): Promise<boolean> => {
        if (!checkLimit(slug)) {
            return false;
        }
        await increment(slug);
        return true;
    }, [checkLimit, increment]);

    const closeLimitModal = useCallback(() => {
        setLimitReachedTool(null);
    }, []);

    const getStats = useCallback((slug: string) => {
        const limit = getToolLimit(slug, isPro);
        const used = usageMap[slug] || 0;

        return {
            used,
            limit: limit === Infinity ? 'Unlimited' : limit,
            remaining: limit === Infinity ? 'Unlimited' : Math.max(0, limit - used),
            isPro,
            loading
        };
    }, [usageMap, isPro, loading]);

    const getSummary = useCallback(() => {
        const textTool = 'youtube-video-ideas-generator';
        const imageTool = 'youtube-ai-thumbnail-generator';

        const aiLimit = getToolLimit(textTool, isPro);
        const aiUsed = usageMap[textTool] || 0;
        const aiRemaining = aiLimit === Infinity ? 'Unlimited' : Math.max(0, aiLimit - aiUsed);

        const imageLimit = getToolLimit(imageTool, isPro);
        const imageUsed = usageMap[imageTool] || 0;
        const imageRemaining = imageLimit === Infinity ? 'Unlimited' : Math.max(0, imageLimit - imageUsed);

        return {
            isPro,
            aiLimit: aiLimit === Infinity ? 'Unlimited' : aiLimit,
            aiUsed,
            aiRemaining,
            imageLimit: imageLimit === Infinity ? 'Unlimited' : imageLimit,
            imageUsed,
            imageRemaining
        };
    }, [usageMap, isPro]);

    return {
        checkAndIncrement,
        checkLimit,
        increment,
        limitReachedTool,
        closeLimitModal,
        getStats,
        summary: getSummary(),
        isPro,
        loading
    };
}
