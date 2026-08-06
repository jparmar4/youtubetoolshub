import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

const SUBSCRIBERS_FILE = path.join(process.cwd(), "data", "subscribers.json");

interface Subscriber {
  email: string;
  subscribedAt: string;
  source: string;
}

async function getSubscribers(): Promise<Subscriber[]> {
  try {
    const data = await fs.readFile(SUBSCRIBERS_FILE, "utf-8");
    return JSON.parse(data);
  } catch {
    return [];
  }
}

async function saveSubscribers(subscribers: Subscriber[]): Promise<void> {
  const dir = path.dirname(SUBSCRIBERS_FILE);
  await fs.mkdir(dir, { recursive: true });
  await fs.writeFile(SUBSCRIBERS_FILE, JSON.stringify(subscribers, null, 2), "utf-8");
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
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

    // Check for duplicates
    const subscribers = await getSubscribers();
    const exists = subscribers.some((s) => s.email === normalizedEmail);

    if (exists) {
      return NextResponse.json(
        { message: "You're already subscribed! Check your inbox for our latest tips." },
        { status: 200 },
      );
    }

    // Add new subscriber
    subscribers.push({
      email: normalizedEmail,
      subscribedAt: new Date().toISOString(),
      source: request.headers.get("referer") || "direct",
    });

    await saveSubscribers(subscribers);

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
