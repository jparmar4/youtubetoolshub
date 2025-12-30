import { getAllBlogPosts } from '@/config/blog';
import { siteConfig } from '@/config/site';

export async function GET() {
    const posts = getAllBlogPosts();
    const siteUrl = siteConfig.url;

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${siteConfig.name}</title>
    <link>${siteUrl}</link>
    <description>${siteConfig.description}</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${siteUrl}/feed.xml" rel="self" type="application/rss+xml"/>
    ${posts
            .map((post) => {
                return `
      <item>
        <title><![CDATA[${post.title}]]></title>
        <link>${siteUrl}/blog/${post.slug}</link>
        <guid isPermaLink="true">${siteUrl}/blog/${post.slug}</guid>
        <description><![CDATA[${post.excerpt}]]></description>
        <pubDate>${new Date(post.date).toUTCString()}</pubDate>
        <author>${siteConfig.contact.email} (${post.author})</author>
        <category><![CDATA[${post.category}]]></category>
      </item>`;
            })
            .join('')}
  </channel>
</rss>`;

    return new Response(xml, {
        headers: {
            'Content-Type': 'application/xml',
            'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=1800',
        },
    });
}
