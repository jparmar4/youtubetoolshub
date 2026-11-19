import { ImageResponse } from "next/og";
import { MoneyShareImage, OG_SIZE } from "@/lib/og-money";

export const alt = "How the YouTube Algorithm Works in 2026 — 7 Ranking Factors";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <MoneyShareImage
        format="og"
        accent="purple"
        eyebrow="Algorithm Blueprint · 2026"
        title="How the YouTube Algorithm Works"
        subtitle="The 7 core signals across Home, Suggested, Search & Shorts recommendations."
        bullets={[
          "CTR + 30s Hook + Average View Duration",
          "Viewer Satisfaction & Session Time Chains",
          "Long-Form vs Shorts Ranking Playbook",
        ]}
      />
    ),
    { ...size },
  );
}
