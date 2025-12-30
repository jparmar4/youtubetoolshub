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

    // 2. Auth Protection for Tools (Existing Logic)
    // We check if it's a tool page inside a localized path specifically?
    // Or just generic protection. The path might now be /en/tools/... or /tools/...
    // Let's defer auth check until after we resolve the path structure.

    // Check if there is any supported locale in the pathname
    const pathnameIsMissingLocale = i18n.locales.every(
        (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
    );

    // Redirect if there is no locale
    if (pathnameIsMissingLocale) {
        const locale = getLocale(request);

        // e.g. incoming request is /products
        // The new URL is now /en/products
        return NextResponse.redirect(
            new URL(`/${locale}${pathname.startsWith("/") ? "" : "/"}${pathname}`, request.url)
        );
    }

    // 3. Auth Check on localized paths
    // Path is like /en/tools/slug or /es/tools/slug
    // We want to protect /tools/* routes
    const isToolPage = i18n.locales.some(locale => pathname.startsWith(`/${locale}/tools/`));

    if (isToolPage) {
        const session = await auth();
        const isLoggedIn = !!session?.user;

        if (!isLoggedIn) {
            // Redirect to sign-in while preserving the current locale
            // Extract locale from path
            const locale = pathname.split('/')[1];
            const signInUrl = new URL(`/${locale}/sign-in`, request.url);
            signInUrl.searchParams.set("callbackUrl", pathname);
            return NextResponse.redirect(signInUrl);
        }
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
        "/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|ads.txt|.*\\.png$|.*\\.jpg$|.*\\.jpeg$|.*\\.gif$|.*\\.svg$|.*\\.webp$|.*\\.ico$).*)",
    ],
};
