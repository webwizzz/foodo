type LogoCellProps = { src: string; label?: string }

function LogoCell({ src, label = "Brand logo" }: LogoCellProps) {
  return (
    <div className="flex items-center justify-center">
      <img src={src || "/placeholder.svg"} alt={label} className="h-9 md:h-10 lg:h-12 w-auto opacity-95" />
    </div>
  )
}

export function LogoGrid() {
  // 15 cells -> alternate between the two SVGs you provided
  const sources = Array.from({ length: 15 }, (_, i) => (i % 2 === 0 ? "a.svg" : "b.svg"))

  return (
    <div className="grid grid-cols-5 gap-12 place-items-center">
      {sources.map((src, i) => (
        <LogoCell key={i} src={src} />
      ))}
    </div>
  )
}
