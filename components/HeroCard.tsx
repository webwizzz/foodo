"use client"

import { cn } from "@/lib/utils"

type HeroCardProps = {
  variant?: "light" | "dark"
  label: string
  heading: string
  cta: string
  tag: string
  imageSrc: string
  imageOnly?: boolean
}

export function HeroCard({ variant = "light", label, heading, cta, tag, imageSrc, imageOnly = false }: HeroCardProps) {
  const isDark = variant === "dark"

  if (imageOnly) {
    return (
      <section
        className={cn(
          "relative overflow-hidden rounded-[32px] min-h-[28rem] md:min-h-[36rem] lg:min-h-[40rem]",
          isDark ? "bg-neutral-900" : "bg-neutral-200",
          "ring-1",
          isDark ? "ring-white/10" : "ring-black/10",
          "shadow-2xl",
        )}
        aria-hidden="true"
      >
        <img
          src={imageSrc || "/placeholder.svg?height=600&width=600&query=card%20background"}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover object-center pointer-events-none select-none"
        />
      </section>
    )
  }

  return (
    <section
      className={cn(
        "relative overflow-hidden rounded-[32px] p-8 md:p-12 min-h-[28rem] md:min-h-[36rem] lg:min-h-[40rem]",
        isDark ? "bg-neutral-900 text-white" : "bg-neutral-200 text-white",
        "ring-1",
        isDark ? "ring-white/10" : "ring-black/10",
        "shadow-2xl",
      )}
      aria-label={heading}
    >
      {/* background image full-bleed behind content */}
      <img
        src={imageSrc || "/placeholder.svg?height=600&width=600&query=card%20background"}
        alt=""
        aria-hidden="true"
        className={cn(
          "absolute inset-0 -z-10 h-full w-full object-cover object-center pointer-events-none select-none",
          isDark ? "opacity-95" : "opacity-100",
        )}
      />

      {/* lighting/vignette overlay above image for contrast */}
      <div
        aria-hidden="true"
        className={cn(
          "absolute inset-0 -z-10",
          isDark
            ? "bg-[radial-gradient(110%_60%_at_20%_10%,rgba(255,255,255,0.08),transparent_60%)]"
            : "bg-[radial-gradient(120%_70%_at_10%_5%,rgba(255,255,255,0.65),transparent_55%)]",
        )}
      />

      {/* content */}
      <div className="relative z-10">
        <p className="text-sm font-medium text-white/80">{label}</p>

        <h2 className="mt-6 text-pretty  text-3xl md:text-5xl font-semibold leading-tight">{heading}</h2>

        <button
          className={cn(
            "mt-8 inline-flex items-center justify-center rounded-full px-5 py-2 text-sm font-medium bg-white text-neutral-900 shadow",
            "focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
            isDark
              ? "focus-visible:ring-white/60 focus-visible:ring-offset-neutral-900"
              : "focus-visible:ring-black/20 focus-visible:ring-offset-neutral-200",
          )}
        >
          {cta}
          <span className="sr-only">{` – ${label}`}</span>
        </button>
      </div>

      {/* bottom-left tag pill (above overlay) */}
      <div
        className={cn(
          "absolute left-6 bottom-6 md:left-8 md:bottom-8 z-20 inline-flex items-center rounded-full px-5 py-2 text-sm font-medium backdrop-blur",
          isDark ? "text-white/90 border border-white/30 bg-white/5" : "text-white border border-white/40 bg-white/10",
        )}
      >
        {tag}
      </div>
    </section>
  )
}
