"use client"

import { useProject } from "@/lib/project-context"
import { cn } from "@/lib/utils"
import { CATEGORY_BAR_COLORS } from "@/lib/gantt-utils"

export function CategoryFilters() {
  const { activeProject, activeCategory, setActiveCategory } = useProject()

  if (!activeProject) return null

  const categories = Array.from(
    new Set(activeProject.tasks.map((t) => t.category))
  )

  return (
    <div className="flex gap-2 overflow-x-auto scrollbar-none px-4 py-2">
      {categories.map((cat) => {
        const isActive = activeCategory === cat
        return (
          <button
            key={cat}
            type="button"
            onClick={() => setActiveCategory(isActive ? null : cat)}
            className={cn(
              "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all min-h-[36px]",
              isActive
                ? "bg-primary text-primary-foreground shadow-sm"
                : "bg-card text-foreground border border-border hover:bg-accent"
            )}
          >
            <span
              className="w-2 h-2 rounded-full flex-shrink-0"
              style={{
                backgroundColor: CATEGORY_BAR_COLORS[cat] || "hsl(var(--primary))",
              }}
            />
            <span className="capitalize">{cat}</span>
            <span className="text-[10px] opacity-70">
              {activeProject.tasks.filter((t) => t.category === cat).length}
            </span>
          </button>
        )
      })}
    </div>
  )
}
