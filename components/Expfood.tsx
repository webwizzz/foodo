"use client"

import { useEffect, useRef, useState } from "react";

export function Expfood({
  className,
}: {
  className?: string
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
    <section
      ref={rootRef as any}
      className={`w-full bg-black text-white${className ? ` ${className}` : ''}`}
      aria-label="Experience Food"
    >
      <div
        className={"pl-6 sm:pl-10 md:pl-16 lg:pl-40 max-w-3xl"}
      >
        {/* Headline */}
        <h2
          className={`text-balance font-sans font-semibold text-4xl md:text-5xl lg:text-6xl tracking-tight transition-all duration-700 ease-out will-change-transform ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          style={{ transitionDelay: inView ? "50ms" : "0ms" }}
        >
          Experience Food
        </h2>

        {/* Supporting paragraph */}
        <p
          className={`mt-8 text-pretty font-sans text-zinc-300 text-lg md:text-xl leading-tight transition-all duration-700 ease-out will-change-transform ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          style={{ transitionDelay: inView ? "200ms" : "0ms" }}
        >
          Elevate customer experiences and boost sales with AI and AR. Upgrade your dining space with the future of
          innovation today. Simplify tasks from ordering to inventory management, reducing errors and
        </p>
      </div>
    </section>
  )
}
