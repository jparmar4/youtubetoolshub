import { siteConfig } from '@/config/site';

// Keep the index's dates aligned with real changes in its child sitemaps.
// Do not generate the current timestamp: it falsely tells crawlers that every
// sitemap changed on each fetch.
const MAIN_SITEMAP_LAST_MODIFIED = "2026-08-18T00:00:00.000Z";
const IMAGE_SITEMAP_LAST_MODIFIED = "2026-08-15T00:00:00.000Z";

export async function GET() {
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${siteConfig.url}/sitemap.xml</loc>
    <lastmod>${MAIN_SITEMAP_LAST_MODIFIED}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${siteConfig.url}/sitemap-images.xml</loc>
    <lastmod>${IMAGE_SITEMAP_LAST_MODIFIED}</lastmod>
  </sitemap>
</sitemapindex>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, s-maxage=1800, stale-while-revalidate=900',
    },
  });
}
