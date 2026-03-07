import { db } from "@/lib/db"
import { NextResponse } from "next/server"

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const project = await db.project.findUnique({
      where: { id },
      include: { tasks: true },
    })

    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 })
    }

    return NextResponse.json({
      ...project,
      tasks: project.tasks.map((task) => ({
        ...task,
        dependencies: task.dependencies ? task.dependencies.split(",").filter(Boolean) : [],
      })),
    })
  } catch (error) {
    console.error("Error fetching project:", error)
    return NextResponse.json({ error: "Failed to fetch project" }, { status: 500 })
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    const { name, description, startDate, endDate } = body

    const project = await db.project.update({
      where: { id },
      data: {
        name,
        description: description || "",
        startDate,
        endDate,
      },
      include: { tasks: true },
    })

    return NextResponse.json({
      ...project,
      tasks: project.tasks.map((task) => ({
        ...task,
        dependencies: task.dependencies ? task.dependencies.split(",").filter(Boolean) : [],
      })),
    })
  } catch (error) {
    console.error("Error updating project:", error)
    return NextResponse.json({ error: "Failed to update project" }, { status: 500 })
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    await db.project.delete({
      where: { id },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting project:", error)
    return NextResponse.json({ error: "Failed to delete project" }, { status: 500 })
  }
}
