import { siteConfig } from "@/config/site";
import { getIndexableBlogPosts, toBlogIsoDate } from "@/config/blog";

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
      <title><![CDATA[${post.title}]]></title>
      <link>${postUrl}</link>
      <guid isPermaLink="true">${postUrl}</guid>
      <pubDate>${pubDate}</pubDate>
      <description><![CDATA[${post.metaDescription}]]></description>
      <author>${siteConfig.contact.email} (${post.author})</author>
      <category><![CDATA[${post.category}]]></category>
      <enclosure url="${imageUrl}" type="image/webp" length="150000" />
      <media:content url="${imageUrl}" medium="image" type="image/webp" width="1200" height="675" />
    </item>`;
    })
    .join("");

  const rssFeed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:media="http://search.yahoo.com/mrss/">
  <channel>
    <title><![CDATA[${siteConfig.name} Blog]]></title>
    <description><![CDATA[${siteConfig.description}]]></description>
    <link>${siteUrl}/blog</link>
    <atom:link href="${siteUrl}/feed.xml" rel="self" type="application/rss+xml" />
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <image>
      <url>${siteUrl}/icon.svg</url>
      <title>${siteConfig.name}</title>
      <link>${siteUrl}</link>
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
