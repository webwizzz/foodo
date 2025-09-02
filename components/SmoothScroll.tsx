"use client"

import { ReactNode, useEffect, useRef } from "react"

interface SmoothScrollProps {
  children: ReactNode
  options?: any
}

export default function SmoothScroll({ children, options = {} }: SmoothScrollProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const locomotiveScrollRef = useRef<any>(null)

  useEffect(() => {
    let locomotiveScroll: any

    const initLocomotiveScroll = async () => {
      const LocomotiveScroll = (await import("locomotive-scroll")).default

      if (scrollRef.current) {
        locomotiveScroll = new LocomotiveScroll({
          el: scrollRef.current,
          smooth: true,
          multiplier: 1,
          class: "is-revealed",
          ...options,
        })

        locomotiveScrollRef.current = locomotiveScroll
      }
    }

    const timer = setTimeout(initLocomotiveScroll, 100)

    return () => {
      clearTimeout(timer)
      if (locomotiveScroll) {
        locomotiveScroll.destroy()
      }
    }
  }, [options])

  return (
    <div ref={scrollRef} data-scroll-container>
      {children}
    </div>
  )
}