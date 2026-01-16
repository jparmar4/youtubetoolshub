import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "@/auth"; // Keep existing auth
import { i18n } from "@/lib/i18n";
import { match as matchLocale } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";

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

function getLocale(request: NextRequest): string {
    const negotiatorHeaders: Record<string, string> = {};
    request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

    // @ts-ignore
    const languages = new Negotiator({ headers: negotiatorHeaders }).languages();
    const locales = i18n.locales;

    try {
        return matchLocale(languages, locales, i18n.defaultLocale);
    } catch (e) {
        return i18n.defaultLocale;
    }
}

export default async function middleware(request: NextRequest) {
    const userAgent = request.headers.get("user-agent");
    const pathname = request.nextUrl.pathname;
    const host = request.headers.get("host");

    // 0. Redirect non-www to www (SEO Canonicalization)
    if (host === "youtubetoolshub.com") {
        const url = new URL(request.url);
        url.hostname = "www.youtubetoolshub.com";
        return NextResponse.redirect(url);
    }

    // 1. Allow search bots unrestricted access (SEO)
    if (isSearchBot(userAgent)) {
        return NextResponse.next();
    }

    // 2. Auth Protection for Tools
    // Protect /tools/* routes if they require auth
    // Previously: const isToolPage = i18n.locales.some(locale => pathname.startsWith(`/${locale}/tools/`));
    // New: Check for /tools/
    // 2. Auth Protection for Tools (DISABLED for Growth)
    // We want to allow unrestricted access to likely tools to boost traffic and ad revenue
    /*
    const isToolPage = pathname.startsWith("/tools/");

    if (isToolPage) {
        const session = await auth();
        const isLoggedIn = !!session?.user;

        if (!isLoggedIn) {
            // Redirect to sign-in
            const signInUrl = new URL("/sign-in", request.url);
            signInUrl.searchParams.set("callbackUrl", pathname);
            return NextResponse.redirect(signInUrl);
        }
    }
    */

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
        "/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|ads.txt|.*\\.png$|.*\\.jpg$|.*\\.jpeg$|.*\\.gif$|.*\\.svg$|.*\\.webp$|.*\\.ico$).*)",
    ],
};
