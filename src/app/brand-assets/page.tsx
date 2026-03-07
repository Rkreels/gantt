import Link from "next/link"
import { ArrowLeft, ExternalLink } from "lucide-react"
import { Thumbnail } from "@/components/marketing/thumbnail"
import { OGImage } from "@/components/marketing/og-image"
import { AppleTouchIcon } from "@/components/marketing/apple-touch-icon"
import { FaviconPreview } from "@/components/marketing/favicon"

export default function BrandAssetsPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 flex items-center h-14 px-4 border-b border-border bg-card">
        <Link
          href="/"
          className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to App
        </Link>
      </header>

      <main className="container max-w-5xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-foreground mb-2">Brand Assets</h1>
        <p className="text-muted-foreground mb-12">
          Marketing assets for the Gantt template. Click to open full-size preview.
        </p>

        <div className="flex flex-col gap-16">
          {/* Thumbnail */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-xl font-semibold text-foreground">Thumbnail</h2>
                <p className="text-sm text-muted-foreground">1200x630 - Marketplace listing image</p>
              </div>
              <div className="flex gap-2">
                <Link
                  href="/thumbnail?v=a"
                  className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium rounded-md bg-secondary text-secondary-foreground hover:bg-accent transition-colors"
                >
                  Variant A
                  <ExternalLink className="w-3 h-3" />
                </Link>
                <Link
                  href="/thumbnail?v=b"
                  className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium rounded-md bg-secondary text-secondary-foreground hover:bg-accent transition-colors"
                >
                  Variant B
                  <ExternalLink className="w-3 h-3" />
                </Link>
                <Link
                  href="/thumbnail?v=c"
                  className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium rounded-md bg-secondary text-secondary-foreground hover:bg-accent transition-colors"
                >
                  Variant C
                  <ExternalLink className="w-3 h-3" />
                </Link>
              </div>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              <Link href="/thumbnail?v=a" className="block rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-full aspect-[1200/630] overflow-hidden">
                  <div className="origin-top-left scale-[0.3] md:scale-[0.4]">
                    <Thumbnail word="GANTT" variant="a" />
                  </div>
                </div>
              </Link>
              <Link href="/thumbnail?v=b" className="block rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-full aspect-[1200/630] overflow-hidden">
                  <div className="origin-top-left scale-[0.3] md:scale-[0.4]">
                    <Thumbnail word="GANTT" variant="b" />
                  </div>
                </div>
              </Link>
              <Link href="/thumbnail?v=c" className="block rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-full aspect-[1200/630] overflow-hidden">
                  <div className="origin-top-left scale-[0.3] md:scale-[0.4]">
                    <Thumbnail word="GANTT" variant="c" />
                  </div>
                </div>
              </Link>
            </div>
          </section>

          {/* OG Image */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-xl font-semibold text-foreground">Open Graph Image</h2>
                <p className="text-sm text-muted-foreground">1200x630 - Social sharing preview</p>
              </div>
              <Link
                href="/og-preview"
                className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium rounded-md bg-secondary text-secondary-foreground hover:bg-accent transition-colors"
              >
                Full Size
                <ExternalLink className="w-3 h-3" />
              </Link>
            </div>
            <Link href="/og-preview" className="block rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow max-w-lg">
              <div className="w-full aspect-[1200/630] overflow-hidden">
                <div className="origin-top-left scale-[0.35]">
                  <OGImage />
                </div>
              </div>
            </Link>
          </section>

          {/* Icons */}
          <section>
            <h2 className="text-xl font-semibold text-foreground mb-1">App Icons</h2>
            <p className="text-sm text-muted-foreground mb-6">Apple Touch Icon and Favicon</p>
            <div className="flex flex-wrap gap-8">
              <Link href="/apple-touch-preview" className="flex flex-col items-center gap-3">
                <div className="shadow-lg rounded-[28px] overflow-hidden hover:shadow-xl transition-shadow">
                  <AppleTouchIcon />
                </div>
                <span className="text-xs text-muted-foreground">Apple Touch Icon (180x180)</span>
              </Link>
              <Link href="/favicon-preview" className="flex flex-col items-center gap-3">
                <div className="p-6 bg-card rounded-lg border border-border shadow hover:shadow-lg transition-shadow">
                  <FaviconPreview />
                </div>
                <span className="text-xs text-muted-foreground">Favicon (32x32, 16x16)</span>
              </Link>
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}
