interface ThumbnailProps {
  word?: string
  variant?: "a" | "b" | "c"
}

const BRAND = {
  bg: "hsl(224, 20%, 7%)",
  foreground: "hsl(220, 14%, 96%)",
  primary: "hsl(220, 70%, 55%)",
  card: "hsl(224, 18%, 10%)",
  muted: "hsl(220, 10%, 54%)",
  border: "hsl(224, 14%, 18%)",
  ganttTask: "hsl(220, 70%, 55%)",
  ganttMilestone: "hsl(30, 80%, 60%)",
  chart2: "hsl(160, 60%, 50%)",
}

function MiniTaskBar({
  width,
  progress,
  color,
  label,
}: {
  width: number
  progress: number
  color: string
  label?: string
}) {
  return (
    <div
      className="rounded-md relative overflow-hidden"
      style={{
        width,
        height: 28,
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
      {label && (
        <span
          className="relative z-10 text-xs font-medium px-2 leading-7 block truncate"
          style={{ color: "white" }}
        >
          {label}
        </span>
      )}
    </div>
  )
}

function MiniStatWidget({
  label,
  value,
}: {
  label: string
  value: string
}) {
  return (
    <div
      className="rounded-lg px-3 py-2"
      style={{
        backgroundColor: BRAND.card,
        border: `1px solid ${BRAND.border}`,
      }}
    >
      <div
        className="text-[10px] uppercase tracking-wide"
        style={{ color: BRAND.muted }}
      >
        {label}
      </div>
      <div
        className="text-lg font-semibold leading-tight"
        style={{ color: BRAND.foreground }}
      >
        {value}
      </div>
    </div>
  )
}

function MiniChip({
  label,
  color,
  active,
}: {
  label: string
  color: string
  active?: boolean
}) {
  return (
    <div
      className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-medium"
      style={{
        backgroundColor: active ? BRAND.primary : BRAND.card,
        color: active ? "white" : BRAND.foreground,
        border: active ? "none" : `1px solid ${BRAND.border}`,
      }}
    >
      <span
        className="w-1.5 h-1.5 rounded-full"
        style={{ backgroundColor: color }}
      />
      {label}
    </div>
  )
}

export function Thumbnail({ word = "GANTT", variant = "a" }: ThumbnailProps) {
  return (
    <div
      className="relative overflow-hidden flex items-center justify-center"
      style={{
        width: 1200,
        height: 630,
        backgroundColor: BRAND.bg,
        fontFamily: "var(--font-jetbrains-mono), monospace",
      }}
    >
      {variant === "a" && (
        <>
          <div
            className="absolute flex flex-col gap-3"
            style={{
              left: 60,
              top: 140,
              transform: "rotate(-2deg)",
              opacity: 0.4,
              zIndex: 1,
            }}
          >
            <MiniTaskBar
              width={180}
              progress={75}
              color={BRAND.ganttTask}
              label="Design Phase"
            />
            <MiniTaskBar
              width={140}
              progress={45}
              color={BRAND.chart2}
              label="Dev Sprint"
            />
            <MiniTaskBar
              width={100}
              progress={20}
              color={BRAND.ganttMilestone}
            />
          </div>

          <div
            className="absolute flex flex-col gap-3"
            style={{
              right: 60,
              top: 160,
              transform: "rotate(2deg)",
              opacity: 0.4,
              zIndex: 1,
            }}
          >
            <MiniStatWidget label="Progress" value="68%" />
            <MiniStatWidget label="Tasks" value="12/18" />
          </div>

          <div
            className="absolute"
            style={{
              left: 80,
              bottom: 120,
              transform: "rotate(1deg)",
              opacity: 0.9,
              zIndex: 10,
            }}
          >
            <div className="flex gap-1.5">
              <MiniChip label="Design" color={BRAND.ganttTask} active />
              <MiniChip label="Dev" color={BRAND.chart2} />
            </div>
          </div>

          <div
            className="absolute"
            style={{
              right: 80,
              bottom: 140,
              transform: "rotate(-1deg)",
              opacity: 0.85,
              zIndex: 10,
            }}
          >
            <MiniTaskBar
              width={160}
              progress={90}
              color={BRAND.ganttTask}
              label="Launch"
            />
          </div>
        </>
      )}

      {variant === "b" && (
        <>
          <div
            className="absolute"
            style={{
              left: 100,
              top: 100,
              transform: "rotate(-3deg)",
              opacity: 0.35,
              zIndex: 1,
            }}
          >
            <div className="flex flex-col gap-2">
              <MiniTaskBar width={200} progress={80} color={BRAND.ganttTask} />
              <MiniTaskBar width={160} progress={60} color={BRAND.chart2} />
              <MiniTaskBar width={120} progress={30} color={BRAND.ganttMilestone} />
            </div>
          </div>

          <div
            className="absolute"
            style={{
              right: 100,
              bottom: 100,
              transform: "rotate(3deg)",
              opacity: 0.35,
              zIndex: 1,
            }}
          >
            <div className="flex gap-3">
              <MiniStatWidget label="Progress" value="72%" />
              <MiniStatWidget label="Tasks" value="8/11" />
            </div>
          </div>

          <div
            className="absolute"
            style={{
              right: 140,
              top: 140,
              transform: "rotate(-1deg)",
              opacity: 0.9,
              zIndex: 10,
            }}
          >
            <MiniTaskBar
              width={140}
              progress={65}
              color={BRAND.primary}
              label="Sprint 3"
            />
          </div>

          <div
            className="absolute"
            style={{
              left: 140,
              bottom: 140,
              transform: "rotate(2deg)",
              opacity: 0.85,
              zIndex: 10,
            }}
          >
            <div className="flex gap-1.5">
              <MiniChip label="Planning" color={BRAND.ganttMilestone} active />
              <MiniChip label="Review" color={BRAND.chart2} />
            </div>
          </div>
        </>
      )}

      {variant === "c" && (
        <>
          <div
            className="absolute rounded-xl overflow-hidden"
            style={{
              left: 40,
              top: 60,
              width: 380,
              backgroundColor: BRAND.card,
              border: `1px solid ${BRAND.border}`,
              padding: 16,
              transform: "rotate(-1deg)",
              opacity: 0.95,
              zIndex: 15,
              boxShadow: "0 20px 40px rgba(0,0,0,0.4)",
            }}
          >
            <div
              className="text-xs uppercase tracking-wide mb-3 font-medium"
              style={{ color: BRAND.muted }}
            >
              Project Timeline
            </div>
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <div
                  className="w-20 text-xs truncate"
                  style={{ color: BRAND.foreground }}
                >
                  Research
                </div>
                <MiniTaskBar width={220} progress={100} color={BRAND.chart2} />
              </div>
              <div className="flex items-center gap-3">
                <div
                  className="w-20 text-xs truncate"
                  style={{ color: BRAND.foreground }}
                >
                  Design
                </div>
                <MiniTaskBar width={180} progress={85} color={BRAND.ganttTask} />
              </div>
              <div className="flex items-center gap-3">
                <div
                  className="w-20 text-xs truncate"
                  style={{ color: BRAND.foreground }}
                >
                  Development
                </div>
                <MiniTaskBar width={260} progress={45} color={BRAND.primary} />
              </div>
              <div className="flex items-center gap-3">
                <div
                  className="w-20 text-xs truncate"
                  style={{ color: BRAND.foreground }}
                >
                  Testing
                </div>
                <MiniTaskBar width={140} progress={10} color={BRAND.ganttMilestone} />
              </div>
            </div>
          </div>

          <div
            className="absolute flex flex-col gap-4"
            style={{
              right: 50,
              top: 80,
              transform: "rotate(2deg)",
              zIndex: 15,
            }}
          >
            <div
              className="rounded-xl px-6 py-4"
              style={{
                backgroundColor: BRAND.card,
                border: `1px solid ${BRAND.border}`,
                boxShadow: "0 16px 32px rgba(0,0,0,0.35)",
                minWidth: 160,
              }}
            >
              <div
                className="text-[10px] uppercase tracking-wider"
                style={{ color: BRAND.muted }}
              >
                Overall Progress
              </div>
              <div
                className="text-4xl font-bold mt-1"
                style={{ color: BRAND.foreground }}
              >
                68%
              </div>
              <div
                className="h-2 rounded-full mt-2 overflow-hidden"
                style={{ backgroundColor: BRAND.border }}
              >
                <div
                  className="h-full rounded-full"
                  style={{
                    width: "68%",
                    backgroundColor: BRAND.primary,
                  }}
                />
              </div>
            </div>
            <div
              className="rounded-xl px-6 py-4"
              style={{
                backgroundColor: BRAND.card,
                border: `1px solid ${BRAND.border}`,
                boxShadow: "0 12px 24px rgba(0,0,0,0.3)",
                minWidth: 160,
              }}
            >
              <div
                className="text-[10px] uppercase tracking-wider"
                style={{ color: BRAND.muted }}
              >
                Tasks Completed
              </div>
              <div className="flex items-baseline gap-1 mt-1">
                <span
                  className="text-4xl font-bold"
                  style={{ color: BRAND.foreground }}
                >
                  24
                </span>
                <span
                  className="text-xl"
                  style={{ color: BRAND.muted }}
                >
                  / 36
                </span>
              </div>
            </div>
          </div>

          <div
            className="absolute flex items-center gap-3 px-5 py-3 rounded-xl"
            style={{
              left: 80,
              bottom: 60,
              backgroundColor: BRAND.card,
              border: `1px solid ${BRAND.border}`,
              boxShadow: "0 12px 32px rgba(0,0,0,0.35)",
              zIndex: 15,
            }}
          >
            <span
              className="text-xs uppercase tracking-wide mr-2"
              style={{ color: BRAND.muted }}
            >
              Filter:
            </span>
            <MiniChip label="All Tasks" color={BRAND.foreground} active />
            <MiniChip label="Design" color={BRAND.ganttTask} />
            <MiniChip label="Development" color={BRAND.primary} />
            <MiniChip label="QA" color={BRAND.chart2} />
            <MiniChip label="Milestones" color={BRAND.ganttMilestone} />
          </div>

          <div
            className="absolute flex items-center gap-1 px-2 py-1.5 rounded-lg"
            style={{
              right: 80,
              bottom: 70,
              backgroundColor: BRAND.card,
              border: `1px solid ${BRAND.border}`,
              boxShadow: "0 8px 20px rgba(0,0,0,0.3)",
              zIndex: 15,
            }}
          >
            <div
              className="px-3 py-1.5 rounded-md text-xs font-medium"
              style={{
                backgroundColor: BRAND.primary,
                color: "white",
              }}
            >
              Week
            </div>
            <div
              className="px-3 py-1.5 rounded-md text-xs font-medium"
              style={{ color: BRAND.muted }}
            >
              Month
            </div>
            <div
              className="px-3 py-1.5 rounded-md text-xs font-medium"
              style={{ color: BRAND.muted }}
            >
              Quarter
            </div>
          </div>
        </>
      )}

      <div className="relative z-20 flex flex-col items-center">
        <h1
          className="font-bold tracking-tight"
          style={{
            fontSize: 180,
            color: BRAND.foreground,
            lineHeight: 1,
            letterSpacing: "-0.02em",
          }}
        >
          {word}
        </h1>

        <div className="flex items-center gap-4 mt-4">
          <div
            className="h-px w-24"
            style={{ backgroundColor: BRAND.primary }}
          />
          <span
            className="text-xs uppercase tracking-[0.3em] font-medium"
            style={{ color: BRAND.muted }}
          >
            template
          </span>
          <div
            className="h-px w-24"
            style={{ backgroundColor: BRAND.primary }}
          />
        </div>
      </div>
    </div>
  )
}
