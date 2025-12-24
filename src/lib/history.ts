import { supabase } from './supabase';

export interface HistoryItem {
    id: string;
    user_id: string;
    tool_slug: string;
    content: any;
    created_at: string;
}

export const saveHistory = async (toolSlug: string, content: any) => {
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        console.warn('User not logged in, cannot save history to cloud');
        return null;
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
        console.error('Error saving history:', error);
        throw error;
    }

    return data;
};

export const getHistory = async (toolSlug?: string) => {
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return [];
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
    const { error } = await supabase
        .from('history_items')
        .delete()
        .eq('id', id);

    if (error) {
        console.error('Error deleting history item:', error);
        throw error;
    }
};
