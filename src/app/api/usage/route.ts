
import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { db } from "@/lib/db";

// Fetch usage
export async function GET(request: Request) {
    try {
        const session = await auth();
        // If no user, we can returns null or specific status. 
        // Usage lib handles guest logic, here we only serve logged in users.
        if (!session || !session.user?.email) {
            return NextResponse.json({ usage: null });
        }

        const email = session.user.email;
        const today = new Date().toISOString().split('T')[0];

        // Fetch usage record
        const { rows } = await db.sql`
            SELECT * FROM user_usage WHERE user_email = ${email}
        `;

        const record = rows[0];

        // If no record or old date, return empty usage
        if (!record || record.date.toISOString().split('T')[0] !== today) {
            return NextResponse.json({ usage: {} });
        }

        return NextResponse.json({ usage: record.usage_data });

    } catch (error) {
        console.error("Usage fetch error:", error);
        return NextResponse.json({ error: "Failed to fetch usage" }, { status: 500 });
    }
}

// Increment usage
export async function POST(request: Request) {
    try {
        const session = await auth();
        if (!session || !session.user?.email) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { toolSlug } = await request.json();
        const email = session.user.email;
        const today = new Date().toISOString().split('T')[0];

        // We need to fetch, check date, increment, and save.
        // Postgres does not have deep merge for jsonb easily for this specific "increment field" logic via single query without functions.
        // So we will do read-modify-write which is acceptable here.

        const { rows } = await db.sql`
            SELECT * FROM user_usage WHERE user_email = ${email}
        `;

        let currentUsage = {};
        let needsReset = true;

        if (rows.length > 0) {
            const record = rows[0];
            // Check if date matches (handling Date object from postgres)
            const recordDate = new Date(record.date).toISOString().split('T')[0];

            if (recordDate === today) {
                currentUsage = record.usage_data;
                needsReset = false;
            }
        }

        // Increment
        const stats = currentUsage as Record<string, number>;
        const currentCount = stats[toolSlug] || 0;
        const newCount = currentCount + 1;

        const newUsage = { ...stats, [toolSlug]: newCount };
        const usageJson = JSON.stringify(newUsage);

        // Save
        await db.sql`
            INSERT INTO user_usage (user_email, date, usage_data)
            VALUES (${email}, ${today}, ${usageJson}::jsonb)
            ON CONFLICT (user_email)
            DO UPDATE SET date = ${today}, usage_data = ${usageJson}::jsonb
        `;

        return NextResponse.json({ usage: newCount });

    } catch (error) {
        console.error("Usage increment error:", error);
        return NextResponse.json({ error: "Failed to increment usage" }, { status: 500 });
    }
}
