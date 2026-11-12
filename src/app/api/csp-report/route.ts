import { NextRequest, NextResponse } from "next/server";
import { enforceRateLimit, getRequestIp } from "@/lib/rate-limit";

export const dynamic = "force-dynamic";

/**
 * CSP violation report collector. Browsers POST JSON here when a directive
 * in the Content-Security-Policy is violated — surface any injection attempts
 * or broken vendor scripts in the server logs instead of silence.
 *
 * Reports are attacker-controllable data: log only, never render, and rate
 * limit hard so a page full of violations can't spam the log.
 */
export async function POST(request: NextRequest) {
    const ip = getRequestIp(request.headers);
    const rateLimit = enforceRateLimit(`csp-report:${ip}`, 20, 60 * 60 * 1000);
    if (!rateLimit.allowed) {
        return new NextResponse(null, { status: 429 });
    }

    try {
        const report = await request.json();
        const violation = report?.["csp-report"] ?? report;
        const directive = violation?.["effective-directive"] ?? "unknown";
        const blocked = violation?.["blocked-uri"] ?? "unknown";
        const source = violation?.["source-file"] ?? violation?.documentUri ?? "unknown";

        console.warn(
            `[CSP] violated ${directive} blocked ${blocked} from ${source} (ip=${ip})`,
        );
    } catch {
        // Malformed report bodies are ignored — CSP reporting is best-effort.
    }

    return new NextResponse(null, { status: 204 });
}

// Some browsers send the report with the deprecated `application/json` content
// type without a preflight; accept any content type on POST only.
export async function GET() {
    return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}
