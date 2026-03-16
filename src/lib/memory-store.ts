import type { Project, GanttTask } from "./types"

export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
}

const projectsData: Array<{
  name: string
  description: string
  startDate: string
  endDate: string
  tasks: Array<{
    name: string
    startDate: string
    endDate: string
    progress: number
    category: string
    assignee: string
    dependencies: string[]
  }>
}> = [
  {
    name: "FMCG Product Launch",
    description: "Comprehensive product launch campaign for new FMCG product line",
    startDate: "2025-01-15",
    endDate: "2025-06-30",
    tasks: [
      { name: "Market Research & Analysis", startDate: "2025-01-15", endDate: "2025-02-05", progress: 100, category: "planning", assignee: "Sarah Chen", dependencies: [] },
      { name: "Competitor Analysis", startDate: "2025-01-20", endDate: "2025-02-10", progress: 100, category: "planning", assignee: "Mike Johnson", dependencies: [] },
      { name: "Product Positioning Strategy", startDate: "2025-02-06", endDate: "2025-02-20", progress: 85, category: "planning", assignee: "Sarah Chen", dependencies: ["Market Research & Analysis"] },
      { name: "Brand Identity Development", startDate: "2025-02-15", endDate: "2025-03-15", progress: 70, category: "design", assignee: "Lisa Wong", dependencies: [] },
      { name: "Packaging Design", startDate: "2025-03-01", endDate: "2025-04-01", progress: 45, category: "design", assignee: "Tom Harris", dependencies: ["Brand Identity Development"] },
      { name: "Manufacturing Setup", startDate: "2025-03-15", endDate: "2025-04-30", progress: 30, category: "development", assignee: "Robert Kim", dependencies: [] },
      { name: "Quality Control Testing", startDate: "2025-04-15", endDate: "2025-05-15", progress: 15, category: "testing", assignee: "Emma Davis", dependencies: ["Manufacturing Setup"] },
      { name: "Marketing Campaign Planning", startDate: "2025-02-20", endDate: "2025-03-20", progress: 60, category: "marketing", assignee: "Alex Turner", dependencies: ["Product Positioning Strategy"] },
      { name: "Digital Marketing Setup", startDate: "2025-03-20", endDate: "2025-04-20", progress: 40, category: "marketing", assignee: "Jordan Lee", dependencies: ["Marketing Campaign Planning"] },
      { name: "Retail Partner Negotiations", startDate: "2025-03-01", endDate: "2025-04-15", progress: 55, category: "planning", assignee: "Chris Brown", dependencies: [] },
      { name: "Distribution Network Setup", startDate: "2025-04-01", endDate: "2025-05-15", progress: 25, category: "development", assignee: "Robert Kim", dependencies: ["Retail Partner Negotiations"] },
      { name: "Sales Team Training", startDate: "2025-04-20", endDate: "2025-05-10", progress: 10, category: "planning", assignee: "Michelle White", dependencies: [] },
      { name: "Launch Event Planning", startDate: "2025-05-01", endDate: "2025-06-01", progress: 20, category: "marketing", assignee: "Alex Turner", dependencies: [] },
      { name: "PR & Media Outreach", startDate: "2025-05-15", endDate: "2025-06-15", progress: 0, category: "marketing", assignee: "Jordan Lee", dependencies: [] },
      { name: "Product Launch", startDate: "2025-06-15", endDate: "2025-06-30", progress: 0, category: "deployment", assignee: "Sarah Chen", dependencies: ["Quality Control Testing", "Distribution Network Setup"] },
    ],
  },
  {
    name: "Construction Project - Commercial Complex",
    description: "Building a 20-story commercial complex with retail and office spaces",
    startDate: "2025-01-01",
    endDate: "2025-12-31",
    tasks: [
      { name: "Site Survey & Analysis", startDate: "2025-01-01", endDate: "2025-01-31", progress: 100, category: "planning", assignee: "John Smith", dependencies: [] },
      { name: "Architectural Design", startDate: "2025-01-15", endDate: "2025-03-15", progress: 90, category: "design", assignee: "Maria Garcia", dependencies: [] },
      { name: "Structural Engineering", startDate: "2025-02-01", endDate: "2025-04-01", progress: 75, category: "design", assignee: "David Chen", dependencies: ["Architectural Design"] },
      { name: "Permits & Approvals", startDate: "2025-03-01", endDate: "2025-05-01", progress: 50, category: "planning", assignee: "Lisa Wong", dependencies: ["Architectural Design", "Structural Engineering"] },
      { name: "Foundation Work", startDate: "2025-04-15", endDate: "2025-06-15", progress: 40, category: "development", assignee: "Mike Brown", dependencies: ["Permits & Approvals"] },
      { name: "Structural Steel Work", startDate: "2025-06-01", endDate: "2025-09-01", progress: 15, category: "development", assignee: "Tom Wilson", dependencies: ["Foundation Work"] },
      { name: "Electrical Systems", startDate: "2025-08-01", endDate: "2025-11-01", progress: 5, category: "development", assignee: "Robert Kim", dependencies: ["Structural Steel Work"] },
      { name: "Plumbing & HVAC", startDate: "2025-08-15", endDate: "2025-11-15", progress: 5, category: "development", assignee: "Chris Lee", dependencies: ["Structural Steel Work"] },
      { name: "Interior Finishing", startDate: "2025-10-01", endDate: "2025-12-01", progress: 0, category: "design", assignee: "Emma Davis", dependencies: ["Electrical Systems", "Plumbing & HVAC"] },
      { name: "Safety Inspections", startDate: "2025-11-15", endDate: "2025-12-15", progress: 0, category: "testing", assignee: "Sarah Johnson", dependencies: [] },
      { name: "Final Handover", startDate: "2025-12-15", endDate: "2025-12-31", progress: 0, category: "deployment", assignee: "John Smith", dependencies: ["Interior Finishing", "Safety Inspections"] },
    ],
  },
  {
    name: "Real Estate Development",
    description: "Mixed-use real estate development with residential and commercial units",
    startDate: "2025-02-01",
    endDate: "2026-06-30",
    tasks: [
      { name: "Land Acquisition", startDate: "2025-02-01", endDate: "2025-03-31", progress: 100, category: "planning", assignee: "Richard Moore", dependencies: [] },
      { name: "Feasibility Study", startDate: "2025-02-15", endDate: "2025-04-15", progress: 85, category: "planning", assignee: "Jennifer Taylor", dependencies: ["Land Acquisition"] },
      { name: "Master Planning", startDate: "2025-04-01", endDate: "2025-06-01", progress: 60, category: "design", assignee: "Andrew Wilson", dependencies: ["Feasibility Study"] },
      { name: "Zoning Approvals", startDate: "2025-05-01", endDate: "2025-07-01", progress: 40, category: "planning", assignee: "Michelle White", dependencies: ["Master Planning"] },
      { name: "Infrastructure Design", startDate: "2025-06-15", endDate: "2025-08-15", progress: 25, category: "design", assignee: "David Chen", dependencies: ["Zoning Approvals"] },
      { name: "Phase 1 Construction", startDate: "2025-08-01", endDate: "2026-02-01", progress: 10, category: "development", assignee: "Mark Thompson", dependencies: ["Infrastructure Design"] },
      { name: "Marketing & Sales Launch", startDate: "2025-09-01", endDate: "2025-11-01", progress: 5, category: "marketing", assignee: "Amy Roberts", dependencies: [] },
      { name: "Phase 2 Construction", startDate: "2026-01-01", endDate: "2026-05-01", progress: 0, category: "development", assignee: "Mark Thompson", dependencies: ["Phase 1 Construction"] },
      { name: "Landscaping & Amenities", startDate: "2026-04-01", endDate: "2026-06-01", progress: 0, category: "design", assignee: "Lisa Wong", dependencies: ["Phase 2 Construction"] },
      { name: "Project Completion", startDate: "2026-06-01", endDate: "2026-06-30", progress: 0, category: "deployment", assignee: "Richard Moore", dependencies: ["Landscaping & Amenities"] },
    ],
  },
  {
    name: "IT Infrastructure Modernization",
    description: "Complete IT infrastructure overhaul including cloud migration",
    startDate: "2025-01-15",
    endDate: "2025-08-31",
    tasks: [
      { name: "Current Infrastructure Assessment", startDate: "2025-01-15", endDate: "2025-02-15", progress: 100, category: "planning", assignee: "Kevin Park", dependencies: [] },
      { name: "Cloud Strategy Development", startDate: "2025-02-01", endDate: "2025-03-01", progress: 90, category: "planning", assignee: "Samantha Lee", dependencies: ["Current Infrastructure Assessment"] },
      { name: "Vendor Selection", startDate: "2025-02-15", endDate: "2025-03-15", progress: 85, category: "planning", assignee: "Daniel Kim", dependencies: [] },
      { name: "Network Architecture Design", startDate: "2025-03-01", endDate: "2025-04-15", progress: 70, category: "design", assignee: "Rachel Green", dependencies: ["Cloud Strategy Development"] },
      { name: "Security Framework Design", startDate: "2025-03-15", endDate: "2025-04-30", progress: 55, category: "design", assignee: "Michael Scott", dependencies: ["Cloud Strategy Development"] },
      { name: "Cloud Migration Planning", startDate: "2025-04-01", endDate: "2025-05-01", progress: 40, category: "planning", assignee: "Kevin Park", dependencies: ["Network Architecture Design"] },
      { name: "Infrastructure Deployment", startDate: "2025-05-01", endDate: "2025-07-01", progress: 20, category: "development", assignee: "Jim Halpert", dependencies: ["Cloud Migration Planning"] },
      { name: "Data Migration", startDate: "2025-05-15", endDate: "2025-06-30", progress: 15, category: "development", assignee: "Dwight Schrute", dependencies: ["Infrastructure Deployment"] },
      { name: "Security Testing", startDate: "2025-06-15", endDate: "2025-07-15", progress: 5, category: "testing", assignee: "Michael Scott", dependencies: ["Security Framework Design", "Data Migration"] },
      { name: "User Training", startDate: "2025-07-01", endDate: "2025-08-01", progress: 0, category: "planning", assignee: "Pam Beesly", dependencies: ["Data Migration"] },
      { name: "Go-Live & Support", startDate: "2025-08-01", endDate: "2025-08-31", progress: 0, category: "deployment", assignee: "Kevin Park", dependencies: ["Security Testing", "User Training"] },
    ],
  },
  {
    name: "E-commerce Platform Launch",
    description: "Building a comprehensive e-commerce platform with payment integration",
    startDate: "2025-02-01",
    endDate: "2025-07-31",
    tasks: [
      { name: "Requirements Gathering", startDate: "2025-02-01", endDate: "2025-02-28", progress: 100, category: "planning", assignee: "Emily Zhang", dependencies: [] },
      { name: "UI/UX Design", startDate: "2025-02-15", endDate: "2025-03-31", progress: 85, category: "design", assignee: "Alex Rivera", dependencies: ["Requirements Gathering"] },
      { name: "Database Architecture", startDate: "2025-03-01", endDate: "2025-03-31", progress: 75, category: "design", assignee: "Nathan Brooks", dependencies: ["Requirements Gathering"] },
      { name: "Backend API Development", startDate: "2025-03-15", endDate: "2025-05-31", progress: 50, category: "development", assignee: "Sophia Martinez", dependencies: ["Database Architecture"] },
      { name: "Frontend Development", startDate: "2025-04-01", endDate: "2025-06-15", progress: 35, category: "development", assignee: "James Wilson", dependencies: ["UI/UX Design"] },
      { name: "Payment Gateway Integration", startDate: "2025-05-01", endDate: "2025-06-15", progress: 25, category: "development", assignee: "Olivia Brown", dependencies: ["Backend API Development"] },
      { name: "Inventory Management System", startDate: "2025-05-15", endDate: "2025-06-30", progress: 20, category: "development", assignee: "William Davis", dependencies: ["Backend API Development"] },
      { name: "Security Audit", startDate: "2025-06-01", endDate: "2025-06-30", progress: 10, category: "testing", assignee: "Ethan Miller", dependencies: [] },
      { name: "Performance Testing", startDate: "2025-06-15", endDate: "2025-07-15", progress: 5, category: "testing", assignee: "Ava Taylor", dependencies: ["Frontend Development", "Backend API Development"] },
      { name: "UAT & Bug Fixes", startDate: "2025-07-01", endDate: "2025-07-20", progress: 0, category: "testing", assignee: "Emily Zhang", dependencies: ["Security Audit", "Performance Testing"] },
      { name: "Production Deployment", startDate: "2025-07-20", endDate: "2025-07-31", progress: 0, category: "deployment", assignee: "Nathan Brooks", dependencies: ["UAT & Bug Fixes"] },
    ],
  },
]

const store = {
  projects: new Map<string, Project>(),
  tasks: new Map<string, GanttTask & { projectId: string }>(),
  initialized: false,
}

function initializeStore() {
  if (store.initialized) return

  projectsData.forEach((projectData) => {
    const projectId = generateId()
    const tasks: GanttTask[] = []
    const taskNameToId = new Map<string, string>()
    
    projectData.tasks.forEach((taskData) => {
      const taskId = generateId()
      taskNameToId.set(taskData.name, taskId)
      
      const task: GanttTask & { projectId: string } = {
        id: taskId,
        name: taskData.name,
        startDate: taskData.startDate,
        endDate: taskData.endDate,
        progress: taskData.progress,
        category: taskData.category,
        assignee: taskData.assignee,
        dependencies: [],
        projectId,
      }
      
      store.tasks.set(taskId, { ...task })
      tasks.push(task)
    })

    projectData.tasks.forEach((taskData) => {
      const taskId = taskNameToId.get(taskData.name)!
      const task = store.tasks.get(taskId)
      if (task) {
        task.dependencies = taskData.dependencies
          .map((depName) => taskNameToId.get(depName))
          .filter((id): id is string => id !== undefined)
      }
    })

    const project: Project = {
      id: projectId,
      name: projectData.name,
      description: projectData.description,
      startDate: projectData.startDate,
      endDate: projectData.endDate,
      tasks,
    }

    store.projects.set(projectId, project)
  })

  store.initialized = true
}

initializeStore()

export const memoryStore = {
  getAllProjects: (): Project[] => {
    return Array.from(store.projects.values()).map((project) => ({
      ...project,
      tasks: Array.from(store.tasks.values())
        .filter((t) => t.projectId === project.id)
        .map(({ projectId, ...task }) => task),
    }))
  },

  getProject: (id: string): Project | null => {
    const project = store.projects.get(id)
    if (!project) return null
    return {
      ...project,
      tasks: Array.from(store.tasks.values())
        .filter((t) => t.projectId === id)
        .map(({ projectId, ...task }) => task),
    }
  },

  createProject: (data: { name: string; description: string; startDate: string; endDate: string }): Project => {
    const id = generateId()
    const project: Project = {
      id,
      name: data.name,
      description: data.description,
      startDate: data.startDate,
      endDate: data.endDate,
      tasks: [],
    }
    store.projects.set(id, project)
    return project
  },

  updateProject: (id: string, data: Partial<Omit<Project, "tasks">>): Project | null => {
    const project = store.projects.get(id)
    if (!project) return null
    const updated = { ...project, ...data }
    store.projects.set(id, updated)
    return memoryStore.getProject(id)
  },

  deleteProject: (id: string): boolean => {
    if (!store.projects.has(id)) return false
    store.projects.delete(id)
    Array.from(store.tasks.entries()).forEach(([taskId, task]) => {
      if (task.projectId === id) {
        store.tasks.delete(taskId)
      }
    })
    return true
  },

  getTask: (id: string): (GanttTask & { projectId: string }) | null => {
    return store.tasks.get(id) || null
  },

  createTask: (projectId: string, data: Omit<GanttTask, "id">): GanttTask | null => {
    if (!store.projects.has(projectId)) return null
    const id = generateId()
    const task: GanttTask & { projectId: string } = {
      id,
      name: data.name,
      startDate: data.startDate,
      endDate: data.endDate,
      progress: data.progress,
      category: data.category,
      assignee: data.assignee,
      dependencies: data.dependencies,
      projectId,
    }
    store.tasks.set(id, task)
    const { projectId: _, ...taskWithoutProjectId } = task
    return taskWithoutProjectId
  },

  updateTask: (id: string, data: Partial<GanttTask>): GanttTask | null => {
    const task = store.tasks.get(id)
    if (!task) return null
    const updated = { ...task, ...data }
    store.tasks.set(id, updated)
    const { projectId: _, ...taskWithoutProjectId } = updated
    return taskWithoutProjectId
  },

  deleteTask: (id: string): boolean => {
    return store.tasks.delete(id)
  },
}
