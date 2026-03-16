import { useState, useRef } from "react"
import { Link } from "react-router-dom"
import { ProjectProvider, useProject } from "@/lib/project-context"
import { AppHeader } from "@/components/app-header"
import { GanttToolbar } from "@/components/gantt-toolbar"
import { GanttChart } from "@/components/gantt-chart"
import { ChatPanel } from "@/components/chat-panel"
import { AgentSettingsPanel } from "@/components/agent-settings"
import { ProjectDialog } from "@/components/project-dialog"
import { TaskDialog } from "@/components/task-dialog"
import type { AgentSettings, GanttTask } from "@/lib/types"

const DEFAULT_SETTINGS: AgentSettings = {
  model: "anthropic/claude-opus-4-6",
  temperature: 0.7,
  systemPrompt: "",
}

function GanttApp() {
  const [chatOpen, setChatOpen] = useState(false)
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [agentSettings, setAgentSettings] = useState<AgentSettings>(DEFAULT_SETTINGS)
  
  const [projectDialogOpen, setProjectDialogOpen] = useState(false)
  const [taskDialogOpen, setTaskDialogOpen] = useState(false)
  const [editingTask, setEditingTask] = useState<GanttTask | null>(null)
  
  const chartRef = useRef<HTMLDivElement>(null)
  
  const { activeProject } = useProject()

  const handleAddTask = () => {
    setEditingTask(null)
    setTaskDialogOpen(true)
  }

  const handleEditTask = (task: GanttTask) => {
    setEditingTask(task)
    setTaskDialogOpen(true)
  }

  const handleEditProject = () => {
    if (activeProject) {
      setProjectDialogOpen(true)
    }
  }

  return (
    <div className="flex flex-col h-dvh bg-background">
      <AppHeader
        onOpenChat={() => setChatOpen(true)}
        onOpenSettings={() => setSettingsOpen(true)}
        onOpenNewProject={() => setProjectDialogOpen(true)}
        onEditProject={handleEditProject}
      />
      <GanttToolbar onAddTask={handleAddTask} chartRef={chartRef} />
      <GanttChart ref={chartRef} onEditTask={handleEditTask} />

      <ChatPanel
        open={chatOpen}
        onClose={() => setChatOpen(false)}
        settings={agentSettings}
      />

      <AgentSettingsPanel
        open={settingsOpen}
        onClose={() => setSettingsOpen(false)}
        settings={agentSettings}
        onSettingsChange={setAgentSettings}
      />

      <ProjectDialog
        open={projectDialogOpen}
        onClose={() => setProjectDialogOpen(false)}
      />

      {activeProject && (
        <TaskDialog
          open={taskDialogOpen}
          onClose={() => {
            setTaskDialogOpen(false)
            setEditingTask(null)
          }}
          task={editingTask}
          projectId={activeProject.id}
          existingTasks={activeProject.tasks}
        />
      )}
    </div>
  )
}

export default function GanttPage() {
  return <GanttApp />
}
