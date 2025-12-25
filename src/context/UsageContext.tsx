"use client";

import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import {
    fetchUserUsage,
    incrementUserUsage,
    fetchSubscriptionStatus,
    getToolLimit,
    getLocalUsage,
    incrementLocalUsage,
} from "@/lib/usage";

interface UsageContextType {
    usageMap: Record<string, number>;
    isPro: boolean;
    loading: boolean;
    limitReachedTool: string | null;
    checkLimit: (slug: string) => boolean;
    increment: (slug: string) => Promise<void>;
    checkAndIncrement: (slug: string) => Promise<boolean>;
    closeLimitModal: () => void;
    getStats: (slug: string) => {
        used: number;
        limit: number | string;
        remaining: number | string;
        isPro: boolean;
        loading: boolean;
    };
    summary: {
        isPro: boolean;
        aiLimit: number | string;
        aiUsed: number;
        aiRemaining: number | string;
        imageLimit: number | string;
        imageUsed: number;
        imageRemaining: number | string;
    };
}

const UsageContext = createContext<UsageContextType | undefined>(undefined);

export function UsageProvider({ children }: { children: React.ReactNode }) {
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
            const [usageData, proStatus] = await Promise.all([
                fetchUserUsage(),
                fetchSubscriptionStatus()
            ]);

            if (usageData) {
                setUsageMap(usageData);
            } else {
                setUsageMap(getLocalUsage());
            }

            setIsPro(proStatus);
        } catch (error) {
            console.error("Failed to load usage/sub:", error);
            setUsageMap(getLocalUsage());
        } finally {
            setLoading(false);
        }
    };

    // Check limit
    const checkLimit = useCallback((slug: string): boolean => {
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
            await incrementUserUsage(slug);
            if (!isPro) {
                incrementLocalUsage(slug);
            }
        } catch {
            console.error("Server increment failed");
            // Revert or just keep optimistic? 
            // We'll keep optimistic but update local storage as fallback
            incrementLocalUsage(slug);
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
        const textTool = 'youtube-video-ideas-generator'; // Example text tool
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

    const value = {
        usageMap,
        isPro,
        loading,
        limitReachedTool,
        checkLimit,
        increment,
        checkAndIncrement,
        closeLimitModal,
        getStats,
        summary: getSummary()
    };

    return (
        <UsageContext.Provider value={value}>
            {children}
        </UsageContext.Provider>
    );
}

export function useUsageContext() {
    const context = useContext(UsageContext);
    if (context === undefined) {
        throw new Error("useUsageContext must be used within a UsageProvider");
    }
    return context;
}
