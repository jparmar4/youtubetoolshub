import { MetadataRoute } from "next";
import { tools } from "@/config/tools";
import { getIndexableBlogPosts, toBlogIsoDate } from "@/config/blog";
import { siteConfig } from "@/config/site";

// Sitemap lastmod must reflect a real change to the page or image. Using
// `new Date()` here made every fetch look like a site-wide update, which can
// waste crawler attention and makes change signals unreliable.
const TOOL_IMAGE_LAST_MODIFIED = new Date("2026-08-15T00:00:00.000Z");
const STATIC_IMAGE_LAST_MODIFIED = new Date("2026-06-01T00:00:00.000Z");

/**
 * Image Sitemap for enhanced image SEO
 * 
 * Helps images appear in:
 * - Google Image Search
 * - Google Discover image cards
 * - Visual search results
 * - AI image understanding
 */
export default function imageSitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url;
  const blogPosts = getIndexableBlogPosts();
  
  const imageEntries: MetadataRoute.Sitemap = [];

  // Blog post cover images
  for (const post of blogPosts) {
    if (post.coverImage) {
      imageEntries.push({
        url: `${baseUrl}/blog/${post.slug}`,
        lastModified: new Date(toBlogIsoDate(post.date)),
        // Image metadata is embedded in the page
      });
    }
  }

  // Tool pages with OG images
  for (const tool of tools) {
    imageEntries.push({
      url: `${baseUrl}/tools/${tool.slug}`,
      lastModified: TOOL_IMAGE_LAST_MODIFIED,
    });
  }

  // Static images
  const staticImages = [
    { path: "/og-image.png", title: "YouTube Tools Hub - Free AI Tools for Creators" },
    { path: "/icon.svg", title: "YouTube Tools Hub Logo" },
    { path: "/favicon.svg", title: "YouTube Tools Hub Favicon" },
  ];

  for (const img of staticImages) {
    imageEntries.push({
      url: `${baseUrl}${img.path}`,
      lastModified: STATIC_IMAGE_LAST_MODIFIED,
    });
  }

  return imageEntries;
}

export const revalidate = 86400; // Revalidate daily
