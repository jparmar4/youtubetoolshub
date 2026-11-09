import React from "react";

/**
 * Google AdSense Section Targeting Component
 * 
 * Google's Mediapartners crawler uses HTML comment delimiters to prioritize
 * or ignore page regions when choosing contextually relevant ads.
 * 
 * - Wrapping high-value calculation results in `weight="prioritize"` tells AdSense
 *   to match ads against high-paying finance/business/tax keywords.
 * - Wrapping headers, breadcrumbs, footers, or cookie bars in `weight="ignore"`
 *   prevents cheap, irrelevant ads from matching against boilerplate copy.
 */
export function AdSectionPrioritize({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div
        className="contents"
        dangerouslySetInnerHTML={{ __html: "<!-- google_ad_section_start -->" }}
      />
      {children}
      <div
        className="contents"
        dangerouslySetInnerHTML={{ __html: "<!-- google_ad_section_end -->" }}
      />
    </>
  );
}

export function AdSectionIgnore({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div
        className="contents"
        dangerouslySetInnerHTML={{ __html: "<!-- google_ad_section_start(weight=ignore) -->" }}
      />
      {children}
      <div
        className="contents"
        dangerouslySetInnerHTML={{ __html: "<!-- google_ad_section_end -->" }}
      />
    </>
  );
}
