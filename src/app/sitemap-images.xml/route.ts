import { tools } from "@/config/tools";
import { getAllBlogPosts } from "@/config/blog";
import { siteConfig } from "@/config/site";

export const dynamic = "force-static";
export const revalidate = 86400; // Revalidate every 24 hours

export async function GET() {
    const baseUrl = siteConfig.url;
    const blogPosts = getAllBlogPosts();

    const entries: string[] = [];

    // Blog post cover images
    for (const post of blogPosts) {
        if (post.coverImage) {
            entries.push(`  <url>
    <loc>${baseUrl}/blog/${post.slug}</loc>
    <image:image>
      <image:loc>${baseUrl}${post.coverImage}</image:loc>
      <image:title>${post.title.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")}</image:title>
    </image:image>
  </url>`);
        }
    }

    // Tool pages with OG images
    for (const tool of tools) {
        entries.push(`  <url>
    <loc>${baseUrl}/tools/${tool.slug}</loc>
    <image:image>
      <image:loc>${baseUrl}/og-image.png</image:loc>
      <image:title>${tool.name.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")}</image:title>
    </image:image>
  </url>`);
    }

    // Static pages with logo
    const staticPages = [
        { path: "", title: "YouTube Tools Hub Homepage" },
        { path: "/about", title: "About YouTube Tools Hub" },
        { path: "/contact", title: "Contact YouTube Tools Hub" },
        { path: "/faq", title: "Frequently Asked Questions" },
        { path: "/pricing", title: "YouTube Tools Hub Pricing" }
    ];

    for (const page of staticPages) {
        entries.push(`  <url>
    <loc>${baseUrl}${page.path}</loc>
    <image:image>
      <image:loc>${baseUrl}/og-image.png</image:loc>
      <image:title>${page.title.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")}</image:title>
    </image:image>
  </url>`);
    }

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${entries.join("\n")}
</urlset>`;

    return new Response(xml, {
        headers: {
            "Content-Type": "application/xml; charset=utf-8",
            "Cache-Control": "public, max-age=86400, stale-while-revalidate=3600",
        },
    });
}
