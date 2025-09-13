type LogoCellProps = { src: string; label?: string }

function LogoCell({ src, label = "Brand logo" }: LogoCellProps) {
  return (
    <div className="flex items-center justify-center">
      <img src={src || "/placeholder.svg"} alt={label} className="h-6 sm:h-8 md:h-9 lg:h-10 xl:h-12 w-auto opacity-95" />
    </div>
  )
}

export function LogoGrid() {
  // All SVG logos from /public/logos
  const sources = [
    "logos/Group 1171275112.svg",
    "logos/Group 7.svg",
    "logos/Isolation_Mode-2.svg",
    "logos/Isolation_Mode.svg",
    "logos/Layer_1.svg",
    "logos/OBJECTS-2.svg",
    "logos/VU Logo Small Res (1) 2.svg",
    "logos/cropped-BavetteSteak 1.svg",
    "logos/image 25.svg",
    "logos/image 39.svg",
    "logos/image 553.svg",
    "logos/image 67-2.svg",
    "logos/image 67-3.svg",
    "logos/image 67-4.svg",
    "logos/logo ideations (1) 2.svg"
  ];

  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4 sm:gap-6 md:gap-8 lg:gap-10 xl:gap-12 place-items-center">
      {sources.map((src, i) => (
        <LogoCell key={i} src={src} />
      ))}
    </div>
  )
}
