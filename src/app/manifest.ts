import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'YouTube Tools Hub',
        short_name: 'YT Tools',
        description: 'Free YouTube tools for creators: thumbnail downloader, title generator, tag extractor, earnings calculator, and more.',
        start_url: '/',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#dc2626',
        orientation: 'portrait-primary',
        icons: [
            {
                src: '/icon.svg',
                sizes: 'any',
                type: 'image/svg+xml',
            },
            {
                src: '/favicon.svg',
                sizes: 'any',
                type: 'image/svg+xml',
                purpose: 'maskable',
            },
        ],
    };
}
