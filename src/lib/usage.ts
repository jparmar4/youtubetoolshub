/**
 * Usage Tracking System (Server-Side + Client Hybrid)
 * 
 * Tracks daily usage limits:
 * 1. Fetches from Supabase 'user_usage' table for logged-in users.
 * 2. Falls back to localStorage for guests (optional, or just restrict).
 * 3. Enforces generic daily limits.
 */



export interface ToolLimit {
    free: number; // Daily limit for free users
    pro: number;  // Daily limit for pro users
}

// Tool Limits Configuration
export const TOOL_LIMITS: Record<string, ToolLimit> = {
    // Unlimited Tools
    'youtube-thumbnail-downloader': { free: Infinity, pro: Infinity },
    'youtube-earnings-calculator': { free: Infinity, pro: Infinity },
    'youtube-engagement-rate-calculator': { free: Infinity, pro: Infinity },
    'youtube-channel-id-finder': { free: Infinity, pro: Infinity },
    'youtube-playlist-length-calculator': { free: Infinity, pro: Infinity },
    'youtube-comment-picker': { free: Infinity, pro: Infinity },

    // Limited Tools
    'youtube-thumbnail-generator': { free: 2, pro: Infinity },
    'youtube-ai-thumbnail-generator': { free: 1, pro: Infinity },
    'youtube-ai-thumbnail-prompt': { free: 2, pro: Infinity },
    'youtube-title-generator': { free: 2, pro: Infinity },
    'youtube-description-generator': { free: 2, pro: Infinity },
    'youtube-tag-generator': { free: 2, pro: Infinity },
    'youtube-tag-extractor': { free: 2, pro: Infinity },
    'youtube-video-ideas-generator': { free: 2, pro: Infinity },
    'youtube-trend-helper': { free: 2, pro: Infinity },
    'youtube-content-calendar-generator': { free: 2, pro: Infinity },
    'youtube-title-ab-tester': { free: 2, pro: Infinity },
    'youtube-channel-name-generator': { free: 2, pro: Infinity },
    'youtube-hashtag-generator': { free: 2, pro: Infinity },
    'youtube-intro-script-generator': { free: 2, pro: Infinity },
};

export const DEFAULT_LIMIT: ToolLimit = { free: 2, pro: Infinity };

// --- Server-Side / Supabase Logic ---

/**
 * Fetch usage for the current user from API.
 */
export const fetchUserUsage = async () => {
    try {
        const res = await fetch('/api/usage');
        if (!res.ok) return null;
        const data = await res.json();
        return data.usage || {};
    } catch (error) {
        console.error("Error fetching usage:", error);
        return null;
    }
};

/**
 * Increment usage for a specific tool via API.
 */
export const incrementUserUsage = async (toolSlug: string) => {
    try {
        const res = await fetch('/api/usage', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ toolSlug })
        });
        if (!res.ok) return null;
        const data = await res.json();
        return data.usage;
    } catch (error) {
        console.error("Error incrementing usage:", error);
        return null;
    }
};

/**
 * Fetch subscription status from API.
 */
export const fetchSubscriptionStatus = async (): Promise<boolean> => {
    try {
        const res = await fetch('/api/subscription');
        if (!res.ok) return false;
        const data = await res.json();
        return !!data.isPro;
    } catch (error) {
        console.error("Error checking subscription:", error);
        return false;
    }
};


// --- Legacy / Helper Functions (Modified for Compatibility) ---

export const getToolLimit = (slug: string, isPro: boolean): number => {
    const limitConfig = TOOL_LIMITS[slug] || DEFAULT_LIMIT;
    return isPro ? limitConfig.pro : limitConfig.free;
};

// --- Local Storage Fallback (for Guests) ---

export const getLocalUsage = (): Record<string, number> => {
    if (typeof window === 'undefined') return {};

    const today = new Date().toISOString().split('T')[0];
    const stored = localStorage.getItem('yt_tools_usage_v2');

    if (!stored) return {};

    try {
        const parsed = JSON.parse(stored);
        if (parsed.date !== today) {
            // Reset for new day
            localStorage.setItem('yt_tools_usage_v2', JSON.stringify({ date: today, usage: {} }));
            return {};
        }
        return parsed.usage || {};
    } catch {
        return {};
    }
};

export const incrementLocalUsage = (slug: string): number => {
    if (typeof window === 'undefined') return 0;

    const today = new Date().toISOString().split('T')[0];
    const stored = localStorage.getItem('yt_tools_usage_v2');
    let usageData: Record<string, number> = {};

    try {
        if (stored) {
            const parsed = JSON.parse(stored);
            if (parsed.date === today) {
                usageData = parsed.usage || {};
            }
        }
    } catch {
        // ignore error
    }

    usageData[slug] = (usageData[slug] || 0) + 1;

    localStorage.setItem('yt_tools_usage_v2', JSON.stringify({
        date: today,
        usage: usageData
    }));

    return usageData[slug];
};

// Client-side helper (deprecated for direct checks, but useful for UI display logic)
export const isPremiumUser = (): boolean => {
    if (typeof window === 'undefined') return false;
    return localStorage.getItem('yt_tools_pro') === 'true';
};
