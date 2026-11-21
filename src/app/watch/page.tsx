import { Metadata } from "next";
import Breadcrumb from "@/components/ui/Breadcrumb";
import WatchBridgeClient from "@/components/watch/WatchBridgeClient";
import { noIndexRobots } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Video X-Ray Audit & Comment Question Miner",
  description:
    "Inspect any YouTube video's SEO score, backend tags, real captions, and viewer questions from comments — zero login or browser extension.",
  robots: noIndexRobots,
};

interface WatchPageProps {
  searchParams: Promise<{ v?: string | string[] }>;
}

export default async function WatchPage({ searchParams }: WatchPageProps) {
  const resolved = await searchParams;
  const rawVideoId = Array.isArray(resolved.v) ? resolved.v[0] : resolved.v;

  return (
    <div className="min-h-screen py-10 sm:py-14 relative overflow-hidden bg-slate-50">
      <div className="nebula-bg" />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <Breadcrumb
          items={[
            { name: "Home", href: "/" },
            { name: "Video X-Ray Audit" },
          ]}
          className="mb-6"
        />
        <WatchBridgeClient key={rawVideoId || "empty"} initialVideoId={rawVideoId || ""} />
      </div>
    </div>
  );
}
