import { Metadata } from "next";
import PricingClient from "@/components/pricing/PricingClient";

export const metadata: Metadata = {
    title: "Pricing - Free vs Premium Plans (Save 50% Today)",
    description: "Compare Free vs Premium plans. Get unlimited access to AI Title Generator, 4K Thumbnail Downloader, and advanced SEO insights. Start for free.",
    alternates: {
        canonical: "/pricing",
        languages: {
            "en": "/pricing",
            "x-default": "/pricing",
        },
    },
};

export default function PricingPage() {
    return <PricingClient />;
}
