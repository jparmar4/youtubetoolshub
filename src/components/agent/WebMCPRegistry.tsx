"use client";

import { useEffect } from "react";

declare global {
  interface Navigator {
    modelContext?: {
      registerTool: (tool: {
        name: string;
        description: string;
        inputSchema: Record<string, unknown>;
        execute: (args: Record<string, unknown>) => Promise<unknown> | unknown;
      }) => void;
      unregisterTool?: (name: string) => void;
    };
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

  try {
    // 1. YouTube Earnings & Monetization Calculator
    mc.registerTool({
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
      execute: async (args: Record<string, unknown>) => {
        const res = await fetch("/api/mcp", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            jsonrpc: "2.0",
            id: "webmcp-earnings",
            method: "tools/call",
            params: {
              name: "estimate_youtube_earnings",
              arguments: args || {},
            },
          }),
        });
        const data = await res.json();
        return data.result?.content?.[0]?.text
          ? JSON.parse(data.result.content[0].text)
          : data;
      },
    });

    // 2. Full YouTube Creator Tools Directory
    mc.registerTool({
      name: "list_youtube_tools",
      description:
        "List or search all 44 free YouTube creator tools on YouTube Tools Hub by category or keyword.",
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
      execute: async (args: Record<string, unknown>) => {
        const res = await fetch("/api/mcp", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            jsonrpc: "2.0",
            id: "webmcp-tools",
            method: "tools/call",
            params: {
              name: "list_youtube_tools",
              arguments: args || {},
            },
          }),
        });
        const data = await res.json();
        return data.result?.content?.[0]?.text
          ? JSON.parse(data.result.content[0].text)
          : data;
      },
    });

    // 3. 2026 Country CPM & RPM Benchmarks
    mc.registerTool({
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
      execute: async (args: Record<string, unknown>) => {
        const res = await fetch("/api/mcp", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            jsonrpc: "2.0",
            id: "webmcp-cpm",
            method: "tools/call",
            params: {
              name: "get_country_cpm_rates",
              arguments: args || {},
            },
          }),
        });
        const data = await res.json();
        return data.result?.content?.[0]?.text
          ? JSON.parse(data.result.content[0].text)
          : data;
      },
    });

    // 4. Resolve Direct HD/4K Thumbnail URLs
    mc.registerTool({
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
      execute: async (args: Record<string, unknown>) => {
        const res = await fetch("/api/mcp", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            jsonrpc: "2.0",
            id: "webmcp-thumbs",
            method: "tools/call",
            params: {
              name: "get_youtube_thumbnail_urls",
              arguments: args || {},
            },
          }),
        });
        const data = await res.json();
        return data.result?.content?.[0]?.text
          ? JSON.parse(data.result.content[0].text)
          : data;
      },
    });

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
