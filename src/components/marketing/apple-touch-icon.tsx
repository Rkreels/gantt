const BRAND = {
  primary: "hsl(220, 70%, 55%)",
  foreground: "hsl(220, 14%, 96%)",
}

export function AppleTouchIcon() {
  return (
    <div
      className="flex items-center justify-center"
      style={{
        width: 180,
        height: 180,
        backgroundColor: BRAND.primary,
        fontFamily: "var(--font-inter), system-ui, sans-serif",
      }}
    >
      <span
        className="font-bold"
        style={{
          fontSize: 100,
          color: BRAND.foreground,
          lineHeight: 1,
        }}
      >
        G
      </span>
    </div>
  )
}
