import { useSearchParams } from "react-router-dom"
import { Thumbnail } from "@/components/marketing/thumbnail"

export default function ThumbnailPage() {
  const [searchParams] = useSearchParams()
  const v = searchParams.get("v")
  const variant = v === "b" ? "b" : v === "c" ? "c" : "a"

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="shadow-2xl">
        <Thumbnail word="GANTT" variant={variant} />
      </div>
    </div>
  )
}
