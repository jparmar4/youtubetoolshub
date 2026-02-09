import { siteConfig } from "@/config/site";
import { getAllBlogPosts } from "@/config/blog";
import { tools } from "@/config/tools";

export async function GET() {
  const posts = getAllBlogPosts();
  const siteUrl = siteConfig.url;
  const now = new Date().toISOString();

  const blogEntries = posts
    .map((post) => {
      const postUrl = `${siteUrl}/blog/${post.slug}`;
      const updated = new Date(post.date).toISOString();

      return `
    <entry>
      <title><![CDATA[${post.title}]]></title>
      <link href="${postUrl}" rel="alternate" type="text/html" />
      <id>${postUrl}</id>
      <updated>${updated}</updated>
      <summary type="html"><![CDATA[${post.metaDescription}]]></summary>
      <author>
        <name>${post.author}</name>
      </author>
      <category term="${post.category}" />
      <content type="html"><![CDATA[${post.metaDescription}]]></content>
    </entry>`;
    })
    .join("");

  const toolEntries = tools
    .map((tool) => {
      const toolUrl = `${siteUrl}/tools/${tool.slug}`;
      return `
    <entry>
      <title><![CDATA[${tool.name} – Free Online Tool]]></title>
      <link href="${toolUrl}" rel="alternate" type="text/html" />
      <id>${toolUrl}</id>
      <updated>${now}</updated>
      <summary type="html"><![CDATA[${tool.shortDescription}]]></summary>
      <author>
        <name>${siteConfig.name}</name>
      </author>
      <category term="${tool.category}" />
      <content type="html"><![CDATA[${tool.description}]]></content>
    </entry>`;
    })
    .join("");

  const atomFeed = `<?xml version="1.0" encoding="UTF-8"?>
<feed xmlns="http://www.w3.org/2005/Atom" xml:lang="en">
  <title>${siteConfig.name}</title>
  <subtitle>${siteConfig.description}</subtitle>
  <link href="${siteUrl}/atom.xml" rel="self" type="application/atom+xml" />
  <link href="${siteUrl}" rel="alternate" type="text/html" />
  <link href="${siteUrl}/llms.txt" rel="related" type="text/plain" title="LLMs.txt" />
  <link href="${siteUrl}/llms-full.txt" rel="related" type="text/plain" title="LLMs Full Context" />
  <link href="${siteUrl}/.well-known/ai.txt" rel="related" type="text/plain" title="AI Crawler Guidance" />
  <id>${siteUrl}/</id>
  <updated>${now}</updated>
  <author>
    <name>${siteConfig.name}</name>
    <email>${siteConfig.contact.email}</email>
    <uri>${siteUrl}</uri>
  </author>
  <rights>Copyright ${new Date().getFullYear()} ${siteConfig.name}. All rights reserved.</rights>
  <generator uri="${siteUrl}" version="1.0">${siteConfig.name}</generator>
  <icon>${siteUrl}/favicon.svg</icon>
  <logo>${siteUrl}/og-image.png</logo>
  <category term="YouTube Tools" />
  <category term="Creator Economy" />
  <category term="SEO Tools" />
  <category term="AI Tools" />
  ${blogEntries}
  ${toolEntries}
</feed>`;

  return new Response(atomFeed, {
    headers: {
      "Content-Type": "application/atom+xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=1200, stale-while-revalidate=600",
      "X-Robots-Tag": "index, follow, noarchive",
    },
  });
}
