import { ImageResponse } from "next/og";
import { MoneyShareImage, OG_SIZE } from "@/lib/og-money";

export const alt =
  "YouTube Earnings Calculator 2026 — Free RPM & CPM estimator";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <MoneyShareImage
        format="og"
        accent="emerald"
        eyebrow="Free tool · 2026"
        title="YouTube Earnings Calculator"
        subtitle="Estimate AdSense revenue from views & RPM. Country CPM context for 50+ markets."
        bullets={[
          "Formula: (views ÷ 1,000) × RPM",
          "Example: 100K views × $5 ≈ $500/mo",
          "No signup · Instant results",
        ]}
      />
    ),
    { ...size },
  );
}
