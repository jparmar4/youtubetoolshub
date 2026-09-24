import { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { getBreadcrumbSchema, getGlobalAlternates } from "@/lib/seo";
import GeoAeoHead from "@/components/seo/GeoAeoHead";
import { GEO_AEO_PRESETS } from "@/config/geo-aeo";

export const metadata: Metadata = {
  title: "YouTube Creator Resources & Guides",
  description:
    "Free YouTube creator resources: CPM rate benchmarks, algorithm guides, monetization playbooks, creator statistics, and link-to-us assets.",
  alternates: getGlobalAlternates("/resources"),
  robots: { index: true, follow: true },
};

const resources = [
  {
    href: "/resources/youtube-cpm-rates",
    title: "YouTube CPM Rates by Country & Niche",
    description:
      "2026 CPM and RPM benchmarks for 50+ countries and high-paying niches so you can price sponsorships and forecast ad revenue.",
  },
  {
    href: "/resources/youtube-creator-statistics",
    title: "YouTube Creator Statistics 2026",
    description:
      "Channel counts, watch-time trends, Shorts vs long-form stats, and monetization benchmarks every creator should know.",
  },
  {
    href: "/resources/youtube-algorithm-guide",
    title: "YouTube Algorithm Guide",
    description:
      "How the recommendation system ranks videos, and the packaging and retention signals you can actually control.",
  },
  {
    href: "/resources/youtube-monetization-guide",
    title: "YouTube Monetization Guide",
    description:
      "AdSense eligibility, RPM levers, memberships, Super Chats, and brand-deal math explained end to end.",
  },
  {
    href: "/resources/link-to-us",
    title: "Link to Us — Badges & Widgets",
    description:
      "Embeddable badges, calculator widgets, and attribution links for blogs and communities that reference our tools.",
  },
];

export default function ResourcesIndexPage() {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: siteConfig.url },
    { name: "Resources", url: `${siteConfig.url}/resources` },
  ]);

  return (
    <>
      <GeoAeoHead
        {...GEO_AEO_PRESETS.resourcePage(
          "YouTube Creator Resources & Guides",
          "Free YouTube creator resources: CPM rates, algorithm guides, monetization playbooks, and statistics.",
          "YouTube creator resources",
          "Free long-form guides covering CPM benchmarks, the recommendation algorithm, monetization levers, and channel statistics.",
          [
            "CPM rates for 50+ countries",
            "Algorithm and packaging explainers",
            "Monetization and brand-deal playbooks",
            "Embeddable badges and widgets",
          ],
        )}
        pathname="/resources"
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <div className="max-w-4xl mx-auto px-4 py-16">
        <nav aria-label="Breadcrumb" className="text-sm text-slate-500 mb-6">
          <Link href="/" className="hover:text-purple-600">
            Home
          </Link>
          <span aria-hidden="true" className="mx-2">
            /
          </span>
          <span aria-current="page">Resources</span>
        </nav>
        <h1 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">
          YouTube Creator Resources
        </h1>
        <p className="text-slate-600 mb-10 max-w-2xl">
          Long-form benchmarks, algorithm explainers, and monetization playbooks — free, no
          signup required.
        </p>
        <ul className="space-y-4">
          {resources.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="block rounded-2xl border border-slate-200 bg-white p-6 hover:border-purple-300 hover:shadow-md transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600"
              >
                <h2 className="text-xl font-bold text-slate-900 mb-2">{item.title}</h2>
                <p className="text-slate-600 text-sm">{item.description}</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
