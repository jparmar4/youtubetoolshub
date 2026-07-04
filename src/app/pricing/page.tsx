import { Metadata } from "next";
import PricingClient from "@/components/pricing/PricingClient";
import GeoAeoHead from "@/components/seo/GeoAeoHead";
import { GEO_AEO_PRESETS } from "@/config/geo-aeo";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Pricing - Free vs Premium Plans (Save 50% Today)",
  description:
    "Compare Free vs Premium plans for YouTube Tools Hub. Core tools are free to use, while Pro offers higher limits and priority access for power users.",
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
      "YouTube Tools Hub pricing: core tools are free to use. Pro offers higher daily limits and priority access for power users. No credit card required.",
    type: "website",
    url: `${siteConfig.url}/pricing`,
    images: [
      {
        url: `${siteConfig.url}/og-image.png`,
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
      "Core tools are free to use. Pro offers higher daily limits and priority access. No credit card required to start.",
    images: [`${siteConfig.url}/og-image.png`],
  },
  alternates: {
    canonical: "/pricing",
    
  },
};

export default function PricingPage() {
  return (
    <>
      <GeoAeoHead {...GEO_AEO_PRESETS.pricingPage} pathname="/pricing" />
      <PricingClient />
    </>
  );
}
