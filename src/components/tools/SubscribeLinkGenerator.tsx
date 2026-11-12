"use client";

import { useState, useMemo } from "react";
import ToolPageLayout from "@/components/tools/ToolPageLayout";
import { Input } from "@/components/ui/Input";
import {
  FaLink,
  FaCheckCircle,
  FaCopy,
  FaQrcode,
  FaYoutube,
  FaCode,
  FaLightbulb,
  FaDownload,
  FaUserPlus } from "react-icons/fa";

export default function SubscribeLinkGenerator() {
  const [channelInput, setChannelInput] = useState<string>("@MrBeast");
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const cleanData = useMemo(() => {
    let input = channelInput.trim();
    if (!input) {
      input = "@YourChannel";
    }

    // Strip existing sub_confirmation params if user pasted it
    input = input.replace(/[?&]sub_confirmation=[0-9]/gi, "");

    let canonicalBase = "";
    let displayName = input;

    // Check if full URL
    if (input.startsWith("http://") || input.startsWith("https://")) {
      try {
        const u = new URL(input);
        const path = u.pathname.replace(/\/$/, "");
        canonicalBase = `https://www.youtube.com${path}`;
        displayName = path.split("/").pop() || input;
      } catch {
        canonicalBase = input;
      }
    } else if (input.startsWith("@")) {
      canonicalBase = `https://www.youtube.com/${input}`;
      displayName = input;
    } else if (input.startsWith("UC") && input.length >= 22) {
      canonicalBase = `https://www.youtube.com/channel/${input}`;
      displayName = input;
    } else if (input.includes("/")) {
      canonicalBase = `https://www.youtube.com/${input.replace(/^\/+/, "")}`;
      displayName = input;
    } else {
      canonicalBase = `https://www.youtube.com/@${input}`;
      displayName = `@${input}`;
    }

    const subLink = `${canonicalBase}?sub_confirmation=1`;
    const htmlButton = `<a href="${subLink}" target="_blank" rel="noopener noreferrer" style="background:#ff0000;color:#ffffff;padding:12px 24px;border-radius:24px;font-weight:bold;text-decoration:none;display:inline-flex;align-items:center;gap:8px;">Subscribe on YouTube</a>`;
    const markdownLink = `[Subscribe to ${displayName} on YouTube](${subLink})`;
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(subLink)}`;

    return {
      subLink,
      htmlButton,
      markdownLink,
      qrUrl,
      displayName };
  }, [channelInput]);

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2500);
  };

  return (
    <ToolPageLayout
      title="YouTube Subscribe Link Generator (?sub_confirmation=1)"
      slug="youtube-subscribe-link-generator"
      description="Create an instant YouTube auto-subscribe link with confirmation popup, embed button, and QR code for free."
    >
      <div className="space-y-8">
        {/* Header Alert */}
        <div className="rounded-2xl border border-red-200/80 bg-gradient-to-r from-red-50/80 via-white to-orange-50/60 p-5 sm:p-6 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-red-100 px-3 py-1 text-xs font-black text-red-700">
                <FaYoutube /> 1-Click Conversion Trick
              </span>
              <h2 className="mt-2 text-xl sm:text-2xl font-black text-slate-900">
                YouTube Auto-Subscribe Link & QR Code Generator
              </h2>
              <p className="mt-1 text-sm text-slate-600">
                Generate a direct URL with <code className="text-red-600 font-bold">?sub_confirmation=1</code> that forces a subscription prompt when clicked.
              </p>
            </div>
            <div className="flex items-center gap-2 self-start sm:self-center">
              <span className="text-xs font-semibold px-2.5 py-1 bg-emerald-100 text-emerald-800 rounded-lg">
                No Login Required
              </span>
            </div>
          </div>
        </div>

        {/* Generator Controls & Input */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
          <label className="block text-sm font-bold text-slate-800">
            Enter YouTube Channel Handle, URL, or Channel ID
          </label>
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500">
                <FaLink />
              </span>
              <Input
                type="text"
                value={channelInput}
                onChange={(e) => setChannelInput(e.target.value)}
                placeholder="@YourChannel or https://youtube.com/@YourHandle"
                className="pl-10 text-base font-semibold"
              />
            </div>
          </div>
          <p className="text-xs text-slate-500">
            Supports channel handles (<code className="text-slate-700">@MrBeast</code>), full URLs (<code className="text-slate-700">https://youtube.com/@hubermanlab</code>), or standard Channel IDs (<code className="text-slate-700">UCX6OQ3DkcsbYNE6H8uQQuVA</code>).
          </p>
        </div>

        {/* Results & Export Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Output Links & Formats */}
          <div className="lg:col-span-7 space-y-4">
            {/* 1. Direct URL */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                  <FaLink className="text-red-500" /> Direct Auto-Subscribe Link
                </span>
                <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                  Best for Bio Links & Descriptions
                </span>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  readOnly
                  value={cleanData.subLink}
                  className="w-full bg-slate-50 border border-slate-200 px-3 py-2 text-sm font-mono rounded-lg text-slate-800"
                />
                <button
                  type="button"
                  onClick={() => handleCopy(cleanData.subLink, "url")}
                  className="cursor-pointer px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-bold text-sm rounded-lg flex items-center gap-1.5 transition-all shadow-sm shrink-0"
                >
                  {copiedKey === "url" ? <FaCheckCircle /> : <FaCopy />}
                  {copiedKey === "url" ? "Copied!" : "Copy"}
                </button>
              </div>
            </div>

            {/* 2. HTML Button Embed Code */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-600 flex items-center gap-1.5">
                  <FaCode className="text-indigo-500" /> HTML Subscribe Button (Website Embed)
                </span>
                <button
                  type="button"
                  onClick={() => handleCopy(cleanData.htmlButton, "html")}
                  className="cursor-pointer text-xs text-indigo-600 font-bold flex items-center gap-1 hover:underline"
                >
                  {copiedKey === "html" ? <FaCheckCircle /> : <FaCopy />}
                  {copiedKey === "html" ? "Copied HTML!" : "Copy Code"}
                </button>
              </div>
              <pre className="bg-slate-900 text-slate-200 p-3 rounded-lg text-xs font-mono overflow-x-auto">
                {cleanData.htmlButton}
              </pre>
            </div>

            {/* 3. Markdown Link */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-600 flex items-center gap-1.5">
                  <FaLink className="text-blue-500" /> Markdown Format (GitHub / Substack / Notion)
                </span>
                <button
                  type="button"
                  onClick={() => handleCopy(cleanData.markdownLink, "md")}
                  className="cursor-pointer text-xs text-blue-600 font-bold flex items-center gap-1 hover:underline"
                >
                  {copiedKey === "md" ? <FaCheckCircle /> : <FaCopy />}
                  {copiedKey === "md" ? "Copied Markdown!" : "Copy Markdown"}
                </button>
              </div>
              <input
                type="text"
                readOnly
                value={cleanData.markdownLink}
                className="w-full bg-slate-50 border border-slate-200 px-3 py-2 text-xs font-mono rounded-lg text-slate-800"
              />
            </div>
          </div>

          {/* QR Code & Live Modal Simulation */}
          <div className="lg:col-span-5 space-y-4">
            {/* QR Code Download Box */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm text-center flex flex-col items-center">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5 mb-3">
                <FaQrcode className="text-purple-500" /> High-Resolution Subscribe QR Code
              </span>
              <div className="p-3 bg-white border border-slate-200 rounded-xl shadow-inner inline-block">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={cleanData.qrUrl}
                  alt="YouTube Subscribe QR Code"
                  width={180}
                  height={180}
                  className="rounded-lg"
                />
              </div>
              <p className="text-xs text-slate-500 mt-2 mb-3">
                Scan with phone camera to trigger the subscribe popup instantly.
              </p>
              <a
                href={cleanData.qrUrl}
                download="youtube-subscribe-qr.png"
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-lg flex items-center gap-1.5 transition-all"
              >
                <FaDownload /> Download QR Code Image
              </a>
            </div>

            {/* Popup Preview Simulation */}
            <div className="rounded-2xl border border-slate-200 bg-slate-100 p-4">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block mb-2 text-center">
                Live YouTube Desktop Popup Preview
              </span>
              <div className="bg-white rounded-xl p-4 shadow-md border border-slate-200 max-w-sm mx-auto text-center space-y-3">
                <div className="w-10 h-10 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto text-lg">
                  <FaUserPlus />
                </div>
                <h4 className="font-bold text-sm text-slate-900">
                  Confirm channel subscription
                </h4>
                <p className="text-xs text-slate-600">
                  Are you sure you want to subscribe to <strong className="text-slate-900">{cleanData.displayName}</strong>?
                </p>
                <div className="flex gap-2 pt-1 justify-center">
                  <button type="button" className="cursor-default px-3 py-1.5 text-xs font-bold text-slate-600 bg-slate-100 rounded-md">
                    Cancel
                  </button>
                  <button type="button" className="cursor-default px-3.5 py-1.5 text-xs font-bold text-white bg-red-600 rounded-md shadow-sm">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Educational Content for SEO/AEO */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-4">
          <h3 className="text-xl font-black text-slate-900">
            Why Every Creator Should Use the ?sub_confirmation=1 URL Parameter
          </h3>
          <p className="text-sm text-slate-600 leading-relaxed">
            By default, when a visitor clicks a standard YouTube channel link (e.g., <code className="text-xs">youtube.com/@channel</code>), they land on your channel homepage. They must notice the small &quot;Subscribe&quot; button and manually click it. Most visitors bounce without subscribing.
          </p>
          <p className="text-sm text-slate-600 leading-relaxed">
            When you append the official parameter <code className="text-xs font-bold text-red-600 bg-red-50 px-1 py-0.5 rounded">?sub_confirmation=1</code>, YouTube intercepts the page load on desktop browsers and displays a prominent <strong>modal confirmation dialog</strong> asking: <em>&quot;Are you sure you want to subscribe to [Channel]?&quot;</em>. This single tweak increases subscriber conversion rates from external traffic by <strong>300% to 500%</strong>.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <h4 className="font-bold text-sm text-slate-900 flex items-center gap-1.5">
                <FaLightbulb className="text-amber-500" /> Link-in-Bio Surfaces
              </h4>
              <p className="text-xs text-slate-600 mt-1">
                Use your subscribe link in Linktree, Beacons, Instagram bio, and TikTok profile to convert social followers into YouTube subscribers.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <h4 className="font-bold text-sm text-slate-900 flex items-center gap-1.5">
                <FaLightbulb className="text-amber-500" /> Video Descriptions
              </h4>
              <p className="text-xs text-slate-600 mt-1">
                Put <em>&quot;🔔 Subscribe for more videos: [Link]&quot;</em> as the 2nd line of every YouTube video description above the fold.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <h4 className="font-bold text-sm text-slate-900 flex items-center gap-1.5">
                <FaLightbulb className="text-amber-500" /> QR Code on Physical Gear
              </h4>
              <p className="text-xs text-slate-600 mt-1">
                Print your generated QR code on presentation slides, event name tags, stickers, and business cards for instant mobile scanning.
              </p>
            </div>
          </div>
        </div>
      </div>
    </ToolPageLayout>
  );
}
