type LogoCellProps = { src: string; label?: string }

function LogoCell({ src, label = "Brand logo" }: LogoCellProps) {
  return (
    <div className="flex items-center justify-center">
      <img src={src || "/placeholder.svg"} alt={label} className="h-6 sm:h-8 md:h-9 lg:h-10 xl:h-12 w-auto opacity-95" />
    </div>
  )
}

export function LogoGrid() {
  // 15 cells -> alternate between the two SVGs you provided
  const sources = Array.from({ length: 15 }, (_, i) => (i % 2 === 0 ? "a.svg" : "b.svg"))

  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4 sm:gap-6 md:gap-8 lg:gap-10 xl:gap-12 place-items-center">
      {sources.map((src, i) => (
        <LogoCell key={i} src={src} />
      ))}
    </div>
  )
}
