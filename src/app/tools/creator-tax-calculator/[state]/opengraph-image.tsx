import { ImageResponse } from "next/og";
import {
  US_STATE_CREATOR_TAXES,
  calculateCreatorStateTaxSummary,
  getStateTaxBySlug,
} from "@/data/usStateCreatorTaxes";
import { MoneyShareImage, OG_SIZE } from "@/lib/og-money";

export const alt = "US State YouTube Creator Tax & S-Corp Calculator (2026)";
export const size = OG_SIZE;
export const contentType = "image/png";
export const dynamicParams = false;

export function generateStaticParams() {
  return US_STATE_CREATOR_TAXES.map((s) => ({ state: s.slug }));
}

export default async function OpenGraphImage({
  params,
}: {
  params: Promise<{ state: string }>;
}) {
  const { state: slug } = await params;
  const state = getStateTaxBySlug(slug);

  if (!state) {
    return new ImageResponse(
      (
        <MoneyShareImage
          format="og"
          accent="purple"
          eyebrow="IRS 2026 Creator Taxes"
          title="US State YouTube Tax Calculator"
          subtitle="Model 15.3% SE tax, LLC fees & Form 2553 S-Corp savings across 50 states + DC."
        />
      ),
      { ...size },
    );
  }

  const summary = calculateCreatorStateTaxSummary(state, 100_000);
  const stateTaxLabel =
    state.topIncomeTaxRate === 0
      ? "0% State Income Tax (2026)"
      : `Up to ${state.topIncomeTaxRate}% ${state.taxStructure} State Tax`;

  return new ImageResponse(
    (
      <MoneyShareImage
        format="og"
        accent="purple"
        eyebrow={`${state.stateCode} · 2026 Creator Taxes`}
        title={`${state.stateName} YouTube Tax & S-Corp Calculator`}
        subtitle="Federal 15.3% SE tax ($184.5K cap), state brackets, LLC fees & Form 2553 savings."
        bullets={[
          stateTaxLabel,
          `LLC Fee: $${state.llcFilingFee} filing / $${state.llcAnnualFee}/yr`,
          `$100K S-Corp Savings ≈ +$${summary.estimatedSCorpNetSavings.toLocaleString("en-US")}/yr`,
        ]}
      />
    ),
    { ...size },
  );
}
