"use client"

import { useRef, useEffect, useMemo } from "react"
import { parseISO, format, differenceInDays } from "date-fns"
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

export function GanttChart() {
  const { activeProject, isLoading, viewMode, activeCategory } = useProject()
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

  const filteredTasks = useMemo(() => {
    if (!activeProject) return []
    if (!activeCategory) return activeProject.tasks
    return activeProject.tasks.filter((t) => t.category === activeCategory)
  }, [activeProject, activeCategory])

  // Sync scroll for task list
  const handleScroll = () => {
    if (scrollRef.current && taskListRef.current) {
      taskListRef.current.scrollTop = scrollRef.current.scrollTop
    }
  }

  // Scroll to today on mount
  useEffect(() => {
    if (showToday && scrollRef.current) {
      const containerWidth = scrollRef.current.clientWidth
      scrollRef.current.scrollLeft = Math.max(
        0,
        todayPos - containerWidth / 3
      )
    }
  }, [showToday, todayPos, activeProject?.id])

  const monthHeaders = useMemo(() => {
    if (viewMode === "months") return []
    const headers: { label: string; left: number; width: number }[] = []
    let currentMonth = ""
    let startIdx = 0

    units.forEach((unit, idx) => {
      const month = format(unit.date, "MMM yyyy")
      if (month !== currentMonth) {
        if (currentMonth) {
          headers.push({
            label: currentMonth,
            left: startIdx * columnWidth,
            width: (idx - startIdx) * columnWidth,
          })
        }
        currentMonth = month
        startIdx = idx
      }
    })
    if (currentMonth) {
      headers.push({
        label: currentMonth,
        left: startIdx * columnWidth,
        width: (units.length - startIdx) * columnWidth,
      })
    }
    return headers
  }, [units, columnWidth, viewMode])

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
        No projects found. Add JSON files to the /data folder.
      </div>
    )
  }

  return (
    <div className="flex flex-col flex-1 min-h-0">
      {/* Chart area */}
      <div className="flex flex-1 min-h-0">
        {/* Task names column - hidden on mobile, shown on md+ */}
        <div
          ref={taskListRef}
          className="hidden md:flex flex-col w-52 lg:w-64 flex-shrink-0 border-r border-border overflow-hidden"
        >
          {/* Header spacer */}
          <div
            className="flex-shrink-0 border-b border-border bg-card"
            style={{ height: viewMode === "months" ? 40 : 64 }}
          >
            <div className="flex items-end h-full px-3 pb-2">
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Task
              </span>
            </div>
          </div>
          {/* Task list */}
          <div className="flex-1 overflow-hidden">
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
                {monthHeaders.map((mh, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-center text-xs font-medium text-muted-foreground border-r border-border"
                    style={{
                      position: "absolute",
                      left: mh.left,
                      width: mh.width,
                    }}
                  >
                    {mh.label}
                  </div>
                ))}
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
