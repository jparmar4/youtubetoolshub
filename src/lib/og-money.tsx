/**
 * Shared OG / Pinterest layouts for money pages (earnings, CPM).
 * Used by opengraph-image.tsx and pinterest-image route handlers.
 */

export const OG_SIZE = { width: 1200, height: 630 } as const;
/** Pinterest prefers taller pins (~2:3) */
export const PIN_SIZE = { width: 1000, height: 1500 } as const;

type MoneyOgProps = {
  eyebrow: string;
  title: string;
  subtitle: string;
  bullets?: string[];
  accent?: "emerald" | "purple";
  /** "og" = 1200x630, "pin" = 1000x1500 */
  format?: "og" | "pin";
};

export function MoneyShareImage({
  eyebrow,
  title,
  subtitle,
  bullets = [],
  accent = "emerald",
  format = "og",
}: MoneyOgProps) {
  const isPin = format === "pin";
  const width = isPin ? PIN_SIZE.width : OG_SIZE.width;
  const height = isPin ? PIN_SIZE.height : OG_SIZE.height;

  const gradient =
    accent === "emerald"
      ? "linear-gradient(145deg, #022c22 0%, #064e3b 45%, #059669 100%)"
      : "linear-gradient(145deg, #0f0518 0%, #4c1d95 50%, #a855f7 100%)";

  const chipBg =
    accent === "emerald" ? "rgba(167,243,208,0.2)" : "rgba(233,213,255,0.2)";
  const chipColor = accent === "emerald" ? "#a7f3d0" : "#e9d5ff";

  return (
    <div
      style={{
        width,
        height,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: gradient,
        padding: isPin ? "72px 64px" : "56px 64px",
        fontFamily: "system-ui, Segoe UI, sans-serif",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Glow */}
      <div
        style={{
          position: "absolute",
          top: isPin ? 80 : -80,
          right: -100,
          width: isPin ? 520 : 420,
          height: isPin ? 520 : 420,
          borderRadius: "50%",
          background:
            accent === "emerald"
              ? "radial-gradient(circle, rgba(52,211,153,0.35) 0%, transparent 70%)"
              : "radial-gradient(circle, rgba(168,85,247,0.35) 0%, transparent 70%)",
          display: "flex",
        }}
      />

      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
          }}
        >
          <div
            style={{
              background: chipBg,
              color: chipColor,
              fontSize: isPin ? 28 : 22,
              fontWeight: 800,
              letterSpacing: 2,
              textTransform: "uppercase",
              padding: isPin ? "12px 22px" : "10px 18px",
              borderRadius: 999,
              display: "flex",
            }}
          >
            {eyebrow}
          </div>
        </div>

        <div
          style={{
            color: "#fff",
            fontSize: isPin ? 64 : 52,
            fontWeight: 900,
            lineHeight: 1.08,
            letterSpacing: -1.5,
            maxWidth: isPin ? 880 : 980,
            display: "flex",
          }}
        >
          {title}
        </div>

        <div
          style={{
            color: accent === "emerald" ? "#d1fae5" : "#e9d5ff",
            fontSize: isPin ? 32 : 26,
            fontWeight: 500,
            lineHeight: 1.35,
            maxWidth: isPin ? 860 : 900,
            display: "flex",
          }}
        >
          {subtitle}
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: isPin ? 18 : 12 }}>
        {bullets.slice(0, isPin ? 4 : 3).map((b) => (
          <div
            key={b}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              color: "#fff",
              fontSize: isPin ? 28 : 22,
              fontWeight: 600,
            }}
          >
            <div
              style={{
                width: isPin ? 18 : 14,
                height: isPin ? 18 : 14,
                borderRadius: "50%",
                background: accent === "emerald" ? "#34d399" : "#c084fc",
                display: "flex",
              }}
            />
            {b}
          </div>
        ))}

        <div
          style={{
            marginTop: isPin ? 36 : 20,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              color: accent === "emerald" ? "#a7f3d0" : "#ddd6fe",
              fontSize: isPin ? 26 : 22,
              fontWeight: 700,
              display: "flex",
            }}
          >
            youtubetoolshub.com
          </div>
          <div
            style={{
              background: "#fff",
              color: accent === "emerald" ? "#065f46" : "#5b21b6",
              fontSize: isPin ? 26 : 22,
              fontWeight: 800,
              padding: isPin ? "16px 28px" : "12px 22px",
              borderRadius: 14,
              display: "flex",
            }}
          >
            Free · No signup
          </div>
        </div>
      </div>
    </div>
  );
}
