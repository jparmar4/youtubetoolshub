"use client";

import { useEffect } from "react";
import { toolMeta } from "@/config/tool-meta";

async function callMcpTool(name: string, args: Record<string, unknown>) {
  const res = await fetch("/api/mcp", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      jsonrpc: "2.0",
      id: `webmcp-${name}`,
      method: "tools/call",
      params: {
        name,
        arguments: args || {},
      },
    }),
  });
  const data = await res.json();
  try {
    return data.result?.content?.[0]?.text
      ? JSON.parse(data.result.content[0].text)
      : data;
  } catch {
    return data;
  }
}

export function registerWebMCPTools() {
  if (
    typeof navigator === "undefined" ||
    !("modelContext" in navigator) ||
    !navigator.modelContext ||
    typeof navigator.modelContext.registerTool !== "function"
  ) {
    return false;
  }

  const mc = navigator.modelContext;
  const webMcpTools = [
    {
      name: "estimate_youtube_earnings",
      description:
        "Calculate estimated YouTube AdSense revenue (RPM and CPM) for any view count and country across 52 supported regions.",
      inputSchema: {
        type: "object",
        properties: {
          views: {
            type: "number",
            description: "Number of video views to calculate earnings for.",
          },
          country: {
            type: "string",
            description:
              "Country slug or code (e.g. 'usa', 'uk', 'canada', 'australia', 'germany', 'india'). Defaults to 'usa'.",
          },
        },
        required: ["views"],
      },
    },
    {
      name: "list_youtube_tools",
      description:
        `List or search all ${toolMeta.length} free YouTube creator tools on YouTube Tools Hub by category or keyword.`,
      inputSchema: {
        type: "object",
        properties: {
          category: {
            type: "string",
            description:
              "Optional tool category filter (thumbnail-media, seo-metadata, channel-growth, analytics-earnings, utility-fun).",
          },
          query: {
            type: "string",
            description: "Optional search keyword to filter tools.",
          },
        },
      },
    },
    {
      name: "get_country_cpm_rates",
      description:
        "Retrieve 2026 YouTube CPM and RPM benchmark ranges across 52 countries.",
      inputSchema: {
        type: "object",
        properties: {
          country: {
            type: "string",
            description:
              "Optional country name, code, or slug to filter (e.g. 'US', 'usa', 'United Kingdom').",
          },
        },
      },
    },
    {
      name: "get_youtube_thumbnail_urls",
      description:
        "Resolve direct 4K/HD/SD YouTube thumbnail image URLs for any YouTube video ID or URL.",
      inputSchema: {
        type: "object",
        properties: {
          videoIdOrUrl: {
            type: "string",
            description: "YouTube video URL or 11-character video ID.",
          },
        },
        required: ["videoIdOrUrl"],
      },
    },
    {
      name: "estimate_sponsorship_rate",
      description:
        "Estimate recommended YouTube brand deal / sponsor fee and CPM benchmarks based on expected video views and niche.",
      inputSchema: {
        type: "object",
        properties: {
          views: {
            type: "number",
            description: "Expected average video views (e.g. 25000).",
          },
          niche: {
            type: "string",
            description:
              "Creator niche: 'finance', 'tech', 'business', 'education', 'fitness', 'lifestyle', 'gaming'. Defaults to 'tech'.",
          },
          placement: {
            type: "string",
            description:
              "Placement format: 'integration_60s' (60-90s mid-roll), 'mention_30s', 'dedicated' (full video), 'shorts'. Defaults to 'integration_60s'.",
          },
        },
        required: ["views"],
      },
    },
    {
      name: "estimate_channel_valuation",
      description:
        "Calculate YouTube channel asset sale valuation multiple (24x-36x monthly net earnings) based on combined AdSense and sponsor revenue.",
      inputSchema: {
        type: "object",
        properties: {
          monthlyRevenue: {
            type: "number",
            description: "Average total monthly net income from AdSense, sponsors, and affiliates (USD).",
          },
          contentStyle: {
            type: "string",
            description:
              "Channel operating style: 'faceless' (higher transferability) or 'personal_brand'. Defaults to 'faceless'.",
          },
        },
        required: ["monthlyRevenue"],
      },
    },
    {
      name: "estimate_shorts_earnings",
      description:
        "Calculate YouTube Shorts AdSense revenue based on views and 2026 Shorts RPM benchmarks ($0.03 - $0.07 per 1,000 views).",
      inputSchema: {
        type: "object",
        properties: {
          views: {
            type: "number",
            description: "Number of YouTube Shorts views.",
          },
          rpm: {
            type: "number",
            description: "Optional custom Shorts RPM in USD (defaults to $0.05).",
          },
        },
        required: ["views"],
      },
    },
    {
      name: "calculate_youtube_tax_deductions",
      description:
        "Calculate estimated eligible business tax write-offs, taxable income reduction, and tax savings for YouTube creators.",
      inputSchema: {
        type: "object",
        properties: {
          annualRevenue: {
            type: "number",
            description: "Gross annual creator revenue from YouTube and sponsors (USD).",
          },
          equipmentAndGear: {
            type: "number",
            description: "Annual spending on cameras, lighting, audio, PCs, and gear (USD).",
          },
          softwareAndSubscriptions: {
            type: "number",
            description: "Annual spending on Adobe, Canva, hosting, music, plugins, and AI tools (USD).",
          },
          homeStudioRent: {
            type: "number",
            description: "Estimated annual home office / studio deduction (USD).",
          },
          contractorsAndEditors: {
            type: "number",
            description: "Annual spending on video editors, thumbnail designers, and contractors (USD).",
          },
        },
        required: ["annualRevenue"],
      },
    },
  ];

  try {
    if (typeof mc.provideContext === "function") {
      try {
        mc.provideContext({
          tools: webMcpTools.map(({ name, description }) => ({
            name,
            description,
          })),
        });
      } catch {
        // Ignore if host browser manages provideContext separately
      }
    }

    for (const tool of webMcpTools) {
      mc.registerTool({
        ...tool,
        execute: (args: Record<string, unknown>) => callMcpTool(tool.name, args),
      });
    }

    return true;
  } catch (e) {
    console.warn("WebMCP registration encountered an issue:", e);
    return false;
  }
}

export default function WebMCPRegistry() {
  useEffect(() => {
    registerWebMCPTools();

    const handleReady = () => registerWebMCPTools();
    window.addEventListener("modelcontextready", handleReady);
    window.addEventListener("load", handleReady);

    return () => {
      window.removeEventListener("modelcontextready", handleReady);
      window.removeEventListener("load", handleReady);
    };
  }, []);

  return null;
}
