import { ImageResponse } from "next/og";
import { MoneyShareImage, OG_SIZE } from "@/lib/og-money";

export const alt = "YouTube Monetization Guide 2026 — YPP Rules, RPM & Revenue Streams";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <MoneyShareImage
        format="og"
        accent="emerald"
        eyebrow="Monetization Playbook · 2026"
        title="YouTube Monetization Guide 2026"
        subtitle="YPP 500 & 1,000 sub tiers, 8 creator revenue streams, CPM vs RPM & Q4 scaling."
        bullets={[
          "Full AdSense YPP: 1K subs + 4K hours or 10M Shorts",
          "Early Fan Funding: 500 subs + 3K hours or 3M Shorts",
          "55% Long-Form Watch Share · 8+ Min Mid-Roll Strategy",
        ]}
      />
    ),
    { ...size },
  );
}
