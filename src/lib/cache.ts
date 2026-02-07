/**
 * LRU Cache Utility for API Response Caching
 * 
 * Used to cache expensive API responses (AI, YouTube API) to reduce
 * CPU usage on Vercel's serverless functions.
 * 
 * Note: This is an in-memory cache that works per-instance.
 * On Vercel, each function instance has its own cache.
 * For high-traffic routes, this still provides significant savings.
 */

interface CacheEntry<T> {
    value: T;
    expiry: number;
}

class LRUCache<T> {
    private cache: Map<string, CacheEntry<T>>;
    private readonly maxSize: number;
    private readonly ttlMs: number;

    constructor(options: { maxSize?: number; ttlMs?: number } = {}) {
        this.maxSize = options.maxSize || 500;
        this.ttlMs = options.ttlMs || 24 * 60 * 60 * 1000; // 24 hours default
        this.cache = new Map();
    }

    /**
     * Get a value from the cache
     */
    get(key: string): T | undefined {
        const entry = this.cache.get(key);

        if (!entry) {
            return undefined;
        }

        // Check if expired
        if (Date.now() > entry.expiry) {
            this.cache.delete(key);
            return undefined;
        }

        // Move to end (most recently used)
        this.cache.delete(key);
        this.cache.set(key, entry);

        return entry.value;
    }

    /**
     * Set a value in the cache
     */
    set(key: string, value: T, ttlMs?: number): void {
        // Remove existing entry if present
        if (this.cache.has(key)) {
            this.cache.delete(key);
        }

        // Evict oldest entries if at capacity
        while (this.cache.size >= this.maxSize) {
            const firstKey = this.cache.keys().next().value;
            if (firstKey) {
                this.cache.delete(firstKey);
            }
        }

        // Add new entry
        this.cache.set(key, {
            value,
            expiry: Date.now() + (ttlMs || this.ttlMs)
        });
    }

    /**
     * Check if a key exists and is not expired
     */
    has(key: string): boolean {
        const entry = this.cache.get(key);
        if (!entry) return false;
        if (Date.now() > entry.expiry) {
            this.cache.delete(key);
            return false;
        }
        return true;
    }

    /**
     * Delete a key from the cache
     */
    delete(key: string): boolean {
        return this.cache.delete(key);
    }

    /**
     * Clear all entries
     */
    clear(): void {
        this.cache.clear();
    }

    /**
     * Get cache size
     */
    get size(): number {
        return this.cache.size;
    }
}

/**
 * Create a hash from a string for cache keys
 * Simple but effective for our use case
 */
export function hashString(str: string): string {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash; // Convert to 32-bit integer
    }
    return hash.toString(36);
}

// Singleton instances for different cache purposes

/**
 * AI Response Cache
 * TTL: 24 hours (AI responses are stable for the same prompt)
 * Max: 500 entries (balance between memory and hit rate)
 */
export const aiCache = new LRUCache<string>({
    maxSize: 500,
    ttlMs: 24 * 60 * 60 * 1000 // 24 hours
});

/**
 * YouTube API Cache
 * TTL: 1 hour (video metadata changes occasionally)
 * Max: 200 entries
 */
export const youtubeCache = new LRUCache<unknown>({
    maxSize: 200,
    ttlMs: 60 * 60 * 1000 // 1 hour
});

/**
 * General API Cache
 * TTL: 30 minutes
 * Max: 100 entries
 */
export const apiCache = new LRUCache<unknown>({
    maxSize: 100,
    ttlMs: 30 * 60 * 1000 // 30 minutes
});

export { LRUCache };
