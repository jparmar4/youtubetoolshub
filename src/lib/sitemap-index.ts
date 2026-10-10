import { getIndexableBlogPosts, toBlogIsoDate } from "@/config/blog";
import { siteConfig } from "@/config/site";

function maxBlogLastmod(): string {
  const posts = getIndexableBlogPosts();
  let max = 0;
  for (const post of posts) {
    const t = new Date(toBlogIsoDate(post.updatedAt ?? post.date)).getTime();
    if (!Number.isNaN(t) && t > max) max = t;
  }
  return max ? new Date(max).toISOString() : new Date().toISOString();
}

export function getSitemapIndexXml(): string {
  return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${siteConfig.url}/sitemap.xml</loc>
    <lastmod>${maxBlogLastmod()}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${siteConfig.url}/sitemap-images.xml</loc>
    <lastmod>${maxBlogLastmod()}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${siteConfig.url}/sitemap-news.xml</loc>
    <lastmod>${maxBlogLastmod()}</lastmod>
  </sitemap>
</sitemapindex>`;
}
