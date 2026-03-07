"use client"

import { useSearchParams } from "next/navigation"
import { Suspense } from "react"
import { Thumbnail } from "@/components/marketing/thumbnail"

function ThumbnailContent() {
  const searchParams = useSearchParams()
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

export default function ThumbnailPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-background flex items-center justify-center">
          <div className="animate-pulse bg-muted" style={{ width: 1200, height: 630 }} />
        </div>
      }
    >
      <ThumbnailContent />
    </Suspense>
  )
}
