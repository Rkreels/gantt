import {
  consumeStream,
  convertToModelMessages,
  streamText,
  type UIMessage,
} from "ai"
import { promises as fs } from "fs"
import path from "path"
import type { Project } from "@/lib/types"

export const maxDuration = 60

async function loadAllProjects(): Promise<Project[]> {
  const dataDir = path.join(process.cwd(), "data")
  try {
    const files = await fs.readdir(dataDir)
    const jsonFiles = files.filter((f) => f.endsWith(".json"))
    return Promise.all(
      jsonFiles.map(async (file) => {
        const content = await fs.readFile(path.join(dataDir, file), "utf-8")
        return JSON.parse(content) as Project
      })
    )
  } catch {
    return []
  }
}

export async function POST(req: Request) {
  const {
    messages,
    model: requestedModel,
    temperature: requestedTemp,
    systemPrompt: customSystemPrompt,
  }: {
    messages: UIMessage[]
    model?: string
    temperature?: number
    systemPrompt?: string
  } = await req.json()

  const projects = await loadAllProjects()
  const projectContext = projects
    .map(
      (p) =>
        `Project: ${p.name} (${p.id})
Description: ${p.description}
Timeline: ${p.startDate} to ${p.endDate}
Tasks:
${p.tasks.map((t) => `  - ${t.name} [${t.category}] (${t.startDate} to ${t.endDate}) Progress: ${t.progress}% Assignee: ${t.assignee} ${t.dependencies.length > 0 ? `Depends on: ${t.dependencies.join(", ")}` : ""}`).join("\n")}`
    )
    .join("\n\n")

  const defaultSystemPrompt = `You are a project management AI assistant for a Gantt chart application. You help users understand their project timelines, identify risks, suggest optimizations, and answer questions about task scheduling and resource allocation.

Here is the current project data:

${projectContext}

Today's date is ${new Date().toISOString().split("T")[0]}.

Provide concise, actionable insights. When discussing dates or timelines, be specific. Flag any tasks that are behind schedule or at risk. You can help with:
- Analyzing project progress and health
- Identifying bottlenecks and dependencies
- Suggesting schedule optimizations
- Resource allocation insights
- Risk assessment`

  const model = requestedModel || "anthropic/claude-opus-4-6"
  const temperature = requestedTemp ?? 0.7
  const systemPrompt = customSystemPrompt || defaultSystemPrompt

  const result = streamText({
    model,
    system: systemPrompt,
    messages: await convertToModelMessages(messages),
    temperature,
    abortSignal: req.signal,
  })

  return result.toUIMessageStreamResponse({
    originalMessages: messages,
    consumeSseStream: consumeStream,
  })
}
