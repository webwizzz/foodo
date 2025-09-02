"use client"

import type React from "react"

import { ChevronLeft, ChevronRight } from "lucide-react"
import { useCallback, useRef, useState } from "react"
import CarouselCard from "./CarouselCard"

export type Item = {
  id: string
  label: string
  title: string
  image: string
  emphasis?: "light" | "dark"
}

export default function HorizontalCarousel({
  items,
  ariaLabel,
}: {
  items: Item[]
  ariaLabel?: string
}) {
  const scrollerRef = useRef<HTMLDivElement | null>(null)
  const firstCardRef = useRef<HTMLDivElement | null>(null)

  const [dragging, setDragging] = useState(false)
  const dragData = useRef<{ startX: number; startScrollLeft: number } | null>(null)

  const scrollByCard = useCallback((dir: "prev" | "next") => {
    const scroller = scrollerRef.current
    if (!scroller) return
    const card = firstCardRef.current
    const gap = window.innerWidth < 640 ? 16 : 24 // smaller gap on mobile
    const delta = (card?.clientWidth || 250) + gap
    scroller.scrollBy({ left: dir === "next" ? delta : -delta, behavior: "smooth" })
  }, [])

  const onMouseDown = (e: React.MouseEvent) => {
    const scroller = scrollerRef.current
    if (!scroller) return
    setDragging(true)
    scroller.classList.add("cursor-grabbing")
    dragData.current = {
      startX: e.pageX - scroller.offsetLeft,
      startScrollLeft: scroller.scrollLeft,
    }
  }

  const onMouseMove = (e: React.MouseEvent) => {
    const scroller = scrollerRef.current
    if (!scroller || !dragging || !dragData.current) return
    const x = e.pageX - scroller.offsetLeft
    const walk = x - dragData.current.startX
    scroller.scrollLeft = dragData.current.startScrollLeft - walk
  }

  const endDrag = () => {
    const scroller = scrollerRef.current
    if (!scroller) return
    setDragging(false)
    scroller.classList.remove("cursor-grabbing")
    dragData.current = null
  }

  const onTouchStart = (e: React.TouchEvent) => {
    const scroller = scrollerRef.current
    if (!scroller) return
    dragData.current = {
      startX: e.touches[0].pageX - scroller.offsetLeft,
      startScrollLeft: scroller.scrollLeft,
    }
  }
  const onTouchMove = (e: React.TouchEvent) => {
    const scroller = scrollerRef.current
    if (!scroller || !dragData.current) return
    const x = e.touches[0].pageX - scroller.offsetLeft
    const walk = x - dragData.current.startX
    scroller.scrollLeft = dragData.current.startScrollLeft - walk
  }
  const onTouchEnd = () => {
    dragData.current = null
  }

  return (
    <div className="relative">
      {/* edge fades */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-6 sm:w-8 md:w-10 bg-gradient-to-r from-black to-transparent rounded-s-3xl" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-6 sm:w-8 md:w-10 bg-gradient-to-l from-black to-transparent rounded-e-3xl" />

      {/* Controls */}
      <div className="absolute -left-3 top-1/2 -translate-y-1/2 z-20 hidden md:block">
        <button
          aria-label="Scroll to previous"
          onClick={() => scrollByCard("prev")}
          className="rounded-full bg-white/10 hover:bg-white/20 text-white p-2 border border-white/15 backdrop-blur"
        >
          <ChevronLeft size={22} />
        </button>
      </div>
      <div className="absolute -right-3 top-1/2 -translate-y-1/2 z-20 hidden md:block">
        <button
          aria-label="Scroll to next"
          onClick={() => scrollByCard("next")}
          className="rounded-full bg-white/10 hover:bg-white/20 text-white p-2 border border-white/15 backdrop-blur"
        >
          <ChevronRight size={22} />
        </button>
      </div>

      <div
        ref={scrollerRef}
        aria-label={ariaLabel}
        className={`
          group relative flex items-stretch gap-4 sm:gap-6
          overflow-x-auto select-none cursor-grab
          px-1 py-2
          [scroll-snap-type:x_mandatory] scroll-smooth
          [scrollbar-width:none] [&::-webkit-scrollbar]:hidden
        `}
        style={{
          WebkitOverflowScrolling: "touch",
          scrollBehavior: "smooth",
          overscrollBehaviorX: "contain",
        }}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseLeave={endDrag}
        onMouseUp={endDrag}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        role="region"
      >
        {/* first card gets a ref to compute width for snapping arrows */}
        <div ref={firstCardRef} className="contents">
          {items.map((item) => (
            <CarouselCard
              key={item.id}
              label={item.label}
              title={item.title}
              image={item.image}
              emphasis={item.emphasis}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
