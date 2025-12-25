

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
    // Try to save to cloud first
    try {
        const res = await fetch('/api/history', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ toolSlug, content })
        });

        if (res.status === 401) {
            throw new Error("Unauthorized");
        }

        if (!res.ok) {
            throw new Error("Failed to save to cloud");
        }

        const data = await res.json();
        return data; // { id, success: true }
    } catch (error) {
        // Fallback to local storage for guests or offline
        // console.log("Saving to local history (fallback)");
        return saveLocalHistory(toolSlug, content);
    }
};

export const getHistory = async (toolSlug?: string) => {
    try {
        const res = await fetch('/api/history');

        if (res.status === 401) {
            throw new Error("Unauthorized");
        }

        if (!res.ok) {
            throw new Error("Failed to fetch from cloud");
        }

        let cloudHistory = await res.json();

        if (toolSlug) {
            cloudHistory = cloudHistory.filter((item: HistoryItem) => item.tool_slug === toolSlug);
        }

        return cloudHistory as HistoryItem[];
    } catch (error) {
        // Return local history for guests
        let local = getLocalHistory();
        if (toolSlug) {
            local = local.filter(item => item.tool_slug === toolSlug);
        }
        return local;
    }
};

export const deleteHistory = async (id: string) => {
    try {
        const res = await fetch(`/api/history?id=${id}`, {
            method: 'DELETE',
        });

        if (res.status === 401) {
            throw new Error("Unauthorized");
        }

        if (!res.ok) {
            // Try local delete if cloud failed? 
            // Usually if cloud fails, it might be a local item id?
            // Let's force check local too.
            throw new Error("Not found in cloud or error");
        }
    } catch (error) {
        // Delete from local
        const items = getLocalHistory().filter(item => item.id !== id);
        localStorage.setItem(LOCAL_HISTORY_KEY, JSON.stringify(items));
    }
};
