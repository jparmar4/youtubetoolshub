import { tools } from "@/config/tools";
import { siteConfig } from "@/config/site";
import { DATA_LAST_REVIEWED } from "@/lib/seo-data";

export const dynamic = "force-static";
export const revalidate = 86400;

export async function GET() {
  const baseUrl = siteConfig.url;
  const markdown = `# Pricing — ${siteConfig.name}

**Canonical Pricing Page:** ${baseUrl}/pricing
**Last Reviewed:** ${DATA_LAST_REVIEWED}
**Core Philosophy:** All ${tools.length} browser-based YouTube calculators, thumbnail downloaders, transcript extractors, and channel utilities are free to use with no mandatory account, credit card, or browser extension.

## Free Plan
- **Price:** $0/month USD (₹0/month INR) — free forever
- **Signup Required:** No (core browser tools run immediately without login)
- **Limits:**
  - Unlimited use of client-side calculators, HD/4K thumbnail downloader, transcript/SRT extractor, tag extractor, -14 LUFS audio loudness checker, and packaging previewers
  - 2 AI-assisted text generations per day (titles, descriptions, scripts, hooks)
  - 1 AI thumbnail image generation per week
- **Features Included:**
  - Access to all ${tools.length} YouTube creator tools
  - Copy to clipboard & CSV/SRT/TXT exports
  - Country-level YouTube CPM & RPM benchmarks

## Pro Plan
- **Monthly Price:** $6/month USD (billed at ₹499/month INR via Razorpay)
- **Annual Price:** $59/year USD (billed at ₹4,999/year INR — saves 17%)
- **Limits:** Unlimited AI text generations & unlimited AI thumbnail image generations
- **Features Included:**
  - Everything in Free (${tools.length} YouTube creator tools + exports)
  - Unlimited AI title, tag, description, script, and hook generations
  - Unlimited AI thumbnail generations
  - Priority AI processing queue
  - 100% Ad-free workspace experience
  - Priority creator support (${siteConfig.contact.email})
- **Cancellation & Refunds:** Cancel anytime; 7-day money-back guarantee (${baseUrl}/refund-policy)
`;

  return new Response(markdown, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400, stale-while-revalidate=86400",
      "X-Robots-Tag": "noindex, follow",
      "Access-Control-Allow-Origin": "*",
    },
  });
}
