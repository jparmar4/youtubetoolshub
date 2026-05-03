import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { siteConfig } from "@/config/site";

const canonicalAuthUrl = process.env.AUTH_URL || process.env.NEXTAUTH_URL || siteConfig.url;

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

            if (url.startsWith("/")) {
                return `${canonicalBaseUrl}${url}`;
            }

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

            if (url.startsWith(baseUrl)) {
                return url.replace(baseUrl, canonicalBaseUrl);
            }

            return canonicalBaseUrl;
        },
    },
});
