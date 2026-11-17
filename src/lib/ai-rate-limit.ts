import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { enforceRateLimit, getRequestIp } from "@/lib/rate-limit";
import { hasActiveSubscription } from "@/lib/subscription";

/** Free/anonymous: keep abuse cost low while UI free tier is ~2/tool/day */
export const AI_FREE_HOURLY_LIMIT = 8;
export const AI_FREE_DAILY_LIMIT = 24;
export const AI_PRO_HOURLY_LIMIT = 60;
/** Pro users keep a generous daily ceiling too (60/hr × 10h of heavy use). */
export const AI_PRO_DAILY_LIMIT = 600;
/** Authoritative server-side enforcement of the advertised ~2/tool/day free tier. */
export const AI_TOOL_DAILY_FREE_LIMIT = 2;

const HOUR_MS = 60 * 60 * 1000;
const DAY_MS = 24 * HOUR_MS;

export interface AIAuthRateContext {
  ip: string;
  email: string | null;
  isPro: boolean;
}

export async function checkAIGlobalRateLimit(
  headers: Headers,
): Promise<
  | { allowed: true; context: AIAuthRateContext }
  | { allowed: false; response: NextResponse }
> {
  const ip = getRequestIp(headers);
  let email: string | null = null;
  try {
    const session = await auth();
    email = session?.user?.email || null;
  } catch (err) {
    console.warn("[AI Rate Limit] Failed to read auth session, continuing as anonymous:", err);
  }

  let isPro = false;
  if (email) {
    try {
      isPro = await hasActiveSubscription(email);
    } catch (err) {
      console.error("[AI Rate Limit] Failed to check subscription, falling back to free:", err);
      isPro = false;
    }
  }

  const hourlyKey = email ? `ai-text-h:user:${email}` : `ai-text-h:ip:${ip}`;
  const dailyKey = email ? `ai-text-d:user:${email}` : `ai-text-d:ip:${ip}`;
  const hourlyLimit = isPro ? AI_PRO_HOURLY_LIMIT : AI_FREE_HOURLY_LIMIT;
  const dailyLimit = isPro ? AI_PRO_DAILY_LIMIT : AI_FREE_DAILY_LIMIT;

  const hourly = enforceRateLimit(hourlyKey, hourlyLimit, HOUR_MS);
  if (!hourly.allowed) {
    return {
      allowed: false,
      response: NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429, headers: { "Retry-After": String(hourly.retryAfterSeconds) } },
      ),
    };
  }

  const daily = enforceRateLimit(dailyKey, dailyLimit, DAY_MS);
  if (!daily.allowed) {
    return {
      allowed: false,
      response: NextResponse.json(
        isPro
          ? { error: "Daily usage ceiling reached. Please try again tomorrow.", code: "DAILY_LIMIT" }
          : {
              error: "Daily free AI limit reached. Upgrade to Pro or try again tomorrow.",
              code: "DAILY_LIMIT",
            },
        { status: 429, headers: { "Retry-After": String(daily.retryAfterSeconds) } },
      ),
    };
  }

  return { allowed: true, context: { ip, email, isPro } };
}

export function checkAIToolDailyLimit(
  context: AIAuthRateContext,
  toolKey: string,
): { allowed: true } | { allowed: false; response: NextResponse } {
  if (context.isPro) {
    return { allowed: true };
  }

  const perToolKey = context.email
    ? `ai-tool-d:user:${context.email}:${toolKey}`
    : `ai-tool-d:ip:${context.ip}:${toolKey}`;
  const perTool = enforceRateLimit(perToolKey, AI_TOOL_DAILY_FREE_LIMIT, DAY_MS);

  if (!perTool.allowed) {
    return {
      allowed: false,
      response: NextResponse.json(
        {
          error: "Daily free limit for this tool reached. Upgrade to Pro or try again tomorrow.",
          code: "TOOL_DAILY_LIMIT",
        },
        { status: 429, headers: { "Retry-After": String(perTool.retryAfterSeconds) } },
      ),
    };
  }

  return { allowed: true };
}
