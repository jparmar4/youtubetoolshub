import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ScrollToTop from "@/components/ui/ScrollToTop";
import CookieConsent from "@/components/ui/CookieConsent";
import { siteConfig } from "@/config/site";
import { getOrganizationSchema, getWebsiteSchema, getPersonSchema } from "@/lib/seo";
import AuthProvider from "@/components/providers/AuthProvider";
import { UsageProvider } from "@/context/UsageContext";
import { MotionConfig } from "framer-motion";
import PrivacyH1Fix from "@/components/seo/PrivacyH1Fix";
import ExitIntentPopup from "@/components/ui/ExitIntentPopup";
import ConsentAnalytics from "@/components/ui/ConsentAnalytics";
import StickyBottomAd from "@/components/ads/StickyBottomAd";
import PWAInstallPrompt from "@/components/ui/PWAInstallPrompt";
import ToastContainer from "@/components/ui/Toast";
import { AdSectionPrioritize, AdSectionIgnore } from "@/components/ads/AdSectionTarget";
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
    id: `${siteConfig.url}/#editorial`,
    name: siteConfig.editorial.name,
    url: siteConfig.editorial.url,
    jobTitle: siteConfig.editorial.jobTitle,
    description: siteConfig.editorial.description,
    sameAs: siteConfig.footerLinks.social.map((s) => s.href),
  });

  return (
    <html lang={lang} suppressHydrationWarning>
      <head>
        {/* Edge DNS Preconnects for Global Performance (fonts are self-hosted via next/font) */}
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
        <link rel="dns-prefetch" href="https://pagead2.googlesyndication.com" />
        <link rel="dns-prefetch" href="https://www.clarity.ms" />

        {/* Pinterest Business Verification */}
        <meta name="p:domain_verify" content="7a89fa765200911761904c63c0b70f34" />

        {/* Global English targeting: one canonical URL serves all English variants.
            Prevents thin /en-GB, /en-IN duplicates while signaling US/UK/IN/AU/CA relevance. */}
        <meta property="og:locale" content="en_US" />
        <meta property="og:locale:alternate" content="en_GB" />
        <meta property="og:locale:alternate" content="en_IN" />
        <meta property="og:locale:alternate" content="en_AU" />
        <meta property="og:locale:alternate" content="en_CA" />

        {/* PWA & Mobile SEO Meta Tags */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="YT Tools Hub" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="application-name" content="YouTube Tools Hub" />
        {/* Web app manifest link is emitted automatically by app/manifest.ts */}

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

        {/*
          WebMCP: In-Browser Agent Tool Registration (SEP-1649 / WebMCP)
          Registers tools on navigator.modelContext on page load for in-browser agents.
        */}
        <script
          id="webmcp-registry-script"
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                function registerWebMCP() {
                  if (typeof navigator === "undefined" || !navigator.modelContext || typeof navigator.modelContext.registerTool !== "function") return;
                  var mc = navigator.modelContext;
                  try {
                    mc.registerTool({
                      name: "estimate_youtube_earnings",
                      description: "Calculate estimated YouTube AdSense revenue (RPM and CPM) for any view count and country across 52 supported regions.",
                      inputSchema: {
                        type: "object",
                        properties: {
                          views: { type: "number", description: "Number of monthly or daily video views." },
                          country: { type: "string", description: "Country slug or code (e.g. 'usa', 'uk', 'canada', 'australia', 'germany', 'india')." }
                        },
                        required: ["views"]
                      },
                      execute: function(args) {
                        return fetch("/api/mcp", {
                          method: "POST",
                          headers: { "Content-Type": "application/json" },
                          body: JSON.stringify({
                            jsonrpc: "2.0",
                            id: "webmcp-earnings",
                            method: "tools/call",
                            params: { name: "estimate_youtube_earnings", arguments: args || {} }
                          })
                        }).then(function(r){ return r.json(); }).then(function(d){
                          try { return d.result && d.result.content && d.result.content[0] && d.result.content[0].text ? JSON.parse(d.result.content[0].text) : d; } catch(e){ return d; }
                        });
                      }
                    });

                    mc.registerTool({
                      name: "list_youtube_tools",
                      description: "List or search all 44 free YouTube creator tools on YouTube Tools Hub by category or keyword.",
                      inputSchema: {
                        type: "object",
                        properties: {
                          category: { type: "string", description: "Optional tool category filter." },
                          query: { type: "string", description: "Optional search keyword." }
                        }
                      },
                      execute: function(args) {
                        return fetch("/api/mcp", {
                          method: "POST",
                          headers: { "Content-Type": "application/json" },
                          body: JSON.stringify({
                            jsonrpc: "2.0",
                            id: "webmcp-tools",
                            method: "tools/call",
                            params: { name: "list_youtube_tools", arguments: args || {} }
                          })
                        }).then(function(r){ return r.json(); }).then(function(d){
                          try { return d.result && d.result.content && d.result.content[0] && d.result.content[0].text ? JSON.parse(d.result.content[0].text) : d; } catch(e){ return d; }
                        });
                      }
                    });

                    mc.registerTool({
                      name: "get_country_cpm_rates",
                      description: "Retrieve 2026 YouTube CPM and RPM benchmark ranges across 52 countries.",
                      inputSchema: {
                        type: "object",
                        properties: {
                          country: { type: "string", description: "Optional country name, code, or slug filter." }
                        }
                      },
                      execute: function(args) {
                        return fetch("/api/mcp", {
                          method: "POST",
                          headers: { "Content-Type": "application/json" },
                          body: JSON.stringify({
                            jsonrpc: "2.0",
                            id: "webmcp-cpm",
                            method: "tools/call",
                            params: { name: "get_country_cpm_rates", arguments: args || {} }
                          })
                        }).then(function(r){ return r.json(); }).then(function(d){
                          try { return d.result && d.result.content && d.result.content[0] && d.result.content[0].text ? JSON.parse(d.result.content[0].text) : d; } catch(e){ return d; }
                        });
                      }
                    });

                    mc.registerTool({
                      name: "get_youtube_thumbnail_urls",
                      description: "Resolve direct 4K/HD/SD YouTube thumbnail image URLs for any YouTube video ID or URL.",
                      inputSchema: {
                        type: "object",
                        properties: {
                          videoIdOrUrl: { type: "string", description: "YouTube video URL or 11-character video ID." }
                        },
                        required: ["videoIdOrUrl"]
                      },
                      execute: function(args) {
                        return fetch("/api/mcp", {
                          method: "POST",
                          headers: { "Content-Type": "application/json" },
                          body: JSON.stringify({
                            jsonrpc: "2.0",
                            id: "webmcp-thumbs",
                            method: "tools/call",
                            params: { name: "get_youtube_thumbnail_urls", arguments: args || {} }
                          })
                        }).then(function(r){ return r.json(); }).then(function(d){
                          try { return d.result && d.result.content && d.result.content[0] && d.result.content[0].text ? JSON.parse(d.result.content[0].text) : d; } catch(e){ return d; }
                        });
                      }
                    });
                  } catch(err) {
                    console.warn("WebMCP registration:", err);
                  }
                }

                registerWebMCP();
                if (typeof document !== "undefined") {
                  if (document.readyState === "loading") {
                    document.addEventListener("DOMContentLoaded", registerWebMCP);
                  }
                  window.addEventListener("load", registerWebMCP);
                }
                if (typeof window !== "undefined") {
                  window.addEventListener("modelcontextready", registerWebMCP);
                }
                if (typeof navigator !== "undefined" && !navigator.modelContext) {
                  try {
                    var _mcVal = undefined;
                    Object.defineProperty(navigator, "modelContext", {
                      configurable: true,
                      enumerable: true,
                      get: function() { return _mcVal; },
                      set: function(v) {
                        _mcVal = v;
                        if (v && typeof v.registerTool === "function") setTimeout(registerWebMCP, 0);
                      }
                    });
                  } catch(e) {}
                }
              })();
            `,
          }}
        />
      </head>
      <body
        className={`${outfit.variable} ${jakarta.variable} antialiased min-h-screen flex flex-col bg-[var(--background)] text-[var(--foreground)]`}
      >
        <AuthProvider>
          <UsageProvider>
            <MotionConfig reducedMotion="user">
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
              <AdSectionPrioritize>
                {children}
              </AdSectionPrioritize>
            </main>
            <AdSectionIgnore>
              <Footer />
            </AdSectionIgnore>
            <ScrollToTop />
            <ToastContainer />
            <CookieConsent />
            <ConsentAnalytics />
            <PrivacyH1Fix />
            {/* Exit-intent popup for email capture */}
            <ExitIntentPopup />
            <WebMCPRegistry />
            {/* High-viewability mobile/desktop sticky bottom anchor ad */}
            <StickyBottomAd />
            <PWAInstallPrompt />
            </MotionConfig>
          </UsageProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
