"use client"

import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"
import type { JSX } from "react/jsx-runtime" // Declare JSX variable

export function Expfood({
  className,
  as: As = "section",
}: {
  className?: string
  as?: keyof JSX.IntrinsicElements
}) {
  const rootRef = useRef<HTMLElement | null>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = rootRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        if (entry.isIntersecting) {
          setInView(true)
          // Once visible, no need to observe further
          observer.unobserve(el)
        }
      },
      {
        root: null,
        threshold: 0.2, // start animation when 20% of section is visible
      },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <As
      ref={rootRef as any}
      className={cn(
        // Layout + background to match the reference
        "w-full bg-black text-white",
        className,
      )}
      aria-label="Experience Food"
    >
      <div
        className={cn(
          // Left padding approximating ~160px on large screens
          "pl-6 sm:pl-10 md:pl-16 lg:pl-40",
          // Constrain width of the text block similar to the reference
          "max-w-3xl",
        )}
      >
        {/* Headline */}
        <h2
          className={cn(
            "text-balance font-sans font-semibold",
            // Font sizes tuned to match the screenshot scale
            "text-4xl md:text-5xl lg:text-6xl",
            "tracking-tight",
            // Animation
            "transition-all duration-700 ease-out will-change-transform",
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
          )}
          style={{ transitionDelay: inView ? "50ms" : "0ms" }}
        >
          Experience Food
        </h2>

        {/* Supporting paragraph */}
        <p
          className={cn(
            "mt-8 text-pretty font-sans text-zinc-300",
            // Larger-than-body text with relaxed leading to match reference
            "text-lg md:text-xl leading-tight",
            // Animation with slight stagger
            "transition-all duration-700 ease-out will-change-transform",
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
          )}
          style={{ transitionDelay: inView ? "200ms" : "0ms" }}
        >
          Elevate customer experiences and boost sales with AI and AR. Upgrade your dining space with the future of
          innovation today. Simplify tasks from ordering to inventory management, reducing errors and
        </p>
      </div>
    </As>
  )
}
