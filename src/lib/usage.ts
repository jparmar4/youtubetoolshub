/**
 * Usage Tracking System
 * 
 * Tracks daily usage limits for free and premium users
 * Uses localStorage for client-side tracking (simple implementation)
 * 
 * Limits:
 * - Free: 5 TOTAL uses/day (shared across all tools), 1 can be image
 * - Pro: Unlimited AI, 10 images/day
 */

export interface UsageData {
    totalUses: number;      // Total AI uses across all tools
    imageUses: number;      // Image generations (part of total)
    lastReset: string;      // ISO date string
}

export interface UsageLimits {
    totalLimit: number;
    imageLimit: number;
    isPro: boolean;
}

const STORAGE_KEY = 'yt_tools_usage';
const PRO_KEY = 'yt_tools_pro';

// Get today's date string for comparison
const getTodayString = () => new Date().toISOString().split('T')[0];

// Check if user is pro (from localStorage for now)
export const isPremiumUser = (): boolean => {
    if (typeof window === 'undefined') return false;
    return localStorage.getItem(PRO_KEY) === 'true';
};

// Set premium status (for testing/demo purposes)
export const setPremiumStatus = (isPro: boolean): void => {
    if (typeof window === 'undefined') return;
    localStorage.setItem(PRO_KEY, isPro ? 'true' : 'false');
};

// Get usage limits based on subscription
export const getUsageLimits = (): UsageLimits => {
    const isPro = isPremiumUser();
    return {
        totalLimit: isPro ? Infinity : 5,
        imageLimit: isPro ? 10 : 1,
        isPro,
    };
};

// Get current usage data
export const getUsageData = (): UsageData => {
    if (typeof window === 'undefined') {
        return { totalUses: 0, imageUses: 0, lastReset: getTodayString() };
    }

    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
        return { totalUses: 0, imageUses: 0, lastReset: getTodayString() };
    }

    const data: UsageData = JSON.parse(stored);

    // Check if we need to reset (new day)
    if (data.lastReset !== getTodayString()) {
        const newData = { totalUses: 0, imageUses: 0, lastReset: getTodayString() };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
        return newData;
    }

    return data;
};

// Check if user can make an AI generation (any tool)
export const canGenerateAI = (): boolean => {
    const usage = getUsageData();
    const limits = getUsageLimits();
    return limits.isPro || usage.totalUses < limits.totalLimit;
};

// Check if user can make an image generation
export const canGenerateImage = (): boolean => {
    const usage = getUsageData();
    const limits = getUsageLimits();
    // For free users: must have total uses left AND image uses left
    // Image uses count toward total
    if (limits.isPro) {
        return usage.imageUses < limits.imageLimit;
    }
    return usage.totalUses < limits.totalLimit && usage.imageUses < limits.imageLimit;
};

// Increment AI generation count (any tool)
export const incrementAIUsage = (): void => {
    if (typeof window === 'undefined') return;
    const usage = getUsageData();
    usage.totalUses += 1;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(usage));
};

// Increment image generation count (also counts toward total for free users)
export const incrementImageUsage = (): void => {
    if (typeof window === 'undefined') return;
    const usage = getUsageData();
    const limits = getUsageLimits();
    usage.imageUses += 1;
    // For free users, image uses also count toward total
    if (!limits.isPro) {
        usage.totalUses += 1;
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(usage));
};

// Get remaining generations
export const getRemainingGenerations = (): { total: number; image: number } => {
    const usage = getUsageData();
    const limits = getUsageLimits();
    return {
        total: limits.isPro ? Infinity : Math.max(0, limits.totalLimit - usage.totalUses),
        image: Math.max(0, limits.imageLimit - usage.imageUses),
    };
};

// Get usage summary for display
export const getUsageSummary = (): {
    totalUsed: number;
    totalLimit: number | 'Unlimited';
    imageUsed: number;
    imageLimit: number;
    isPro: boolean;
    totalRemaining: number | 'Unlimited';
    imageRemaining: number;
} => {
    const usage = getUsageData();
    const limits = getUsageLimits();

    return {
        totalUsed: usage.totalUses,
        totalLimit: limits.isPro ? 'Unlimited' : limits.totalLimit,
        imageUsed: usage.imageUses,
        imageLimit: limits.imageLimit,
        isPro: limits.isPro,
        totalRemaining: limits.isPro ? 'Unlimited' : limits.totalLimit - usage.totalUses,
        imageRemaining: limits.imageLimit - usage.imageUses,
    };
};
