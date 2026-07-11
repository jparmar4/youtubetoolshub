import { NextRequest, NextResponse } from "next/server";

/**
 * Proxy route to download images with proper filename
 * Uses streaming and correct headers for reliable downloads
 */
export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const imageUrl = searchParams.get("url");

        if (!imageUrl) {
            return NextResponse.json(
                { error: "Image URL is required" },
                { status: 400 }
            );
        }

        // SECURITY: Validate the URL domain to prevent SSRF attacks
        const ALLOWED_DOMAINS = [
            "i.ytimg.com", "i3.ytimg.com", "i4.ytimg.com",
            "img.youtube.com", "yt3.ggpht.com", "yt3.googleusercontent.com",
            "lh3.googleusercontent.com", "replicate.delivery",
            "pbxt.replicate.delivery", "placehold.co",
        ];
        try {
            const parsedUrl = new URL(imageUrl);
            const hostname = parsedUrl.hostname;
            const isAllowed = ALLOWED_DOMAINS.some(d => hostname === d || hostname.endsWith("." + d));
            if (!isAllowed || !["http:", "https:"].includes(parsedUrl.protocol)) {
                return NextResponse.json(
                    { error: "Domain not allowed" },
                    { status: 400 }
                );
            }
        } catch {
            return NextResponse.json(
                { error: "Invalid image URL" },
                { status: 400 }
            );
        }

        // Fetch the image from the validated external URL
        const response = await fetch(imageUrl);

        if (!response.ok) {
            throw new Error(`Failed to fetch image: ${response.status}`);
        }

        // Get the image data as buffer
        const imageBuffer = await response.arrayBuffer();

        // Detect content type from response or URL
        let contentType = response.headers.get("content-type") || "";

        // Determine extension based on content type or URL
        let extension = "png";
        if (contentType.includes("webp") || imageUrl.includes(".webp")) {
            extension = "webp";
            contentType = "image/webp";
        } else if (contentType.includes("jpeg") || contentType.includes("jpg") || imageUrl.includes(".jpg") || imageUrl.includes(".jpeg")) {
            extension = "jpg";
            contentType = "image/jpeg";
        } else if (contentType.includes("gif") || imageUrl.includes(".gif")) {
            extension = "gif";
            contentType = "image/gif";
        } else if (contentType.includes("png") || imageUrl.includes(".png")) {
            extension = "png";
            contentType = "image/png";
        } else {
            // Default to PNG if unknown
            contentType = "image/png";
            extension = "png";
        }

        // Create filename with timestamp
        const timestamp = Date.now();
        const filename = `youtube-thumbnail-${timestamp}.${extension}`;

        // Create response with proper headers for browser download
        const headers = new Headers();
        headers.set("Content-Type", contentType);
        headers.set("Content-Length", imageBuffer.byteLength.toString());
        headers.set("Content-Disposition", `attachment; filename="${filename}"; filename*=UTF-8''${encodeURIComponent(filename)}`);
        headers.set("Cache-Control", "no-store, no-cache, must-revalidate");
        headers.set("Pragma", "no-cache");
        headers.set("Expires", "0");
        // Force download in all browsers
        headers.set("X-Content-Type-Options", "nosniff");

        return new NextResponse(imageBuffer, {
            status: 200,
            headers: headers,
        });
    } catch (error) {
        console.error("Download proxy error:", error);
        return NextResponse.json(
            { error: "Failed to download image" },
            { status: 500 }
        );
    }
}
