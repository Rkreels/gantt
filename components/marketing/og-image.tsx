"use client"

// Brand colors from globals.css dark mode
const BRAND = {
  bg: "hsl(224, 20%, 7%)",
  foreground: "hsl(220, 14%, 96%)",
  primary: "hsl(220, 70%, 55%)",
  card: "hsl(224, 18%, 10%)",
  muted: "hsl(220, 10%, 54%)",
  border: "hsl(224, 14%, 18%)",
  ganttTask: "hsl(220, 70%, 55%)",
  chart2: "hsl(160, 60%, 50%)",
}

// Mini task bar for texture
function MiniTaskBar({
  width,
  progress,
  color,
}: {
  width: number
  progress: number
  color: string
}) {
  return (
    <div
      className="rounded-md relative overflow-hidden"
      style={{
        width,
        height: 24,
        backgroundColor: color,
      }}
    >
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundColor: BRAND.foreground,
          clipPath: `inset(0 ${100 - progress}% 0 0)`,
        }}
      />
    </div>
  )
}

// Mini stat widget for texture
function MiniStatWidget({
  label,
  value,
}: {
  label: string
  value: string
}) {
  return (
    <div
      className="rounded-lg px-2.5 py-1.5"
      style={{
        backgroundColor: BRAND.card,
        border: `1px solid ${BRAND.border}`,
      }}
    >
      <div
        className="text-[8px] uppercase tracking-wide"
        style={{ color: BRAND.muted }}
      >
        {label}
      </div>
      <div
        className="text-sm font-semibold leading-tight"
        style={{ color: BRAND.foreground }}
      >
        {value}
      </div>
    </div>
  )
}

export function OGImage() {
  return (
    <div
      className="relative overflow-hidden flex flex-col justify-center px-20"
      style={{
        width: 1200,
        height: 630,
        backgroundColor: BRAND.bg,
        fontFamily: "var(--font-inter), system-ui, sans-serif",
      }}
    >
      {/* Top accent line */}
      <div
        className="absolute top-0 left-0 right-0 h-1"
        style={{ backgroundColor: BRAND.primary }}
      />

      {/* Background texture - floating UI elements in bottom right */}
      <div
        className="absolute flex flex-col gap-2"
        style={{
          right: 80,
          bottom: 100,
          transform: "rotate(2deg)",
          opacity: 0.5,
        }}
      >
        <MiniTaskBar width={140} progress={85} color={BRAND.ganttTask} />
        <MiniTaskBar width={100} progress={60} color={BRAND.chart2} />
        <div className="flex gap-2 mt-1">
          <MiniStatWidget label="Done" value="8/12" />
        </div>
      </div>

      {/* Main content */}
      <div className="relative z-10">
        {/* Template name */}
        <h1
          className="font-bold"
          style={{
            fontSize: 72,
            color: BRAND.foreground,
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
          }}
        >
          Gantt
        </h1>

        {/* Subtitle */}
        <p
          className="mt-4"
          style={{
            fontSize: 28,
            color: BRAND.muted,
            maxWidth: 600,
          }}
        >
          Project timelines with AI insights
        </p>

        {/* Accent border element */}
        <div
          className="mt-8 h-px w-32"
          style={{ backgroundColor: BRAND.primary }}
        />
      </div>

      {/* Bottom left subtle branding */}
      <div
        className="absolute bottom-8 left-20 flex items-center gap-2"
        style={{ color: BRAND.muted }}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M3 3v18h18" />
          <path d="M7 12h8" />
          <path d="M7 16h12" />
          <path d="M7 8h4" />
        </svg>
        <span className="text-sm font-medium">v0 Template</span>
      </div>
    </div>
  )
}
