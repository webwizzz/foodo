"use client"

import { cn } from "@/lib/utils"
import Image from "next/image"

type CardProps = {
  label: string
  title: string
  image: string
  emphasis?: "light" | "dark"
  textColor?: "black" | "white"
}

export default function CarouselCard({ label, title, image, emphasis = "dark", textColor }: CardProps) {
  const light = emphasis === "light"
  const textClass = textColor === "black" ? "text-black" : "text-white"
  const labelClass = textColor === "black" ? "text-black/85" : "text-white/85"
  return (
    <article
      className={cn(
        "relative shrink-0 snap-start overflow-hidden rounded-xl border",
        "w-[280px] sm:w-[320px] md:w-[350px] lg:w-[350px]",
        "h-[420px] sm:h-[480px] md:h-[560px] lg:h-[622px] xl:h-[622px]",
        "border-white/10 ",
      )}
      role="group"
      aria-label={title}
    >
      <Image src={image || "/placeholder.svg"} alt="" fill className="object-cover" priority={false} />

      {/* Readability overlay */}

      <div className="relative z-10 flex h-full flex-col">
        <div className="p-4 sm:p-5 md:p-6 lg:p-7">
          <p className={cn("text-[16px] sm:text-sm font-semibold tracking-wide", labelClass)}>{label}</p>
          <h3 className={cn("mt-2 max-w-[20ch] text-lg sm:text-xl md:text-2xl lg:text-[28px] font-semibold leading-tight", textClass)}>{title}</h3>
        </div>
        {/* Spacer region for image focus in lower part */}
        <div className="mt-auto p-4 sm:p-5 md:p-6 lg:p-7" aria-hidden="true" />
      </div>
    </article>
  )
}
