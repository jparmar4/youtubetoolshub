import { ImageResponse } from "next/og";
import { MoneyShareImage, OG_SIZE } from "@/lib/og-money";

export const alt = "YouTube CPM Rates by Country 2026 — Full data table";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <MoneyShareImage
        format="og"
        accent="purple"
        eyebrow="Data · Updated 2026"
        title="YouTube CPM Rates by Country"
        subtitle="50+ markets. US avg CPM ~$14.50. Finance niches up to $50. Free to cite."
        bullets={[
          "Tier 1 · Tier 2 · Tier 3 tables",
          "CPM and RPM side by side",
          "Links to country earnings calculators",
        ]}
      />
    ),
    { ...size },
  );
}
