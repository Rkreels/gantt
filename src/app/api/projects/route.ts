import { memoryStore } from "@/lib/memory-store"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const projects = memoryStore.getAllProjects()
    return NextResponse.json(projects)
  } catch (error) {
    console.error("Error fetching projects:", error)
    return NextResponse.json([], { status: 200 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, description, startDate, endDate } = body

    const project = memoryStore.createProject({
      name,
      description: description || "",
      startDate,
      endDate,
    })

    return NextResponse.json(project)
  } catch (error) {
    console.error("Error creating project:", error)
    return NextResponse.json(
      { error: "Failed to create project" },
      { status: 500 }
    )
  }
}
