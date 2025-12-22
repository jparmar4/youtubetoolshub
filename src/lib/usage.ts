/**
 * Usage Tracking System
 * 
 * Tracks daily usage limits for free and premium users per tool
 * Uses localStorage for client-side tracking
 */

export interface UsageData {
    toolUsage: Record<string, number>; // usage count per tool slug
    lastReset: string;      // ISO date string (YYYY-MM-DD)
}

export interface ToolLimit {
    free: number; // Daily limit for free users (Infinity for unlimited)
    pro: number;  // Daily limit for pro users (Infinity for unlimited)
}

// Tool Limits Configuration
export const TOOL_LIMITS: Record<string, ToolLimit> = {
    // Unlimited Tools (Free for all)
    'youtube-thumbnail-downloader': { free: Infinity, pro: Infinity },
    'youtube-earnings-calculator': { free: Infinity, pro: Infinity },
    'youtube-engagement-rate-calculator': { free: Infinity, pro: Infinity },
    'youtube-channel-id-finder': { free: Infinity, pro: Infinity },
    'youtube-playlist-length-calculator': { free: Infinity, pro: Infinity },
    'youtube-comment-picker': { free: Infinity, pro: Infinity },

    // Limited Tools (Free: specific limit, Pro: Unlimited)
    'youtube-thumbnail-generator': { free: 2, pro: Infinity },          // Text Generator
    'youtube-ai-thumbnail-generator': { free: 1, pro: Infinity },       // Image Generator
    'youtube-ai-thumbnail-prompt': { free: 2, pro: Infinity },
    'youtube-title-generator': { free: 2, pro: Infinity },
    'youtube-description-generator': { free: 2, pro: Infinity },
    'youtube-tag-generator': { free: 2, pro: Infinity },
    'youtube-tag-extractor': { free: 2, pro: Infinity }, // Reverted to 2
    'youtube-video-ideas-generator': { free: 2, pro: Infinity },
    'youtube-trend-helper': { free: 2, pro: Infinity },
    'youtube-content-calendar-generator': { free: 2, pro: Infinity },
    'youtube-title-ab-tester': { free: 2, pro: Infinity },
    'youtube-channel-name-generator': { free: 2, pro: Infinity },
    'youtube-hashtag-generator': { free: 2, pro: Infinity },
    'youtube-intro-script-generator': { free: 2, pro: Infinity },
};

export const DEFAULT_LIMIT: ToolLimit = { free: 2, pro: Infinity };

const STORAGE_KEY = 'yt_tools_usage_v5'; // Incremented key to reset schema
const PRO_KEY = 'yt_tools_pro';

// Date helpers
const getTodayString = () => new Date().toISOString().split('T')[0];

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

// Get usage data
export const getUsageData = (): UsageData => {
    if (typeof window === 'undefined') {
        return { toolUsage: {}, lastReset: getTodayString() };
    }

    const stored = localStorage.getItem(STORAGE_KEY);
    const today = getTodayString();

    if (!stored) {
        return { toolUsage: {}, lastReset: today };
    }

    const data: UsageData = JSON.parse(stored);

    // Daily reset
    if (data.lastReset !== today) {
        return { toolUsage: {}, lastReset: today };
    }

    return data;
};

// Save usage data
const saveUsageData = (data: UsageData) => {
    if (typeof window === 'undefined') return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

// Get limit for a specific tool
export const getToolLimit = (slug: string): number => {
    const isPro = isPremiumUser();
    const limitConfig = TOOL_LIMITS[slug] || DEFAULT_LIMIT;
    return isPro ? limitConfig.pro : limitConfig.free;
};

// Check if user can use a tool
export const canUseTool = (slug: string): boolean => {
    const usage = getUsageData();
    const limit = getToolLimit(slug);

    // If limit is Infinity, allow
    if (limit === Infinity) return true;

    const currentUsage = usage.toolUsage[slug] || 0;
    return currentUsage < limit;
};

// Increment tool usage
export const incrementToolUsage = (slug: string): void => {
    const usage = getUsageData();

    // Initialize if not exists
    if (!usage.toolUsage[slug]) {
        usage.toolUsage[slug] = 0;
    }

    usage.toolUsage[slug] += 1;
    saveUsageData(usage);
};

// Get remaining uses for display
export const getRemainingUses = (slug: string): number | 'Unlimited' => {
    const limit = getToolLimit(slug);
    if (limit === Infinity) return 'Unlimited';

    const usage = getUsageData();
    const used = usage.toolUsage[slug] || 0;
    return Math.max(0, limit - used);
};

export const getUsageStats = (slug: string) => {
    const usage = getUsageData();
    const limit = getToolLimit(slug);
    const used = usage.toolUsage[slug] || 0;

    return {
        used,
        limit: limit === Infinity ? 'Unlimited' : limit,
        remaining: limit === Infinity ? 'Unlimited' : Math.max(0, limit - used),
        isPro: isPremiumUser()
    };
};

export const getUsageSummary = () => {
    const isPro = isPremiumUser();
    const usage = getUsageData();

    // Representative tools for limits
    const textTool = 'youtube-video-ideas-generator';
    const imageTool = 'youtube-ai-thumbnail-generator';

    const aiLimit = getToolLimit(textTool);
    const aiUsed = usage.toolUsage[textTool] || 0;
    const aiRemaining = aiLimit === Infinity ? 'Unlimited' : Math.max(0, aiLimit - aiUsed);

    const imageLimit = getToolLimit(imageTool);
    const imageUsed = usage.toolUsage[imageTool] || 0;
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
};



