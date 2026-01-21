import { MetadataRoute } from 'next';
import { siteConfig } from '@/config/site';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                disallow: ['/api/', '/sign-in', '/dashboard'],
            },
            // AI Crawlers - Explicitly allowed for AEO/GEO optimization
            {
                userAgent: [
                    // OpenAI
                    'GPTBot',
                    'ChatGPT-User',
                    'OAI-SearchBot',
                    // Google AI
                    'Google-Extended',
                    'Googlebot',
                    // Anthropic
                    'ClaudeBot',
                    'Claude-Web',
                    // Perplexity
                    'PerplexityBot',
                    // Microsoft/Bing
                    'Bingbot',
                    'BingPreview',
                    // Common Crawl (used by many AI models)
                    'CCBot',
                    // Meta
                    'FacebookBot',
                    'facebookexternalhit',
                    // Apple
                    'Applebot',
                    // Cohere
                    'cohere-ai',
                    // You.com
                    'YouBot',
                    // Amazon
                    'Amazonbot',
                    // Bytedance
                    'Bytespider',
                ],
                allow: ['/', '/llms.txt', '/llms-full.txt'],
            },
        ],
        sitemap: `${siteConfig.url}/sitemap_index.xml`,
        host: siteConfig.url,
    };
}
