import { getAllBlogPosts } from "@/config/blog";
import { siteConfig } from "@/config/site";

export const dynamic = "force-dynamic";
export const revalidate = 3600; // Revalidate every hour

export async function GET() {
    const baseUrl = siteConfig.url;
    const blogPosts = getAllBlogPosts();

    // Google News sitemap should only contain articles published in the last 30 days
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const recentPosts = blogPosts.filter((post) => {
        const postDate = new Date(post.date);
        return !isNaN(postDate.getTime()) && postDate >= thirtyDaysAgo;
    });

    // Fallback: If no posts in last 30 days, just include the most recent 3 posts so sitemap is not empty
    const postsToShow = recentPosts.length > 0 ? recentPosts : blogPosts.slice(0, 3);

    const xmlItems = postsToShow.map((post) => {
        const postDate = new Date(post.date);
        const safeDate = isNaN(postDate.getTime()) ? new Date().toISOString() : postDate.toISOString();
        return `  <url>
    <loc>${baseUrl}/blog/${post.slug}</loc>
    <news:news>
      <news:publication>
        <news:name>${siteConfig.name}</news:name>
        <news:language>en</news:language>
      </news:publication>
      <news:publication_date>${safeDate}</news:publication_date>
      <news:title>${post.title.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")}</news:title>
    </news:news>
  </url>`;
    }).join("\n");

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
${xmlItems}
</urlset>`;

    return new Response(xml, {
        headers: {
            "Content-Type": "application/xml; charset=utf-8",
            "Cache-Control": "public, max-age=3600, stale-while-revalidate=600",
        },
    });
}
