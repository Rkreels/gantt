import { AppleTouchIcon } from "@/components/marketing/apple-touch-icon"

export default function AppleTouchPreviewPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4 gap-8">
      <div className="shadow-2xl rounded-[40px] overflow-hidden">
        <AppleTouchIcon />
      </div>
      <div className="flex flex-col items-center gap-2">
        <p className="text-sm text-muted-foreground">180x180 - iOS will apply rounding</p>
        <div
          className="shadow-lg overflow-hidden"
          style={{ borderRadius: 40, width: 60, height: 60 }}
        >
          <div className="w-full h-full flex items-center justify-center" style={{ backgroundColor: "hsl(220, 70%, 55%)" }}>
            <span className="font-bold text-2xl" style={{ color: "hsl(220, 14%, 96%)" }}>G</span>
          </div>
        </div>
        <p className="text-xs text-muted-foreground">60x60 preview (home screen size)</p>
      </div>
    </div>
  )
}
