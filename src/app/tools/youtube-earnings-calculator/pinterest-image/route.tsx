import { ImageResponse } from "next/og";
import { MoneyShareImage, PIN_SIZE } from "@/lib/og-money";

export const runtime = "edge";

/** Tall 2:3 pin for Pinterest (1000×1500) */
export async function GET() {
  return new ImageResponse(
    (
      <MoneyShareImage
        format="pin"
        accent="emerald"
        eyebrow="Free · No signup"
        title="YouTube Earnings Calculator"
        subtitle="How much does YouTube pay? Estimate AdSense from views & RPM — with country CPM ranges."
        bullets={[
          "(views ÷ 1,000) × RPM",
          "100K views × $5 ≈ $500/mo",
          "US · UK · India · 50+ countries",
          "youtubetoolshub.com",
        ]}
      />
    ),
    {
      ...PIN_SIZE,
      headers: {
        "Cache-Control": "public, max-age=86400, stale-while-revalidate=604800",
      },
    },
  );
}
