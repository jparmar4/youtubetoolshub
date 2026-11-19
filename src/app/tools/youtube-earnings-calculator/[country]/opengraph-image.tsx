import { ImageResponse } from "next/og";
import { countryCPMData, estimateEarnings, getCountryBySlug, getCountryTier } from "@/lib/cpm-data";
import { MoneyShareImage, OG_SIZE } from "@/lib/og-money";

export const alt = "YouTube Earnings Calculator by Country (2026)";
export const size = OG_SIZE;
export const contentType = "image/png";
export const dynamicParams = false;

export function generateStaticParams() {
  return countryCPMData.map((country) => ({ country: country.slug }));
}

export default async function OpenGraphImage({
  params,
}: {
  params: Promise<{ country: string }>;
}) {
  const { country: slug } = await params;
  const country = getCountryBySlug(slug);

  if (!country) {
    return new ImageResponse(
      (
        <MoneyShareImage
          format="og"
          accent="emerald"
          eyebrow="2026 AdSense Benchmarks"
          title="YouTube Earnings Calculator"
          subtitle="Compare 2026 CPM & RPM rates across 52 global creator markets."
        />
      ),
      { ...size },
    );
  }

  const tier = getCountryTier(country.code);
  const earn1m = Math.round(estimateEarnings(1_000_000, country.rpmRange.avg));

  return new ImageResponse(
    (
      <MoneyShareImage
        format="og"
        accent="emerald"
        eyebrow={`${country.code} · ${tier.label} · 2026`}
        title={`YouTube Earnings in ${country.name}`}
        subtitle={`Model local ${country.currency} AdSense RPM, tax withholding & 1M view projections.`}
        bullets={[
          `CPM $${country.cpmRange.min.toFixed(2)}–$${country.cpmRange.max.toFixed(2)} (Avg $${country.cpmRange.avg.toFixed(2)})`,
          `Creator RPM $${country.rpmRange.min.toFixed(2)}–$${country.rpmRange.max.toFixed(2)} (Avg $${country.rpmRange.avg.toFixed(2)})`,
          `1M Views ≈ $${earn1m.toLocaleString("en-US")} USD`,
        ]}
      />
    ),
    { ...size },
  );
}
