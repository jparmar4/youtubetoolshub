import { MetadataRoute } from 'next';
import { siteConfig } from '@/config/site';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                disallow: ['/api/', '/sign-in', '/dashboard', '/history', '/upgrade', '/auth/'],
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
                    'CCBot-2.0',
                    // Other AI crawlers
                    'anthropic-ai',
                    'cohere-ai',
                    'meta-ai',
                    'YouBot',
                    'Applebot',
                    'Slackbot',
                    'TelegramBot',
                    'WhatsApp',
                    'FacebookBot',
                    'LinkedInBot',
                    'TwitterBot',
                ],
                allow: '/',
                disallow: ['/api/', '/sign-in'],
            },
        ],
        sitemap: `${siteConfig.url}/sitemap_index.xml`,
        host: siteConfig.url,
    };
}
