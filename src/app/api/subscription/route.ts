
import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { hasActiveSubscription } from "@/lib/subscription";

export async function GET() {
    try {
        let session = null;
        try {
            session = await auth();
        } catch {
            session = null;
        }
        if (!session || !session.user?.email) {
            return NextResponse.json({ isPro: false });
        }

        const email = session.user.email;

        return NextResponse.json({ isPro: await hasActiveSubscription(email) });

    } catch (error) {
        console.error("Subscription check error:", error);
        return NextResponse.json({ error: "Failed to check subscription" }, { status: 500 });
    }
}
