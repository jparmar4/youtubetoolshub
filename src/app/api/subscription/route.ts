
import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { db } from "@/lib/db";

export async function GET(request: Request) {
    try {
        const session = await auth();
        if (!session || !session.user?.email) {
            return NextResponse.json({ isPro: false });
        }

        const email = session.user.email;

        const { rows } = await db.sql`
            SELECT * FROM subscriptions 
            WHERE user_email = ${email} 
            AND status = 'active'
        `;

        if (rows.length > 0) {
            const sub = rows[0];
            const endDate = new Date(sub.end_date);
            if (endDate > new Date()) {
                return NextResponse.json({ isPro: true, plan: sub.plan });
            }
        }

        return NextResponse.json({ isPro: false });

    } catch (error) {
        console.error("Subscription check error:", error);
        return NextResponse.json({ error: "Failed to check subscription" }, { status: 500 });
    }
}
