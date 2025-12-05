import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "@/auth";

export default async function middleware(request: NextRequest) {
    const session = await auth();
    const isLoggedIn = !!session?.user;
    const pathname = request.nextUrl.pathname;

    // Protect tool pages - require authentication
    if (pathname.startsWith("/tools/") && !isLoggedIn) {
        const signInUrl = new URL("/sign-in", request.url);
        signInUrl.searchParams.set("callbackUrl", pathname);
        return NextResponse.redirect(signInUrl);
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/tools/:path*"],
};
