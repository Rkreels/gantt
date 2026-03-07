"use client"

import { useState } from "react"
import { useProject } from "@/lib/project-context"
import {
  GanttChart as GanttChartIcon,
  ChevronDown,
  Menu,
  X,
  MessageSquare,
  Settings,
  Palette,
} from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

interface AppHeaderProps {
  onOpenChat: () => void
  onOpenSettings: () => void
}

export function AppHeader({ onOpenChat, onOpenSettings }: AppHeaderProps) {
  const { projects, activeProject, setActiveProjectId } = useProject()
  const [menuOpen, setMenuOpen] = useState(false)
  const [selectorOpen, setSelectorOpen] = useState(false)

  return (
    <>
      <header className="sticky top-0 z-50 flex items-center justify-between h-14 px-4 border-b border-border bg-card">
        {/* Left: Logo + Project selector */}
        <div className="flex items-center gap-2 min-w-0">
          <GanttChartIcon className="w-5 h-5 text-primary flex-shrink-0" />
          <span className="font-semibold text-foreground text-sm hidden sm:inline">
            Gantt
          </span>

          {activeProject && (
            <>
              <span className="text-muted-foreground text-sm hidden sm:inline">/</span>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setSelectorOpen(!selectorOpen)}
                  className="flex items-center gap-1 px-2 py-1 rounded-md hover:bg-accent transition-colors min-h-[36px]"
                >
                  <span className="text-sm font-medium text-foreground truncate max-w-[140px] sm:max-w-[200px]">
                    {activeProject.name}
                  </span>
                  <ChevronDown className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0" />
                </button>

                {selectorOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setSelectorOpen(false)}
                    />
                    <div className="absolute top-full left-0 mt-1 z-50 bg-card border border-border rounded-lg shadow-lg min-w-[220px] py-1">
                      {projects.map((p) => (
                        <button
                          key={p.id}
                          type="button"
                          onClick={() => {
                            setActiveProjectId(p.id)
                            setSelectorOpen(false)
                          }}
                          className={cn(
                            "w-full text-left px-3 py-2.5 text-sm transition-colors min-h-[44px]",
                            p.id === activeProject.id
                              ? "bg-accent text-foreground font-medium"
                              : "text-foreground hover:bg-accent"
                          )}
                        >
                          <div className="font-medium">{p.name}</div>
                          <div className="text-xs text-muted-foreground truncate">
                            {p.description}
                          </div>
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </>
          )}
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-1">
          {/* Desktop chat + settings buttons */}
          <button
            type="button"
            onClick={onOpenChat}
            className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium text-foreground hover:bg-accent transition-colors min-h-[36px]"
          >
            <MessageSquare className="w-4 h-4" />
            <span>AI Assistant</span>
          </button>
          <button
            type="button"
            onClick={onOpenSettings}
            className="hidden md:flex items-center justify-center w-9 h-9 rounded-md text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
          >
            <Settings className="w-4 h-4" />
          </button>
          <Link
            href="/brand-assets"
            className="hidden md:flex items-center justify-center w-9 h-9 rounded-md text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
            title="Brand Assets"
          >
            <Palette className="w-4 h-4" />
          </Link>

          {/* Mobile hamburger */}
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            className="md:hidden flex items-center justify-center w-11 h-11 rounded-md text-foreground hover:bg-accent transition-colors"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Full-screen mobile menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-[100] bg-card md:hidden flex flex-col">
          <div className="flex items-center justify-between h-14 px-4 border-b border-border">
            <div className="flex items-center gap-2">
              <GanttChartIcon className="w-5 h-5 text-primary" />
              <span className="font-semibold text-foreground">Gantt</span>
            </div>
            <button
              type="button"
              onClick={() => setMenuOpen(false)}
              className="flex items-center justify-center w-11 h-11 rounded-md text-foreground hover:bg-accent transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 flex flex-col p-4 gap-2">
            <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
              Projects
            </div>
            {projects.map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => {
                  setActiveProjectId(p.id)
                  setMenuOpen(false)
                }}
                className={cn(
                  "w-full text-left px-4 py-3 rounded-lg transition-colors min-h-[52px]",
                  p.id === activeProject?.id
                    ? "bg-primary text-primary-foreground"
                    : "text-foreground hover:bg-accent"
                )}
              >
                <div className="font-medium">{p.name}</div>
                <div
                  className={cn(
                    "text-xs truncate",
                    p.id === activeProject?.id
                      ? "text-primary-foreground/70"
                      : "text-muted-foreground"
                  )}
                >
                  {p.description}
                </div>
              </button>
            ))}

            <div className="w-full h-px bg-border my-2" />

            <button
              type="button"
              onClick={() => {
                setMenuOpen(false)
                onOpenChat()
              }}
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-foreground hover:bg-accent transition-colors min-h-[52px]"
            >
              <MessageSquare className="w-5 h-5" />
              <span className="font-medium">AI Assistant</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setMenuOpen(false)
                onOpenSettings()
              }}
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-foreground hover:bg-accent transition-colors min-h-[52px]"
            >
              <Settings className="w-5 h-5" />
              <span className="font-medium">Agent Settings</span>
            </button>

            <Link
              href="/brand-assets"
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-foreground hover:bg-accent transition-colors min-h-[52px]"
            >
              <Palette className="w-5 h-5" />
              <span className="font-medium">Brand Assets</span>
            </Link>
          </div>
        </div>
      )}
    </>
  )
}
