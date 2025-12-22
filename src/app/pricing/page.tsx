import { Metadata } from "next";
import PricingClient from "@/components/pricing/PricingClient";

export const metadata: Metadata = {
    title: "Pricing - YouTube Tools Hub",
    description: "Simple, honest pricing for YouTube creators. Start free, upgrade for unlimited AI access.",
    alternates: {
        canonical: "/pricing",
    },
};

export default function PricingPage() {
    return <PricingClient />;
}
