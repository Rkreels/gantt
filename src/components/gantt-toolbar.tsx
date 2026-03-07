"use client"

import { useProject } from "@/lib/project-context"
import { cn } from "@/lib/utils"
import type { ViewMode } from "@/lib/types"
import { CategoryFilters } from "./category-filters"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { Plus, Download, FileJson, FileSpreadsheet, FileText, FileDown } from "lucide-react"
import { format, parseISO } from "date-fns"
import { exportToPDF } from "@/lib/pdf-export"
import { useState } from "react"
import type { RefObject } from "react"

const VIEW_MODES: { value: ViewMode; label: string }[] = [
  { value: "days", label: "Days" },
  { value: "weeks", label: "Weeks" },
  { value: "months", label: "Months" },
]

interface GanttToolbarProps {
  onAddTask: () => void
  chartRef?: RefObject<HTMLDivElement | null>
}

export function GanttToolbar({ onAddTask, chartRef }: GanttToolbarProps) {
  const { viewMode, setViewMode, activeProject } = useProject()
  const [isExporting, setIsExporting] = useState(false)

  if (!activeProject) return null

  // Calculate project stats
  const totalTasks = activeProject.tasks.length
  const completedTasks = activeProject.tasks.filter(
    (t) => t.progress === 100
  ).length
  const avgProgress = totalTasks > 0
    ? Math.round(
        activeProject.tasks.reduce((acc, t) => acc + t.progress, 0) / totalTasks
      )
    : 0

  const exportToJSON = () => {
    const data = {
      project: {
        id: activeProject.id,
        name: activeProject.name,
        description: activeProject.description,
        startDate: activeProject.startDate,
        endDate: activeProject.endDate,
      },
      tasks: activeProject.tasks,
      exportedAt: new Date().toISOString(),
      stats: {
        totalTasks,
        completedTasks,
        avgProgress,
      },
    }

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${activeProject.name.replace(/\s+/g, "-").toLowerCase()}-gantt-${format(new Date(), "yyyy-MM-dd")}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const exportToCSV = () => {
    const headers = [
      "Task ID",
      "Task Name",
      "Start Date",
      "End Date",
      "Progress (%)",
      "Category",
      "Assignee",
      "Dependencies",
    ]

    const rows = activeProject.tasks.map((task) => [
      task.id,
      `"${task.name}"`,
      task.startDate,
      task.endDate,
      task.progress,
      task.category,
      `"${task.assignee}"`,
      `"${task.dependencies.join(", ")}"`,
    ])

    const csv = [
      headers.join(","),
      ...rows.map((row) => row.join(",")),
    ].join("\n")

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${activeProject.name.replace(/\s+/g, "-").toLowerCase()}-gantt-${format(new Date(), "yyyy-MM-dd")}.csv`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const exportProjectReport = () => {
    const report = `
================================================================================
                           GANTT CHART PROJECT REPORT
================================================================================

Project: ${activeProject.name}
Description: ${activeProject.description}
Timeline: ${format(parseISO(activeProject.startDate), "MMMM d, yyyy")} - ${format(parseISO(activeProject.endDate), "MMMM d, yyyy")}
Generated: ${format(new Date(), "MMMM d, yyyy 'at' h:mm a")}

--------------------------------------------------------------------------------
                                    SUMMARY
--------------------------------------------------------------------------------

Total Tasks: ${totalTasks}
Completed: ${completedTasks}
In Progress: ${totalTasks - completedTasks}
Average Progress: ${avgProgress}%

By Category:
${Object.entries(
  activeProject.tasks.reduce((acc, t) => {
    acc[t.category] = (acc[t.category] || 0) + 1
    return acc
  }, {} as Record<string, number>)
)
  .map(([cat, count]) => `  - ${cat}: ${count} tasks`)
  .join("\n")}

--------------------------------------------------------------------------------
                                   TASK LIST
--------------------------------------------------------------------------------

${activeProject.tasks
  .map(
    (task, i) => `
${i + 1}. ${task.name}
   ID: ${task.id}
   Period: ${format(parseISO(task.startDate), "MMM d, yyyy")} - ${format(parseISO(task.endDate), "MMM d, yyyy")}
   Progress: ${task.progress}% | Category: ${task.category} | Assignee: ${task.assignee}
   Dependencies: ${task.dependencies.length > 0 ? task.dependencies.join(", ") : "None"}
`
  )
  .join("")}

================================================================================
                              END OF REPORT
================================================================================
`.trim()

    const blob = new Blob([report], { type: "text/plain;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${activeProject.name.replace(/\s+/g, "-").toLowerCase()}-report-${format(new Date(), "yyyy-MM-dd")}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const handleExportPDF = async () => {
    setIsExporting(true)
    try {
      await exportToPDF(activeProject, chartRef?.current || null)
    } catch (error) {
      console.error("Error exporting PDF:", error)
    } finally {
      setIsExporting(false)
    }
  }

  return (
    <div className="flex flex-col gap-2 border-b border-border bg-card">
      {/* Stats + view toggle */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between px-4 pt-3 gap-3">
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

        <div className="flex items-center gap-2 w-full sm:w-auto">
          {/* View mode toggle */}
          <div className="flex bg-muted rounded-lg p-0.5 flex-1 sm:flex-initial">
            {VIEW_MODES.map((mode) => (
              <button
                key={mode.value}
                type="button"
                onClick={() => setViewMode(mode.value)}
                className={cn(
                  "flex-1 sm:flex-initial px-2 sm:px-3 py-1.5 text-xs font-medium rounded-md transition-all min-h-[32px]",
                  viewMode === mode.value
                    ? "bg-card text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {mode.label}
              </button>
            ))}
          </div>

          {/* Download button */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-8 px-2 sm:px-3" disabled={isExporting}>
                <Download className="w-4 h-4 sm:mr-1" />
                <span className="hidden sm:inline">{isExporting ? "Exporting..." : "Export"}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem onClick={handleExportPDF} className="cursor-pointer" disabled={isExporting}>
                <FileDown className="w-4 h-4 mr-2" />
                Export as PDF
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={exportToJSON} className="cursor-pointer">
                <FileJson className="w-4 h-4 mr-2" />
                Export as JSON
              </DropdownMenuItem>
              <DropdownMenuItem onClick={exportToCSV} className="cursor-pointer">
                <FileSpreadsheet className="w-4 h-4 mr-2" />
                Export as CSV
              </DropdownMenuItem>
              <DropdownMenuItem onClick={exportProjectReport} className="cursor-pointer">
                <FileText className="w-4 h-4 mr-2" />
                Export Report
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button size="sm" onClick={onAddTask} className="h-8 px-2 sm:px-3">
            <Plus className="w-4 h-4 sm:mr-1" />
            <span className="hidden sm:inline">Add Task</span>
          </Button>
        </div>
      </div>

      {/* Category chip filters */}
      <CategoryFilters />
    </div>
  )
}
