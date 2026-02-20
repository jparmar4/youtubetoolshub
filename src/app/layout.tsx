import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ScrollToTop from "@/components/ui/ScrollToTop";
import CookieConsent from "@/components/ui/CookieConsent";
import { siteConfig } from "@/config/site";
import { getOrganizationSchema, getWebsiteSchema, getDatasetSchema, getMainEntitySchema } from "@/lib/seo";
import AuthProvider from "@/components/providers/AuthProvider";
import { UsageProvider } from "@/context/UsageContext";
import Script from "next/script";
import PrivacyH1Fix from "@/components/seo/PrivacyH1Fix";
import GeoAeoHead from "@/components/seo/GeoAeoHead";
import TrustSignals from "@/components/seo/TrustSignals";
import VoiceSearchOptimization from "@/components/seo/VoiceSearchOptimization";
import AnswerBoxes from "@/components/seo/AnswerBoxes";
import HeaderAd from "@/components/ads/HeaderAd";

import { Outfit, Plus_Jakarta_Sans } from "next/font/google"; // New Premium Fonts

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
  themeColor: "#ffffff",
};

export const metadata = {
  title: {
    default: siteConfig.seo.defaultTitle,
    template: siteConfig.seo.titleTemplate,
  },
  description: siteConfig.seo.defaultDescription,
  keywords: siteConfig.seo.keywords,
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  metadataBase: new URL(siteConfig.url),

  openGraph: {
    type: "website",
    locale: siteConfig.seo.openGraph.locale,
    siteName: siteConfig.seo.openGraph.siteName,
    title: siteConfig.seo.defaultTitle,
    description: siteConfig.seo.defaultDescription,
    url: siteConfig.url,
    images: [
      {
        url: `${siteConfig.url}/og-image.png`,
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} - Free AI YouTube Tools for Creators`,
        type: "image/png",
      },
      {
        url: `${siteConfig.url}/icon.svg`,
        width: 512,
        height: 512,
        alt: siteConfig.name,
        type: "image/svg+xml",
      },
    ],
    // Additional OpenGraph for better social discovery
    determiner: "the",
    countryName: "United States",
    ttl: 86400, // 24 hours cache
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
    creator: "@youtubetools",
    site: "@youtubetools",
    // Additional Twitter meta
    siteId: "youtubetoolshub",
    appId: "youtubetoolshub",
  },
  // Facebook specific meta
  facebook: {
    admins: [],
    appId: "youtubetoolshub",
  },
  // Additional social signals
  appLinks: {
    web: {
      url: siteConfig.url,
      should_fallback: true,
    },
  },
  // Pinterest rich pins
  pinterest: {
    richPin: true,
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
      "msvalidate.01": "REPLACE_WITH_BING_CODE",
      "p:domain_verify": "7a89fa765200911761904c63c0b70f34",
    },
  },
  category: "technology",
  classification: "YouTube Tools, SEO Tools, Content Creator Tools",
  alternates: {
    canonical: siteConfig.url,
    languages: {
      "en-US": siteConfig.url,
      "en-GB": siteConfig.url,
      "en-CA": siteConfig.url,
      "en-AU": siteConfig.url,
      "x-default": siteConfig.url,
    },
  },
  // AI Crawler Meta Signals - Server Side for better discoverability
  other: {
    "ai-content-declaration": "human-written",
    "ai-training": "allowed",
    "ai-index": "allowed",
    source: siteConfig.name,
    source_url: siteConfig.url,
    authority: "original",
    "content-origin": "original-research",
    // Bot-specific signals for all major AI platforms
    "google-extended": "index, follow, max-snippet:-1, max-image-preview:large",
    // OpenAI / ChatGPT / SearchGPT
    "gptbot": "index, follow",
    "chatgpt-user": "index, follow",
    "oai-searchbot": "index, follow",
    // Anthropic Claude
    "claudebot": "index, follow",
    "anthropic-ai": "index, follow",
    // Perplexity AI
    "perplexitybot": "index, follow",
    // xAI Grok
    "xai-grok": "index, follow",
    "grok-web-explorer": "index, follow",
    // DeepSeek AI
    "deepseekbot": "index, follow",
    // Mistral AI
    "mistralbot": "index, follow",
    // Brave Search
    "bravebot": "index, follow",
    // Amazon Alexa
    "amazonbot": "index, follow",
    // Cohere AI
    "cohere-ai": "index, follow",
    // You.com
    "youbot": "index, follow",
    // Apple
    "applebot-extended": "index, follow",
    // Meta AI
    "meta-externalagent": "index, follow",
    // Common Crawl
    "ccbot": "index, follow",
    // AI2 (Allen Institute)
    "ai2bot": "index, follow",
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const lang = "en";

  // Generate JSON-LD structured data
  const organizationSchema = getOrganizationSchema();
  const websiteSchema = getWebsiteSchema();
  const datasetSchema = getDatasetSchema();
  const mainEntitySchema = getMainEntitySchema();

  return (
    <html lang={lang} suppressHydrationWarning>
      <head>
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

        {/* DNS Prefetch for external resources */}
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://i.ytimg.com" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        <link rel="dns-prefetch" href="https://pagead2.googlesyndication.com" />
        <link rel="dns-prefetch" href="https://www.clarity.ms" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          rel="preconnect"
          href="https://pagead2.googlesyndication.com"
          crossOrigin="anonymous"
        />

        {/* Pinterest Business Verification */}
        <meta name="p:domain_verify" content="7a89fa765200911761904c63c0b70f34" />

        {/* PWA & Mobile SEO Meta Tags */}
        <meta name="theme-color" content="#a855f7" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="YT Tools Hub" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="application-name" content="YouTube Tools Hub" />
        <link rel="manifest" href="/manifest.webmanifest" />

        {/* Favicons handled by app/icon.tsx */}

        {/* JSON-LD Structured Data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(mainEntitySchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(datasetSchema),
          }}
        />
      </head>
      <body
        className={`${outfit.variable} ${jakarta.variable} antialiased min-h-screen flex flex-col bg-[var(--background)] text-[var(--foreground)]`}
      >
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-14MEY3M1CN"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-14MEY3M1CN');
          `}
        </Script>
        {/* AdSense - Faster Loading for Revenue */}
        <Script
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1328083083403070"
          strategy="afterInteractive"
          crossOrigin="anonymous"
        />
        {/* Microsoft Clarity — lazyOnload: analytics-only, not revenue-critical */}
        <Script id="clarity-script" strategy="lazyOnload">
          {`
            (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i+"?ref=bwt";
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "uy2cawi8r0");
          `}
        </Script>
        <AuthProvider>
          <UsageProvider>
            <Header />
            <HeaderAd />
            <main className="flex-1">{children}</main>
            <Footer />
            <ScrollToTop />
            <CookieConsent />
            <PrivacyH1Fix />
            <GeoAeoHead />
            <TrustSignals />
            <VoiceSearchOptimization />
            <AnswerBoxes />
          </UsageProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
