import { siteConfig } from "@/config/site";
import { getIndexableBlogPosts, toBlogIsoDate } from "@/config/blog";

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

export async function GET() {
  const posts = getIndexableBlogPosts();
  const siteUrl = siteConfig.url;

  const rssItems = posts
    .map((post) => {
      const postUrl = `${siteUrl}/blog/${post.slug}`;
      const pubDate = new Date(toBlogIsoDate(post.date)).toUTCString();
      const imageUrl = post.coverImage
        ? (post.coverImage.startsWith("http") ? post.coverImage : `${siteUrl}${post.coverImage}`)
        : `${siteUrl}/og-image.png`;

      return `
    <item>
      <title>${cdata(post.title)}</title>
      <link>${escapeXml(postUrl)}</link>
      <guid isPermaLink="true">${escapeXml(postUrl)}</guid>
      <pubDate>${pubDate}</pubDate>
      <description>${cdata(post.metaDescription)}</description>
      <author>${escapeXml(siteConfig.contact.email)} (${escapeXml(post.author)})</author>
      <category>${cdata(post.category)}</category>
      <enclosure url="${escapeXml(imageUrl)}" type="image/webp" length="150000" />
      <media:content url="${escapeXml(imageUrl)}" medium="image" type="image/webp" width="1200" height="675" />
    </item>`;
    })
    .join("");

  const rssFeed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:media="http://search.yahoo.com/mrss/">
  <channel>
    <title>${cdata(`${siteConfig.name} Blog`)}</title>
    <description>${cdata(siteConfig.description)}</description>
    <link>${escapeXml(`${siteUrl}/blog`)}</link>
    <atom:link href="${escapeXml(`${siteUrl}/feed.xml`)}" rel="self" type="application/rss+xml" />
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <image>
      <url>${escapeXml(`${siteUrl}/icon.svg`)}</url>
      <title>${escapeXml(siteConfig.name)}</title>
      <link>${escapeXml(siteUrl)}</link>
    </image>
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
