import { Metadata } from "next";
import { permanentRedirect } from "next/navigation";
import { siteConfig } from "@/config/site";

/**
 * Generated tool-vs-tool pages (C(n,2)) were near-duplicates.
 * next.config.mjs 301s /tools/compare/:a/:b → /tools.
 */
export const dynamicParams = false;

export async function generateStaticParams() {
  return [];
}

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
