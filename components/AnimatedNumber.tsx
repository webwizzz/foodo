"use client"

import { useEffect, useMemo, useRef, useState } from "react"

type AnimatedNumberProps = {
  value: number
  durationMs?: number
  decimals?: number
  suffix?: string
  prefix?: string
  // when 'short', formats 1_200_000 -> 1.2M, etc.
  abbr?: "none" | "short"
  className?: string
}

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3)
}

function formatAbbreviated(n: number, decimals = 0) {
  const abs = Math.abs(n)
  if (abs >= 1_000_000_000) return (n / 1_000_000_000).toFixed(decimals) + "B"
  if (abs >= 1_000_000) return (n / 1_000_000).toFixed(decimals) + "M"
  if (abs >= 1_000) return (n / 1_000).toFixed(decimals) + "K"
  return n.toFixed(decimals)
}

export function AnimatedNumber({
  value,
  durationMs = 1500,
  decimals = 0,
  suffix = "",
  prefix = "",
  abbr = "none",
  className,
}: AnimatedNumberProps) {
  const [display, setDisplay] = useState(0)
  const [started, setStarted] = useState(false)
  const ref = useRef<HTMLSpanElement | null>(null)
  const rafRef = useRef<number | null>(null)

  const prefersReducedMotion = useMemo(() => {
    if (typeof window === "undefined") return false
    return window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false
  }, [])

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !started) {
            setStarted(true)
          }
        })
      },
      { threshold: 0.3 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [started])

  useEffect(() => {
    if (!started) return

    if (prefersReducedMotion || durationMs <= 0) {
      setDisplay(value)
      return
    }

    const start = performance.now()
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / durationMs)
      const eased = easeOutCubic(t)
      setDisplay(value * eased)
      if (t < 1) {
        rafRef.current = requestAnimationFrame(tick)
      }
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [started, value, durationMs, prefersReducedMotion])

  const formatted = useMemo(() => {
    const n = started ? display : 0
    const out =
      abbr === "short"
        ? formatAbbreviated(n, decimals)
        : Number(n).toLocaleString(undefined, {
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals,
          })
    return `${prefix}${out}${suffix}`
  }, [display, decimals, prefix, suffix, abbr, started])

  return (
    <span ref={ref} className={className} aria-live="polite">
      {formatted}
    </span>
  )
}
