import { NextResponse } from "next/server";
import { submitToIndexNow } from "@/lib/indexnow";
import { siteConfig } from "@/config/site";
import { getAllBlogPosts } from "@/config/blog";
import { tools } from "@/config/tools";

export async function GET() {
    try {
        // 1. Collect all URLs to submit
        const baseUrl = siteConfig.url;
        const urls = [
            baseUrl,
            `${baseUrl}/tools`,
            `${baseUrl}/blog`,
        ];

        // Add tools
        tools.forEach((tool) => {
            urls.push(`${baseUrl}/tools/${tool.slug}`);
        });

        // Add blog posts (latest 10 to avoid payload limits if any, though IndexNow allows up to 10k)
        // We'll submit all recent ones.
        const posts = getAllBlogPosts();
        posts.slice(0, 20).forEach((post) => {
            urls.push(`${baseUrl}/blog/${post.slug}`);
        });

        // 2. Submit to IndexNow
        const result = await submitToIndexNow({ urls });

        if (result.success) {
            return NextResponse.json({
                success: true,
                message: "URLs submitted successfully to IndexNow",
                count: urls.length,
                submittedUrls: urls,
            });
        } else {
            return NextResponse.json(
                { success: false, message: result.message },
                { status: 500 }
            );
        }
    } catch (error) {
        console.error("API IndexNow Error:", error);
        return NextResponse.json(
            { success: false, message: "Internal Server Error" },
            { status: 500 }
        );
    }
}
