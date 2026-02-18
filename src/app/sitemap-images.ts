import { MetadataRoute } from "next";
import { tools } from "@/config/tools";
import { getAllBlogPosts } from "@/config/blog";
import { siteConfig } from "@/config/site";

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
  const blogPosts = getAllBlogPosts();
  
  const imageEntries: MetadataRoute.Sitemap = [];

  // Blog post cover images
  for (const post of blogPosts) {
    if (post.coverImage) {
      imageEntries.push({
        url: `${baseUrl}/blog/${post.slug}`,
        lastModified: new Date(post.date),
        // Image metadata is embedded in the page
      });
    }
  }

  // Tool pages with OG images
  for (const tool of tools) {
    imageEntries.push({
      url: `${baseUrl}/tools/${tool.slug}`,
      lastModified: new Date(),
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
      lastModified: new Date(),
    });
  }

  return imageEntries;
}

export const dynamic = 'force-dynamic';
export const revalidate = 86400; // Revalidate daily
