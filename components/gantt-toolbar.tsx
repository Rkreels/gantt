"use client"

import { useProject } from "@/lib/project-context"
import { cn } from "@/lib/utils"
import type { ViewMode } from "@/lib/types"
import { CategoryFilters } from "./category-filters"

const VIEW_MODES: { value: ViewMode; label: string }[] = [
  { value: "days", label: "Days" },
  { value: "weeks", label: "Weeks" },
  { value: "months", label: "Months" },
]

export function GanttToolbar() {
  const { viewMode, setViewMode, activeProject } = useProject()

  if (!activeProject) return null

  // Calculate project stats
  const totalTasks = activeProject.tasks.length
  const completedTasks = activeProject.tasks.filter(
    (t) => t.progress === 100
  ).length
  const avgProgress = Math.round(
    activeProject.tasks.reduce((acc, t) => acc + t.progress, 0) / totalTasks
  )

  return (
    <div className="flex flex-col gap-2 border-b border-border bg-card">
      {/* Stats + view toggle */}
      <div className="flex items-center justify-between px-4 pt-3">
        <div className="flex items-center gap-3">
          <div className="flex flex-col">
            <span className="text-xs text-muted-foreground">Progress</span>
            <span className="text-lg font-semibold text-foreground leading-tight">
              {avgProgress}%
            </span>
          </div>
          <div className="w-px h-8 bg-border" />
          <div className="flex flex-col">
            <span className="text-xs text-muted-foreground">Tasks</span>
            <span className="text-lg font-semibold text-foreground leading-tight">
              {completedTasks}/{totalTasks}
            </span>
          </div>
        </div>

        {/* View mode toggle */}
        <div className="flex bg-muted rounded-lg p-0.5">
          {VIEW_MODES.map((mode) => (
            <button
              key={mode.value}
              type="button"
              onClick={() => setViewMode(mode.value)}
              className={cn(
                "px-3 py-1.5 text-xs font-medium rounded-md transition-all min-h-[32px]",
                viewMode === mode.value
                  ? "bg-card text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {mode.label}
            </button>
          ))}
        </div>
      </div>

      {/* Category chip filters */}
      <CategoryFilters />
    </div>
  )
}
