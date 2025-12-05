import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
    ],
    pages: {
        signIn: "/sign-in",
        error: "/auth/error",
    },
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user;
            const isOnTool = nextUrl.pathname.startsWith("/tools/");

            if (isOnTool) {
                if (isLoggedIn) return true;
                return false; // Redirect to sign-in page
            }

            return true;
        },
    },
    debug: process.env.NODE_ENV === "development",
});
