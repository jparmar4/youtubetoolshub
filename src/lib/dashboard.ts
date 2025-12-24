import { isPremiumUser } from "./usage";

export interface SavedItem {
    id: string;
    type: 'audit' | 'title' | 'idea' | 'hashtag' | 'other'; // Added 'other' for flexibility
    content: any;
    date: string;
    toolSlug: string;
}

export const saveItem = async (item: Omit<SavedItem, 'id' | 'date'>) => {
    if (typeof window === 'undefined') return;

    try {
        const isPro = isPremiumUser();
        const response = await fetch('/api/history', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...item, isPro }),
        });

        if (!response.ok) throw new Error('Failed to save to cloud');
        const data = await response.json();

        return {
            ...item,
            id: data.id,
            date: new Date().toISOString()
        };
    } catch (error) {
        console.error("Save error:", error);
        return null;
    }
};

export const getSavedItems = async (): Promise<SavedItem[]> => {
    if (typeof window === 'undefined') return [];

    try {
        const response = await fetch('/api/history');
        if (response.status === 401) return []; // Not logged in
        if (!response.ok) throw new Error('Failed to fetch history');
        return await response.json();
    } catch (error) {
        console.error("Fetch error:", error);
        return [];
    }
};

export const deleteItem = async (id: string) => {
    if (typeof window === 'undefined') return;

    try {
        await fetch(`/api/history?id=${id}`, { method: 'DELETE' });
    } catch (error) {
        console.error("Delete error:", error);
    }
};

export const getRecentTools = async (): Promise<string[]> => {
    // For now, we fetch latest items to infer recent tools
    const items = await getSavedItems();
    return Array.from(new Set(items.map(i => i.toolSlug))).slice(0, 5);
};

