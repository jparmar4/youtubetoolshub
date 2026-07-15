/**
 * Utility functions for the YouTube Tools Hub
 */

/**
 * Extract video ID from a YouTube URL
 * Supports: watch, youtu.be, embed, /v/, Shorts, live, music.youtube, bare 11-char IDs
 */
export function extractVideoId(url: string): string | null {
    if (!url || typeof url !== "string") return null;

    const trimmed = url.trim();

    // Bare video ID
    if (/^[a-zA-Z0-9_-]{11}$/.test(trimmed)) {
        return trimmed;
    }

    try {
        // Normalize protocol-relative and bare domains
        const withProtocol = /^https?:\/\//i.test(trimmed)
            ? trimmed
            : trimmed.startsWith("//")
              ? `https:${trimmed}`
              : `https://${trimmed.replace(/^(www\.)?/i, "www.")}`;

        const parsed = new URL(withProtocol);
        const host = parsed.hostname.replace(/^www\./i, "").toLowerCase();

        const isYouTubeHost =
            host === "youtube.com" ||
            host === "m.youtube.com" ||
            host === "music.youtube.com" ||
            host === "youtube-nocookie.com" ||
            host === "youtu.be";

        if (!isYouTubeHost) {
            // Fall through to regex for unusual formats
        } else if (host === "youtu.be") {
            const id = parsed.pathname.split("/").filter(Boolean)[0];
            if (id && /^[a-zA-Z0-9_-]{11}$/.test(id)) return id;
        } else {
            const v = parsed.searchParams.get("v");
            if (v && /^[a-zA-Z0-9_-]{11}$/.test(v)) return v;

            // /shorts/ID, /embed/ID, /v/ID, /live/ID, /watch/ID
            const pathMatch = parsed.pathname.match(
                /\/(?:shorts|embed|v|live|watch)\/([a-zA-Z0-9_-]{11})/,
            );
            if (pathMatch) return pathMatch[1];
        }
    } catch {
        // continue to regex fallback
    }

    const patterns = [
        /(?:youtube\.com\/(?:watch\?(?:[^#]*&)?v=|embed\/|v\/|shorts\/|live\/)|youtu\.be\/|music\.youtube\.com\/watch\?(?:[^#]*&)?v=)([a-zA-Z0-9_-]{11})/i,
        /[?&]v=([a-zA-Z0-9_-]{11})/,
        /^([a-zA-Z0-9_-]{11})$/,
    ];

    for (const pattern of patterns) {
        const match = trimmed.match(pattern);
        if (match?.[1]) return match[1];
    }

    return null;
}

/**
 * Get all thumbnail URLs for a video
 */
export function getThumbnailUrls(videoId: string) {
    return [
        {
            quality: "Maximum Resolution",
            dimension: "1280x720",
            url: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
        },
        {
            quality: "Standard Definition",
            dimension: "640x480",
            url: `https://img.youtube.com/vi/${videoId}/sddefault.jpg`,
        },
        {
            quality: "High Quality",
            dimension: "480x360",
            url: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
        },
        {
            quality: "Medium Quality",
            dimension: "320x180",
            url: `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`,
        },
    ];
}

/**
 * Format number with commas
 */
export function formatNumber(num: number): string {
    return new Intl.NumberFormat('en-US').format(num);
}

/**
 * Format currency
 */
export function formatCurrency(amount: number, currency: string = 'USD'): string {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency,
    }).format(amount);
}

/**
 * Generate CSV from array of objects
 */
export function generateCSV<T extends Record<string, unknown>>(data: T[], headers: string[]): string {
    const headerRow = headers.join(',');
    const rows = data.map(item =>
        headers.map(header => {
            const value = item[header];
            const stringValue = value == null ? '' : String(value);
            // Protect against CSV formula injection (Excel/Sheets command execution)
            const dangerousChars = ['=', '+', '-', '@', '\t', '\r'];
            if (dangerousChars.some(c => stringValue.startsWith(c))) {
                return `"'${stringValue.replace(/"/g, '""')}"`;
            }
            if (stringValue.includes(',') || stringValue.includes('"') || stringValue.includes('\n')) {
                return `"${stringValue.replace(/"/g, '""')}"`;
            }
            return stringValue;
        }).join(',')
    );
    return [headerRow, ...rows].join('\n');
}

/**
 * Download text as a file
 */
export function downloadAsFile(content: string, filename: string, type: string = 'text/plain') {
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

/**
 * Calculate engagement rate
 */
export function calculateEngagementRate(
    views: number,
    likes: number,
    comments: number,
    shares: number
): { rate: number; rating: string } {
    if (views === 0) return { rate: 0, rating: "N/A" };

    const rate = ((likes + comments + shares) / views) * 100;

    let rating: string;
    if (rate >= 10) {
        rating = "Excellent";
    } else if (rate >= 5) {
        rating = "Good";
    } else if (rate >= 2) {
        rating = "Average";
    } else {
        rating = "Needs Improvement";
    }

    return { rate, rating };
}

/**
 * Calculate YouTube earnings
 */
export function calculateEarnings(
    monthlyViews: number,
    rpm: number
): { monthly: number; yearly: number } {
    const monthly = (monthlyViews / 1000) * rpm;
    const yearly = monthly * 12;
    return { monthly, yearly };
}

/**
 * Debounce function
 */
export function debounce<T extends (...args: unknown[]) => unknown>(
    func: T,
    wait: number
): (...args: Parameters<T>) => void {
    let timeout: NodeJS.Timeout;
    return (...args: Parameters<T>) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), wait);
    };
}

/**
 * Parse JSON safely - handles markdown code blocks
 */
export function safeJSONParse<T>(json: string, fallback: T): T {
    try {
        // Remove markdown code blocks (```json...``` or ```...```)
        const cleaned = json
            .replace(/```json\s*/gi, "")
            .replace(/```\s*/g, "")
            .trim();
        return JSON.parse(cleaned);
    } catch {
        return fallback;
    }
}

/**
 * Parse YouTube ISO 8601 duration to seconds
 * e.g., PT1H2M10S -> 3730
 */
export function parseDuration(duration: string): number {
    if (!duration || typeof duration !== "string") return 0;
    // ISO 8601: PT1H2M3S, PT45S, PT1M, etc.
    const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/i);
    if (!match) return 0;

    const hours = match[1] ? parseInt(match[1], 10) : 0;
    const minutes = match[2] ? parseInt(match[2], 10) : 0;
    const seconds = match[3] ? parseInt(match[3], 10) : 0;

    return hours * 3600 + minutes * 60 + seconds;
}

/**
 * Format seconds to readable time string
 */
export function formatDuration(seconds: number): string {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;

    const parts = [];
    if (h > 0) parts.push(`${h}h`);
    if (m > 0) parts.push(`${m}m`);
    if (s > 0 || parts.length === 0) parts.push(`${s}s`);

    return parts.join(' ');
}
/**
 * Format date string
 */
export function formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
}
