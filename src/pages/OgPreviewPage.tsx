import { OGImage } from "@/components/marketing/og-image"

export default function OgPreviewPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="shadow-2xl">
        <OGImage />
      </div>
    </div>
  )
}
