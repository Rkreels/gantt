"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { useProject } from "@/lib/project-context"
import type { GanttTask } from "@/lib/types"
import { CATEGORY_BAR_COLORS } from "@/lib/gantt-utils"
import { ScrollArea } from "@/components/ui/scroll-area"

const CATEGORIES = Object.keys(CATEGORY_BAR_COLORS)

interface TaskDialogProps {
  open: boolean
  onClose: () => void
  task?: GanttTask | null
  projectId: string
  existingTasks?: GanttTask[]
}

function TaskForm({ 
  task, 
  projectId, 
  existingTasks, 
  onClose,
  isEditing 
}: { 
  task?: GanttTask | null
  projectId: string
  existingTasks: GanttTask[]
  onClose: () => void
  isEditing: boolean
}) {
  const { createTask, updateTask } = useProject()
  const [isLoading, setIsLoading] = useState(false)

  const [name, setName] = useState(task?.name || "")
  const [startDate, setStartDate] = useState(task?.startDate || "")
  const [endDate, setEndDate] = useState(task?.endDate || "")
  const [progress, setProgress] = useState(task?.progress || 0)
  const [category, setCategory] = useState(task?.category || "development")
  const [assignee, setAssignee] = useState(task?.assignee || "")
  const [dependencies, setDependencies] = useState<string[]>(task?.dependencies || [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !startDate || !endDate) return

    setIsLoading(true)

    if (isEditing && task) {
      await updateTask(task.id, {
        name: name.trim(),
        startDate,
        endDate,
        progress,
        category,
        assignee: assignee.trim(),
        dependencies,
      })
    } else {
      await createTask(projectId, {
        name: name.trim(),
        startDate,
        endDate,
        progress,
        category,
        assignee: assignee.trim(),
        dependencies,
      })
    }

    setIsLoading(false)
    onClose()
  }

  const availableDependencies = existingTasks.filter((t) => t.id !== task?.id)

  return (
    <form onSubmit={handleSubmit} id="task-form">
      <div className="grid gap-4 px-4 py-4 sm:px-6">
        <div className="grid gap-2">
          <Label htmlFor="task-name" className="text-sm">Task Name</Label>
          <Input
            id="task-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g., Design Homepage"
            required
            className="h-10"
          />
        </div>
        
        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          <div className="grid gap-2">
            <Label htmlFor="task-start" className="text-sm">Start Date</Label>
            <Input
              id="task-start"
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              required
              className="h-10"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="task-end" className="text-sm">End Date</Label>
            <Input
              id="task-end"
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              required
              className="h-10"
            />
          </div>
        </div>
        
        <div className="grid gap-2">
          <Label htmlFor="task-assignee" className="text-sm">Assignee</Label>
          <Input
            id="task-assignee"
            value={assignee}
            onChange={(e) => setAssignee(e.target.value)}
            placeholder="e.g., John Doe"
            className="h-10"
          />
        </div>
        
        <div className="grid gap-2">
          <Label htmlFor="task-category" className="text-sm">Category</Label>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="h-10">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {CATEGORIES.map((cat) => (
                <SelectItem key={cat} value={cat} className="text-sm">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded flex-shrink-0"
                      style={{ backgroundColor: CATEGORY_BAR_COLORS[cat] }}
                    />
                    <span className="capitalize">{cat}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="grid gap-2">
          <div className="flex items-center justify-between">
            <Label className="text-sm">Progress</Label>
            <span className="text-sm font-medium">{progress}%</span>
          </div>
          <Slider
            value={[progress]}
            onValueChange={([value]) => setProgress(value)}
            max={100}
            step={5}
            className="py-2"
          />
        </div>
        
        {availableDependencies.length > 0 && (
          <div className="grid gap-2">
            <Label className="text-sm">Dependencies</Label>
            <div className="flex flex-wrap gap-2 p-3 rounded-md border bg-muted/30 max-h-32 overflow-y-auto">
              {availableDependencies.map((t) => (
                <label
                  key={t.id}
                  className="flex items-center gap-1.5 text-xs sm:text-sm cursor-pointer bg-background px-2 py-1 rounded border hover:bg-accent transition-colors"
                >
                  <input
                    type="checkbox"
                    checked={dependencies.includes(t.id)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setDependencies([...dependencies, t.id])
                      } else {
                        setDependencies(dependencies.filter((d) => d !== t.id))
                      }
                    }}
                    className="rounded w-4 h-4"
                  />
                  <span className="truncate max-w-[100px] sm:max-w-[150px]">{t.name}</span>
                </label>
              ))}
            </div>
          </div>
        )}
      </div>
      
      <DialogFooter className="px-4 py-3 sm:px-6 sm:py-4 border-t flex flex-col sm:flex-row gap-2 sm:gap-0">
        <Button 
          type="button" 
          variant="outline" 
          onClick={onClose}
          className="w-full sm:w-auto h-10"
        >
          Cancel
        </Button>
        <Button 
          type="submit"
          disabled={isLoading || !name.trim() || !startDate || !endDate}
          className="w-full sm:w-auto h-10"
        >
          {isLoading ? (isEditing ? "Saving..." : "Adding...") : (isEditing ? "Save Changes" : "Add Task")}
        </Button>
      </DialogFooter>
    </form>
  )
}

export function TaskDialog({ open, onClose, task, projectId, existingTasks = [] }: TaskDialogProps) {
  const isEditing = !!task

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="sm:max-w-[500px] w-[95vw] max-h-[90vh] p-0 gap-0">
        <DialogHeader className="px-4 pt-4 pb-2 sm:px-6 sm:pt-6 sm:pb-3">
          <DialogTitle className="text-lg sm:text-xl">{isEditing ? "Edit Task" : "Add New Task"}</DialogTitle>
          <DialogDescription className="text-xs sm:text-sm">
            {isEditing
              ? "Update the task details below."
              : "Fill in the task details to add it to your project."}
          </DialogDescription>
        </DialogHeader>
        
        <ScrollArea className="flex-1 max-h-[calc(90vh-80px)]">
          {/* Use key to reset form when task changes */}
          <TaskForm
            key={task?.id || "new-task"}
            task={task}
            projectId={projectId}
            existingTasks={existingTasks}
            onClose={onClose}
            isEditing={isEditing}
          />
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}
