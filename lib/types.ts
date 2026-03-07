export interface GanttTask {
  id: string
  name: string
  startDate: string
  endDate: string
  progress: number
  category: string
  assignee: string
  dependencies: string[]
}

export interface Project {
  id: string
  name: string
  description: string
  startDate: string
  endDate: string
  tasks: GanttTask[]
}

export type ViewMode = "days" | "weeks" | "months"

export interface AgentSettings {
  model: string
  temperature: number
  systemPrompt: string
}
