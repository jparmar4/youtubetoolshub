import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { siteConfig } from "@/config/site";

function getCanonicalAuthUrl() {
    if (process.env.NODE_ENV === "development") {
        return (process.env.AUTH_URL || process.env.NEXTAUTH_URL || "http://localhost:3000").replace(/\/$/, "");
    }

    const configuredUrl = process.env.AUTH_URL || process.env.NEXTAUTH_URL;

    if (configuredUrl) {
        const cleaned = configuredUrl.replace(/\/$/, "");
        if (cleaned.includes("youtubetoolshub.com")) {
            return "https://www.youtubetoolshub.com";
        }
        return cleaned;
    }

    return siteConfig.url.replace(/\/$/, "");
}

const canonicalAuthUrl = getCanonicalAuthUrl();

process.env.AUTH_URL = canonicalAuthUrl;
process.env.NEXTAUTH_URL = canonicalAuthUrl;

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
    ],
    secret: process.env.AUTH_SECRET,
    pages: {
        signIn: "/sign-in",
        error: "/auth/error",
    },
    session: {
        strategy: "jwt",
        maxAge: 2 * 60 * 60, // 2 hours
    },
    debug: process.env.NODE_ENV === "development",
    trustHost: true,
    callbacks: {
        async redirect({ url, baseUrl }) {
            const canonicalBaseUrl = canonicalAuthUrl.replace(/\/$/, "");

            // Relative app paths only — reject protocol-relative "//host" and "/\host".
            if (url.startsWith("/") && !url.startsWith("//") && !url.startsWith("/\\")) {
                return `${canonicalBaseUrl}${url}`;
            }

            // Absolute URLs: require an exact site hostname (blocks @evil / .evil.com tricks).
            try {
                const parsedUrl = new URL(url);
                if (
                    parsedUrl.hostname === "youtubetoolshub.com" ||
                    parsedUrl.hostname === "www.youtubetoolshub.com"
                ) {
                    parsedUrl.protocol = "https:";
                    parsedUrl.hostname = "www.youtubetoolshub.com";
                    return parsedUrl.toString();
                }
            } catch {
                return canonicalBaseUrl;
            }

            // Never fall back to prefix matching — that reopens open redirects.
            if (baseUrl && url === baseUrl) return canonicalBaseUrl;
            return canonicalBaseUrl;
        },
    },
});
