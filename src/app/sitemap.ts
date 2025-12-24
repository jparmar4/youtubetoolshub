import { MetadataRoute } from 'next';
import { tools } from '@/config/tools';
import { getAllBlogPosts } from '@/config/blog';
import { siteConfig } from '@/config/site';
import { i18n } from '@/lib/i18n';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = siteConfig.url;
    const blogPosts = getAllBlogPosts();
    const { niches, programmaticTools } = require('@/config/programmatic');

    // Base routes (without locale)
    const routes = [
        "",
        "/tools",
        "/about",
        "/contact",
        "/blog",
        "/pricing",
        "/privacy-policy",
        "/terms-of-use",
        "/disclaimer",
        "/refund-policy",
    ];

    const allEntries: MetadataRoute.Sitemap = [];

    // Generate entries for each locale
    for (const locale of i18n.locales) {
        // Static pages
        for (const route of routes) {
            allEntries.push({
                url: `${baseUrl}/${locale}${route}`,
                lastModified: new Date(),
                changeFrequency: 'weekly',
                priority: route === "" ? 1 : 0.7,
            });
        }

        // Dynamic tool pages
        for (const tool of tools) {
            allEntries.push({
                url: `${baseUrl}/${locale}/tools/${tool.slug}`,
                lastModified: new Date(),
                changeFrequency: 'weekly',
                priority: 0.9,
            });
        }

        // Dynamic blog pages
        for (const post of blogPosts) {
            allEntries.push({
                url: `${baseUrl}/${locale}/blog/${post.slug}`,
                lastModified: new Date(post.date),
                changeFrequency: 'monthly',
                priority: 0.8,
            });
        }

        // Programmatic Niche Pages
        tools.forEach((tool) => {
            if (programmaticTools.includes(tool.slug)) {
                niches.forEach((niche: any) => {
                    allEntries.push({
                        url: `${baseUrl}/${locale}/tools/${tool.slug}/${niche.id}`,
                        lastModified: new Date(),
                        changeFrequency: 'weekly',
                        priority: 0.8,
                    });
                });
            }
        });
    }

    return allEntries;
}
