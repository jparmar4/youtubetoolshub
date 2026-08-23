import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ScrollToTop from "@/components/ui/ScrollToTop";
import CookieConsent from "@/components/ui/CookieConsent";
import { siteConfig } from "@/config/site";
import { getOrganizationSchema, getWebsiteSchema, getPersonSchema } from "@/lib/seo";
import AuthProvider from "@/components/providers/AuthProvider";
import { UsageProvider } from "@/context/UsageContext";
import PrivacyH1Fix from "@/components/seo/PrivacyH1Fix";
import ExitIntentPopup from "@/components/ui/ExitIntentPopup";
import ConsentAnalytics from "@/components/ui/ConsentAnalytics";
import StickyBottomAd from "@/components/ads/StickyBottomAd";

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
  themeColor: "#a855f7", // Brand purple
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
      {
        url: `${siteConfig.url}/icon.svg`,
        width: 512,
        height: 512,
        alt: siteConfig.name,
        type: "image/svg+xml",
      },
    ],
    determiner: "the",
    countryName: "United States",
    ttl: 86400,
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
      "msvalidate.01": "0FEE172B08E59C4D96EC21C37F806047",
      "p:domain_verify": "7a89fa765200911761904c63c0b70f34",
    },
  },
  category: "technology",
  classification: "YouTube Tools, SEO Tools, Content Creator Tools",
  other: {
    source: siteConfig.name,
    source_url: siteConfig.url,
    language: siteConfig.language,
    "content-language": siteConfig.language,
    distribution: "global",
    coverage: "Worldwide",
    "google-adsense-account": "ca-pub-1328083083403070",
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
  const editorialSchema = getPersonSchema({
    name: siteConfig.editorial.name,
    url: siteConfig.editorial.url,
    jobTitle: siteConfig.editorial.jobTitle,
    description: siteConfig.editorial.description,
    sameAs: siteConfig.footerLinks.social.map((s) => s.href),
  });

  return (
    <html lang={lang} suppressHydrationWarning>
      <head>
        {/* Edge DNS Preconnects for Global Performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://pagead2.googlesyndication.com" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        {/*
          AdSense Auto ads + manual units. This must remain a native async tag:
          AdSense does not support Next.js's data-nscript attribute, which can
          leave manual units uninitialized. Analytics is consent-gated below.
        */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1328083083403070"
          crossOrigin="anonymous"
        />
        
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
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="YT Tools Hub" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="application-name" content="YouTube Tools Hub" />
        <link rel="manifest" href="/manifest.webmanifest?v=2" />

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
            __html: JSON.stringify(editorialSchema),
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
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('consent', 'default', {
                'ad_storage': 'granted',
                'ad_user_data': 'granted',
                'ad_personalization': 'granted',
                'analytics_storage': 'granted'
              });
              gtag('consent', 'default', {
                'ad_storage': 'denied',
                'ad_user_data': 'denied',
                'ad_personalization': 'denied',
                'analytics_storage': 'denied',
                'wait_for_update': 500,
                'region': ['AT','BE','BG','HR','CY','CZ','DK','EE','FI','FR','DE','GR','HU','IS','IE','IT','LV','LI','LT','LU','MT','NL','NO','PL','PT','RO','SK','SI','ES','SE','GB','CH']
              });
              gtag('js', new Date());
              gtag('config', 'G-14MEY3M1CN', {
                page_path: window.location.pathname,
              });
            `,
          }}
        />
      </head>
      <body
        className={`${outfit.variable} ${jakarta.variable} antialiased min-h-screen flex flex-col bg-[var(--background)] text-[var(--foreground)]`}
      >
        <AuthProvider>
          <UsageProvider>
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
            <ScrollToTop />
            <CookieConsent />
            <ConsentAnalytics />
            <PrivacyH1Fix />
            {/* Exit-intent popup for email capture */}
            <ExitIntentPopup />
            {/* High-viewability mobile/desktop sticky bottom anchor ad */}
            <StickyBottomAd />
          </UsageProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
