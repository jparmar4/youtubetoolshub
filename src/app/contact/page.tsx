import { Metadata } from "next";
import ContactForm from "@/components/contact/ContactForm";

export const metadata: Metadata = {
  title: "Contact Support - 24/7 Creator Assistance | YouTube Tools Hub",
  description:
    "Need help? Contact the YouTube Tools Hub support team. We're here 24/7 to assist with tool usage, billing, partnerships, or feature requests. Email us at support@youtubetoolshub.com.",
  keywords: [
    "contact youtube tools hub",
    "youtube tools hub support",
    "youtube tools hub email",
    "youtube tools hub help",
    "youtube tools hub partnership",
    "youtube tools hub feedback",
  ],
  openGraph: {
    title: "Contact YouTube Tools Hub – Support & Partnerships",
    description:
      "Contact YouTube Tools Hub for support, guest post inquiries, partnerships, or feedback. We typically respond within 24 hours.",
    type: "website",
    url: "https://www.youtubetoolshub.com/contact",
    images: [
      {
        url: "https://www.youtubetoolshub.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Contact YouTube Tools Hub",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact YouTube Tools Hub – Support & Partnerships",
    description:
      "Contact YouTube Tools Hub for support, partnerships, or feedback. We typically respond within 24 hours.",
    images: ["https://www.youtubetoolshub.com/og-image.png"],
  },
  alternates: {
    canonical: "/contact",
    languages: {
      en: "/contact",
      "x-default": "/contact",
    },
  },
};

export default function ContactPage() {
  return <ContactForm />;
}
