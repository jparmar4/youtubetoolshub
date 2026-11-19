import { siteConfig } from "@/config/site";
import { getIndexableBlogPosts, toBlogIsoDate } from "@/config/blog";
import { getCoverDimensions } from "@/config/blog/image-dimensions";
import { DATA_LAST_REVIEWED } from "@/lib/seo-data";

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function cdata(value: string): string {
  return `<![CDATA[${value.replace(/\]\]>/g, "]]]]><![CDATA[>")}]]>`;
}

function detectImageMimeType(url: string): string {
  const lower = url.toLowerCase();
  if (lower.endsWith(".png") || lower.includes("/opengraph-image")) return "image/png";
  if (lower.endsWith(".jpg") || lower.endsWith(".jpeg")) return "image/jpeg";
  return "image/webp";
}

export async function GET() {
  const posts = getIndexableBlogPosts();
  const siteUrl = siteConfig.url;

  const reportUrl = `${siteUrl}/research/youtube-cpm-rpm-report-2026`;
  const reportImgUrl = `${reportUrl}/opengraph-image`;
  const reportDate = new Date(`${DATA_LAST_REVIEWED}T12:00:00.000Z`).toUTCString();
  const reportSummary =
    "2026 benchmark dataset comparing Tier-1 vs Tier-2/3 YouTube CPM and RPM rates, Long-Form vs Shorts payouts, and Top 12 high-paying niches across 52 countries.";

  const reportItem = `
    <item>
      <title>${cdata("2026 YouTube Creator Economy & CPM/RPM Benchmark Report")}</title>
      <link>${escapeXml(reportUrl)}</link>
      <guid isPermaLink="true">${escapeXml(reportUrl)}</guid>
      <pubDate>${reportDate}</pubDate>
      <description>${cdata(reportSummary)}</description>
      <author>${escapeXml(siteConfig.contact.email)} (${escapeXml(siteConfig.editorial.name)})</author>
      <category>${cdata("Research & Benchmarks")}</category>
      <enclosure url="${escapeXml(reportImgUrl)}" type="image/png" />
      <media:content url="${escapeXml(reportImgUrl)}" medium="image" type="image/png" width="1200" height="630" />
      <content:encoded>${cdata(
        `<figure><img src="${reportImgUrl}" alt="2026 YouTube Creator Economy & CPM/RPM Benchmark Report" width="1200" height="630" /></figure><p>${reportSummary}</p><p><a href="${reportUrl}">Explore the full 2026 dataset</a> or <a href="${siteUrl}/tools/youtube-earnings-calculator">run the interactive earnings calculator</a>.</p>`,
      )}</content:encoded>
    </item>`;

  const rssItems = posts
    .map((post) => {
      const postUrl = `${siteUrl}/blog/${post.slug}`;
      const pubDate = new Date(toBlogIsoDate(post.updatedAt ?? post.date)).toUTCString();
      const imageUrl = post.coverImage
        ? (post.coverImage.startsWith("http") ? post.coverImage : `${siteUrl}${post.coverImage}`)
        : `${siteUrl}/og-image.png`;
      const mimeType = detectImageMimeType(imageUrl);
      // Real pixel dimensions from the build-time manifest — a fabricated
      // 1200x675 against a 640x640 file misleads feed readers and Discover.
      const dims = post.coverImage ? getCoverDimensions(post.coverImage) : undefined;
      const mediaDims = dims
        ? ` width="${dims.width}" height="${dims.height}"`
        : "";
      const imgDimsAttr = dims
        ? ` width="${dims.width}" height="${dims.height}"`
        : "";
      const encodedHtml = `<figure><img src="${imageUrl}" alt="${(post.imageAlt || post.title).replace(/"/g, "&quot;")}"${imgDimsAttr} /></figure><p>${post.metaDescription}</p><p><a href="${postUrl}">Read the complete guide on YouTube Tools Hub</a> or <a href="${siteUrl}/tools">launch all free creator tools</a>.</p>`;

      return `
    <item>
      <title>${cdata(post.title)}</title>
      <link>${escapeXml(postUrl)}</link>
      <guid isPermaLink="true">${escapeXml(postUrl)}</guid>
      <pubDate>${pubDate}</pubDate>
      <description>${cdata(post.metaDescription)}</description>
      <author>${escapeXml(siteConfig.contact.email)} (${escapeXml(post.author)})</author>
      <category>${cdata(post.category)}</category>
      <enclosure url="${escapeXml(imageUrl)}" type="${mimeType}" />
      <media:content url="${escapeXml(imageUrl)}" medium="image" type="${mimeType}"${mediaDims} />
      <content:encoded>${cdata(encodedHtml)}</content:encoded>
    </item>`;
    })
    .join("");

  const latestBuildDate = posts[0]
    ? new Date(
        Math.max(
          new Date(toBlogIsoDate(posts[0].updatedAt ?? posts[0].date)).getTime(),
          new Date(`${DATA_LAST_REVIEWED}T12:00:00.000Z`).getTime(),
        ),
      ).toUTCString()
    : reportDate;

  const rssFeed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:media="http://search.yahoo.com/mrss/" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>${cdata(`${siteConfig.name} Blog`)}</title>
    <description>${cdata(siteConfig.description)}</description>
    <link>${escapeXml(`${siteUrl}/blog`)}</link>
    <atom:link href="${escapeXml(`${siteUrl}/feed.xml`)}" rel="self" type="application/rss+xml" />
    <atom:link href="https://pubsubhubbub.appspot.com/" rel="hub" />
    <language>en-us</language>
    <lastBuildDate>${latestBuildDate}</lastBuildDate>
    <image>
      <url>${escapeXml(`${siteUrl}/icon.svg`)}</url>
      <title>${escapeXml(siteConfig.name)}</title>
      <link>${escapeXml(siteUrl)}</link>
    </image>
    ${reportItem}
    ${rssItems}
  </channel>
</rss>`;

  return new Response(rssFeed, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=1200, stale-while-revalidate=600",
    },
  });
}
