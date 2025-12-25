
import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { db } from "@/lib/db";

export async function GET(request: Request) {
    try {
        const session = await auth();
        if (!session || !session.user?.email) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const email = session.user.email;

        // Fetch valid items for this user
        const { rows } = await db.sql`
            SELECT * FROM history_items 
            WHERE user_email = ${email} 
            AND expires_at > NOW() 
            ORDER BY created_at DESC 
            LIMIT 50
        `;

        // Map to frontend format
        const mapped = rows.map(item => ({
            id: item.id,
            tool_slug: item.tool_slug,
            type: item.type || (item.tool_slug.includes('audit') ? 'audit' :
                item.tool_slug.includes('title') ? 'title' :
                    item.tool_slug.includes('idea') ? 'idea' : 'other'),
            content: item.content,
            created_at: item.created_at,
        }));

        return NextResponse.json(mapped);
    } catch (error) {
        console.error("History fetch error:", error);
        return NextResponse.json({ error: "Failed to fetch history" }, { status: 500 });
    }
}

// Save item
export async function POST(request: Request) {
    try {
        const session = await auth();
        if (!session || !session.user?.email) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const body = await request.json();
        const { toolSlug, type, content, isPro } = body;
        const email = session.user.email;

        const retentionDays = isPro ? 30 : 5;
        const expiresAt = new Date();
        expiresAt.setDate(expiresAt.getDate() + retentionDays);

        const id = crypto.randomUUID();

        await db.sql`
            INSERT INTO history_items (id, user_email, tool_slug, content, type, expires_at)
            VALUES (${id}, ${email}, ${toolSlug}, ${content}, ${type || 'other'}, ${expiresAt.toISOString()})
        `;

        return NextResponse.json({ id: id, success: true });
    } catch (error) {
        console.error("History save error:", error);
        return NextResponse.json({ error: "Failed to save item" }, { status: 500 });
    }
}

// Delete item
export async function DELETE(request: Request) {
    try {
        const session = await auth();
        if (!session || !session.user?.email) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { searchParams } = new URL(request.url);
        const id = searchParams.get("id");

        if (!id) {
            return NextResponse.json({ error: "Missing ID" }, { status: 400 });
        }

        const email = session.user.email;

        await db.sql`
            DELETE FROM history_items 
            WHERE id = ${id} AND user_email = ${email}
        `;

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("History delete error:", error);
        return NextResponse.json({ error: "Failed to delete item" }, { status: 500 });
    }
}
