"use client"

import { useState, useRef, forwardRef } from "react"
import { parseISO, format } from "date-fns"
import { useProject } from "@/lib/project-context"
import {
  getTimelineUnits,
  getColumnWidth,
  getTaskPosition,
  getTodayPosition,
  isTodayInRange,
  CATEGORY_BAR_COLORS,
} from "@/lib/gantt-utils"
import { GanttTaskRow } from "./gantt-task-row"
import { Skeleton } from "@/components/ui/skeleton"
import type { GanttTask } from "@/lib/types"

interface GanttChartProps {
  onEditTask?: (task: GanttTask) => void
}

export const GanttChart = forwardRef<HTMLDivElement, GanttChartProps>(
  function GanttChart({ onEditTask }, ref) {
    const { activeProject, isLoading, viewMode, activeCategory, deleteTask } = useProject()
    const scrollRef = useRef<HTMLDivElement>(null)
    const taskListRef = useRef<HTMLDivElement>(null)

    const timelineStart = activeProject
      ? parseISO(activeProject.startDate)
      : new Date()
    const timelineEnd = activeProject
      ? parseISO(activeProject.endDate)
      : new Date()

    const columnWidth = getColumnWidth(viewMode)
    const units = getTimelineUnits(timelineStart, timelineEnd, viewMode)
    const totalWidth = units.length * columnWidth
    const rowHeight = 48

    const showToday = isTodayInRange(timelineStart, timelineEnd)
    const todayPos = showToday
      ? getTodayPosition(timelineStart, columnWidth, viewMode)
      : 0

    const filteredTasks = activeProject
      ? activeCategory
        ? activeProject.tasks.filter((t) => t.category === activeCategory)
        : activeProject.tasks
      : []

    // Sync scroll for task list
    const handleScroll = () => {
      if (scrollRef.current && taskListRef.current) {
        taskListRef.current.scrollTop = scrollRef.current.scrollTop
      }
    }

    const handleDeleteTask = async (taskId: string) => {
      await deleteTask(taskId)
    }

    if (isLoading) {
      return (
        <div className="flex flex-col gap-3 p-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-10 w-full" />
          ))}
        </div>
      )
    }

    if (!activeProject) {
      return (
        <div className="flex items-center justify-center h-64 text-muted-foreground">
          No projects found. Create a new project to get started.
        </div>
      )
    }

    const headerHeight = viewMode === "months" ? 40 : 64

    return (
      <div ref={ref} className="flex flex-col flex-1 min-h-0">
        {/* Chart area */}
        <div className="flex flex-1 min-h-0">
          {/* Task names column - hidden on mobile, shown on md+ */}
          <div className="hidden md:flex flex-col w-52 lg:w-64 flex-shrink-0 border-r border-border">
            {/* Header spacer */}
            <div
              className="flex-shrink-0 border-b border-border bg-card"
              style={{ height: headerHeight }}
            >
              <div className="flex items-end h-full px-3 pb-2">
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Task
                </span>
              </div>
            </div>
            {/* Task list - scrollable */}
            <div
              ref={taskListRef}
              className="flex-1 overflow-y-auto overflow-x-hidden scrollbar-thin"
              style={{ maxHeight: `calc(100vh - ${180 + headerHeight}px)` }}
            >
              {filteredTasks.map((task) => (
                <div
                  key={task.id}
                  className="flex items-center gap-2 px-3 border-b border-border"
                  style={{ height: rowHeight }}
                >
                  <div
                    className="w-2 h-2 rounded-full flex-shrink-0"
                    style={{
                      backgroundColor:
                        CATEGORY_BAR_COLORS[task.category] ||
                        "hsl(var(--primary))",
                    }}
                  />
                  <div className="flex flex-col min-w-0">
                    <span className="text-sm font-medium truncate text-foreground">
                      {task.name}
                    </span>
                    <span className="text-xs text-muted-foreground truncate">
                      {task.assignee}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Timeline area */}
          <div
            ref={scrollRef}
            onScroll={handleScroll}
            className="flex-1 overflow-auto scrollbar-thin"
          >
            <div style={{ width: totalWidth, minWidth: "100%" }}>
              {/* Month header row (for days/weeks views) */}
              {viewMode !== "months" && (
                <div
                  className="flex border-b border-border bg-card sticky top-0 z-10"
                  style={{ height: 24 }}
                >
                  {units.map((unit, i) => {
                    const month = format(unit.date, "MMM yyyy")
                    const prevMonth = i > 0 ? format(units[i - 1].date, "MMM yyyy") : ""
                    const isNewMonth = month !== prevMonth
                    
                    if (!isNewMonth) return null
                    
                    // Calculate width for this month
                    let width = columnWidth
                    for (let j = i + 1; j < units.length && format(units[j].date, "MMM yyyy") === month; j++) {
                      width += columnWidth
                    }
                    
                    return (
                      <div
                        key={i}
                        className="flex items-center justify-center text-xs font-medium text-muted-foreground border-r border-border flex-shrink-0"
                        style={{
                          position: "absolute",
                          left: i * columnWidth,
                          width,
                        }}
                      >
                        {month}
                      </div>
                    )
                  })}
                </div>
              )}

              {/* Unit header row */}
              <div
                className="flex border-b border-border bg-card sticky z-10"
                style={{
                  height: 40,
                  top: viewMode === "months" ? 0 : 24,
                }}
              >
                {units.map((unit, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-center text-xs text-muted-foreground border-r border-border flex-shrink-0"
                    style={{ width: columnWidth }}
                  >
                    {unit.label}
                  </div>
                ))}
              </div>

              {/* Task bars */}
              <div className="relative">
                {/* Grid lines */}
                {units.map((_, i) => (
                  <div
                    key={i}
                    className="absolute top-0 bottom-0 border-r border-gantt-grid"
                    style={{ left: (i + 1) * columnWidth }}
                  />
                ))}

                {/* Today line */}
                {showToday && (
                  <div
                    className="absolute top-0 bottom-0 w-0.5 bg-gantt-today z-20"
                    style={{ left: todayPos }}
                  >
                    <div className="absolute -top-1 left-1/2 -translate-x-1/2 bg-gantt-today text-primary-foreground text-[10px] px-1 rounded">
                      Today
                    </div>
                  </div>
                )}

                {/* Task rows */}
                {filteredTasks.map((task) => {
                  const pos = getTaskPosition(
                    task,
                    timelineStart,
                    columnWidth,
                    viewMode
                  )
                  return (
                    <GanttTaskRow
                      key={task.id}
                      task={task}
                      left={pos.left}
                      width={pos.width}
                      height={rowHeight}
                      color={
                        CATEGORY_BAR_COLORS[task.category] ||
                        "hsl(var(--primary))"
                      }
                      onEdit={onEditTask}
                      onDelete={handleDeleteTask}
                    />
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
)
