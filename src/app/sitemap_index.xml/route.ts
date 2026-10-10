import { getSitemapIndexXml } from "@/lib/sitemap-index";

export const dynamic = "force-static";

/**
 * Underscore alias kept for legacy crawlers/bookmarks and Google Search Console submissions.
 * Serves the identical sitemap index XML directly (200 OK) to prevent redirect errors in GSC.
 */
export async function GET() {
  return new Response(getSitemapIndexXml(), {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=1800, stale-while-revalidate=900",
    },
  });
}
