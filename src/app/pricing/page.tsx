import { Metadata } from "next";
import PricingClient from "@/components/pricing/PricingClient";
import GeoAeoHead from "@/components/seo/GeoAeoHead";
import { GEO_AEO_PRESETS } from "@/config/geo-aeo";

export const metadata: Metadata = {
  title: "Pricing - Free vs Premium Plans (Save 50% Today)",
  description:
    "Compare Free vs Premium plans for YouTube Tools Hub. 21+ core tools are 100% free forever. Get unlimited access to AI Title Generator, 4K Thumbnail Downloader, and advanced SEO insights with Pro.",
  keywords: [
    "youtube tools hub pricing",
    "youtube tools hub free",
    "youtube tools hub pro plan",
    "free youtube seo tools",
    "youtube tools hub premium",
    "tubebuddy alternative pricing",
    "vidiq alternative free",
    "free youtube growth tools",
  ],
  openGraph: {
    title: "Pricing – YouTube Tools Hub | Free & Pro Plans",
    description:
      "YouTube Tools Hub pricing: 21+ core tools are 100% free forever. Pro tier offers higher daily limits and priority access for power users. No credit card required.",
    type: "website",
    url: "https://www.youtubetoolshub.com/pricing",
    images: [
      {
        url: "https://www.youtubetoolshub.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "YouTube Tools Hub Pricing – Free & Pro Plans",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pricing – YouTube Tools Hub | Free & Pro Plans",
    description:
      "21+ core tools are 100% free forever. Pro tier offers higher daily limits and priority access. No credit card required to start.",
    images: ["https://www.youtubetoolshub.com/og-image.png"],
  },
  alternates: {
    canonical: "/pricing",
    languages: {
      en: "/pricing",
      "x-default": "/pricing",
    },
  },
};

export default function PricingPage() {
  return (
    <>
      <GeoAeoHead {...GEO_AEO_PRESETS.pricingPage} />
      <PricingClient />
    </>
  );
}
