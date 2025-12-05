import { auth } from "@/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
    const isLoggedIn = !!req.auth;
    const isOnTool = req.nextUrl.pathname.startsWith("/tools/");

    // Protect tool pages - require authentication
    if (isOnTool && !isLoggedIn) {
        const signInUrl = new URL("/sign-in", req.nextUrl.origin);
        signInUrl.searchParams.set("callbackUrl", req.nextUrl.pathname);
        return NextResponse.redirect(signInUrl);
    }

    return NextResponse.next();
});

export const config = {
    matcher: ["/tools/:path*"],
};
