import {
  differenceInDays,
  differenceInWeeks,
  differenceInMonths,
  addDays,
  addWeeks,
  addMonths,
  format,
  startOfWeek,
  startOfMonth,
  isWithinInterval,
  parseISO,
} from "date-fns"
import type { ViewMode, GanttTask } from "./types"

export function getTimelineUnits(
  start: Date,
  end: Date,
  viewMode: ViewMode
): { label: string; date: Date }[] {
  const units: { label: string; date: Date }[] = []

  if (viewMode === "days") {
    const count = differenceInDays(end, start) + 1
    for (let i = 0; i < count; i++) {
      const date = addDays(start, i)
      units.push({ label: format(date, "d"), date })
    }
  } else if (viewMode === "weeks") {
    const weekStart = startOfWeek(start, { weekStartsOn: 1 })
    const count = differenceInWeeks(end, weekStart) + 2
    for (let i = 0; i < count; i++) {
      const date = addWeeks(weekStart, i)
      units.push({ label: format(date, "MMM d"), date })
    }
  } else {
    const monthStart = startOfMonth(start)
    const count = differenceInMonths(end, monthStart) + 2
    for (let i = 0; i < count; i++) {
      const date = addMonths(monthStart, i)
      units.push({ label: format(date, "MMM yyyy"), date })
    }
  }

  return units
}

export function getColumnWidth(viewMode: ViewMode): number {
  switch (viewMode) {
    case "days":
      return 40
    case "weeks":
      return 80
    case "months":
      return 120
  }
}

export function getTaskPosition(
  task: GanttTask,
  timelineStart: Date,
  columnWidth: number,
  viewMode: ViewMode
): { left: number; width: number } {
  const taskStart = parseISO(task.startDate)
  const taskEnd = parseISO(task.endDate)

  let startOffset: number
  let duration: number

  if (viewMode === "days") {
    startOffset = differenceInDays(taskStart, timelineStart)
    duration = differenceInDays(taskEnd, taskStart) + 1
  } else if (viewMode === "weeks") {
    const weekStart = startOfWeek(timelineStart, { weekStartsOn: 1 })
    startOffset = differenceInDays(taskStart, weekStart) / 7
    duration = (differenceInDays(taskEnd, taskStart) + 1) / 7
  } else {
    const monthStart = startOfMonth(timelineStart)
    startOffset = differenceInDays(taskStart, monthStart) / 30
    duration = (differenceInDays(taskEnd, taskStart) + 1) / 30
  }

  return {
    left: startOffset * columnWidth,
    width: Math.max(duration * columnWidth, columnWidth),
  }
}

export function isTodayInRange(start: Date, end: Date): boolean {
  const today = new Date()
  return isWithinInterval(today, { start, end })
}

export function getTodayPosition(
  timelineStart: Date,
  columnWidth: number,
  viewMode: ViewMode
): number {
  const today = new Date()
  if (viewMode === "days") {
    return differenceInDays(today, timelineStart) * columnWidth
  } else if (viewMode === "weeks") {
    const weekStart = startOfWeek(timelineStart, { weekStartsOn: 1 })
    return (differenceInDays(today, weekStart) / 7) * columnWidth
  } else {
    const monthStart = startOfMonth(timelineStart)
    return (differenceInDays(today, monthStart) / 30) * columnWidth
  }
}

export const CATEGORY_COLORS: Record<string, string> = {
  planning: "bg-chart-2 text-foreground",
  design: "bg-primary text-primary-foreground",
  development: "bg-chart-3 text-foreground",
  content: "bg-chart-4 text-foreground",
  testing: "bg-chart-5 text-foreground",
  deployment: "bg-chart-1 text-foreground",
}

export const CATEGORY_BAR_COLORS: Record<string, string> = {
  planning: "hsl(var(--chart-2))",
  design: "hsl(var(--primary))",
  development: "hsl(var(--chart-3))",
  content: "hsl(var(--chart-4))",
  testing: "hsl(var(--chart-5))",
  deployment: "hsl(var(--chart-1))",
}
