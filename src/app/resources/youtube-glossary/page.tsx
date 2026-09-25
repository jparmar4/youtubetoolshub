import { Metadata } from "next";
import Link from "next/link";

import { glossaryTerms, type GlossaryTerm } from "@/config/glossary";
import { siteConfig } from "@/config/site";
import {
  getBreadcrumbSchema,
  getDefinedTermSetSchema,
  getFAQSchema,
  getGlobalAlternates,
} from "@/lib/seo";
import { DATA_LAST_REVIEWED } from "@/lib/seo-data";
import GeoAeoHead from "@/components/seo/GeoAeoHead";
import { GEO_AEO_PRESETS } from "@/config/geo-aeo";

const GLOSSARY_PATH = "/resources/youtube-glossary";

export const metadata: Metadata = {
  title: { absolute: "YouTube Glossary: 44 Creator Terms Defined (2026)" },
  description:
    "Plain-English definitions of YouTube creator terms: CPM, RPM, CTR, watch time, YPP, Content ID, Shorts revenue, retention, and more — direct answers, no jargon.",
  keywords: [
    "youtube glossary",
    "youtube terms explained",
    "what is cpm youtube",
    "youtube rpm meaning",
    "youtube creator terminology",
  ],
  alternates: getGlobalAlternates(GLOSSARY_PATH),
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "YouTube Glossary: 44 Creator Terms Defined (2026)",
    description:
      "Every YouTube creator term defined in plain English — CPM, RPM, CTR, YPP, Content ID, retention, and more.",
    type: "article",
    url: `${siteConfig.url}${GLOSSARY_PATH}`,
    modifiedTime: `${DATA_LAST_REVIEWED}T12:00:00.000Z`,
    images: [
      {
        url: `${siteConfig.url}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "YouTube creator glossary — YouTube Tools Hub",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "YouTube Glossary: 44 Creator Terms Defined (2026)",
    description:
      "Every YouTube creator term defined in plain English — CPM, RPM, CTR, YPP, Content ID, retention, and more.",
    images: [`${siteConfig.url}/og-image.png`],
  },
};

const GROUP_LABELS: Record<GlossaryTerm["group"], string> = {
  monetization: "Monetization & Earnings",
  analytics: "Analytics & Performance",
  content: "Content & Production",
  growth: "Growth & Channel Strategy",
  policy: "Rules & Rights",
};

const GROUP_ORDER: GlossaryTerm["group"][] = [
  "monetization",
  "analytics",
  "content",
  "growth",
  "policy",
];

const faqs = [
  {
    question: "What is the difference between CPM and RPM on YouTube?",
    answer:
      "CPM is what advertisers pay per 1,000 ad impressions; RPM is what you actually earn per 1,000 video views after YouTube's 45% share and non-monetized views are removed. RPM is always the realistic number for earnings planning.",
  },
  {
    question: "What does CTR mean on YouTube?",
    answer:
      "Click-through rate: the percentage of viewers who click your thumbnail after seeing it. Most healthy channels land between 4% and 10%, though the number varies with how widely YouTube shows the impressions.",
  },
  {
    question: "What is the YouTube Partner Program?",
    answer:
      "The program that unlocks AdSense revenue, memberships, and Super Thanks. Standard entry needs 1,000 subscribers plus 4,000 public watch hours in 12 months (or 10 million Shorts views in 90 days); a 500-subscriber tier unlocks fan funding earlier.",
  },
  {
    question: "What is the difference between a copyright claim and a strike?",
    answer:
      "A claim (usually Content ID) redirects revenue or limits playback but doesn't penalize your channel. A strike is a formal legal takedown — three within 90 days terminates your channel.",
  },
];

export default function GlossaryPage() {
  const termUrl = (term: string) =>
    `${siteConfig.url}${GLOSSARY_PATH}#${term
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")}`;

  const termSetSchema = getDefinedTermSetSchema(
    glossaryTerms.map((t) => ({
      name: t.term,
      description: t.definition,
      url: termUrl(t.term),
    })),
  );

  const faqSchema = getFAQSchema(faqs);

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: siteConfig.url },
    { name: "Resources", url: `${siteConfig.url}/resources` },
    { name: "YouTube Glossary", url: `${siteConfig.url}${GLOSSARY_PATH}` },
  ]);

  const grouped = GROUP_ORDER.map((group) => ({
    group,
    terms: glossaryTerms
      .filter((t) => t.group === group)
      .sort((a, b) => a.term.localeCompare(b.term)),
  })).filter((g) => g.terms.length > 0);

  return (
    <>
      <GeoAeoHead
        {...GEO_AEO_PRESETS.resourcePage(
          "YouTube Glossary: 44 Creator Terms Defined (2026)",
          "Plain-English definitions of YouTube creator terms: CPM, RPM, CTR, watch time, YPP, Content ID, and more.",
          "YouTube glossary",
          "This glossary defines the YouTube creator terms creators ask about most — CPM, RPM, CTR, watch time, YPP, Content ID, and Shorts revenue — each as a direct, jargon-free answer.",
          [
            `${glossaryTerms.length} terms across monetization, analytics, content, growth, and policy`,
            "Definitions written as direct answers for quick reference",
            `Reviewed by the editorial team — last full review ${DATA_LAST_REVIEWED}`,
          ],
        )}
        pathname={GLOSSARY_PATH}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(termSetSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <div className="min-h-screen bg-slate-50">
        <header className="py-16 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-white/50 backdrop-blur-3xl -z-10" />
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <nav aria-label="Breadcrumb" className="text-sm text-slate-500 mb-6">
              <Link href="/" className="hover:text-purple-600">
                Home
              </Link>
              <span aria-hidden="true" className="mx-2">/</span>
              <Link href="/resources" className="hover:text-purple-600">
                Resources
              </Link>
              <span aria-hidden="true" className="mx-2">/</span>
              <span aria-current="page">Glossary</span>
            </nav>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-6 tracking-tight" data-speakable>
              YouTube Glossary: Every Creator Term, Explained Simply
            </h1>
            <p className="summary text-lg text-slate-700 leading-relaxed" data-speakable>
              {glossaryTerms.length} YouTube creator terms defined in plain English —
              monetization, analytics, content, growth, and policy. Each answer is
              written to be quoted: direct, specific, and jargon-free. Definitions
              reviewed {DATA_LAST_REVIEWED}.
            </p>
          </div>
        </header>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          {/* Jump links */}
          <nav aria-label="Glossary sections" className="flex flex-wrap gap-2 mb-12">
            {grouped.map(({ group }) => (
              <a
                key={group}
                href={`#section-${group}`}
                className="px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-full text-sm font-semibold hover:border-purple-400 hover:text-purple-700 transition-colors shadow-sm"
              >
                {GROUP_LABELS[group]}
              </a>
            ))}
          </nav>

          {grouped.map(({ group, terms }) => (
            <section key={group} id={`section-${group}`} className="mb-14 scroll-mt-24">
              <h2 className="text-2xl font-bold text-slate-900 mb-6 pb-3 border-b border-slate-200">
                {GROUP_LABELS[group]}
              </h2>
              <dl className="space-y-6">
                {terms.map((t) => (
                  <div
                    key={t.term}
                    id={t.term
                      .toLowerCase()
                      .replace(/[^a-z0-9]+/g, "-")
                      .replace(/(^-|-$)/g, "")}
                    className="bg-white rounded-xl p-6 shadow-sm border border-slate-100 scroll-mt-24"
                  >
                    <dt className="font-bold text-lg text-slate-900 mb-2">{t.term}</dt>
                    <dd className="text-slate-600 leading-relaxed">{t.definition}</dd>
                  </div>
                ))}
              </dl>
            </section>
          ))}

          {/* FAQ */}
          <section className="mb-14">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">
              Glossary FAQ
            </h2>
            <div className="space-y-6">
              {faqs.map((item) => (
                <div
                  key={item.question}
                  className="bg-white rounded-xl p-6 shadow-sm border border-slate-100"
                >
                  <h3 className="font-bold text-lg text-slate-900 mb-3">{item.question}</h3>
                  <p className="text-slate-600 leading-relaxed">{item.answer}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Related guides */}
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-4">
              Put the terms to work
            </h2>
            <div className="grid sm:grid-cols-2 gap-3">
              <Link
                href="/resources/youtube-cpm-rates"
                className="block rounded-xl border border-slate-200 bg-white px-4 py-3 font-semibold text-slate-800 hover:border-purple-400 hover:shadow-md transition-all"
              >
                CPM rates by country →
              </Link>
              <Link
                href="/tools/youtube-earnings-calculator"
                className="block rounded-xl border border-slate-200 bg-white px-4 py-3 font-semibold text-slate-800 hover:border-purple-400 hover:shadow-md transition-all"
              >
                Earnings calculator (free) →
              </Link>
              <Link
                href="/resources/youtube-monetization-guide"
                className="block rounded-xl border border-slate-200 bg-white px-4 py-3 font-semibold text-slate-800 hover:border-purple-400 hover:shadow-md transition-all"
              >
                Monetization guide →
              </Link>
              <Link
                href="/blog"
                className="block rounded-xl border border-slate-200 bg-white px-4 py-3 font-semibold text-slate-800 hover:border-purple-400 hover:shadow-md transition-all"
              >
                Growth blog →
              </Link>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
