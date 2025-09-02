"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"

// Word component for character-by-character text opacity animation
const Word = ({children, progress, range}: {children: string, progress: any, range: [number, number]}) => {
  const amount = range[1] - range[0]
  const step = amount / children.length
  return (
    <span className="inline-block mr-2">
      {
        children.split("").map((char, i) => {
          const start = range[0] + (i * step);
          const end = range[0] + ((i + 1) * step)
          return <Char key={`c_${i}`} progress={progress} range={[start, end]}>{char}</Char>
        })
      }
    </span>
  )
}

const Char = ({children, progress, range}: {children: string, progress: any, range: [number, number]}) => {
  const opacity = useTransform(progress, range, [0, 1])
  return (
    <span className="relative">
      <span className="absolute opacity-30">{children}</span>
      <motion.span style={{opacity: opacity}}>{children}</motion.span>
    </span>
  )
}

export function Demo() {
  const containerRef = useRef<HTMLDivElement>(null)
  
  // Scroll progress for text animation
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.9", "start 0.25"]
  })

  const headingText = "Smart, Seamless, AI-Driven Systems for Future-Ready"
  const subtitleText = "Dining Modern Restaurants"
  const words = headingText.split(" ")
  const subtitleWords = subtitleText.split(" ")

  return (
    <section className="bg-black text-white">
      <div className="mx-auto max-w-8xl px-4 lg:px-16 py-10 md:py-28">
        <div className="flex flex-col items-center gap-16 lg:flex-row lg:items-center lg:justify-between">
          {/* Left: 3-image grid (top spans 2 cols) */}
          <div className="w-full lg:max-w-2xl">
            <div className="grid grid-cols-2 gap-3 md:gap-3">
              {/* Top wide card */}
              <div className="col-span-2 overflow-hidden rounded-2xl bg-neutral-100">
                <img
                  src="d1.png"
                  alt="Smiling person wearing a green VR headset"
                  className="h-full w-full object-cover"
                  loading="eager"
                />
              </div>

              {/* Bottom-left small card */}
              <div className="overflow-hidden rounded-2xl bg-neutral-100">
                <img
                  src="d2.png"
                  alt="Minimal green 3D shape above pedestal"
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>

              {/* Bottom-right small card */}
              <div className="overflow-hidden rounded-2xl bg-neutral-100">
                <img
                  src="d3.png"
                  alt="Chef holding a plated dish"
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>
          </div>

          {/* Right: Text block */}
          <div className="w-full lg:max-w-xl">
            <h1 ref={containerRef} className="text-pretty font-semibold leading-tighter text-white text-4xl md:text-[2.6rem]">
              {words.map((word, index) => {
                const start = index / (words.length + subtitleWords.length)
                const end = start + (1 / (words.length + subtitleWords.length))
                return (
                  <Word 
                    key={index} 
                    progress={scrollYProgress} 
                    range={[start, end]}
                  >
                    {word}
                  </Word>
                )
              })}
              <br />
              <span className="text-neutral-400">
                {subtitleWords.map((word, index) => {
                  const totalWords = words.length + subtitleWords.length
                  const start = (words.length + index) / totalWords
                  const end = start + (1 / totalWords)
                  return (
                    <Word 
                      key={`subtitle_${index}`} 
                      progress={scrollYProgress} 
                      range={[start, end]}
                    >
                      {word}
                    </Word>
                  )
                })}
              </span>
            </h1>

            <div className="mt-8">
              <button
                type="button"
                className="inline-flex items-center rounded-full bg-white px-5 py-2.5 text-sm font-medium text-black shadow-sm ring-1 ring-white/10 transition hover:shadow-md focus:outline-none focus:ring-2 focus:ring-white"
              >
                Book a Demo
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
