import { MetadataRoute } from "next";
import { tools } from "@/config/tools";
import { getIndexableBlogPosts, toBlogIsoDate } from "@/config/blog";
import { siteConfig } from "@/config/site";
import { countryCPMData } from "@/lib/cpm-data";
import { DATA_LAST_REVIEWED } from "@/lib/seo-data";

/** Per-route lastModified for static pages (update when content materially changes) */
const ROUTE_LAST_MODIFIED: Record<string, string> = {
  "": "2026-08-15",
  "/tools": "2026-08-15",
  "/tools/thumbnail-tools": "2026-08-15",
  "/tools/seo-tools": "2026-08-15",
  "/tools/analytics-tools": "2026-08-15",
  "/tools/channel-tools": "2026-08-15",
  "/tools/utility-tools": "2026-08-15",
  "/about": "2026-07-10",
  "/contact": "2026-07-01",
  "/blog": "2026-08-15",
  "/blog/why-youtube-tools-hub": "2026-07-10",
  "/faq": "2026-08-15",
  "/resources/youtube-creator-statistics": "2026-08-15",
  "/resources/youtube-cpm-rates": "2026-08-18",
  "/resources/link-to-us": "2026-07-15",
  "/pricing": "2026-07-10",
  "/privacy-policy": "2026-06-01",
  "/terms-of-use": "2026-06-01",
  "/disclaimer": "2026-06-01",
  "/refund-policy": "2026-06-01",
  "/tools/vs/tubebuddy": "2026-08-15",
  "/tools/vs/vidiq": "2026-08-15",
  "/resources/youtube-algorithm-guide": "2026-08-18",
  "/resources/youtube-monetization-guide": "2026-08-18",
  "/api-docs": "2026-07-01",
};

const FALLBACK_LAST_MODIFIED = new Date("2026-08-15T00:00:00.000Z");
const TOOL_LAST_MODIFIED = new Date("2026-08-15T00:00:00.000Z");
const DATA_LAST_MODIFIED = new Date(`${DATA_LAST_REVIEWED}T00:00:00.000Z`);

function parseSafeDate(value: string | undefined, fallback: Date): Date {
  if (!value) return fallback;
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? fallback : d;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url;
  const blogPosts = getIndexableBlogPosts();
  const routes = Object.keys(ROUTE_LAST_MODIFIED);

  const allEntries: MetadataRoute.Sitemap = [];

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
      lastModified: parseSafeDate(ROUTE_LAST_MODIFIED[route], FALLBACK_LAST_MODIFIED),
      changeFrequency: route === "" ? "daily" : "weekly",
      priority:
        route === "" ? 1 : highPriorityRoutes.includes(route) ? 0.8 : 0.7,
    });
  }

  // Dynamic tool pages
  for (const tool of tools) {
    const url = `${baseUrl}/tools/${tool.slug}`;
    allEntries.push({
      url,
      lastModified: TOOL_LAST_MODIFIED,
      changeFrequency: "weekly",
      priority: 0.9,
      images: [`${baseUrl}/tools/${tool.slug}/opengraph-image`],
    });
  }

  // Blog posts — skip noindex slugs so crawl budget stays on useful URLs
  for (const post of blogPosts) {
    const postDate = parseSafeDate(toBlogIsoDate(post.date), FALLBACK_LAST_MODIFIED);
    const url = `${baseUrl}/blog/${post.slug}`;
    allEntries.push({
      url,
      lastModified: postDate,
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
      lastModified: DATA_LAST_MODIFIED,
      changeFrequency: "monthly",
      priority: 0.65,
    });
  }

  return allEntries;
}
