// IndexNow key file
// This file serves the IndexNow verification key at /{key}.txt
// Required by IndexNow protocol for Bing, Yandex, Naver, and other search engines
// See: https://www.indexnow.org/documentation

export const dynamic = "force-static";

export async function GET() {
    return new Response("01d46652569c40eaa19149073834de57", {
        headers: {
            "Content-Type": "text/plain; charset=utf-8",
            "Cache-Control": "public, max-age=604800, immutable",
        },
    });
}
