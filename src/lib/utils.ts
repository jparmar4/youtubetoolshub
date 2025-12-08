/**
 * Utility functions for the YouTube Tools Hub
 */

/**
 * Extract video ID from a YouTube URL
 */
export function extractVideoId(url: string): string | null {
    const patterns = [
        /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/v\/)([a-zA-Z0-9_-]{11})/,
        /^([a-zA-Z0-9_-]{11})$/
    ];

    for (const pattern of patterns) {
        const match = url.match(pattern);
        if (match) {
            return match[1];
        }
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
            // Escape quotes and wrap in quotes if contains comma
            const stringValue = String(value);
            if (stringValue.includes(',') || stringValue.includes('"')) {
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
    const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
    if (!match) return 0;

    const hours = (parseInt(match[1]) || 0);
    const minutes = (parseInt(match[2]) || 0);
    const seconds = (parseInt(match[3]) || 0);

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
