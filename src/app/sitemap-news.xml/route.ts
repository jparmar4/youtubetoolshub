import { getIndexableBlogPosts, toBlogIsoDate } from "@/config/blog";
import { siteConfig } from "@/config/site";
import { DATA_LAST_REVIEWED } from "@/lib/seo-data";

export const dynamic = "force-static";

/**
 * Fast-discovery sitemap for the newest posts.
 *
 * History: this used to serve an empty `<urlset>` with the Google News
 * namespace, on the reasoning that this site is not a News publisher so an
 * empty file was safer than mislabelling blog posts as news. That file was
 * invalid — the sitemaps schema requires at least one `<url>` child, so Search
 * Console reported "Missing XML tag / Parent tag: urlset, Tag: url" on line 4
 * and discovered 0 pages from a submitted sitemap.
 *
 * The path is kept because it is already submitted in Search Console, but the
 * contents are now a plain (non-news) sitemap of the most recent posts. The
 * `news:` namespace is deliberately gone: Google News sitemaps only work for
 * approved publishers and require dropping entries older than two days, which
 * would put this file straight back to empty.
 */
const RECENT_POST_LIMIT = 20;

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  // Sort by real revision date (updatedAt ?? date) descending so freshly
  // revised flagship guides surface immediately for fast recrawl.
  const posts = [...getIndexableBlogPosts()]
    .sort((a, b) => {
      const ta = new Date(toBlogIsoDate(a.updatedAt ?? a.date)).getTime();
      const tb = new Date(toBlogIsoDate(b.updatedAt ?? b.date)).getTime();
      return (Number.isNaN(tb) ? 0 : tb) - (Number.isNaN(ta) ? 0 : ta);
    })
    .slice(0, RECENT_POST_LIMIT);

  const reportLastmod = new Date(`${DATA_LAST_REVIEWED}T00:00:00.000Z`);
  const reportEntry = `  <url>\n    <loc>${escapeXml(`${siteConfig.url}/research/youtube-cpm-rpm-report-2026`)}</loc>${
    Number.isNaN(reportLastmod.getTime()) ? "" : `\n    <lastmod>${reportLastmod.toISOString()}</lastmod>`
  }\n    <changefreq>weekly</changefreq>\n    <priority>0.9</priority>\n  </url>`;

  const entries = [
    reportEntry,
    ...posts.map((post) => {
      const loc = escapeXml(`${siteConfig.url}/blog/${post.slug}`);
      const lastmod = new Date(toBlogIsoDate(post.updatedAt ?? post.date));
      const lastmodTag = Number.isNaN(lastmod.getTime())
        ? ""
        : `\n    <lastmod>${lastmod.toISOString()}</lastmod>`;
      return `  <url>\n    <loc>${loc}</loc>${lastmodTag}\n    <changefreq>weekly</changefreq>\n    <priority>0.8</priority>\n  </url>`;
    }),
  ].join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries}
</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=86400, stale-while-revalidate=3600",
    },
  });
}
