"use client"

import { useState } from "react"
import { ProjectProvider } from "@/lib/project-context"
import { AppHeader } from "@/components/app-header"
import { GanttToolbar } from "@/components/gantt-toolbar"
import { GanttChart } from "@/components/gantt-chart"
import { ChatPanel } from "@/components/chat-panel"
import { AgentSettingsPanel } from "@/components/agent-settings"
import type { AgentSettings } from "@/lib/types"

const DEFAULT_SETTINGS: AgentSettings = {
  model: "anthropic/claude-opus-4-6",
  temperature: 0.7,
  systemPrompt: "",
}

export default function Home() {
  const [chatOpen, setChatOpen] = useState(false)
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [agentSettings, setAgentSettings] =
    useState<AgentSettings>(DEFAULT_SETTINGS)

  return (
    <ProjectProvider>
      <div className="flex flex-col h-dvh bg-background">
        <AppHeader
          onOpenChat={() => setChatOpen(true)}
          onOpenSettings={() => setSettingsOpen(true)}
        />
        <GanttToolbar />
        <GanttChart />

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
      </div>
    </ProjectProvider>
  )
}
