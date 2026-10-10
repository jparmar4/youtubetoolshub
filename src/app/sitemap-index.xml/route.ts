import { getSitemapIndexXml } from "@/lib/sitemap-index";

// Child lastmods are derived from real content dates (max blog post lastmod,
// data review date) instead of hardcoded constants that drift stale.
export const dynamic = "force-static";

export async function GET() {
  return new Response(getSitemapIndexXml(), {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, s-maxage=1800, stale-while-revalidate=900',
    },
  });
}
