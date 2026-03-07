"use client"

import { useState } from "react"
import { format, addDays } from "date-fns"
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
import { Textarea } from "@/components/ui/textarea"
import { useProject } from "@/lib/project-context"
import { ScrollArea } from "@/components/ui/scroll-area"

interface ProjectDialogProps {
  open: boolean
  onClose: () => void
}

export function ProjectDialog({ open, onClose }: ProjectDialogProps) {
  const { createProject, activeProject, updateProject } = useProject()
  const isEditing = !!activeProject
  
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [startDate, setStartDate] = useState(format(new Date(), "yyyy-MM-dd"))
  const [endDate, setEndDate] = useState(format(addDays(new Date(), 90), "yyyy-MM-dd"))
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim()) return

    setIsLoading(true)
    
    const project = await createProject({
      name: name.trim(),
      description: description.trim(),
      startDate,
      endDate,
    })
    
    setIsLoading(false)

    if (project) {
      setName("")
      setDescription("")
      onClose()
    }
  }

  const handleClose = () => {
    setName("")
    setDescription("")
    onClose()
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px] w-[95vw] max-h-[90vh] p-0 gap-0">
        <DialogHeader className="px-4 pt-4 pb-2 sm:px-6 sm:pt-6 sm:pb-3">
          <DialogTitle className="text-lg sm:text-xl">Create New Project</DialogTitle>
          <DialogDescription className="text-xs sm:text-sm">
            Add a new project to your Gantt chart. You can add tasks after creating the project.
          </DialogDescription>
        </DialogHeader>
        
        <ScrollArea className="flex-1 max-h-[calc(90vh-140px)]">
          <form onSubmit={handleSubmit} id="project-form">
            <div className="grid gap-4 px-4 py-4 sm:px-6">
              <div className="grid gap-2">
                <Label htmlFor="name" className="text-sm">Project Name</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g., Website Redesign"
                  required
                  className="h-10"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description" className="text-sm">Description</Label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Brief description of the project"
                  rows={3}
                  className="resize-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="startDate" className="text-sm">Start Date</Label>
                  <Input
                    id="startDate"
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    required
                    className="h-10"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="endDate" className="text-sm">End Date</Label>
                  <Input
                    id="endDate"
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    required
                    className="h-10"
                  />
                </div>
              </div>
            </div>
          </form>
        </ScrollArea>
        
        <DialogFooter className="px-4 py-3 sm:px-6 sm:py-4 border-t flex flex-col sm:flex-row gap-2 sm:gap-0">
          <Button 
            type="button" 
            variant="outline" 
            onClick={handleClose}
            className="w-full sm:w-auto h-10"
          >
            Cancel
          </Button>
          <Button 
            type="submit" 
            form="project-form"
            disabled={isLoading || !name.trim()}
            className="w-full sm:w-auto h-10"
          >
            {isLoading ? "Creating..." : "Create Project"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
