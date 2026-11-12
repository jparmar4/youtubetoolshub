import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HideOnEmbed from "@/components/layout/HideOnEmbed";
import DeferredLayoutWidgets from "@/components/layout/DeferredLayoutWidgets";
import { siteConfig } from "@/config/site";
import { combineSchemasToGraph, getOrganizationSchema, getWebsiteSchema, getPersonSchema } from "@/lib/seo";
import AuthProvider from "@/components/providers/AuthProvider";
import { UsageProvider } from "@/context/UsageContext";
import ConsentAnalytics from "@/components/ui/ConsentAnalytics";
import { AdSectionIgnore } from "@/components/ads/AdSectionTarget";
import WebMCPRegistry from "@/components/agent/WebMCPRegistry";

import { Outfit, Plus_Jakarta_Sans } from "next/font/google";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

// Viewport configuration for better mobile performance
export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#7c3aed", // Brand electric violet (matches manifest.ts / --primary)
};

export const metadata = {
  title: {
    default: siteConfig.seo.defaultTitle,
    template: siteConfig.seo.titleTemplate,
  },
  description: siteConfig.seo.defaultDescription,
  keywords: [
    "free youtube tools",
    "youtube thumbnail downloader",
    "youtube tag generator",
    "youtube title generator",
    "youtube earnings calculator",
    "youtube cpm calculator",
    "free tubebuddy alternative",
    "free vidiq alternative",
  ],
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  metadataBase: new URL(siteConfig.url),
  // Do not set a global canonical or hreflang here. Child routes must
  // self-canonicalize. A root hreflang to "/" made every page look like a
  // homepage duplicate and collapsed rankings into one URL.
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    siteName: siteConfig.seo.openGraph.siteName,
    title: siteConfig.seo.defaultTitle,
    description: siteConfig.seo.defaultDescription,
    images: [
      {
        url: `${siteConfig.url}/og-image.png`,
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} - Free AI YouTube Tools for Creators`,
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.seo.defaultTitle,
    description: siteConfig.seo.defaultDescription,
    images: [
      {
        url: `${siteConfig.url}/og-image.png`,
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} - Free AI YouTube Tools`,
      },
    ],
    creator: "@ytoolshub",
    site: "@ytoolshub",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "google299d0fa42c6b8fbb",
    yandex: "2acffd0dd056e2b5",
    other: {
      "msvalidate.01": "0FEE172B08E59C4D96EC21C37F806047",
      "p:domain_verify": "7a89fa765200911761904c63c0b70f34",
    },
  },
  category: "technology",
  other: {
    "google-adsense-account": "ca-pub-1328083083403070",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const lang = "en";

  // Generate JSON-LD structured data graph
  const organizationSchema = getOrganizationSchema();
  const websiteSchema = getWebsiteSchema();
  const editorialSchema = getPersonSchema({
    id: `${siteConfig.url}/#editorial`,
    name: siteConfig.editorial.name,
    url: siteConfig.editorial.url,
    jobTitle: siteConfig.editorial.jobTitle,
    description: siteConfig.editorial.description,
    sameAs: siteConfig.footerLinks.social.map((s) => s.href),
  });

  const siteGraphSchema = combineSchemasToGraph(
    organizationSchema,
    websiteSchema,
    editorialSchema,
  );

  return (
    <html lang={lang} suppressHydrationWarning>
      <head>
        {/* Edge DNS Preconnects for Global Performance (fonts are self-hosted via next/font) */}
        <link rel="preconnect" href="https://pagead2.googlesyndication.com" />
        <link rel="preconnect" href="https://scripts.clarity.ms" />
        <link rel="preconnect" href="https://googleads.g.doubleclick.net" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        {/*
          AdSense Auto ads + manual units load in ConsentAnalytics via a native
          async <script> after hydration so AdSense's dynamic show_ads_impl.js
          injection never shifts <head> children during React 19 hydration.
          AdSense account verification meta tag is emitted via metadata.other.
        */}
        
        <link
          rel="alternate"
          type="application/rss+xml"
          title="YouTube Tools Hub Blog"
          href={`${siteConfig.url}/feed.xml`}
        />
        <link
          rel="alternate"
          type="application/atom+xml"
          title="YouTube Tools Hub Atom Feed"
          href={`${siteConfig.url}/atom.xml`}
        />

        {/* AI Crawler Discovery Links */}
        <link
          rel="alternate"
          type="text/markdown"
          title="Markdown Representation"
          href={`${siteConfig.url}/index.md`}
        />
        <link
          rel="mcp-server-card"
          type="application/json"
          title="MCP Server Card"
          href={`${siteConfig.url}/.well-known/mcp/server-card.json`}
        />
        <link
          rel="alternate"
          type="text/plain"
          title="LLMs.txt"
          href={`${siteConfig.url}/llms.txt`}
        />
        <link
          rel="alternate"
          type="text/plain"
          title="LLMs Full"
          href={`${siteConfig.url}/llms-full.txt`}
        />
        <link
          rel="alternate"
          type="text/plain"
          title="AI.txt"
          href={`${siteConfig.url}/.well-known/ai.txt`}
        />
        <link
          rel="alternate"
          type="application/json"
          title="AI Plugin"
          href={`${siteConfig.url}/.well-known/ai-plugin.json`}
        />
        <link
          rel="alternate"
          type="application/json"
          title="AI Context"
          href={`${siteConfig.url}/api/ai-context`}
        />
        <link
          rel="alternate"
          type="application/ld+json"
          title="Knowledge Graph"
          href={`${siteConfig.url}/knowledge-graph.jsonld`}
        />
        <link
          rel="alternate"
          type="application/yaml"
          title="OpenAPI Specification"
          href={`${siteConfig.url}/.well-known/openapi.yaml`}
        />
        <link
          rel="alternate"
          type="text/plain"
          title="Security Policy"
          href={`${siteConfig.url}/.well-known/security.txt`}
        />
        <link
          rel="author"
          type="text/plain"
          href={`${siteConfig.url}/.well-known/authors.txt`}
        />

        {/* DNS Prefetch for external resources */}
        <link rel="dns-prefetch" href="https://i.ytimg.com" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        <link rel="dns-prefetch" href="https://www.clarity.ms" />

        {/* PWA & Mobile SEO Meta Tags */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-title" content="YT Tools Hub" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="application-name" content="YouTube Tools Hub" />
        {/* Web app manifest link is emitted automatically by app/manifest.ts */}

        {/* Favicons handled by app/icon.tsx */}

        {/* JSON-LD Consolidated @graph Structured Data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(siteGraphSchema),
          }}
        />
        
        {/*
          Consent Mode v2: personalized ads ON by default (US/IN/most markets),
          denied only in GDPR/UK/CH via Google's IP region. A global "denied"
          default was serving non-personalized ads worldwide and crushing CPC.
        */}
        <script
          id="google-consent-mode"
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}function c(v,r){var o={ad_storage:v,ad_user_data:v,ad_personalization:v,analytics_storage:v};if(r){o.wait_for_update=500;o.region=r.split(' ');}gtag('consent','default',o);}c('granted');c('denied','AT BE BG HR CY CZ DK EE FI FR DE GR HU IS IE IT LV LI LT LU MT NL NO PL PT RO SK SI ES SE GB CH');gtag('js',new Date());gtag('config','G-14MEY3M1CN',{page_path:location.pathname});`,
          }}
        />

        {/*
          WebMCP: In-Browser Agent Tool Registration (SEP-1649 / WebMCP)
          Exposes tools via navigator.modelContext.provideContext and registerTool for AI agents.
        */}
        <script
          id="webmcp-registry-script"
          dangerouslySetInnerHTML={{
            __html: `(function(){var u="undefined",f="function";function c(n,a){return fetch("/api/mcp",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({jsonrpc:"2.0",id:"webmcp-"+n,method:"tools/call",params:{name:n,arguments:a||{}}})}).then(function(r){return r.json()}).then(function(d){try{var t=d&&d.result&&d.result.content&&d.result.content[0]&&d.result.content[0].text;return t?JSON.parse(t):d}catch(e){return d}})}function r(){if(typeof navigator===u||!navigator.modelContext)return;var m=navigator.modelContext,N={type:"number"},S={type:"string"},d=[["estimate_youtube_earnings","Estimate YouTube AdSense revenue.",{views:N,country:S},["views"]],["list_youtube_tools","List or search 45 free YouTube tools.",{category:S,query:S}],["get_country_cpm_rates","Get 2026 CPM/RPM rates by country.",{country:S}],["get_youtube_thumbnail_urls","Get 4K/HD YouTube thumbnail URLs.",{videoIdOrUrl:S},["videoIdOrUrl"]],["estimate_sponsorship_rate","Estimate sponsorship rate and CPM.",{views:N,niche:S},["views"]],["estimate_channel_valuation","Calculate channel sale valuation.",{monthlyRevenue:N},["monthlyRevenue"]],["estimate_shorts_earnings","Estimate YouTube Shorts revenue.",{views:N},["views"]],["calculate_youtube_tax_deductions","Estimate creator tax deductions.",{annualRevenue:N},["annualRevenue"]]],ts=d.map(function(x){var s={type:"object",properties:x[2]};if(x[3])s.required=x[3];return{name:x[0],description:x[1],inputSchema:s,execute:function(a){return c(x[0],a)}}});if(typeof navigator.modelContext.provideContext===f)try{m.provideContext({tools:ts.map(function(t){return{name:t.name,description:t.description}})})}catch(e){}if(typeof navigator.modelContext.registerTool===f)ts.forEach(function(t){try{m.registerTool(t)}catch(e){}})}r();if(typeof document!==u&&document.readyState==="loading")document.addEventListener("DOMContentLoaded",r);if(typeof window!==u){window.addEventListener("load",r);window.addEventListener("modelcontextready",r)}})();`,
          }}
        />
        <script defer src="/webmcp-registry.js" />
      </head>
      <body
        className={`${outfit.variable} ${jakarta.variable} antialiased min-h-screen flex flex-col bg-[var(--background)] text-[var(--foreground)]`}
      >
        <AuthProvider>
          <UsageProvider>
            <a
              href="#main-content"
              className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:bg-white focus:text-slate-900 focus:px-4 focus:py-2 focus:rounded-lg focus:shadow-lg focus:outline-2 focus:outline-offset-2 focus:outline-purple-600"
            >
              Skip to content
            </a>
            <AdSectionIgnore>
              <Header />
            </AdSectionIgnore>
            <main id="main-content" tabIndex={-1} className="flex-1 focus:outline-none">
              {children}
            </main>
            <HideOnEmbed>
              <AdSectionIgnore>
                <Footer />
              </AdSectionIgnore>
            </HideOnEmbed>
            <ConsentAnalytics />
            <WebMCPRegistry />
            <DeferredLayoutWidgets />
          </UsageProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
