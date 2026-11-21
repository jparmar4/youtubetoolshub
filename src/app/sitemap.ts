import { MetadataRoute } from "next";
import { tools } from "@/config/tools";
import { getIndexableBlogPosts, toBlogIsoDate } from "@/config/blog";
import { BLOG_CATEGORIES, getPostsForCategory } from "@/config/blog/categories";
import { authors } from "@/config/blog/authors";
import { siteConfig } from "@/config/site";
import { countryCPMData, TIERS } from "@/lib/cpm-data";
import {
  INDEX_TIER2_COUNTRY_PAGES,
  INDEX_US_STATE_TAX_PAGES,
} from "@/config/index-policy";
import { DATA_LAST_REVIEWED } from "@/lib/seo-data";
import { US_STATE_CREATOR_TAXES } from "@/data/usStateCreatorTaxes";
import { COMPETITOR_ALTERNATIVES } from "@/data/competitorAlternatives";

/** Per-route lastModified for static pages (update when content materially changes) */
const ROUTE_LAST_MODIFIED: Record<string, string> = {
  "": DATA_LAST_REVIEWED,
  "/tools": DATA_LAST_REVIEWED,
  "/tools/creator-tax-calculator": DATA_LAST_REVIEWED,
  "/alternatives": DATA_LAST_REVIEWED,
  "/research/youtube-cpm-rpm-report-2026": "2026-11-17",
  "/tools/thumbnail-tools": DATA_LAST_REVIEWED,
  "/tools/seo-tools": DATA_LAST_REVIEWED,
  "/tools/analytics-tools": DATA_LAST_REVIEWED,
  "/tools/channel-tools": DATA_LAST_REVIEWED,
  "/tools/utility-tools": DATA_LAST_REVIEWED,
  "/about": "2026-11-14",
  "/contact": "2026-08-01",
  "/blog": DATA_LAST_REVIEWED,
  "/blog/why-youtube-tools-hub": "2026-11-14",
  "/faq": "2026-11-14",
  "/resources/youtube-creator-statistics": DATA_LAST_REVIEWED,
  "/resources/youtube-cpm-rates": DATA_LAST_REVIEWED,
  "/resources/link-to-us": "2026-09-29",
  "/pricing": "2026-09-29",
  "/resources/youtube-algorithm-guide": "2026-11-14",
  "/resources/youtube-monetization-guide": DATA_LAST_REVIEWED,
  "/resources/youtube-glossary": "2026-11-14",
  "/api-docs": "2026-08-01",
  "/privacy-policy": "2026-08-01",
  "/terms-of-use": "2026-08-01",
  "/disclaimer": "2026-08-01",
  "/refund-policy": "2026-08-01",
  "/resources": DATA_LAST_REVIEWED,
};

const FALLBACK_LAST_MODIFIED = new Date("2026-09-29T00:00:00.000Z");
const TOOL_LAST_MODIFIED = new Date(`${DATA_LAST_REVIEWED}T00:00:00.000Z`);
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
    "/tools/creator-tax-calculator",
    "/alternatives",
    "/research/youtube-cpm-rpm-report-2026",
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
    const imageUrl =
      tool.slug === "youtube-transcript-downloader"
        ? `${baseUrl}/images/blog/youtube-transcript-downloader-keyword-extractor-hero.webp`
        : `${baseUrl}/tools/${tool.slug}/opengraph-image`;
    allEntries.push({
      url,
      lastModified: TOOL_LAST_MODIFIED,
      changeFrequency: "weekly",
      priority: 0.9,
      images: [imageUrl],
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

  // Country-specific earnings calculator pages — index Tier 1 only (see
  // src/config/index-policy.ts); Tier-2/3 templates stay live but noindexed.
  for (const country of countryCPMData) {
    const isTier1 = TIERS.TIER1.countries.includes(country.code);
    if (!isTier1 && !INDEX_TIER2_COUNTRY_PAGES) continue;
    const url = `${baseUrl}/tools/youtube-earnings-calculator/${country.slug}`;
    allEntries.push({
      url,
      lastModified: DATA_LAST_MODIFIED,
      changeFrequency: "weekly",
      priority: 0.85,
    });
  }

  // US State Creator Tax pages stay noindexed (see index-policy.ts) — they
  // must not consume sitemap slots until the policy flag flips.
  if (INDEX_US_STATE_TAX_PAGES) {
    for (const state of US_STATE_CREATOR_TAXES) {
      allEntries.push({
        url: `${baseUrl}/tools/creator-tax-calculator/${state.slug}`,
        lastModified: DATA_LAST_MODIFIED,
        changeFrequency: "monthly",
        priority: 0.8,
      });
    }
  }

  // High-intent Competitor Switcher / Alternative landing pages
  for (const alt of COMPETITOR_ALTERNATIVES) {
    allEntries.push({
      url: `${baseUrl}/alternatives/${alt.slug}`,
      lastModified: DATA_LAST_MODIFIED,
      changeFrequency: "monthly",
      priority: 0.8,
    });
  }

  return allEntries;
}
