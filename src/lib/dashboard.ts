export interface SavedItem {
    id: string;
    type: 'audit' | 'title' | 'idea' | 'hashtag';
    content: any;
    date: string;
    toolSlug: string;
}

const STORAGE_KEY = 'yt_tools_dashboard_v1';

export const saveItem = (item: Omit<SavedItem, 'id' | 'date'>) => {
    if (typeof window === 'undefined') return;

    const current: SavedItem[] = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');

    const newItem: SavedItem = {
        ...item,
        id: crypto.randomUUID(),
        date: new Date().toISOString(),
    };

    // Add to top, limit to 50 items
    const updated = [newItem, ...current].slice(0, 50);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return newItem;
};

export const getSavedItems = (): SavedItem[] => {
    if (typeof window === 'undefined') return [];
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
};

export const deleteItem = (id: string) => {
    if (typeof window === 'undefined') return;
    const current: SavedItem[] = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    const updated = current.filter(item => item.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
};

export const getRecentTools = (): string[] => {
    // We can infer this from usage stats or save explicitly
    // For now, let's mock or use a separate key if needed
    // Simple implementation: return unique tool slugs from saved items
    const items = getSavedItems();
    return Array.from(new Set(items.map(i => i.toolSlug))).slice(0, 5);
};
