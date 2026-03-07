import { db } from "@/lib/db"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, startDate, endDate, progress, category, assignee, dependencies, projectId } = body

    const task = await db.task.create({
      data: {
        name,
        startDate,
        endDate,
        progress: progress || 0,
        category: category || "development",
        assignee: assignee || "",
        dependencies: Array.isArray(dependencies) ? dependencies.join(",") : (dependencies || ""),
        projectId,
      },
    })

    return NextResponse.json({
      ...task,
      dependencies: task.dependencies ? task.dependencies.split(",").filter(Boolean) : [],
    })
  } catch (error) {
    console.error("Error creating task:", error)
    return NextResponse.json(
      { error: "Failed to create task" },
      { status: 500 }
    )
  }
}
