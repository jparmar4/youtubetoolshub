import { getAllBlogPosts } from '@/config/blog';
import { siteConfig } from '@/config/site';

// Strip HTML/Markdown for plain text summary
function stripHtml(content: string): string {
  return content
    .replace(/#{1,6}\s/g, '')  // Remove markdown headers
    .replace(/\*\*([^*]+)\*\*/g, '$1') // Bold
    .replace(/\*([^*]+)\*/g, '$1') // Italic
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // Links
    .replace(/!\[([^\]]*)\]\([^)]+\)/g, '') // Images
    .replace(/`([^`]+)`/g, '$1') // Code
    .replace(/>\s?\[![^\]]+\][^\n]+/g, '') // Callouts
    .replace(/\|[^\n]+\|/g, '') // Tables
    .replace(/[-*]\s/g, '• ') // List items
    .replace(/\n{3,}/g, '\n\n')
    .trim()
    .substring(0, 2000); // Google Discover prefers substantial content
}

export async function GET() {
  const posts = getAllBlogPosts();
  const siteUrl = siteConfig.url;

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" 
  xmlns:atom="http://www.w3.org/2005/Atom" 
  xmlns:media="http://search.yahoo.com/mrss/"
  xmlns:dc="http://purl.org/dc/elements/1.1/"
  xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>${siteConfig.name} - YouTube Creator Growth Blog</title>
    <link>${siteUrl}</link>
    <description>Professional YouTube growth tips, monetization strategies, and creator tools. Expert guides for US content creators to maximize earnings and channel growth.</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${siteUrl}/feed.xml" rel="self" type="application/rss+xml"/>
    <image>
      <url>${siteUrl}/og-image.png</url>
      <title>${siteConfig.name}</title>
      <link>${siteUrl}</link>
      <width>1200</width>
      <height>630</height>
    </image>
    ${posts
      .map((post) => {
        const contentSummary = stripHtml(post.content);
        return `
      <item>
        <title><![CDATA[${post.title}]]></title>
        <link>${siteUrl}/blog/${post.slug}</link>
        <guid isPermaLink="true">${siteUrl}/blog/${post.slug}</guid>
        <description><![CDATA[${post.metaDescription || post.excerpt}]]></description>
        <content:encoded><![CDATA[
          <p>${post.excerpt}</p>
          <img src="${siteUrl}${post.coverImage}" alt="${post.imageAlt || post.title}" width="1200" height="630" />
          <p>${contentSummary}...</p>
          <p><a href="${siteUrl}/blog/${post.slug}">Read the full article on ${siteConfig.name}</a></p>
        ]]></content:encoded>
        <pubDate>${new Date(post.date).toUTCString()}</pubDate>
        <dc:creator><![CDATA[${post.author}]]></dc:creator>
        <category><![CDATA[${post.category}]]></category>
        <media:content 
          url="${siteUrl}${post.coverImage}" 
          medium="image" 
          type="image/png"
          width="1200"
          height="630">
          <media:title type="plain">${post.imageAlt || post.title}</media:title>
        </media:content>
        <media:thumbnail url="${siteUrl}${post.coverImage}" width="1200" height="630" />
      </item>`;
      })
      .join('')}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, s-maxage=1800, stale-while-revalidate=900',
    },
  });
}
