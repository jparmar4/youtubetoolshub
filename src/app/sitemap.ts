import { MetadataRoute } from "next";
import { tools } from "@/config/tools";
import { getAllBlogPosts } from "@/config/blog";
import { siteConfig } from "@/config/site";
import { niches, programmaticTools } from "@/config/programmatic";
import { countryCPMData } from "@/lib/cpm-data";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url;
  const blogPosts = getAllBlogPosts();

  // Base routes (without locale)
  const routes = [
    "",
    "/tools",
    "/tools/thumbnail-tools",
    "/tools/seo-tools",
    "/tools/analytics-tools",
    "/about",
    "/contact",
    "/blog",
    "/faq",
    "/resources/youtube-creator-statistics",
    "/resources/link-to-us",
    "/pricing",
    "/privacy-policy",
    "/terms-of-use",
    "/disclaimer",
    "/refund-policy",
    "/tools/vs/tubebuddy",
    "/tools/vs/vidiq",
  ];

  const allEntries: MetadataRoute.Sitemap = [];

  // Fixed date for truly static pages (updated when site is redeployed)
  const staticLastModified = new Date('2026-02-19');

  // Static pages with priority tiers
  const highPriorityRoutes = [
    "/tools",
    "/blog",
    "/about",
    "/faq",
    "/resources/link-to-us",
  ];
  for (const route of routes) {
    allEntries.push({
      url: `${baseUrl}${route}`,
      lastModified: route === "" ? new Date() : staticLastModified,
      changeFrequency: route === "" ? "daily" : "weekly",
      priority:
        route === "" ? 1 : highPriorityRoutes.includes(route) ? 0.8 : 0.7,
    });
  }

  // Dynamic tool pages with image sitemaps
  for (const tool of tools) {
    allEntries.push({
      url: `${baseUrl}/tools/${tool.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
      images: [`${baseUrl}/tools/${tool.slug}/opengraph-image`],
    });
  }

  // Dynamic blog pages with image sitemaps
  for (const post of blogPosts) {
    const postDate = new Date(post.date);
    const safeDate = isNaN(postDate.getTime()) ? new Date() : postDate;
    allEntries.push({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: safeDate,
      changeFrequency: "weekly",
      priority: 0.8,
      images: post.coverImage ? [`${baseUrl}${post.coverImage}`] : undefined,
    });
  }

  // Dynamic programmatic niche pages
  for (const toolSlug of programmaticTools) {
    for (const niche of niches) {
      allEntries.push({
        url: `${baseUrl}/tools/${toolSlug}/${niche.id}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.8,
      });
    }
  }

  // Country-specific earnings calculator pages
  for (const country of countryCPMData) {
    allEntries.push({
      url: `${baseUrl}/tools/youtube-earnings-calculator/${country.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    });
  }

  return allEntries;
}
