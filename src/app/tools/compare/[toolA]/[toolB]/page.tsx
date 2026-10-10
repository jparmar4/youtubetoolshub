import { Metadata } from "next";
import { permanentRedirect } from "next/navigation";
import { siteConfig } from "@/config/site";

/**
 * Generated tool-vs-tool pages (C(n,2)) were retired near-duplicates.
 * Permanently redirect all incoming crawler requests to /tools.
 */
export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Moved permanently",
    robots: { index: false, follow: true },
    alternates: { canonical: `${siteConfig.url}/tools` },
  };
}

export default async function ComparisonPage() {
  permanentRedirect("/tools");
}
