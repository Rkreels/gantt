const BRAND = {
  primary: "hsl(220, 70%, 55%)",
  foreground: "hsl(220, 14%, 96%)",
}

interface FaviconProps {
  size: 16 | 32
}

export function Favicon({ size }: FaviconProps) {
  const fontSize = size === 32 ? 22 : 11

  return (
    <div
      className="flex items-center justify-center"
      style={{
        width: size,
        height: size,
        backgroundColor: BRAND.primary,
        fontFamily: "var(--font-inter), system-ui, sans-serif",
      }}
    >
      <span
        className="font-bold"
        style={{
          fontSize,
          color: BRAND.foreground,
          lineHeight: 1,
        }}
      >
        G
      </span>
    </div>
  )
}

export function FaviconPreview() {
  return (
    <div className="flex items-center gap-8">
      <div className="flex flex-col items-center gap-2">
        <Favicon size={32} />
        <span className="text-xs text-muted-foreground">32x32</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Favicon size={16} />
        <span className="text-xs text-muted-foreground">16x16</span>
      </div>
    </div>
  )
}
