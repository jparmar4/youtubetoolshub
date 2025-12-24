import { supabase } from './supabase';

export interface HistoryItem {
    id: string;
    user_id: string;
    tool_slug: string;
    content: any;
    created_at: string;
}

const LOCAL_HISTORY_KEY = 'yt_tools_history';

const getLocalHistory = (): HistoryItem[] => {
    if (typeof window === 'undefined') return [];
    try {
        const stored = localStorage.getItem(LOCAL_HISTORY_KEY);
        return stored ? JSON.parse(stored) : [];
    } catch {
        return [];
    }
};

const saveLocalHistory = (toolSlug: string, content: any): HistoryItem => {
    const items = getLocalHistory();
    const newItem: HistoryItem = {
        id: crypto.randomUUID(),
        user_id: 'guest',
        tool_slug: toolSlug,
        content,
        created_at: new Date().toISOString()
    };

    // Limit to 50 items locally to prevent storage issues
    const updated = [newItem, ...items].slice(0, 50);
    localStorage.setItem(LOCAL_HISTORY_KEY, JSON.stringify(updated));
    return newItem;
};

export const saveHistory = async (toolSlug: string, content: any) => {
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        // Fallback to local storage for guests
        return saveLocalHistory(toolSlug, content);
    }

    const { data, error } = await supabase
        .from('history_items')
        .insert([
            {
                user_id: user.id,
                tool_slug: toolSlug,
                content: content,
            },
        ])
        .select()
        .single();

    if (error) {
        console.error('Error saving history (cloud):', error);
        // Fallback to local if cloud fails? explicit
        // For now, just return null or throw. 
        // Let's rely on the error, but maybe we should fallback? 
        // No, mixed history is confusing. Just log it.
        throw error;
    }

    return data;
};

export const getHistory = async (toolSlug?: string) => {
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        // Return local history for guests
        let local = getLocalHistory();
        if (toolSlug) {
            local = local.filter(item => item.tool_slug === toolSlug);
        }
        return local;
    }

    let query = supabase
        .from('history_items')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

    if (toolSlug) {
        query = query.eq('tool_slug', toolSlug);
    }

    const { data, error } = await query;

    if (error) {
        console.error('Error fetching history:', error);
        throw error;
    }

    return data as HistoryItem[];
};

export const deleteHistory = async (id: string) => {
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        // Delete from local
        const items = getLocalHistory().filter(item => item.id !== id);
        localStorage.setItem(LOCAL_HISTORY_KEY, JSON.stringify(items));
        return;
    }

    const { error } = await supabase
        .from('history_items')
        .delete()
        .eq('id', id);

    if (error) {
        console.error('Error deleting history item:', error);
        throw error;
    }
};
