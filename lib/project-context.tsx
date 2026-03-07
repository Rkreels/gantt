"use client"

import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from "react"
import useSWR from "swr"
import type { Project, ViewMode } from "./types"

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
}

const ProjectContext = createContext<ProjectContextValue | null>(null)

export function ProjectProvider({ children }: { children: ReactNode }) {
  const { data: projects = [], isLoading } = useSWR<Project[]>(
    "/api/projects",
    fetcher
  )
  const [activeProjectId, setActiveProjectId] = useState<string | null>(null)
  const [viewMode, setViewMode] = useState<ViewMode>("weeks")
  const [activeCategory, setActiveCategory] = useState<string | null>(null)

  const activeProject =
    projects.find((p) => p.id === activeProjectId) || projects[0] || null

  const handleSetActiveProjectId = useCallback((id: string) => {
    setActiveProjectId(id)
    setActiveCategory(null)
  }, [])

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
