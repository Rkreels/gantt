import { FaviconPreview } from "@/components/marketing/favicon"

export default function FaviconPreviewPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4 gap-8">
      <FaviconPreview />
      <p className="text-sm text-muted-foreground">Favicon previews at actual size</p>
    </div>
  )
}
