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

    // Static pages
    for (const route of routes) {
        allEntries.push({
            url: `${baseUrl}${route}`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: route === "" ? 1 : 0.7,
        });
    }

    // Dynamic tool pages
    for (const tool of tools) {
        allEntries.push({
            url: `${baseUrl}/tools/${tool.slug}`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.9,
        });
    }

    // Dynamic blog pages
    for (const post of blogPosts) {
        allEntries.push({
            url: `${baseUrl}/blog/${post.slug}`,
            lastModified: new Date(post.date),
            changeFrequency: 'monthly',
            priority: 0.8,
        });
    }



    // Dynamic programmatic niche pages
    for (const toolSlug of programmaticTools) {
        for (const niche of niches) {
            allEntries.push({
                url: `${baseUrl}/tools/${toolSlug}/${niche.id}`,
                lastModified: new Date(),
                changeFrequency: 'weekly',
                priority: 0.8,
            });
        }
    }

    return allEntries;
}
