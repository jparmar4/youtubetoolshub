import { MetadataRoute } from "next";
import { tools } from "@/config/tools";
import { getAllBlogPosts } from "@/config/blog";
import { siteConfig } from "@/config/site";
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
    "/tools/channel-tools",
    "/tools/utility-tools",
    "/about",
    "/contact",
    "/blog",
    "/faq",
    "/resources/youtube-creator-statistics",
    "/resources/youtube-cpm-rates",
    "/resources/link-to-us",
    "/pricing",
    "/privacy-policy",
    "/terms-of-use",
    "/disclaimer",
    "/refund-policy",
    "/tools/vs/tubebuddy",
    "/tools/vs/vidiq",
    "/resources/youtube-algorithm-guide",
    "/resources/youtube-monetization-guide",
    "/api-docs",
  ];

  const allEntries: MetadataRoute.Sitemap = [];

  // Keep lastmod stable unless the page content materially changes.
  const staticLastModified = new Date("2026-07-04T00:00:00.000Z");
  const toolLastModified = new Date("2026-07-04T00:00:00.000Z");
  const dataLastModified = new Date("2026-06-16T00:00:00.000Z");

  // Static pages with priority tiers
  const highPriorityRoutes = [
    "/tools",
    "/blog",
    "/about",
    "/faq",
    "/resources/youtube-cpm-rates",
    "/resources/youtube-creator-statistics",
    "/resources/youtube-algorithm-guide",
    "/resources/youtube-monetization-guide",
    "/resources/link-to-us",
    "/tools/channel-tools",
    "/tools/utility-tools",
    "/tools/seo-tools",
    "/tools/analytics-tools",
    "/tools/thumbnail-tools",
    "/tools/vs/tubebuddy",
    "/tools/vs/vidiq",
  ];
  for (const route of routes) {
    const url = `${baseUrl}${route}`;
    allEntries.push({
      url,
      lastModified: staticLastModified,
      changeFrequency: route === "" ? "daily" : "weekly",
      priority:
        route === "" ? 1 : highPriorityRoutes.includes(route) ? 0.8 : 0.7,
    });
  }

  // Dynamic tool pages with image sitemaps
  for (const tool of tools) {
    const url = `${baseUrl}/tools/${tool.slug}`;
    allEntries.push({
      url,
      lastModified: toolLastModified,
      changeFrequency: "weekly",
      priority: 0.9,
      images: [`${baseUrl}/tools/${tool.slug}/opengraph-image`],
    });
  }

  // Dynamic blog pages with image sitemaps
  for (const post of blogPosts) {
    const postDate = new Date(post.date);
    const safeDate = isNaN(postDate.getTime()) ? staticLastModified : postDate;
    const url = `${baseUrl}/blog/${post.slug}`;
    allEntries.push({
      url,
      lastModified: safeDate,
      changeFrequency: "weekly",
      priority: 0.8,
      images: post.coverImage ? [`${baseUrl}${post.coverImage}`] : undefined,
    });
  }

  // Country-specific earnings calculator pages
  for (const country of countryCPMData) {
    const url = `${baseUrl}/tools/youtube-earnings-calculator/${country.slug}`;
    allEntries.push({
      url,
      lastModified: dataLastModified,
      changeFrequency: "monthly",
      priority: 0.6,
    });
  }

  return allEntries;
}
