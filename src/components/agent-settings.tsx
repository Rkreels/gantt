"use client"

import { X, Bot, Thermometer, Cpu, FileText } from "lucide-react"
import { Slider } from "@/components/ui/slider"
import type { AgentSettings } from "@/lib/types"
import { cn } from "@/lib/utils"

const MODELS = [
  { value: "anthropic/claude-opus-4-6", label: "Claude Opus 4.6" },
  { value: "anthropic/claude-sonnet-4", label: "Claude Sonnet 4" },
  { value: "openai/gpt-5", label: "GPT-5" },
  { value: "openai/gpt-5-mini", label: "GPT-5 Mini" },
]

interface AgentSettingsProps {
  open: boolean
  onClose: () => void
  settings: AgentSettings
  onSettingsChange: (settings: AgentSettings) => void
}

export function AgentSettingsPanel({
  open,
  onClose,
  settings,
  onSettingsChange,
}: AgentSettingsProps) {
  if (!open) return null

  return (
    <>
      {/* Desktop: modal with blurred backdrop */}
      <div className="hidden md:block fixed inset-0 z-[70]">
        <div
          className="absolute inset-0 top-14 bg-background/60 backdrop-blur-sm"
          onClick={onClose}
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[480px] max-h-[80vh] bg-card border border-border rounded-xl shadow-2xl flex flex-col overflow-hidden">
          <SettingsContent
            settings={settings}
            onSettingsChange={onSettingsChange}
            onClose={onClose}
          />
        </div>
      </div>

      {/* Mobile: full screen */}
      <div className="md:hidden fixed inset-0 z-[70] bg-card flex flex-col">
        <SettingsContent
          settings={settings}
          onSettingsChange={onSettingsChange}
          onClose={onClose}
        />
      </div>
    </>
  )
}

function SettingsContent({
  settings,
  onSettingsChange,
  onClose,
}: {
  settings: AgentSettings
  onSettingsChange: (settings: AgentSettings) => void
  onClose: () => void
}) {
  return (
    <>
      {/* Header */}
      <div className="flex items-center justify-between h-14 px-4 border-b border-border flex-shrink-0">
        <div className="flex items-center gap-2">
          <Bot className="w-5 h-5 text-primary" />
          <span className="font-semibold text-foreground">Agent Settings</span>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="flex items-center justify-center w-10 h-10 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-6">
        {/* Model selector */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 text-sm font-medium text-foreground">
            <Cpu className="w-4 h-4 text-muted-foreground" />
            Model
          </div>
          <div className="grid grid-cols-1 gap-2">
            {MODELS.map((model) => (
              <button
                key={model.value}
                type="button"
                onClick={() =>
                  onSettingsChange({ ...settings, model: model.value })
                }
                className={cn(
                  "flex items-center px-4 py-3 rounded-lg text-sm text-left transition-colors min-h-[48px]",
                  settings.model === model.value
                    ? "bg-primary text-primary-foreground font-medium"
                    : "bg-muted text-foreground hover:bg-accent"
                )}
              >
                {model.label}
              </button>
            ))}
          </div>
        </div>

        {/* Temperature */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm font-medium text-foreground">
              <Thermometer className="w-4 h-4 text-muted-foreground" />
              Temperature
            </div>
            <span className="text-sm font-mono text-muted-foreground">
              {settings.temperature.toFixed(1)}
            </span>
          </div>
          <Slider
            value={[settings.temperature]}
            onValueChange={([val]) =>
              onSettingsChange({ ...settings, temperature: val })
            }
            min={0}
            max={1}
            step={0.1}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Precise</span>
            <span>Creative</span>
          </div>
        </div>

        {/* System prompt */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 text-sm font-medium text-foreground">
            <FileText className="w-4 h-4 text-muted-foreground" />
            System Prompt
          </div>
          <p className="text-xs text-muted-foreground">
            Override the default system prompt. Leave empty to use the built-in project-aware prompt.
          </p>
          <textarea
            value={settings.systemPrompt}
            onChange={(e) =>
              onSettingsChange({ ...settings, systemPrompt: e.target.value })
            }
            placeholder="You are a project management AI assistant..."
            rows={6}
            className="w-full bg-muted text-foreground text-sm rounded-lg px-3 py-2.5 placeholder:text-muted-foreground resize-none focus:outline-none focus:ring-2 focus:ring-ring"
            style={{ fontSize: "16px" }}
          />
        </div>

        {/* Info section */}
        <div className="bg-muted rounded-lg p-3 text-xs text-muted-foreground flex flex-col gap-1.5">
          <div className="font-medium text-foreground text-sm">How the agent works</div>
          <p>
            The AI assistant has access to all your project data including tasks,
            timelines, dependencies, assignees, and progress. It can help analyze
            your project health, identify bottlenecks, and suggest optimizations.
          </p>
          <p>
            Connected via the Vercel AI Gateway using AI SDK 6. All project JSON
            files in the /data folder are loaded as context.
          </p>
        </div>
      </div>
    </>
  )
}
