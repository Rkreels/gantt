import { db } from "@/lib/db"
import { NextResponse } from "next/server"

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const task = await db.task.findUnique({
      where: { id },
    })

    if (!task) {
      return NextResponse.json({ error: "Task not found" }, { status: 404 })
    }

    return NextResponse.json({
      ...task,
      dependencies: task.dependencies ? task.dependencies.split(",").filter(Boolean) : [],
    })
  } catch (error) {
    console.error("Error fetching task:", error)
    return NextResponse.json({ error: "Failed to fetch task" }, { status: 500 })
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    const { name, startDate, endDate, progress, category, assignee, dependencies } = body

    const task = await db.task.update({
      where: { id },
      data: {
        name,
        startDate,
        endDate,
        progress: progress ?? 0,
        category: category || "development",
        assignee: assignee || "",
        dependencies: Array.isArray(dependencies) ? dependencies.join(",") : (dependencies || ""),
      },
    })

    return NextResponse.json({
      ...task,
      dependencies: task.dependencies ? task.dependencies.split(",").filter(Boolean) : [],
    })
  } catch (error) {
    console.error("Error updating task:", error)
    return NextResponse.json({ error: "Failed to update task" }, { status: 500 })
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    await db.task.delete({
      where: { id },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting task:", error)
    return NextResponse.json({ error: "Failed to delete task" }, { status: 500 })
  }
}
