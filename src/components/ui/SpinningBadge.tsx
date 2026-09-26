"use client";

// Spinning text badge — uses CSS animation (most cross-browser reliable)
// Rotation via CSS transform on the SVG element, centered correctly

interface SpinningBadgeProps {
  text?: string;
  size?: number;
  className?: string;
}

export default function SpinningBadge({
  text = "AVAILABLE FOR WORK ✦ OPEN TO PROJECTS ✦ ",
  size = 120,
  className = "",
}: SpinningBadgeProps) {
  const radius = size / 2 - 14;
  const circumference = 2 * Math.PI * radius;
  const charCount = text.length;
  const cx = size / 2;
  const cy = size / 2;

  // SVG circle path for textPath
  const circlePath = `
    M ${cx} ${cy}
    m -${radius} 0
    a ${radius} ${radius} 0 1 1 ${radius * 2} 0
    a ${radius} ${radius} 0 1 1 -${radius * 2} 0
  `.trim();

  return (
    <div
      className={`relative flex items-center justify-center ${className}`}
      style={{ width: size, height: size }}
      aria-label="Available for freelance work"
    >
      {/* CSS-animated spinning ring — most reliable rotation */}
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="absolute inset-0 spinning-badge-svg"
        aria-hidden="true"
        style={{
          transformOrigin: `${cx}px ${cy}px`,
          animation: "badgeSpin 20s linear infinite",
        }}
      >
        <defs>
          <path id={`badgeCircle-${size}`} d={circlePath} />
        </defs>
        <text
          style={{
            fontSize: `${Math.max(6, size * 0.06)}px`,
            fontFamily: "var(--font-jetbrains, monospace)",
            letterSpacing: `${Math.max(0, circumference / charCount - size * 0.062)}px`,
            fill: "var(--text-secondary)",
          }}
        >
          <textPath href={`#badgeCircle-${size}`}>{text}</textPath>
        </text>
      </svg>

      {/* Arrow center — static, doesn't spin */}
      <div
        className="relative z-10 flex items-center justify-center rounded-full border border-[var(--border)] bg-[var(--bg)]"
        style={{ width: size * 0.33, height: size * 0.33 }}
      >
        <svg width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden="true">
          <path
            d="M2 9L9 2M9 2H4M9 2V7"
            stroke="var(--accent)"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      <style jsx global>{`
        @keyframes badgeSpin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
