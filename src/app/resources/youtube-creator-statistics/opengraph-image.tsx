import { ImageResponse } from "next/og";
import { MoneyShareImage, OG_SIZE } from "@/lib/og-money";

export const alt = "YouTube Creator Statistics 2026 — RPM Tiers & Benchmarks";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <MoneyShareImage
        format="og"
        accent="purple"
        eyebrow="Creator Economy Data · 2026"
        title="YouTube Creator Statistics 2026"
        subtitle="Niche RPM tiers, subscriber milestone revenue context & platform-scale insights."
        bullets={[
          "Personal Finance & B2B SaaS Lead Advertiser Bids",
          "US/UK/CA/AU Audiences Drive 5x–15x RPM Lift",
          "70%+ Discovery via Suggested & Home Feeds",
        ]}
      />
    ),
    { ...size },
  );
}
