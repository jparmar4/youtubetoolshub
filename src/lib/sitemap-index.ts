import { getIndexableBlogPosts, toBlogIsoDate } from "@/config/blog";
import { siteConfig } from "@/config/site";
import { DATA_LAST_REVIEWED } from "@/lib/seo-data";

function maxSiteLastmod(): string {
  const posts = getIndexableBlogPosts();
  let max = new Date(`${DATA_LAST_REVIEWED}T00:00:00.000Z`).getTime();
  if (Number.isNaN(max)) max = 0;
  for (const post of posts) {
    const t = new Date(toBlogIsoDate(post.updatedAt ?? post.date)).getTime();
    if (!Number.isNaN(t) && t > max) max = t;
  }
  const now = Date.now();
  const clamped = max > now ? now : max;
  return clamped ? new Date(clamped).toISOString() : new Date(now).toISOString();
}

export function getSitemapIndexXml(): string {
  const lastmod = maxSiteLastmod();
  return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${siteConfig.url}/sitemap.xml</loc>
    <lastmod>${lastmod}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${siteConfig.url}/sitemap-images.xml</loc>
    <lastmod>${lastmod}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${siteConfig.url}/sitemap-news.xml</loc>
    <lastmod>${lastmod}</lastmod>
  </sitemap>
</sitemapindex>`;
}
