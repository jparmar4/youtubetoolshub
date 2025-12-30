import { MetadataRoute } from 'next';
import { siteConfig } from '@/config/site';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                disallow: ['/api/', '/sign-in'],
            },
            {
                userAgent: ['GPTBot', 'ChatGPT-User', 'Google-Extended', 'CCBot', 'ClaudeBot', 'PerplexityBot'],
                allow: '/',
            },
        ],
        sitemap: `${siteConfig.url}/sitemap.xml`,
    };
}
