"use client"

import { cn } from "@/lib/utils"
import Image from "next/image"
import * as React from "react"

type Slide = { src: string; alt: string }

const SLIDES: Slide[] = [
  { src: "/1.png", alt: "Food 1" },
  { src: "/2.png", alt: "Food 2" },
  { src: "/3.png", alt: "Food 3" },
  { src: "/4.png", alt: "Food 4" },
  { src: "/5.png", alt: "Food 5" },
  { src: "/6.png", alt: "Food 6" },
  { src: "/7.png", alt: "Food 7" },
]

export function Mockup({
  className,
  autoPlay = false,
  intervalMs = 2600,
  enableDrag = false,
}: {
  className?: string
  autoPlay?: boolean
  intervalMs?: number
  enableDrag?: boolean
}) {
  // Infinite scroller state
  const [offset, setOffset] = React.useState(0)
  const [isDragging, setIsDragging] = React.useState(false)
  const startX = React.useRef<number | null>(null)
  const lastOffset = React.useRef(0)
  const scrollerRef = React.useRef<HTMLDivElement>(null)

  // For side tiles and controls
  const [index, setIndex] = React.useState(0)
  const prevIndex = (index - 1 + SLIDES.length) % SLIDES.length
  const nextIndex = (index + 1) % SLIDES.length
  const prev2Index = (index - 2 + SLIDES.length) % SLIDES.length
  const next2Index = (index + 2) % SLIDES.length
  const sideTiles = [SLIDES[prev2Index], SLIDES[prevIndex], SLIDES[nextIndex], SLIDES[next2Index]]

  React.useEffect(() => {
    if (!autoPlay) return
    let frame: number
    let last = performance.now()
    const speed = 0.08 // px/ms
    function animate(now: number) {
      const dt = now - last
      last = now
      setOffset((o) => o + dt * speed)
      frame = requestAnimationFrame(animate)
    }
    frame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(frame)
  }, [autoPlay])

  // Loop offset
  const imageWidth = 240 // px - base width for layout calculations
  const slideGap = 32 // px - more space between slides
  const stepSize = imageWidth + slideGap

  const totalWidth = SLIDES.length * stepSize
  const normalizedOffset = ((offset % totalWidth) + totalWidth) % totalWidth

  const EXT_SLIDES = React.useMemo(() => [...SLIDES, ...SLIDES, ...SLIDES], [])

  const [viewportWidth, setViewportWidth] = React.useState(0)
  React.useEffect(() => {
    const measure = () => {
      const w = scrollerRef.current?.clientWidth || window.innerWidth
      setViewportWidth(w)
    }
    measure()
    window.addEventListener("resize", measure)
    return () => window.removeEventListener("resize", measure)
  }, [])

  // Ensure the active slide aligns to the mockup center:
  // centerFixPx shifts the track so a slide's center sits at the scroller center (no bias)
  const centerFixPx = Math.max(0, viewportWidth / 2 - imageWidth / 2)

  const onPointerDown = (e: React.PointerEvent) => {
    if (!enableDrag) return
    setIsDragging(true)
    startX.current = e.clientX
    lastOffset.current = offset
  }
  const onPointerMove = (e: React.PointerEvent) => {
    if (!enableDrag || !isDragging || startX.current == null) return
    const dx = e.clientX - startX.current
    setOffset(lastOffset.current - dx)
  }
  const onPointerUp = () => {
    if (!enableDrag) return
    setIsDragging(false)
    startX.current = null
  }

  // Controls (for side tiles and arrows)
  const goNext = React.useCallback(() => {
    setIndex((i) => (i + 1) % SLIDES.length)
    setOffset((o) => o + stepSize)
  }, [])

  const goPrev = React.useCallback(() => {
    setIndex((i) => (i - 1 + SLIDES.length) % SLIDES.length)
    setOffset((o) => o - stepSize)
  }, [])

  const neon = "bg-[#C7F01D] text-black"
  const screenStyle: React.CSSProperties = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    top: "8.8%",
    width: "100vh",
    height: "79.0%",
    overflow: "visible",
    userSelect: enableDrag && isDragging ? "none" : undefined,
    cursor: enableDrag ? (isDragging ? "grabbing" : "grab") : "auto",
  }

  return (
    <section
      className={cn(
        "relative w-full min-h-[80svh] md:min-h-[90svh] bg-black text-white ",
        "flex items-center justify-center",
        className,
      )}
      aria-label="Food preview phone carousel"
    >
      <div
        className="absolute inset-x-0 top-[8.8%] h-[79%] z-20"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          userSelect: enableDrag && isDragging ? "none" : undefined,
          cursor: enableDrag ? (isDragging ? "grabbing" : "grab") : "auto",
        }}
      >
        <div
          className="relative mx-auto h-full w-[320px] sm:w-[360px] md:w-[420px] lg:w-[480px] "
          ref={scrollerRef}
          onPointerDown={enableDrag ? onPointerDown : undefined}
          onPointerMove={enableDrag ? onPointerMove : undefined}
          onPointerUp={enableDrag ? onPointerUp : undefined}
          onPointerLeave={enableDrag ? onPointerUp : undefined}
          tabIndex={enableDrag ? 0 : -1}
          style={{ touchAction: enableDrag ? "none" : "auto" }}
        >
          {/* Infinite scroller track */}
          <div
            className="absolute top-0 left-0 h-full flex"
            style={{
              width: `${EXT_SLIDES.length * stepSize}px`,
              transform: `translateX(-${totalWidth + normalizedOffset - centerFixPx}px)`,
              transition: isDragging ? "none" : "transform 0.3s cubic-bezier(.4,1,.4,1)",
            }}
          >
            {EXT_SLIDES.map((slide, i) => {
              const tileCenter = i * stepSize + imageWidth / 2
              const viewCenter = totalWidth + normalizedOffset + (viewportWidth / 2 - centerFixPx)
              const dist = Math.abs(tileCenter - viewCenter)
              const isCenter = dist < stepSize / 2

              return (
                <div
                  key={i}
                  className="flex items-center justify-center"
                  style={{
                    width: `${imageWidth}px`,
                    height: "100%",
                    marginRight: `${slideGap}px`,
                    transform: `scale(${isCenter ? 1 : 0.5})`,
                    transition: isDragging ? "none" : "transform 400ms cubic-bezier(.4,1,.4,1)",
                    willChange: "transform",
                    zIndex: isCenter ? 2 : 1,
                    position: 'relative',
                  }}
                >
                  {!isCenter && (
                    <img
                      src="/file.svg"
                      alt="background"
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        objectFit: 'contain',
                        zIndex: 0,
                      }}
                      draggable={false}
                    />
                  )}
                  <Image
                    src={slide.src || "/placeholder.svg"}
                    alt={slide.alt}
                    width={240}
                    height={440}
                    className="object-contain rounded-2xl shadow-lg border-2 border-transparent w-[180px] h-[330px] sm:w-[200px] sm:h-[366px] md:w-[220px] md:h-[403px] lg:w-[240px] lg:h-[440px]"
                    draggable={false}
                    style={isCenter ? { position: 'relative', zIndex: 1 } : { position: 'relative', zIndex: 1 }}
                  />
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Side images removed as requested */}

      {/* Phone mockup */}
      <div className="relative w-[320px] sm:w-[360px] md:w-[420px] lg:w-[480px]">
        <div className="absolute z-20 hidden" style={screenStyle} />

        {/* Phone image must sit above the content but below controls */}
        <Image
          src="/mock.png"
          alt="Phone held in a hand"
          width={684}
          height={1026}
          priority
          className="relative z-30 w-full h-auto select-none pointer-events-none"
        />
      </div>

      <div className="absolute inset-x-0 top-[8.8%] h-[79%] z-50" aria-hidden="false">
        <div className="absolute inset-x-0 bottom-[4%] flex items-center justify-center">
          <div className="bg-black/90 rounded-full px-4 py-2.5 flex items-center gap-4 shadow-[0_0_0_1px_rgba(255,255,255,0.06)]">
            <button
              type="button"
              onClick={goPrev}
              aria-label="Previous slide"
              className={cn(
                "pointer-events-auto h-10 w-10 rounded-full grid place-items-center",
                "ring-1 ring-white/15 hover:brightness-95 transition",
                neon,
              )}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M15 6l-6 6 6 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            <div
              className={cn(
                "pointer-events-none select-none rounded-full px-5 py-2 text-[11px] font-semibold tracking-wide",
                neon,
              )}
              aria-hidden="true"
            >
              MENU
            </div>

            <button
              type="button"
              onClick={goNext}
              aria-label="Next slide"
              className={cn(
                "pointer-events-auto h-10 w-10 rounded-full grid place-items-center",
                "ring-1 ring-white/15 hover:brightness-95 transition",
                neon,
              )}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M9 6l6 6-6 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

function Panels({
  current,
  direction,
  index,
}: {
  current: Slide
  direction: "next" | "prev"
  index: number
}) {
  // Compute neighbor based on direction and index
  const SLIDES = [
    { src: "/1.png", alt: "Food 1" },
    { src: "/2.png", alt: "Food 2" },
    { src: "/3.png", alt: "Food 3" },
    { src: "/4.png", alt: "Food 4" },
    { src: "/5.png", alt: "Food 5" },
    { src: "/6.png", alt: "Food 6" },
    { src: "/7.png", alt: "Food 7" },
  ]
  const neighbor =
    direction === "next" ? SLIDES[(index + 1) % SLIDES.length] : SLIDES[(index - 1 + SLIDES.length) % SLIDES.length]
  const translate = direction === "next" ? "-50%" : "0%"
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div
        className="flex h-full w-[200%] transition-transform duration-500 ease-out"
        style={{ transform: `translateX(${translate})` }}
      >
        <Panel slide={direction === "next" ? current : neighbor} isOutgoing={direction === "next"} />
        <Panel slide={direction === "next" ? neighbor : current} isOutgoing={direction === "prev"} />
      </div>
    </div>
  )
}

function Panel({ slide, isOutgoing = false }: { slide: Slide; isOutgoing?: boolean }) {
  return (
    <div className="relative w-1/2 h-full grid place-items-center">
      <Image
        src={slide.src || "/placeholder.svg"}
        alt={slide.alt}
        width={900}
        height={900}
        priority
        className={
          `max-h-[86%] max-w-[86%] object-contain transition-all duration-500 ease-out ` +
          (isOutgoing ? "border-4 border-[#C7F01D] rounded-2xl scale-95 shadow-lg" : "")
        }
        draggable={false}
        style={{ background: "none", boxShadow: isOutgoing ? "0 0 24px #C7F01D55" : "none" }}
      />
    </div>
  )
}
