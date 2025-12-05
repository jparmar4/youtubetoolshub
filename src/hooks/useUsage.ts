"use client";

import { useState, useEffect, useCallback } from "react";
import {
    getUsageSummary,
    canGenerateAI,
    canGenerateImage,
    incrementAIUsage,
    incrementImageUsage,
    isPremiumUser
} from "@/lib/usage";

export function useUsage() {
    const [usage, setUsage] = useState<ReturnType<typeof getUsageSummary> | null>(null);
    const [showLimitModal, setShowLimitModal] = useState(false);
    const [limitType, setLimitType] = useState<"ai" | "image">("ai");

    // Refresh usage data
    const refreshUsage = useCallback(() => {
        setUsage(getUsageSummary());
    }, []);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        refreshUsage();
    }, [refreshUsage]);

    // Check and increment AI usage
    const checkAndIncrementAI = useCallback((): boolean => {
        if (!canGenerateAI()) {
            setLimitType("ai");
            setShowLimitModal(true);
            return false;
        }
        incrementAIUsage();
        refreshUsage();
        return true;
    }, [refreshUsage]);

    // Check and increment image usage
    const checkAndIncrementImage = useCallback((): boolean => {
        if (!canGenerateImage()) {
            setLimitType("image");
            setShowLimitModal(true);
            return false;
        }
        incrementImageUsage();
        refreshUsage();
        return true;
    }, [refreshUsage]);

    // Close modal
    const closeLimitModal = useCallback(() => {
        setShowLimitModal(false);
    }, []);

    return {
        usage,
        isPro: usage?.isPro ?? false,
        canGenerateAI: usage ? (usage.isPro || (typeof usage.totalRemaining === 'number' && usage.totalRemaining > 0)) : true,
        canGenerateImage: usage ? usage.imageRemaining > 0 : true,
        checkAndIncrementAI,
        checkAndIncrementImage,
        showLimitModal,
        limitType,
        closeLimitModal,
        refreshUsage,
    };
}

// Simple hook to check premium status
export function usePremium() {
    const [isPro, setIsPro] = useState(false);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setIsPro(isPremiumUser());
    }, []);

    return isPro;
}
