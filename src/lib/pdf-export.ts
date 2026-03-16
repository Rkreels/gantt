import { jsPDF } from "jspdf"
import html2canvas from "html2canvas"
import type { Project } from "@/lib/types"
import { format, parseISO, differenceInDays } from "date-fns"

const CATEGORY_COLORS: Record<string, string> = {
  planning: "#3b82f6",
  design: "#8b5cf6",
  development: "#10b981",
  testing: "#f59e0b",
  deployment: "#ef4444",
  marketing: "#ec4899",
  content: "#06b6d4",
}

function drawRoundedRect(
  doc: jsPDF,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number,
  fillColor: string
) {
  const r = Math.min(radius, width / 2, height / 2)
  doc.setFillColor(fillColor)
  doc.setDrawColor(fillColor)
  doc.roundedRect(x, y, width, height, r, r, "F")
}

function hexToRgb(hex: string): [number, number, number] {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result
    ? [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)]
    : [0, 0, 0]
}

export async function exportToPDF(project: Project, chartElement?: HTMLElement | null) {
  const doc = new jsPDF("p", "mm", "a4")
  const pageWidth = doc.internal.pageSize.getWidth()
  const pageHeight = doc.internal.pageSize.getHeight()
  const margin = 15
  let yPos = margin

  const primaryColor = [59, 130, 246] as [number, number, number]
  const textColor = [30, 30, 30] as [number, number, number]
  const mutedColor = [107, 114, 128] as [number, number, number]

  doc.setFillColor(...primaryColor)
  doc.rect(0, 0, pageWidth, 30, "F")

  doc.setTextColor(255, 255, 255)
  doc.setFontSize(22)
  doc.setFont("helvetica", "bold")
  doc.text("Gantt Chart Report", margin, 18)

  doc.setFontSize(10)
  doc.setFont("helvetica", "normal")
  doc.text(`Generated: ${format(new Date(), "MMMM d, yyyy 'at' h:mm a")}`, margin, 25)

  yPos = 40

  doc.setTextColor(...textColor)
  doc.setFontSize(16)
  doc.setFont("helvetica", "bold")
  doc.text(project.name, margin, yPos)

  yPos += 8
  doc.setFontSize(10)
  doc.setFont("helvetica", "normal")
  doc.setTextColor(...mutedColor)
  doc.text(project.description || "No description", margin, yPos, { maxWidth: pageWidth - 2 * margin })

  yPos += 10

  doc.setTextColor(...textColor)
  doc.setFontSize(10)
  const startDate = format(parseISO(project.startDate), "MMM d, yyyy")
  const endDate = format(parseISO(project.endDate), "MMM d, yyyy")
  doc.text(`Timeline: ${startDate} - ${endDate}`, margin, yPos)

  yPos += 8
  const totalTasks = project.tasks.length
  const completedTasks = project.tasks.filter((t) => t.progress === 100).length
  const avgProgress = totalTasks > 0
    ? Math.round(project.tasks.reduce((acc, t) => acc + t.progress, 0) / totalTasks)
    : 0

  const statWidth = (pageWidth - 2 * margin - 20) / 3
  const statHeight = 20

  doc.setFillColor(240, 240, 240)
  drawRoundedRect(doc, margin, yPos, statWidth, statHeight, 3, "#f0f0f0")
  doc.setTextColor(...primaryColor)
  doc.setFontSize(16)
  doc.setFont("helvetica", "bold")
  doc.text(`${avgProgress}%`, margin + statWidth / 2, yPos + 9, { align: "center" })
  doc.setFontSize(8)
  doc.setTextColor(...mutedColor)
  doc.setFont("helvetica", "normal")
  doc.text("Progress", margin + statWidth / 2, yPos + 15, { align: "center" })

  drawRoundedRect(doc, margin + statWidth + 10, yPos, statWidth, statHeight, 3, "#f0f0f0")
  doc.setTextColor(...primaryColor)
  doc.setFontSize(16)
  doc.setFont("helvetica", "bold")
  doc.text(`${completedTasks}/${totalTasks}`, margin + statWidth + 10 + statWidth / 2, yPos + 9, { align: "center" })
  doc.setFontSize(8)
  doc.setTextColor(...mutedColor)
  doc.setFont("helvetica", "normal")
  doc.text("Completed", margin + statWidth + 10 + statWidth / 2, yPos + 15, { align: "center" })

  const duration = differenceInDays(parseISO(project.endDate), parseISO(project.startDate)) + 1
  drawRoundedRect(doc, margin + 2 * statWidth + 20, yPos, statWidth, statHeight, 3, "#f0f0f0")
  doc.setTextColor(...primaryColor)
  doc.setFontSize(16)
  doc.setFont("helvetica", "bold")
  doc.text(`${duration}`, margin + 2 * statWidth + 20 + statWidth / 2, yPos + 9, { align: "center" })
  doc.setFontSize(8)
  doc.setTextColor(...mutedColor)
  doc.setFont("helvetica", "normal")
  doc.text("Days", margin + 2 * statWidth + 20 + statWidth / 2, yPos + 15, { align: "center" })

  yPos += 30

  doc.setTextColor(...textColor)
  doc.setFontSize(12)
  doc.setFont("helvetica", "bold")
  doc.text("Tasks by Category", margin, yPos)

  yPos += 6
  const categoryCount = project.tasks.reduce((acc, t) => {
    acc[t.category] = (acc[t.category] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  const categories = Object.entries(categoryCount)
  const catBarWidth = pageWidth - 2 * margin - 30
  const catBarHeight = 8

  categories.forEach(([cat, count]) => {
    const color = CATEGORY_COLORS[cat] || "#6b7280"
    const [r, g, b] = hexToRgb(color)
    
    doc.setFillColor(r, g, b)
    doc.circle(margin + 3, yPos + 4, 3, "F")

    doc.setTextColor(...textColor)
    doc.setFontSize(9)
    doc.setFont("helvetica", "normal")
    doc.text(cat.charAt(0).toUpperCase() + cat.slice(1), margin + 10, yPos + 5)

    doc.setTextColor(...mutedColor)
    doc.text(`${count} tasks`, pageWidth - margin - 20, yPos + 5)

    const catCompleted = project.tasks.filter((t) => t.category === cat && t.progress === 100).length
    const catProgress = count > 0 ? (catCompleted / count) * 100 : 0

    doc.setFillColor(230, 230, 230)
    drawRoundedRect(doc, margin + 10, yPos + 8, catBarWidth, catBarHeight, 2, "#e6e6e6")

    if (catProgress > 0) {
      doc.setFillColor(r, g, b)
      drawRoundedRect(doc, margin + 10, yPos + 8, (catBarWidth * catProgress) / 100, catBarHeight, 2, color)
    }

    yPos += 18
  })

  yPos += 10

  doc.setTextColor(...textColor)
  doc.setFontSize(12)
  doc.setFont("helvetica", "bold")
  doc.text("Task Details", margin, yPos)

  yPos += 8

  doc.setFillColor(245, 245, 245)
  doc.rect(margin, yPos, pageWidth - 2 * margin, 8, "F")
  doc.setFontSize(8)
  doc.setFont("helvetica", "bold")
  doc.text("Task Name", margin + 2, yPos + 5)
  doc.text("Start", margin + 80, yPos + 5)
  doc.text("End", margin + 100, yPos + 5)
  doc.text("Progress", margin + 120, yPos + 5)
  doc.text("Category", margin + 145, yPos + 5)
  doc.text("Assignee", margin + 165, yPos + 5)

  yPos += 8

  doc.setFont("helvetica", "normal")
  project.tasks.forEach((task, index) => {
    if (yPos > pageHeight - 20) {
      doc.addPage()
      yPos = margin

      doc.setFillColor(245, 245, 245)
      doc.rect(margin, yPos, pageWidth - 2 * margin, 8, "F")
      doc.setFontSize(8)
      doc.setFont("helvetica", "bold")
      doc.text("Task Name", margin + 2, yPos + 5)
      doc.text("Start", margin + 80, yPos + 5)
      doc.text("End", margin + 100, yPos + 5)
      doc.text("Progress", margin + 120, yPos + 5)
      doc.text("Category", margin + 145, yPos + 5)
      doc.text("Assignee", margin + 165, yPos + 5)
      yPos += 8
      doc.setFont("helvetica", "normal")
    }

    if (index % 2 === 0) {
      doc.setFillColor(250, 250, 250)
      doc.rect(margin, yPos, pageWidth - 2 * margin, 7, "F")
    }

    doc.setFontSize(7)
    doc.setTextColor(...textColor)
    
    const taskName = task.name.length > 30 ? task.name.substring(0, 27) + "..." : task.name
    doc.text(taskName, margin + 2, yPos + 5)

    doc.setTextColor(...mutedColor)
    doc.text(format(parseISO(task.startDate), "MMM d"), margin + 80, yPos + 5)
    doc.text(format(parseISO(task.endDate), "MMM d"), margin + 100, yPos + 5)

    const color = CATEGORY_COLORS[task.category] || "#6b7280"
    const [r, g, b] = hexToRgb(color)
    doc.setTextColor(r, g, b)
    doc.text(`${task.progress}%`, margin + 125, yPos + 5)

    doc.setTextColor(...mutedColor)
    doc.text(task.category, margin + 145, yPos + 5)

    const assignee = task.assignee.length > 12 ? task.assignee.substring(0, 10) + "..." : task.assignee
    doc.text(assignee, margin + 165, yPos + 5)

    yPos += 7
  })

  if (chartElement) {
    try {
      doc.addPage()
      yPos = margin

      doc.setTextColor(...textColor)
      doc.setFontSize(12)
      doc.setFont("helvetica", "bold")
      doc.text("Gantt Chart Visualization", margin, yPos)

      yPos += 8

      const canvas = await html2canvas(chartElement, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: "#ffffff",
      })

      const imgData = canvas.toDataURL("image/png")
      const imgWidth = pageWidth - 2 * margin
      const imgHeight = (canvas.height * imgWidth) / canvas.width

      let remainingHeight = imgHeight
      let sourceY = 0
      const availableHeight = pageHeight - yPos - margin

      const firstPageHeight = Math.min(remainingHeight, availableHeight)
      if (firstPageHeight > 0) {
        // @ts-ignore - jsPDF types are incomplete
        doc.addImage(imgData, "PNG", margin, yPos, imgWidth, imgHeight)
      }

      remainingHeight -= firstPageHeight
      while (remainingHeight > 0) {
        doc.addPage()
        sourceY += firstPageHeight * (canvas.height / imgHeight)
        const nextPageHeight = Math.min(remainingHeight, pageHeight - 2 * margin)
        // @ts-ignore - jsPDF types are incomplete
        doc.addImage(imgData, "PNG", margin, margin, imgWidth, imgHeight)
        remainingHeight -= nextPageHeight
      }
    } catch (error) {
      console.error("Error capturing chart:", error)
    }
  }

  const totalPages = doc.getNumberOfPages()
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i)
    doc.setFontSize(8)
    doc.setTextColor(...mutedColor)
    doc.text(
      `Page ${i} of ${totalPages} | Generated by Gantt Chart Manager`,
      pageWidth / 2,
      pageHeight - 10,
      { align: "center" }
    )
  }

  doc.save(`${project.name.replace(/\s+/g, "-").toLowerCase()}-gantt-${format(new Date(), "yyyy-MM-dd")}.pdf`)
}
