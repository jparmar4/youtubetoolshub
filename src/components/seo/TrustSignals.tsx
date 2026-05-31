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
      label: "Creator Tools",
      description: "Built for YouTube workflows",
    },
    {
      icon: FaUsers,
      label: "No Account Needed",
      description: "Core tools work without signup",
    },
    {
      icon: FaShieldAlt,
      label: "Public Data Only",
      description: "No private YouTube access required",
    },
    {
      icon: FaLock,
      label: "HTTPS Secure",
      description: "Encrypted browser connection",
    },
    {
      icon: FaCheckCircle,
      label: "Clear Policies",
      description: "Privacy, terms, and contact pages available",
    },
  ];

  return (
    <>
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
