type LogoCellProps = { src: string; label?: string }

function LogoCell({ src, label = "Brand logo" }: LogoCellProps) {
  return (
    <div className="flex items-center justify-center">
      <img src={src || "/placeholder.svg"} alt={label} className="h-6 sm:h-8 md:h-9 lg:h-10 xl:h-12 w-auto opacity-95" />
    </div>
  )
}

export function LogoGrid() {
  // Real restaurant/brand logos
  const logoSources = [
    "logos/antonioetta.png",
    "logos/bangkok.png",
    "logos/bavette.png",
    "logos/big jhon.png",
    "logos/bruncho.png",
    "logos/vu ounge.png",
    "logos/chicking.png",
    "logos/istanbul.png",
    "logos/chutnee.png",
    "logos/farmhouse.png",
    "logos/Mask group.png",
    "logos/hey farina.png",
    "logos/m.png",
    "logos/tiffin box.png",
    "logos/ora.png",
    "logos/noor cafe.png",
    "logos/tikka nation.png",
    "logos/cafe begum.png",
  ]

  // Take first 15 logos for the grid
  const sources = logoSources.slice(0, 15)

  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4 sm:gap-6 md:gap-8 lg:gap-10 xl:gap-12 place-items-center">
      {sources.map((src, i) => (
        <LogoCell key={i} src={src} />
      ))}
    </div>
  )
}
