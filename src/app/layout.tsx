import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ScrollToTop from "@/components/ui/ScrollToTop";
import CookieConsent from "@/components/ui/CookieConsent";
import { siteConfig } from "@/config/site";
import { getOrganizationSchema, getWebsiteSchema } from "@/lib/seo";
import AuthProvider from "@/components/providers/AuthProvider";
import { UsageProvider } from "@/context/UsageContext";
import Script from "next/script";
import PrivacyH1Fix from "@/components/seo/PrivacyH1Fix";
import GeoAeoHead from "@/components/seo/GeoAeoHead";

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
  alternates: {
    canonical: "/",
    languages: {
      en: "/",
      "x-default": "/",
    },
  },

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
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.seo.defaultTitle,
    description: siteConfig.seo.defaultDescription,
    images: [`${siteConfig.url}/og-image.png`],
    creator: "@youtubetools",
    site: "@youtubetools",
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
    // Add Yandex verification when available: yandex: "your-yandex-code",
    // Add Bing verification when available via other: { "msvalidate.01": "your-bing-code" }
  },
  category: "technology",
  classification: "YouTube Tools, SEO Tools, Content Creator Tools",
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

        {/* hreflang for international SEO - targeting Tier 1 English-speaking markets + high-CPM countries */}
        <link rel="alternate" hrefLang="en-US" href={siteConfig.url} />
        <link rel="alternate" hrefLang="en-GB" href={siteConfig.url} />
        <link rel="alternate" hrefLang="en-CA" href={siteConfig.url} />
        <link rel="alternate" hrefLang="en-AU" href={siteConfig.url} />
        <link rel="alternate" hrefLang="en-NZ" href={siteConfig.url} />
        <link rel="alternate" hrefLang="en-IE" href={siteConfig.url} />
        <link rel="alternate" hrefLang="en-IN" href={siteConfig.url} />
        <link rel="alternate" hrefLang="de-DE" href={siteConfig.url} />
        <link rel="alternate" hrefLang="de-CH" href={siteConfig.url} />
        <link rel="alternate" hrefLang="de-AT" href={siteConfig.url} />
        <link rel="alternate" hrefLang="x-default" href={siteConfig.url} />

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
          type="text/plain"
          title="Security Policy"
          href={`${siteConfig.url}/.well-known/security.txt`}
        />
        <link
          rel="author"
          type="text/plain"
          href={`${siteConfig.url}/.well-known/authors.txt`}
        />

        {/* AI Crawler Meta Signals */}
        <meta name="ai-content-declaration" content="human-written" />
        <meta name="ai-training" content="allowed" />
        <meta name="ai-index" content="allowed" />
        <meta name="source" content={siteConfig.name} />
        <meta name="source_url" content={siteConfig.url} />
        <meta name="authority" content="original" />
        <meta name="content-origin" content="original-research" />

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
            <main className="flex-1">{children}</main>
            <Footer />
            <ScrollToTop />
            <CookieConsent />
            <PrivacyH1Fix />
            <GeoAeoHead />
          </UsageProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
