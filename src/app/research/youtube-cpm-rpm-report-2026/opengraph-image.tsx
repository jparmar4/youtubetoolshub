import { ImageResponse } from "next/og";
import { MoneyShareImage, OG_SIZE } from "@/lib/og-money";

export const alt = "2026 YouTube Creator Economy & CPM/RPM Benchmark Report";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <MoneyShareImage
        format="og"
        accent="emerald"
        eyebrow="Original Research · 2026"
        title="2026 YouTube CPM & RPM Benchmark Report"
        subtitle="Audited dataset across 52 countries, Tier-1 vs Tier-2/3 RPM, Shorts splits & Top 12 niches."
        bullets={[
          "Tier-1 Long-Form Avg: $6.50–$15.00 RPM ($8.50 US)",
          "Top Niches: Finance $18–$48 CPM · B2B SaaS $16–$42 CPM",
          "Shorts RPM: $0.03–$0.08 vs Long-Form Watch Page",
        ]}
      />
    ),
    { ...size },
  );
}
