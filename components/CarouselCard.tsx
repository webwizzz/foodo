"use client"

import { cn } from "@/lib/utils"
import Image from "next/image"

type CardProps = {
  label: string
  title: string
  image: string
  emphasis?: "light" | "dark"
}

export default function CarouselCard({ label, title, image, emphasis = "dark" }: CardProps) {
  const light = emphasis === "light"
  return (
    <article
      className={cn(
        "relative shrink-0 snap-start overflow-hidden rounded-xl border",
        "w-[280px] sm:w-[320px] md:w-[360px] lg:w-[360px]",
        "h-[420px] sm:h-[480px] md:h-[560px] lg:h-[620px] xl:h-[660px]",
        "border-white/10 ",
      )}
      role="group"
      aria-label={title}
    >
      <Image src={image || "/placeholder.svg"} alt="" fill className="object-cover" priority={false} />

      {/* Readability overlay */}
      

      <div className="relative z-10 flex h-full flex-col">
        <div className="p-4 sm:p-5 md:p-6 lg:p-7">
          <p className="text-xs sm:text-sm font-medium tracking-wide uppercase text-white/85">{label}</p>
          <h3 className="mt-2 max-w-[20ch] text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold leading-tight text-white">{title}</h3>
        </div>
        {/* Spacer region for image focus in lower part */}
        <div className="mt-auto p-4 sm:p-5 md:p-6 lg:p-7" aria-hidden="true" />
      </div>
    </article>
  )
}
