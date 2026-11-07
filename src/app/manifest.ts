import { MetadataRoute } from 'next';
import { tools } from '@/config/tools';

export default function manifest(): MetadataRoute.Manifest {
    return {
        id: '/',
        name: 'YouTube Tools Hub',
        short_name: 'YT Tools Hub',
        description: `${tools.length} free YouTube tools for creators: 4K thumbnail downloader, title and tag generators, and Tier-1 earnings calculator.`,
        start_url: '/',
        scope: '/',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#7c3aed',
        orientation: 'portrait-primary',
        lang: 'en',
        dir: 'ltr',
        categories: ['productivity', 'utilities', 'business'],
        icons: [
            {
                src: '/icon-192x192.png',
                sizes: '192x192',
                type: 'image/png',
                purpose: 'any',
            },
            {
                src: '/icon-512x512.png',
                sizes: '512x512',
                type: 'image/png',
                purpose: 'any',
            },
            {
                src: '/icon.svg',
                sizes: 'any',
                type: 'image/svg+xml',
            },
        ],
        shortcuts: [
            {
                name: 'All Tools',
                short_name: 'Tools',
                description: `Browse ${tools.length} free creator tools`,
                url: '/tools',
                icons: [{ src: '/icon-192x192.png', sizes: '192x192' }],
            },
            {
                name: 'Earnings Calculator',
                short_name: 'Earnings',
                description: 'Estimate YouTube AdSense earnings by country',
                url: '/tools/youtube-earnings-calculator',
                icons: [{ src: '/icon-192x192.png', sizes: '192x192' }],
            },
            {
                name: 'Thumbnail Downloader',
                short_name: 'Thumbnails',
                description: 'Download HD and 4K YouTube thumbnails',
                url: '/tools/youtube-thumbnail-downloader',
                icons: [{ src: '/icon-192x192.png', sizes: '192x192' }],
            },
        ],
    };
}
