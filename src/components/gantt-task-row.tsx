"use client"

import { useState } from "react"
import { format, parseISO, differenceInDays } from "date-fns"
import type { GanttTask } from "@/lib/types"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Pencil, Trash2, Calendar, Clock, Users, GitBranch } from "lucide-react"

interface GanttTaskRowProps {
  task: GanttTask
  left: number
  width: number
  height: number
  color: string
  onEdit?: (task: GanttTask) => void
  onDelete?: (taskId: string) => void
}

export function GanttTaskRow({
  task,
  left,
  width,
  height,
  color,
  onEdit,
  onDelete,
}: GanttTaskRowProps) {
  const [open, setOpen] = useState(false)
  const duration =
    differenceInDays(parseISO(task.endDate), parseISO(task.startDate)) + 1

  const handleEdit = () => {
    setOpen(false)
    onEdit?.(task)
  }

  const handleDelete = () => {
    setOpen(false)
    onDelete?.(task.id)
  }

  return (
    <>
      <div
        className="relative border-b border-border"
        style={{ height }}
      >
        <TooltipProvider delayDuration={200}>
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                type="button"
                onClick={() => setOpen(true)}
                className="absolute top-2 rounded-md transition-all hover:brightness-110 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                style={{
                  left,
                  width,
                  height: height - 16,
                  backgroundColor: color,
                }}
              >
                {/* Progress fill */}
                <div
                  className="absolute inset-0 rounded-md opacity-30 bg-foreground"
                  style={{
                    clipPath: `inset(0 ${100 - task.progress}% 0 0)`,
                  }}
                />
                {/* Label visible on wider bars */}
                {width > 60 && (
                  <span className="relative z-10 text-xs font-medium px-2 truncate block text-center" style={{ color: "white" }}>
                    {task.name}
                  </span>
                )}
              </button>
            </TooltipTrigger>
            <TooltipContent side="top" className="max-w-xs">
              <div className="text-sm font-medium">{task.name}</div>
              <div className="text-xs text-muted-foreground">
                {format(parseISO(task.startDate), "MMM d")} -{" "}
                {format(parseISO(task.endDate), "MMM d, yyyy")}
              </div>
              <div className="text-xs text-muted-foreground">
                {task.progress}% complete
              </div>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      {/* Task detail sheet */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="bottom" className="h-auto max-h-[85vh] rounded-t-2xl px-4 sm:px-6">
          <SheetHeader className="pb-2">
            <SheetTitle className="text-lg sm:text-xl text-left">{task.name}</SheetTitle>
            <SheetDescription className="sr-only">
              Task details for {task.name}
            </SheetDescription>
          </SheetHeader>
          
          <div className="flex flex-col gap-4 pb-2">
            {/* Badges */}
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary" className="capitalize text-xs sm:text-sm">
                {task.category}
              </Badge>
              {task.assignee && (
                <Badge variant="outline" className="text-xs sm:text-sm">
                  <Users className="w-3 h-3 mr-1" />
                  {task.assignee}
                </Badge>
              )}
            </div>

            {/* Progress */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Progress</span>
                <span className="font-medium text-foreground">{task.progress}%</span>
              </div>
              <Progress value={task.progress} className="h-2" />
            </div>

            {/* Details grid */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4 text-sm">
              <div className="flex items-start gap-2">
                <Calendar className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                <div>
                  <div className="text-muted-foreground text-xs">Start</div>
                  <div className="font-medium text-foreground">
                    {format(parseISO(task.startDate), "MMM d, yyyy")}
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Calendar className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                <div>
                  <div className="text-muted-foreground text-xs">End</div>
                  <div className="font-medium text-foreground">
                    {format(parseISO(task.endDate), "MMM d, yyyy")}
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                <div>
                  <div className="text-muted-foreground text-xs">Duration</div>
                  <div className="font-medium text-foreground">{duration} days</div>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <GitBranch className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                <div className="min-w-0">
                  <div className="text-muted-foreground text-xs">Dependencies</div>
                  <div className="font-medium text-foreground truncate">
                    {task.dependencies.length > 0
                      ? `${task.dependencies.length} task${task.dependencies.length > 1 ? "s" : ""}`
                      : "None"}
                  </div>
                </div>
              </div>
            </div>

            {/* Dependencies list if any */}
            {task.dependencies.length > 0 && (
              <div className="bg-muted/50 rounded-lg p-3">
                <div className="text-xs text-muted-foreground mb-1">Depends on:</div>
                <div className="text-sm text-foreground">
                  {task.dependencies.join(", ")}
                </div>
              </div>
            )}

            {/* Action buttons */}
            <div className="flex gap-2 pt-2">
              <Button variant="outline" className="flex-1 h-11" onClick={handleEdit}>
                <Pencil className="w-4 h-4 mr-2" />
                Edit Task
              </Button>
              <Button variant="destructive" className="flex-1 h-11" onClick={handleDelete}>
                <Trash2 className="w-4 h-4 mr-2" />
                Delete
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  )
}
