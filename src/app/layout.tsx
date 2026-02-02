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
import BottomStickyAd from "@/components/ads/BottomStickyAd";

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
    canonical: '/',
    languages: {
      'en': '/',
      'x-default': '/',
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
    yandex: "yandex-verification-code",
  },
  category: "technology",
  classification: "YouTube Tools, SEO Tools, Content Creator Tools",
  other: {
    "msvalidate.01": "bing-verification-code",
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

  return (
    <html lang={lang} suppressHydrationWarning>
      <head>


        <link rel="alternate" type="application/rss+xml" title="YouTube Tools Hub Blog" href={`${siteConfig.url}/feed.xml`} />

        {/* DNS Prefetch for external resources */}
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://i.ytimg.com" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

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
      <body className={`${outfit.variable} ${jakarta.variable} antialiased min-h-screen flex flex-col bg-[var(--background)] text-[var(--foreground)]`}>
        {/* Google Analytics */}
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-14MEY3M1CN" strategy="afterInteractive" />
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
        {/* Microsoft Clarity */}
        <Script id="clarity-script" strategy="afterInteractive">
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
            <BottomStickyAd />
          </UsageProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
