/**
 * Usage Tracking System (Server-Side + Client Hybrid)
 * 
 * Tracks daily usage limits:
 * 1. Fetches from Supabase 'user_usage' table for logged-in users.
 * 2. Falls back to localStorage for guests (optional, or just restrict).
 * 3. Enforces generic daily limits.
 */

import { supabase } from './supabase';

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
 * Fetch usage for the current user from Supabase.
 * Handles daily resets automatically via the 'date' column check.
 */
export const fetchUserUsage = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user || !user.email) return null;

    const today = new Date().toISOString().split('T')[0];

    // Get current usage record
    const { data, error } = await supabase
        .from('user_usage')
        .select('*')
        .eq('user_email', user.email)
        .single();

    if (error && error.code !== 'PGRST116') { // PGRST116 is "Row not found"
        console.error("Error fetching usage:", error);
        return null; // Fail safe
    }

    // If no record, or date is old -> Reset/Initialize
    if (!data || data.date !== today) {
        // Create/Overwrite with fresh record for today
        const { data: newData, error: insertError } = await supabase
            .from('user_usage')
            .upsert({
                user_email: user.email,
                date: today,
                usage_data: {}
            })
            .select()
            .single();

        if (insertError) console.error("Error resetting usage:", insertError);
        return newData?.usage_data || {};
    }

    return data.usage_data;
};

/**
 * Increment usage for a specific tool in Supabase.
 */
export const incrementUserUsage = async (toolSlug: string) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user || !user.email) return;

    const today = new Date().toISOString().split('T')[0];

    // We use a robust approach: Fetch -> Modify -> Update
    // (Ideally a Postgres Function is better for atomicity, but this works for this scale)

    const { data: currentRecord } = await supabase
        .from('user_usage')
        .select('*')
        .eq('user_email', user.email)
        .single();

    let newUsageData = currentRecord?.usage_data || {};

    // Check if we need to reset for today during increment (edge case)
    if (!currentRecord || currentRecord.date !== today) {
        newUsageData = {};
    }

    // Increment
    newUsageData[toolSlug] = (newUsageData[toolSlug] || 0) + 1;

    // Save
    await supabase
        .from('user_usage')
        .upsert({
            user_email: user.email,
            date: today,
            usage_data: newUsageData
        });

    return newUsageData[toolSlug];
};

/**
 * Fetch subscription status from Supabase to determine if PRO.
 */
export const fetchSubscriptionStatus = async (): Promise<boolean> => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user || !user.email) return false;

    const { data } = await supabase
        .from('subscriptions')
        .select('status, end_date')
        .eq('user_email', user.email)
        .eq('status', 'active')
        .single();

    if (data) {
        // Check if expired
        if (data.end_date && new Date(data.end_date) < new Date()) {
            return false;
        }
        return true;
    }

    return false;
};


// --- Legacy / Helper Functions (Modified for Compatibility) ---

export const getToolLimit = (slug: string, isPro: boolean): number => {
    const limitConfig = TOOL_LIMITS[slug] || DEFAULT_LIMIT;
    return isPro ? limitConfig.pro : limitConfig.free;
};

// Client-side helper (deprecated for direct checks, but useful for UI display logic)
export const isPremiumUser = (): boolean => {
    if (typeof window === 'undefined') return false;
    return localStorage.getItem('yt_tools_pro') === 'true';
};
