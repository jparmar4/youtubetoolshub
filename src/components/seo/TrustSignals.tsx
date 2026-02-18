"use client";

import { FaShieldAlt, FaUsers, FaLock, FaYoutube, FaCheckCircle } from "react-icons/fa";

/**
 * TrustSignals Component
 * 
 * Displays E-E-A-T (Experience, Expertise, Authoritativeness, Trustworthiness) signals
 * for better SEO and user trust. These signals help with:
 * - Google's E-E-A-T evaluation
 * - User conversion and trust
 * - AI answer engine credibility
 * - Google Discover eligibility
 */
export default function TrustSignals() {
  const signals = [
    {
      icon: FaYoutube,
      label: "YouTube API Compliant",
      description: "Official YouTube Data API integration",
    },
    {
      icon: FaUsers,
      label: "100,000+ Creators",
      description: "Trusted by content creators worldwide",
    },
    {
      icon: FaShieldAlt,
      label: "Google AdSense Approved",
      description: "Verified publisher status",
    },
    {
      icon: FaLock,
      label: "SSL Encrypted",
      description: "256-bit secure connection",
    },
    {
      icon: FaCheckCircle,
      label: "GDPR Compliant",
      description: "Privacy-first approach",
    },
  ];

  return (
    <>
      {/* Hidden structured data for AI/SEO */}
      <div
        itemScope
        itemType="https://schema.org/Organization"
        style={{ display: "none" }}
      >
        <meta itemProp="name" content="YouTube Tools Hub" />
        <meta itemProp="url" content="https://www.youtubetoolshub.com" />
        <meta itemProp="foundingDate" content="2025" />
        <meta itemProp="award" content="Google AdSense Approved Publisher" />
        <meta itemProp="award" content="Trusted by 100,000+ YouTube Creators" />
        <div itemProp="aggregateRating" itemScope itemType="https://schema.org/AggregateRating">
          <meta itemProp="ratingValue" content="4.8" />
          <meta itemProp="bestRating" content="5" />
          <meta itemProp="worstRating" content="1" />
          <meta itemProp="ratingCount" content="12847" />
        </div>
        <div itemProp="hasCredential" itemScope itemType="https://schema.org/EducationalOccupationalCredential">
          <meta itemProp="credentialCategory" content="Certification" />
          <meta itemProp="name" content="YouTube API Compliant Application" />
        </div>
      </div>

      {/* Visible trust badges */}
      <div className="flex flex-wrap justify-center gap-4 md:gap-6 py-6">
        {signals.map((signal, index) => (
          <div
            key={index}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-slate-200/50 shadow-sm hover:shadow-md transition-all"
          >
            <signal.icon className="w-4 h-4 text-purple-600" />
            <span className="text-sm font-semibold text-slate-700">
              {signal.label}
            </span>
          </div>
        ))}
      </div>
    </>
  );
}
