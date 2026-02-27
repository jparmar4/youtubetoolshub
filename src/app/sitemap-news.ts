import { MetadataRoute } from "next";
import { getAllBlogPosts } from "@/config/blog";
import { siteConfig } from "@/config/site";

/**
 * News Sitemap for Google Discover and Google News
 * 
 * Requirements for Google Discover:
 * - Articles must be news-worthy or timely content
 * - Must have publication date within last 48 hours for best results
 * - Must include title, publication date, and publication name
 * - High-quality images are essential (1200x630 minimum)
 * 
 * This sitemap helps with:
 * - Google Discover feed inclusion
 * - Google News indexing
 * - Top Stories carousel eligibility
 */
export default function newsSitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url;
  const blogPosts = getAllBlogPosts();

  // Filter to recent posts (last 30 days for news sitemap)
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  const recentPosts = blogPosts.filter(post => {
    const postDate = new Date(post.date);
    return !isNaN(postDate.getTime()) && postDate >= thirtyDaysAgo;
  });

  return recentPosts.map(post => ({
    url: `${baseUrl}/blog/${post.slug}`,
    title: post.title,
    lastModified: new Date(post.date),
    // News-specific metadata for Google Discover
    alternates: {
      languages: {
        'en': `${baseUrl}/blog/${post.slug}`,
      },
    },
  }));
}

// Mark this as a news sitemap for Google
export const dynamic = 'force-dynamic';
export const revalidate = 3600; // Revalidate every hour
