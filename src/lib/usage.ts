/**
 * Usage Tracking System
 * 
 * Tracks daily usage limits for free and premium users
 * Uses localStorage for client-side tracking
 * 
 * Limits:
 * - Free: 5 AI text prompts/day, 0 images (locked)
 * - Pro: Unlimited AI text, 150 images/month
 */


export interface UsageData {
    aiUses: number;         // AI text uses for today
    imageUses: number;      // Image uses for current month (or day for free, but free is 0)
    lastReset: string;      // ISO date string (YYYY-MM-DD) for AI text
    imageReset: string;     // ISO date string (YYYY-MM) for Images
}

export interface UsageLimits {
    aiLimit: number;
    imageLimit: number;
    isPro: boolean;
}

const STORAGE_KEY = 'yt_tools_usage_v2'; // Changed key to reset legacy data
const PRO_KEY = 'yt_tools_pro';

// Date helpers
const getTodayString = () => new Date().toISOString().split('T')[0];
const getMonthString = () => new Date().toISOString().slice(0, 7); // YYYY-MM

// Check if user is pro
export const isPremiumUser = (): boolean => {
    if (typeof window === 'undefined') return false;
    return localStorage.getItem(PRO_KEY) === 'true';
};

// Set premium status
export const setPremiumStatus = (isPro: boolean): void => {
    if (typeof window === 'undefined') return;
    localStorage.setItem(PRO_KEY, isPro ? 'true' : 'false');
};

// Get usage limits based on subscription
export const getUsageLimits = (): UsageLimits => {
    const isPro = isPremiumUser();
    return {
        aiLimit: isPro ? Infinity : 5,    // Free: 5/day, Pro: Unlimited
        imageLimit: isPro ? 150 : 0,      // Free: 0, Pro: 150/month
        isPro,
    };
};

// Get current usage data
export const getUsageData = (): UsageData => {
    if (typeof window === 'undefined') {
        return { aiUses: 0, imageUses: 0, lastReset: getTodayString(), imageReset: getMonthString() };
    }

    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
        return { aiUses: 0, imageUses: 0, lastReset: getTodayString(), imageReset: getMonthString() };
    }

    const data: UsageData = JSON.parse(stored);
    const today = getTodayString();
    const currentMonth = getMonthString();
    let needsUpdate = false;

    // Daily reset for AI text
    if (data.lastReset !== today) {
        data.aiUses = 0;
        data.lastReset = today;
        needsUpdate = true;
    }

    // Monthly reset for Images
    // Note: If data.imageReset is undefined (legacy data), we treat it as mismatch -> reset
    if (data.imageReset !== currentMonth) {
        data.imageUses = 0;
        data.imageReset = currentMonth;
        needsUpdate = true;
    }

    if (needsUpdate) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    }

    return data;
};

// Check if user can make an AI generation
export const canGenerateAI = (): boolean => {
    const usage = getUsageData();
    const limits = getUsageLimits();
    return limits.isPro || usage.aiUses < limits.aiLimit;
};

// Check if user can make an image generation
export const canGenerateImage = (): boolean => {
    const usage = getUsageData();
    const limits = getUsageLimits();
    // Free users have 0 limit, so usage.imageUses (0) < 0 is false.
    // Logic: user can generate if usage < limit.
    return usage.imageUses < limits.imageLimit;
};

// Increment AI generation count
export const incrementAIUsage = (): void => {
    if (typeof window === 'undefined') return;
    const usage = getUsageData();
    usage.aiUses += 1;
    // We update lastReset to today just in case, though getUsageData handles it
    usage.lastReset = getTodayString();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(usage));
};

// Increment image generation count
export const incrementImageUsage = (): void => {
    if (typeof window === 'undefined') return;
    const usage = getUsageData();
    usage.imageUses += 1;
    usage.imageReset = getMonthString();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(usage));
};

// Get usage summary for display
export const getUsageSummary = (): {
    aiUsed: number;
    aiLimit: number | 'Unlimited';
    aiRemaining: number | 'Unlimited';
    imageUsed: number;
    imageLimit: number;
    imageRemaining: number;
    isPro: boolean;
} => {
    const usage = getUsageData();
    const limits = getUsageLimits();

    return {
        aiUsed: usage.aiUses,
        aiLimit: limits.isPro ? 'Unlimited' : limits.aiLimit,
        aiRemaining: limits.isPro ? 'Unlimited' : Math.max(0, limits.aiLimit - usage.aiUses),

        imageUsed: usage.imageUses,
        imageLimit: limits.imageLimit,
        imageRemaining: Math.max(0, limits.imageLimit - usage.imageUses),

        isPro: limits.isPro,
    };
};


