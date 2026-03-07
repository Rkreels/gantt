import { promises as fs } from "fs"
import path from "path"
import type { Project } from "@/lib/types"

export async function GET() {
  const dataDir = path.join(process.cwd(), "data")

  try {
    const files = await fs.readdir(dataDir)
    const jsonFiles = files.filter((f) => f.endsWith(".json"))

    const projects: Project[] = await Promise.all(
      jsonFiles.map(async (file) => {
        const content = await fs.readFile(path.join(dataDir, file), "utf-8")
        return JSON.parse(content) as Project
      })
    )

    return Response.json(projects)
  } catch {
    return Response.json([], { status: 200 })
  }
}
