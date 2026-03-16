import {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
  type ReactNode,
} from "react"
import type { Project, GanttTask, ViewMode } from "./types"
import { memoryStore } from "./memory-store"

interface ProjectContextValue {
  projects: Project[]
  activeProject: Project | null
  setActiveProjectId: (id: string) => void
  isLoading: boolean
  viewMode: ViewMode
  setViewMode: (mode: ViewMode) => void
  activeCategory: string | null
  setActiveCategory: (cat: string | null) => void
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
  const [projects, setProjects] = useState<Project[]>(() => memoryStore.getAllProjects())
  const [activeProjectId, setActiveProjectId] = useState<string | null>(null)
  const [viewMode, setViewMode] = useState<ViewMode>("weeks")
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const activeProject = useMemo(
    () => projects.find((p) => p.id === activeProjectId) || projects[0] || null,
    [projects, activeProjectId]
  )

  const handleSetActiveProjectId = useCallback((id: string) => {
    setActiveProjectId(id)
    setActiveCategory(null)
  }, [])

  const refreshProjects = useCallback(async () => {
    setIsLoading(true)
    try {
      const updatedProjects = memoryStore.getAllProjects()
      setProjects(updatedProjects)
    } finally {
      setIsLoading(false)
    }
  }, [])

  const createProject = useCallback(async (data: { name: string; description: string; startDate: string; endDate: string }): Promise<Project | null> => {
    try {
      const project = memoryStore.createProject(data)
      await refreshProjects()
      setActiveProjectId(project.id)
      return project
    } catch (error) {
      console.error("Error creating project:", error)
      return null
    }
  }, [refreshProjects])

  const updateProject = useCallback(async (id: string, data: Partial<Project>): Promise<Project | null> => {
    try {
      const project = memoryStore.updateProject(id, data)
      await refreshProjects()
      return project
    } catch (error) {
      console.error("Error updating project:", error)
      return null
    }
  }, [refreshProjects])

  const deleteProject = useCallback(async (id: string): Promise<boolean> => {
    try {
      const result = memoryStore.deleteProject(id)
      if (result) {
        await refreshProjects()
        if (activeProjectId === id) {
          setActiveProjectId(null)
        }
      }
      return result
    } catch (error) {
      console.error("Error deleting project:", error)
      return false
    }
  }, [refreshProjects, activeProjectId])

  const createTask = useCallback(async (projectId: string, task: Omit<GanttTask, "id">): Promise<GanttTask | null> => {
    try {
      const newTask = memoryStore.createTask(projectId, task)
      await refreshProjects()
      return newTask
    } catch (error) {
      console.error("Error creating task:", error)
      return null
    }
  }, [refreshProjects])

  const updateTask = useCallback(async (taskId: string, task: Partial<GanttTask>): Promise<GanttTask | null> => {
    try {
      const updatedTask = memoryStore.updateTask(taskId, task)
      await refreshProjects()
      return updatedTask
    } catch (error) {
      console.error("Error updating task:", error)
      return null
    }
  }, [refreshProjects])

  const deleteTask = useCallback(async (taskId: string): Promise<boolean> => {
    try {
      const result = memoryStore.deleteTask(taskId)
      if (result) {
        await refreshProjects()
      }
      return result
    } catch (error) {
      console.error("Error deleting task:", error)
      return false
    }
  }, [refreshProjects])

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
