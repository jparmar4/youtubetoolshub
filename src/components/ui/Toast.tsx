"use client";

import { useSyncExternalStore, memo } from "react";
import { FaCheckCircle, FaInfoCircle, FaStar, FaTimes, FaExclamationCircle } from "react-icons/fa";

export interface ToastItem {
  id: string;
  type: "success" | "info" | "star" | "error";
  message: string;
  duration?: number;
}

let toasts: ToastItem[] = [];
const listeners = new Set<() => void>();

function emitChange() {
  for (const listener of listeners) {
    listener();
  }
}

export const toast = {
  show(item: Omit<ToastItem, "id">) {
    const id = Math.random().toString(36).substring(2, 9);
    const newToast: ToastItem = { ...item, id };
    toasts = [...toasts, newToast];
    emitChange();

    setTimeout(() => {
      toast.dismiss(id);
    }, item.duration || 3200);
  },
  success(message: string) {
    toast.show({ type: "success", message });
  },
  info(message: string) {
    toast.show({ type: "info", message });
  },
  error(message: string) {
    toast.show({ type: "error", message });
  },
  star(message: string) {
    toast.show({ type: "star", message });
  },
  dismiss(id: string) {
    toasts = toasts.filter((t) => t.id !== id);
    emitChange();
  },
};

function subscribe(callback: () => void) {
  listeners.add(callback);
  return () => {
    listeners.delete(callback);
  };
}

function getSnapshot() {
  return toasts;
}

function getServerSnapshot(): ToastItem[] {
  return [];
}

export function ToastContainer() {
  const activeToasts = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  if (activeToasts.length === 0) return null;

  return (
    <aside
      aria-label="Notifications"
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] flex flex-col gap-2 pointer-events-none w-full max-w-sm px-4"
    >
      {activeToasts.map((t) => (
        <div
          key={t.id}
          className="pointer-events-auto flex items-center justify-between gap-3 px-4 py-3 rounded-2xl bg-slate-900/95 text-white backdrop-blur-xl border border-white/15 shadow-2xl shadow-purple-950/40 text-xs sm:text-sm font-semibold animate-fade-in-up transition-all"
          role="status"
          aria-live="polite"
        >
          <div className="flex items-center gap-2.5 truncate">
            {t.type === "star" && <FaStar className="w-4 h-4 text-amber-400 flex-shrink-0 animate-bounce" />}
            {t.type === "success" && <FaCheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />}
            {t.type === "info" && <FaInfoCircle className="w-4 h-4 text-sky-400 flex-shrink-0" />}
            {t.type === "error" && <FaExclamationCircle className="w-4 h-4 text-red-400 flex-shrink-0" />}
            <span className="truncate">{t.message}</span>
          </div>
          <button
            type="button"
            onClick={() => toast.dismiss(t.id)}
            className="p-1 text-slate-400 hover:text-white rounded-lg transition-colors flex-shrink-0"
            aria-label="Dismiss toast"
          >
            <FaTimes className="w-3.5 h-3.5" />
          </button>
        </div>
      ))}
    </aside>
  );
}

export default memo(ToastContainer);
