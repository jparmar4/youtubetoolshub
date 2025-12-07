import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "@/auth";

// Common search engine bot user agents
const BOT_USER_AGENTS = [
    "googlebot",
    "bingbot",
    "yandexbot",
    "duckduckbot",
    "slurp",       // Yahoo
    "baiduspider",
    "facebookexternalhit",
    "twitterbot",
    "linkedinbot",
    "applebot",
    "msnbot",
    "ia_archiver", // Alexa
    "semrushbot",
    "ahrefsbot",
    "petalbot",
    "bytespider",
    "rogerbot",
    "dotbot",
];

function isSearchBot(userAgent: string | null): boolean {
    if (!userAgent) return false;
    const lowerUA = userAgent.toLowerCase();
    return BOT_USER_AGENTS.some(bot => lowerUA.includes(bot));
}

export default async function middleware(request: NextRequest) {
    const userAgent = request.headers.get("user-agent");
    const pathname = request.nextUrl.pathname;

    // Allow search engine bots to access ALL pages for SEO indexing
    if (isSearchBot(userAgent)) {
        return NextResponse.next();
    }

    const session = await auth();
    const isLoggedIn = !!session?.user;

    // Protect tool pages - require authentication for regular users
    if (pathname.startsWith("/tools/") && !isLoggedIn) {
        const signInUrl = new URL("/sign-in", request.url);
        signInUrl.searchParams.set("callbackUrl", pathname);
        return NextResponse.redirect(signInUrl);
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - robots.txt (robots file)
         * - sitemap.xml (sitemap file)
         * - public folder files (images, etc.)
         */
        "/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|.*\\.png$|.*\\.jpg$|.*\\.jpeg$|.*\\.gif$|.*\\.svg$|.*\\.webp$|.*\\.ico$).*)",
    ],
};
