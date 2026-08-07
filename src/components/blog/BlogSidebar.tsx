import SidebarGoogleAd from "@/components/ads/SidebarGoogleAd";

/**
 * Right sidebar for blog + tool pages.
 * Ad-only so the vertical AdSense unit can use the full rail (better fill rate).
 */
export default function BlogSidebar() {
  return (
    <aside className="hidden lg:block lg:col-span-1 self-start w-full min-w-0 lg:sticky lg:top-24">
      <div className="w-full min-w-[250px] max-w-[336px] mx-auto">
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2 text-center">
          Advertisement
        </p>
        <SidebarGoogleAd />
      </div>
    </aside>
  );
}
