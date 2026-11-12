import { NextRequest, NextResponse } from "next/server";
import { enforceRateLimit, getRequestIp } from "@/lib/rate-limit";
import { db } from "@/lib/db";

export async function POST(request: NextRequest) {
  try {
    const ip = getRequestIp(request.headers);
    const rateLimit = enforceRateLimit(`newsletter:${ip}`, 5, 60 * 60 * 1000);
    if (!rateLimit.allowed) {
      return NextResponse.json(
        { error: "Too many subscription attempts. Please try again later." },
        { status: 429, headers: { "Retry-After": String(rateLimit.retryAfterSeconds) } },
      );
    }

    const body = await request.json().catch(() => null);
    if (!body) {
      return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
    }
    const { email } = body;

    // Validate email
    if (!email || typeof email !== "string") {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 },
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 },
      );
    }

    const normalizedEmail = email.toLowerCase().trim();
    if (normalizedEmail.length > 254) {
      return NextResponse.json(
        { error: "Email address is too long" },
        { status: 400 },
      );
    }

    // Check for duplicates directly in MySQL (the single durable store).
    try {
      const existing = await db.sql`
        SELECT email FROM newsletter_subscribers WHERE email = ${normalizedEmail} LIMIT 1
      `;
      if (Array.isArray(existing) && existing.length > 0) {
        return NextResponse.json(
          { message: "You're already subscribed! Check your inbox for our latest tips." },
          { status: 200 },
        );
      }
    } catch (dbErr) {
      console.error("[Newsletter] Duplicate check error:", dbErr);
      // Fall through — INSERT IGNORE below still prevents duplicates.
    }

    const source = (request.headers.get("referer") || "direct").slice(0, 500);

    // Persist to MySQL (INSERT IGNORE guards against duplicate-key races).
    await db.sql`
      INSERT IGNORE INTO newsletter_subscribers (email, source)
      VALUES (${normalizedEmail}, ${source})
    `;

    return NextResponse.json(
      { message: "Successfully subscribed! Welcome to YouTube Tools Hub." },
      { status: 201 },
    );
  } catch (error) {
    console.error("[Newsletter] Error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { error: "Method not allowed" },
    { status: 405 },
  );
}
