import { db } from "@/lib/db"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const projects = await db.project.findMany({
      include: {
        tasks: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    })

    // Transform tasks to match the expected format
    const transformedProjects = projects.map((project) => ({
      ...project,
      tasks: project.tasks.map((task) => ({
        ...task,
        dependencies: task.dependencies ? task.dependencies.split(",").filter(Boolean) : [],
      })),
    }))

    return NextResponse.json(transformedProjects)
  } catch (error) {
    console.error("Error fetching projects:", error)
    return NextResponse.json([], { status: 200 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, description, startDate, endDate } = body

    const project = await db.project.create({
      data: {
        name,
        description: description || "",
        startDate,
        endDate,
      },
      include: {
        tasks: true,
      },
    })

    return NextResponse.json({
      ...project,
      tasks: project.tasks.map((task) => ({
        ...task,
        dependencies: task.dependencies ? task.dependencies.split(",").filter(Boolean) : [],
      })),
    })
  } catch (error) {
    console.error("Error creating project:", error)
    return NextResponse.json(
      { error: "Failed to create project" },
      { status: 500 }
    )
  }
}
