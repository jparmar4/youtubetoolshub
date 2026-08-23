import { Metadata } from "next";
import { permanentRedirect } from "next/navigation";
import { getToolBySlug } from "@/config/tools";
import { niches, programmaticTools } from "@/config/programmatic";
import { siteConfig } from "@/config/site";

/**
 * Tool × niche landings were thin templates that competed with parent tools.
 * Permanent redirect consolidates ranking signals. next.config.mjs also 301s
 * the known pairs so crawlers never have to render this route.
 */
export const dynamicParams = false;

export async function generateStaticParams() {
  return [];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; niche: string }>;
}): Promise<Metadata> {
  const { slug, niche: nicheId } = await params;
  const tool = getToolBySlug(slug);
  const niche = niches.find((n) => n.id === nicheId);
  const dest =
    tool && niche && programmaticTools.includes(slug)
      ? `${siteConfig.url}/tools/${slug}`
      : `${siteConfig.url}/tools`;

  return {
    title: "Moved permanently",
    robots: { index: false, follow: true },
    alternates: { canonical: dest },
  };
}

export default async function ProgrammaticToolPage({
  params,
}: {
  params: Promise<{ slug: string; niche: string }>;
}) {
  const { slug } = await params;
  permanentRedirect(`/tools/${slug}`);
}
