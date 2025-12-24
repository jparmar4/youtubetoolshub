
import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { supabase } from "@/lib/supabase";

export async function GET(request: Request) {
    try {
        const session = await auth();
        if (!session || !session.user?.email) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
            return NextResponse.json({ error: "Database not configured" }, { status: 503 });
        }

        // Fetch valid items for this user
        const { data, error } = await supabase
            .from('history_items')
            .select('*')
            .eq('user_email', session.user.email)
            .gt('expires_at', new Date().toISOString()) // Only non-expired
            .order('created_at', { ascending: false })
            .limit(50);

        if (error) throw error;

        // Map to frontend format
        const mapped = data.map(item => ({
            id: item.id,
            toolSlug: item.tool_slug,
            type: item.tool_slug.includes('audit') ? 'audit' :
                item.tool_slug.includes('title') ? 'title' :
                    item.tool_slug.includes('idea') ? 'idea' : 'other',
            content: item.content, // Supabase returns JSON automatically
            date: item.created_at,
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

        const retentionDays = isPro ? 30 : 5;
        const expiresAt = new Date();
        expiresAt.setDate(expiresAt.getDate() + retentionDays);

        const { data, error } = await supabase
            .from('history_items')
            .insert({
                user_email: session.user.email,
                tool_slug: toolSlug,
                content: content, // JSON columns handle objects natively
                expires_at: expiresAt.toISOString(),
            })
            .select('id')
            .single();

        if (error) throw error;

        return NextResponse.json({ id: data.id, success: true });
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

        const { error } = await supabase
            .from('history_items')
            .delete()
            .eq('id', id)
            .eq('user_email', session.user.email); // Security: Ensure deleting own item

        if (error) throw error;

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("History delete error:", error);
        return NextResponse.json({ error: "Failed to delete item" }, { status: 500 });
    }
}
