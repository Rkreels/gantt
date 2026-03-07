import { memoryStore } from "@/lib/memory-store"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, startDate, endDate, progress, category, assignee, dependencies, projectId } = body

    const task = memoryStore.createTask(projectId, {
      name,
      startDate,
      endDate,
      progress: progress || 0,
      category: category || "development",
      assignee: assignee || "",
      dependencies: Array.isArray(dependencies) ? dependencies : [],
    })

    if (!task) {
      return NextResponse.json(
        { error: "Project not found" },
        { status: 404 }
      )
    }

    return NextResponse.json(task)
  } catch (error) {
    console.error("Error creating task:", error)
    return NextResponse.json(
      { error: "Failed to create task" },
      { status: 500 }
    )
  }
}
