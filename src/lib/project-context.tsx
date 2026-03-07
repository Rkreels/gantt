"use client"

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
  type ReactNode,
} from "react"
import useSWR, { mutate } from "swr"
import type { Project, GanttTask, ViewMode } from "./types"

const fetcher = (url: string) => fetch(url).then((r) => r.json())

interface ProjectContextValue {
  projects: Project[]
  activeProject: Project | null
  setActiveProjectId: (id: string) => void
  isLoading: boolean
  viewMode: ViewMode
  setViewMode: (mode: ViewMode) => void
  activeCategory: string | null
  setActiveCategory: (cat: string | null) => void
  // CRUD operations
  createProject: (data: { name: string; description: string; startDate: string; endDate: string }) => Promise<Project | null>
  updateProject: (id: string, data: Partial<Project>) => Promise<Project | null>
  deleteProject: (id: string) => Promise<boolean>
  createTask: (projectId: string, task: Omit<GanttTask, "id">) => Promise<GanttTask | null>
  updateTask: (taskId: string, task: Partial<GanttTask>) => Promise<GanttTask | null>
  deleteTask: (taskId: string) => Promise<boolean>
  refreshProjects: () => Promise<void>
}

const ProjectContext = createContext<ProjectContextValue | null>(null)

export function ProjectProvider({ children }: { children: ReactNode }) {
  const { data: projects = [], isLoading, mutate: mutateProjects } = useSWR<Project[]>(
    "/api/projects",
    fetcher
  )
  const [activeProjectId, setActiveProjectId] = useState<string | null>(null)
  const [viewMode, setViewMode] = useState<ViewMode>("weeks")
  const [activeCategory, setActiveCategory] = useState<string | null>(null)

  const activeProject = useMemo(
    () => projects.find((p) => p.id === activeProjectId) || projects[0] || null,
    [projects, activeProjectId]
  )

  const handleSetActiveProjectId = useCallback((id: string) => {
    setActiveProjectId(id)
    setActiveCategory(null)
  }, [])

  // CRUD operations
  const createProject = useCallback(async (data: { name: string; description: string; startDate: string; endDate: string }): Promise<Project | null> => {
    try {
      const response = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
      if (!response.ok) throw new Error("Failed to create project")
      const project = await response.json()
      await mutateProjects()
      setActiveProjectId(project.id)
      return project
    } catch (error) {
      console.error("Error creating project:", error)
      return null
    }
  }, [mutateProjects])

  const updateProject = useCallback(async (id: string, data: Partial<Project>): Promise<Project | null> => {
    try {
      const response = await fetch(`/api/projects/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
      if (!response.ok) throw new Error("Failed to update project")
      const project = await response.json()
      await mutateProjects()
      return project
    } catch (error) {
      console.error("Error updating project:", error)
      return null
    }
  }, [mutateProjects])

  const deleteProject = useCallback(async (id: string): Promise<boolean> => {
    try {
      const response = await fetch(`/api/projects/${id}`, {
        method: "DELETE",
      })
      if (!response.ok) throw new Error("Failed to delete project")
      await mutateProjects()
      if (activeProjectId === id) {
        setActiveProjectId(null)
      }
      return true
    } catch (error) {
      console.error("Error deleting project:", error)
      return false
    }
  }, [mutateProjects, activeProjectId])

  const createTask = useCallback(async (projectId: string, task: Omit<GanttTask, "id">): Promise<GanttTask | null> => {
    try {
      const response = await fetch("/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...task, projectId }),
      })
      if (!response.ok) throw new Error("Failed to create task")
      const newTask = await response.json()
      await mutateProjects()
      return newTask
    } catch (error) {
      console.error("Error creating task:", error)
      return null
    }
  }, [mutateProjects])

  const updateTask = useCallback(async (taskId: string, task: Partial<GanttTask>): Promise<GanttTask | null> => {
    try {
      const response = await fetch(`/api/tasks/${taskId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(task),
      })
      if (!response.ok) throw new Error("Failed to update task")
      const updatedTask = await response.json()
      await mutateProjects()
      return updatedTask
    } catch (error) {
      console.error("Error updating task:", error)
      return null
    }
  }, [mutateProjects])

  const deleteTask = useCallback(async (taskId: string): Promise<boolean> => {
    try {
      const response = await fetch(`/api/tasks/${taskId}`, {
        method: "DELETE",
      })
      if (!response.ok) throw new Error("Failed to delete task")
      await mutateProjects()
      return true
    } catch (error) {
      console.error("Error deleting task:", error)
      return false
    }
  }, [mutateProjects])

  const refreshProjects = useCallback(async () => {
    await mutateProjects()
  }, [mutateProjects])

  return (
    <ProjectContext.Provider
      value={{
        projects,
        activeProject,
        setActiveProjectId: handleSetActiveProjectId,
        isLoading,
        viewMode,
        setViewMode,
        activeCategory,
        setActiveCategory,
        createProject,
        updateProject,
        deleteProject,
        createTask,
        updateTask,
        deleteTask,
        refreshProjects,
      }}
    >
      {children}
    </ProjectContext.Provider>
  )
}

export function useProject() {
  const ctx = useContext(ProjectContext)
  if (!ctx) throw new Error("useProject must be used within ProjectProvider")
  return ctx
}
