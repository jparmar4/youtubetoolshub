import { ImageResponse } from "next/og";
import { MoneyShareImage, PIN_SIZE } from "@/lib/og-money";

export const runtime = "edge";

export async function GET() {
  return new ImageResponse(
    (
      <MoneyShareImage
        format="pin"
        accent="purple"
        eyebrow="2026 data free to cite"
        title="YouTube CPM by Country"
        subtitle="US $8–$25 · UK $6–$18 · India $0.50–$3. Finance niches earn 3–5× more."
        bullets={[
          "50+ countries tracked",
          "CPM vs RPM explained",
          "Pair with free earnings calculator",
          "youtubetoolshub.com/resources/youtube-cpm-rates",
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
