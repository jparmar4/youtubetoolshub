import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getToolBySlug, tools } from "@/config/tools";
import { siteConfig } from "@/config/site";
import { ToolContextProvider } from "@/components/tools/ToolContext";
import ToolComponentRenderer from "@/components/tools/ToolComponentRenderer";
import { FaExternalLinkAlt, FaYoutube, FaBolt } from "react-icons/fa";

export const dynamicParams = false;

export function generateStaticParams() {
  return tools.map((tool) => ({
    slug: tool.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const tool = getToolBySlug(slug);

  if (!tool) {
    return {
      title: "Tool Not Found",
      robots: { index: false, follow: false },
    };
  }

  return {
    title: `${tool.name} (Embed Widget) | YouTube Tools Hub`,
    description: tool.shortDescription,
    robots: {
      index: false,
      follow: true,
    },
    alternates: {
      canonical: `${siteConfig.url}/tools/${tool.slug}`,
    },
  };
}

export default async function EmbedToolPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const tool = getToolBySlug(slug);

  if (!tool) {
    notFound();
  }

  return (
    <div className="w-full min-h-screen bg-slate-50 p-2 sm:p-4 flex flex-col justify-between font-sans antialiased text-slate-800">
      <div className="max-w-4xl mx-auto w-full">
        {/* Minimal Widget Header */}
        <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-200">
          <div className="flex items-center gap-2">
            <span className="w-7 h-7 rounded-lg bg-gradient-to-br from-purple-600 to-fuchsia-600 flex items-center justify-center text-white text-xs shadow-sm">
              <FaYoutube />
            </span>
            <span className="font-bold text-sm text-slate-900 truncate max-w-[220px] sm:max-w-md">
              {tool.name}
            </span>
          </div>
          <a
            href={`${siteConfig.url}/tools/${tool.slug}?utm_source=embed&utm_medium=widget_header`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-semibold text-purple-600 hover:text-purple-700 hover:underline flex items-center gap-1 shrink-0"
          >
            <span>Full Tool</span>
            <FaExternalLinkAlt className="text-[10px]" />
          </a>
        </div>

        {/* The Interactive Tool Container */}
        <ToolContextProvider value={{ hideHeader: true }}>
          <ToolComponentRenderer
            slug={slug}
            fallback={
              <div className="min-h-[300px] flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500" />
              </div>
            }
            unavailableFallback={
              <div className="p-8 text-center bg-white rounded-xl border border-slate-200">
                <p className="text-sm text-slate-600">
                  Interactive preview unavailable for this embed.
                </p>
              </div>
            }
          />
        </ToolContextProvider>
      </div>

      {/* Embed Backlink Attribution Footer */}
      <div className="max-w-4xl mx-auto w-full mt-4 pt-3 border-t border-slate-200 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-500">
        <span className="inline-flex items-center gap-1.5 font-medium">
          <FaBolt className="text-purple-500" /> Free Creator Suite • No Signup Required
        </span>
        <a
          href={`${siteConfig.url}/tools/${tool.slug}?utm_source=embed&utm_medium=backlink_footer`}
          target="_blank"
          rel="noopener"
          className="font-bold text-purple-600 hover:text-purple-700 hover:underline inline-flex items-center gap-1"
        >
          <span>Powered by YouTube Tools Hub</span>
          <span>&rarr;</span>
        </a>
      </div>
    </div>
  );
}
