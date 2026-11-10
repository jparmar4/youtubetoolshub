"use client";

import { useEffect, useState } from "react";
import { FaDownload, FaTimes, FaYoutube } from "react-icons/fa";
import { usePathname } from "next/navigation";
import { toolMeta } from "@/config/tool-meta";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
}

export default function PWAInstallPrompt() {
  const pathname = usePathname();
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    // Check if dismissed before
    try {
      const dismissed = localStorage.getItem("pwa_prompt_dismissed");
      if (dismissed === "true") return;
    } catch {
      /* ignore */
    }

    let timer: ReturnType<typeof setTimeout> | undefined;

    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      if (timer) clearTimeout(timer);
      // Wait 4 seconds after page load before showing prompt
      timer = setTimeout(() => setShowPrompt(true), 4000);
    };

    window.addEventListener("beforeinstallprompt", handler);

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
      if (timer) clearTimeout(timer);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    await deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === "accepted") {
      setShowPrompt(false);
    }
    setDeferredPrompt(null);
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    try {
      localStorage.setItem("pwa_prompt_dismissed", "true");
    } catch {
      /* ignore */
    }
  };

  // Do not show on embed routes
  if (pathname?.startsWith("/embed") || !showPrompt) {
    return null;
  }

  return (
    <div className="fixed bottom-24 right-4 z-40 max-w-sm bg-white border border-purple-200 rounded-2xl shadow-xl p-4 animate-fade-in-up">
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-fuchsia-600 flex items-center justify-center text-white shrink-0 shadow-md shadow-purple-500/20">
          <FaYoutube className="w-5 h-5" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <p className="text-sm font-bold text-slate-900">
              Install YouTube Tools Hub
            </p>
            <button
              onClick={handleDismiss}
              className="text-slate-400 hover:text-slate-600 text-xs p-1"
              aria-label="Dismiss"
            >
              <FaTimes />
            </button>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            {`Access ${toolMeta.length} free creator tools offline and directly from your home screen.`}
          </p>
          <div className="mt-3 flex items-center gap-2">
            <button
              onClick={handleInstall}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-purple-600 text-white font-bold text-xs hover:bg-purple-700 transition-colors shadow-sm"
            >
              <FaDownload className="text-[10px]" />
              <span>Install App</span>
            </button>
            <button
              onClick={handleDismiss}
              className="text-xs text-slate-500 hover:text-slate-700 font-medium px-2 py-1.5"
            >
              Maybe Later
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
