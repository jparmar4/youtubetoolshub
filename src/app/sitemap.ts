import { MetadataRoute } from "next";
import { tools } from "@/config/tools";
import { getIndexableBlogPosts, toBlogIsoDate } from "@/config/blog";
import { BLOG_CATEGORIES, getPostsForCategory } from "@/config/blog/categories";
import { authors } from "@/config/blog/authors";
import { siteConfig } from "@/config/site";
import { countryCPMData } from "@/lib/cpm-data";
import { DATA_LAST_REVIEWED } from "@/lib/seo-data";

/** Per-route lastModified for static pages (update when content materially changes) */
const ROUTE_LAST_MODIFIED: Record<string, string> = {
  "": "2026-10-10",
  "/tools": "2026-10-10",
  "/tools/thumbnail-tools": "2026-10-10",
  "/tools/seo-tools": "2026-10-10",
  "/tools/analytics-tools": "2026-10-10",
  "/tools/channel-tools": "2026-10-10",
  "/tools/utility-tools": "2026-10-10",
  "/about": "2026-09-29",
  "/contact": "2026-08-01",
  "/blog": "2026-10-10",
  "/blog/why-youtube-tools-hub": "2026-09-29",
  "/faq": "2026-09-29",
  "/resources/youtube-creator-statistics": "2026-09-29",
  "/resources/youtube-cpm-rates": "2026-10-10",
  "/resources/link-to-us": "2026-09-29",
  "/pricing": "2026-09-29",
  "/tools/vs/tubebuddy": "2026-09-29",
  "/tools/vs/vidiq": "2026-09-29",
  "/resources/youtube-algorithm-guide": "2026-09-29",
  "/resources/youtube-monetization-guide": "2026-09-29",
  "/resources/youtube-glossary": "2026-09-29",
  "/api-docs": "2026-08-01",
  "/privacy-policy": "2026-08-01",
  "/terms-of-use": "2026-08-01",
  "/disclaimer": "2026-08-01",
  "/refund-policy": "2026-08-01",
  "/resources": "2026-10-10",
};

const FALLBACK_LAST_MODIFIED = new Date("2026-09-29T00:00:00.000Z");
const TOOL_LAST_MODIFIED = new Date("2026-09-29T00:00:00.000Z");
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
    "/resources/youtube-glossary",
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
        route === "" ? 1 : highPriorityRoutes.includes(route) ? 0.8 : 0.5,
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

  // Blog posts — skip noindex slugs so crawl budget stays on useful URLs.
  // lastmod tracks real revisions (updatedAt), not just the publish date.
  for (const post of blogPosts) {
    const postDate = parseSafeDate(
      toBlogIsoDate(post.updatedAt ?? post.date),
      FALLBACK_LAST_MODIFIED,
    );
    const url = `${baseUrl}/blog/${post.slug}`;
    allEntries.push({
      url,
      lastModified: postDate,
      changeFrequency: "weekly",
      priority: 0.8,
      images: post.coverImage ? [`${baseUrl}${post.coverImage}`] : undefined,
    });
  }

  // Author profile pages (E-E-A-T entity anchors)
  for (const author of authors) {
    allEntries.push({
      url: `${baseUrl}/blog/author/${author.slug}`,
      lastModified: FALLBACK_LAST_MODIFIED,
      changeFrequency: "monthly",
      priority: 0.5,
    });
  }

  // Category hub pages — lastmod tracks the newest post in each hub
  for (const category of BLOG_CATEGORIES) {
    const posts = getPostsForCategory(category.slug);
    const newest = posts.reduce<string | null>((acc, post) => {
      const value = post.updatedAt ?? post.date;
      return !acc || new Date(toBlogIsoDate(value)) > new Date(toBlogIsoDate(acc))
        ? value
        : acc;
    }, null);
    allEntries.push({
      url: `${baseUrl}/blog/category/${category.slug}`,
      lastModified: newest
        ? parseSafeDate(toBlogIsoDate(newest), FALLBACK_LAST_MODIFIED)
        : FALLBACK_LAST_MODIFIED,
      changeFrequency: "weekly",
      priority: 0.7,
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
