import { siteConfig } from "@/config/site";
import { getIndexableBlogPosts, toBlogIsoDate } from "@/config/blog";
import { tools } from "@/config/tools";
import { DATA_LAST_REVIEWED } from "@/lib/seo-data";

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

/** CDATA-safe wrapper: `]]>` inside content would terminate the section early. */
function cdata(value: string): string {
  return `<![CDATA[${value.replace(/\]\]>/g, "]]]]><![CDATA[>")}]]>`;
}

export async function GET() {
  const posts = getIndexableBlogPosts();
  const siteUrl = siteConfig.url;
  const toolUpdatedIso = `${DATA_LAST_REVIEWED}T12:00:00.000Z`;
  let maxTime = new Date(toolUpdatedIso).getTime();
  for (const p of posts) {
    const t = new Date(toBlogIsoDate(p.updatedAt ?? p.date)).getTime();
    if (!Number.isNaN(t) && t > maxTime) maxTime = t;
  }
  const feedUpdatedIso = new Date(maxTime).toISOString();

  const blogEntries = posts
    .map((post) => {
      const postUrl = `${siteUrl}/blog/${post.slug}`;
      const updated = toBlogIsoDate(post.updatedAt ?? post.date);
      const coverUrl = post.coverImage
        ? post.coverImage.startsWith("http")
          ? post.coverImage
          : `${siteUrl}${post.coverImage}`
        : null;

      return `
    <entry>
      <title>${cdata(post.title)}</title>
      <link href="${escapeXml(postUrl)}" rel="alternate" type="text/html" />${coverUrl ? `\n      <link href="${escapeXml(coverUrl)}" rel="enclosure" type="image/webp" />` : ""}
      <id>${escapeXml(postUrl)}</id>
      <updated>${escapeXml(updated)}</updated>
      <summary type="html">${cdata(post.metaDescription)}</summary>
      <author>
        <name>${escapeXml(post.author)}</name>
      </author>
      <category term="${escapeXml(post.category)}" />
      <content type="html">${cdata(post.metaDescription)}</content>
    </entry>`;
    })
    .join("");

  const toolEntries = tools
    .map((tool) => {
      const toolUrl = `${siteUrl}/tools/${tool.slug}`;
      return `
    <entry>
      <title>${cdata(`${tool.name} – Free Online Tool`)}</title>
      <link href="${escapeXml(toolUrl)}" rel="alternate" type="text/html" />
      <id>${escapeXml(toolUrl)}</id>
      <updated>${escapeXml(toolUpdatedIso)}</updated>
      <summary type="html">${cdata(tool.shortDescription)}</summary>
      <author>
        <name>${escapeXml(siteConfig.name)}</name>
      </author>
      <category term="${escapeXml(tool.category)}" />
      <content type="html">${cdata(tool.description)}</content>
    </entry>`;
    })
    .join("");

  const atomFeed = `<?xml version="1.0" encoding="UTF-8"?>
<feed xmlns="http://www.w3.org/2005/Atom" xml:lang="en">
  <title>${escapeXml(siteConfig.name)}</title>
  <subtitle>${escapeXml(siteConfig.description)}</subtitle>
  <link href="${escapeXml(`${siteUrl}/atom.xml`)}" rel="self" type="application/atom+xml" />
  <link href="https://pubsubhubbub.appspot.com/" rel="hub" />
  <link href="${escapeXml(siteUrl)}" rel="alternate" type="text/html" />
  <link href="${escapeXml(`${siteUrl}/llms.txt`)}" rel="related" type="text/plain" title="LLMs.txt" />
  <link href="${escapeXml(`${siteUrl}/llms-full.txt`)}" rel="related" type="text/plain" title="LLMs Full Context" />
  <link href="${escapeXml(`${siteUrl}/.well-known/ai.txt`)}" rel="related" type="text/plain" title="AI Crawler Guidance" />
  <id>${escapeXml(`${siteUrl}/`)}</id>
  <updated>${escapeXml(feedUpdatedIso)}</updated>
  <author>
    <name>${escapeXml(siteConfig.name)}</name>
    <email>${escapeXml(siteConfig.contact.email)}</email>
    <uri>${escapeXml(siteUrl)}</uri>
  </author>
  <rights>Copyright ${new Date().getFullYear()} ${escapeXml(siteConfig.name)}. All rights reserved.</rights>
  <generator uri="${escapeXml(siteUrl)}" version="1.0">${escapeXml(siteConfig.name)}</generator>
  <icon>${escapeXml(`${siteUrl}/favicon.svg`)}</icon>
  <logo>${escapeXml(`${siteUrl}/og-image.png`)}</logo>
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
