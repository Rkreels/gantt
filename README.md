# Gantt - Project Timeline Manager

Interactive Gantt chart application with an AI-powered project management assistant. Built with Next.js 16, Tailwind CSS, shadcn/ui, and the Vercel AI SDK 6.

## Features

- **Interactive Gantt Chart** - Horizontally scrollable timeline with day/week/month views, color-coded task bars, progress indicators, and a "today" marker
- **Multi-Project Support** - Each project is a standalone JSON file in the `/data` folder. Switch between projects via the header selector
- **Chip-Style Category Filters** - Filter tasks by category (planning, design, development, testing, deployment) using toggleable chip filters
- **Task Detail Sheets** - Tap any task bar to see full details in a bottom sheet (assignee, progress, dates, dependencies)
- **AI Assistant** - Chat panel powered by Claude Opus 4.6 via the Vercel AI Gateway. The agent has full context of all project data and can analyze timelines, flag bottlenecks, and suggest optimizations
- **Agent Settings** - Configure model, temperature, and system prompt from the settings panel
- **Mobile-First** - Full-screen menus, touch-friendly 44px targets, bottom sheets, and responsive layout. Desktop gets a side panel for chat and modal for settings with blurred backdrops

## Project Data

Add or edit project JSON files in the `/data` folder. Each file follows this schema:

```json
{
  "id": "my-project",
  "name": "My Project",
  "description": "Project description",
  "startDate": "2026-01-01",
  "endDate": "2026-06-30",
  "tasks": [
    {
      "id": "t1",
      "name": "Task Name",
      "startDate": "2026-01-01",
      "endDate": "2026-01-15",
      "progress": 50,
      "category": "development",
      "assignee": "Jane Doe",
      "dependencies": []
    }
  ]
}
```

### Categories

Tasks use a `category` field for color-coding and filtering. Built-in categories: `planning`, `design`, `development`, `content`, `testing`, `deployment`.

## Tech Stack

- **Framework**: Next.js 16 (App Router, Turbopack)
- **Styling**: Tailwind CSS + shadcn/ui
- **AI**: Vercel AI SDK 6 with Vercel AI Gateway (default model: `anthropic/claude-opus-4-6`)
- **Data Fetching**: SWR
- **Dates**: date-fns
- **Icons**: Lucide React

## Getting Started

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Architecture

```
app/
  page.tsx          # Main client page (state for chat/settings panels)
  layout.tsx        # Root layout with fonts and metadata
  api/
    projects/       # GET endpoint that reads /data/*.json
    chat/           # POST endpoint for AI chat (streamText)
components/
  app-header.tsx    # Header bar with project selector + hamburger menu
  gantt-chart.tsx   # Core Gantt timeline renderer
  gantt-task-row.tsx# Individual task bar with tooltip + detail sheet
  gantt-toolbar.tsx # Stats, view mode toggle, category chips
  category-filters.tsx # Chip-style category filter bar
  chat-panel.tsx    # AI chat UI (full-screen on mobile, side panel on desktop)
  agent-settings.tsx# Model/temperature/prompt configuration panel
data/
  *.json            # One file per project
lib/
  types.ts          # TypeScript interfaces
  gantt-utils.ts    # Timeline math, positioning, color maps
  project-context.tsx # React context for project state + SWR fetching
```
