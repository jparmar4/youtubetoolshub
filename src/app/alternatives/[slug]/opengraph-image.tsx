import { ImageResponse } from "next/og";
import {
  COMPETITOR_ALTERNATIVES,
  getCompetitorAlternativeBySlug,
} from "@/data/competitorAlternatives";
import { MoneyShareImage, OG_SIZE } from "@/lib/og-money";

export const alt = "Free YouTube Tool Alternatives Comparison (2026)";
export const size = OG_SIZE;
export const contentType = "image/png";
export const dynamicParams = false;

export function generateStaticParams() {
  return COMPETITOR_ALTERNATIVES.map((item) => ({ slug: item.slug }));
}

export default async function OpenGraphImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const altItem = getCompetitorAlternativeBySlug(slug);

  if (!altItem) {
    return new ImageResponse(
      (
        <MoneyShareImage
          format="og"
          accent="purple"
          eyebrow="2026 Tool Comparison"
          title="Free YouTube SaaS Alternatives"
          subtitle="Run browser-first YouTube tools free with zero credit card or Chrome extension."
        />
      ),
      { ...size },
    );
  }

  return new ImageResponse(
    (
      <MoneyShareImage
        format="og"
        accent="purple"
        eyebrow={`${altItem.annualSavingsLabel} · 2026`}
        title={`Free ${altItem.competitorName} Alternative`}
        subtitle={`Side-by-side feature matrix + live ${altItem.embeddedToolTitle} embedded free.`}
        bullets={[
          `${altItem.ytToolsHubCost} vs ${altItem.competitorStartingPrice}`,
          `Live Tool: ${altItem.embeddedToolTitle}`,
          "No OAuth permissions or browser extension needed",
        ]}
      />
    ),
    { ...size },
  );
}
