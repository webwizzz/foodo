"use client"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { motion, useAnimation, useInView } from "framer-motion"
import Image from "next/image"
import { useEffect, useRef } from "react"

type CardProps = {
  src: string
  alt: string
  className?: string
}

/*
Color system (max 5):
- Primary: emerald-600
- Neutrals: black, white, gray-300
This keeps contrast high and accessible.
*/

const leftColumn = [
  { src: "/la.png", alt: "Promo visual 1" },
  { src: "/lb.png", alt: "Promo visual 2" },
  { src: "/lc.png", alt: "Promo visual 3" },
]

const rightColumn = [
  { src: "/ra.png", alt: "Promo visual 4" },
  { src: "/lb.png", alt: "Promo visual 5" },
  { src: "/lc.png", alt: "Promo visual 6" },
]

const columnVariants = {
  off: {},
  on: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.05,
    },
  },
}

const cardFrom = (dir: "left" | "right") => ({
  off: { opacity: 0, x: dir === "left" ? -64 : 64, filter: "blur(6px)" },
  on: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: {
      type: "spring" as const,
      stiffness: 130,
      damping: 18,
      mass: 0.6,
    },
  },
})

const textVariants = {
  off: { opacity: 0, y: 28, scale: 0.97 },
  on: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring" as const,
      stiffness: 150,
      damping: 18,
    },
  },
}

function Card({ src, alt, className }: CardProps) {
  return (
    <div
      className={cn(
        "relative w-full overflow-hidden rounded-2xl bg-black/40",
        "shadow-[0_12px_40px_-8px_rgba(0,0,0,0.6)]",
        className,
      )}
    >
      <Image
        src={src || "/placeholder.svg"}
        alt={alt}
        width={140}
        height={480}
        className="h-full w-full object-contain md:h-64"
        priority={false}
      />
    </div>
  )
}

function MarqueeColumn({
  items,
  direction = "up",
  isActive,
  duration = 20,
}: {
  items: { src: string; alt: string }[]
  direction?: "up" | "down"
  isActive: boolean
  duration?: number
}) {
  const controls = useAnimation()

  useEffect(() => {
    if (isActive) {
      controls.start({
        y: direction === "up" ? ["0%", "-50%"] : ["-50%", "0%"],
        transition: { duration, ease: "linear", repeat: Number.POSITIVE_INFINITY },
      })
    } else {
      controls.stop()
    }
  }, [isActive, direction, duration, controls])

  const doubled = [...items, ...items]

  return (
    <div className="relative h-[820px] overflow-hidden md:h-[860px]">
      <motion.div className="absolute inset-x-0 top-0 flex flex-col gap-6 will-change-transform" animate={controls}>
        {doubled.map((img, i) => (
          <Card key={`marquee-${i}-${img.alt}`} src={img.src} alt={img.alt} />
        ))}
      </motion.div>
      {/* subtle gradient masks for nicer edges */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-black to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black to-transparent" />
    </div>
  )
}

function MarqueeRow({
  items,
  direction = "left",
  isActive,
  duration = 18,
}: {
  items: { src: string; alt: string }[]
  direction?: "left" | "right"
  isActive: boolean
  duration?: number
}) {
  const controls = useAnimation()

  useEffect(() => {
    if (isActive) {
      controls.start({
        x: direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"],
        transition: { duration, ease: "linear", repeat: Number.POSITIVE_INFINITY },
      })
    } else {
      controls.stop()
    }
  }, [isActive, direction, duration, controls])

  const doubled = [...items, ...items]

  return (
    <div className="relative h-36 w-full overflow-hidden">
      <motion.div
        className="absolute inset-y-0 left-0 flex w-[200%] items-stretch gap-4 will-change-transform"
        animate={controls}
      >
        {doubled.map((img, i) => (
          <div key={`hmarquee-${i}-${img.alt}`} className="w-44 flex-none">
            <Card src={img.src} alt={img.alt} className="h-28" />
          </div>
        ))}
      </motion.div>

      {/* gradient masks at edges */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-black to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-black to-transparent" />
    </div>
  )
}

export function SocialPromotionsSection() {
  const leftRef = useRef<HTMLDivElement>(null)
  const rightRef = useRef<HTMLDivElement>(null)
  const centerRef = useRef<HTMLDivElement>(null)
  const mobileTopRef = useRef<HTMLDivElement>(null)
  const mobileBottomRef = useRef<HTMLDivElement>(null)

  const leftInView = useInView(leftRef, { amount: 0.35 })
  const rightInView = useInView(rightRef, { amount: 0.35 })
  const centerInView = useInView(centerRef, { amount: 0.5 })
  const mobileTopInView = useInView(mobileTopRef, { amount: 0.3 })
  const mobileBottomInView = useInView(mobileBottomRef, { amount: 0.3 })

  return (
    <section className="relative bg-black text-white" aria-labelledby="social-promotions-heading">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-4 py-24 md:grid-cols-3 md:gap-8 lg:py-28">
        {/* Left column (md+) */}
        <motion.div
          ref={leftRef}
          initial="off"
          animate={leftInView ? "on" : "off"}
          variants={cardFrom("left")}
          className="hidden md:block"
        >
          <MarqueeColumn items={leftColumn} direction="up" isActive={leftInView} duration={22} />
        </motion.div>

        {/* Mobile top marquee (sm only) */}
        <motion.div
          ref={mobileTopRef}
          initial="off"
          animate={mobileTopInView ? "on" : "off"}
          variants={cardFrom("left")}
          className="md:hidden"
        >
          <MarqueeRow items={leftColumn} direction="left" isActive={mobileTopInView} duration={18} />
        </motion.div>

        {/* Center text block */}
        <motion.div
          ref={centerRef}
          initial="off"
          animate={centerInView ? "on" : "off"}
          variants={textVariants}
          className="text-center"
        >
          <h2
            id="social-promotions-heading"
            className="text-pretty font-sans text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl"
          >
            Social Media & Promotions
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-balance text-sm/6 text-gray-300 sm:text-base/7">
            Stay connected with the pulse of your brand. From menu reveals to behind‑the‑scenes innovation, follow along
            as we blend food, tech, and design across every platform.
          </p>
          <div className="mt-6 flex items-center justify-center gap-3">
            <Button className="rounded-full bg-emerald-600 px-5 text-white hover:bg-emerald-500">Get Started</Button>
            <Button className="rounded-full bg-white/5 px-5 text-white hover:bg-white/10">Book a Demo</Button>
          </div>
        </motion.div>

        {/* Right column (md+) */}
        <motion.div
          ref={rightRef}
          initial="off"
          animate={rightInView ? "on" : "off"}
          variants={cardFrom("right")}
          className="hidden md:block"
        >
          <MarqueeColumn items={rightColumn} direction="down" isActive={rightInView} duration={24} />
        </motion.div>

        {/* Mobile bottom marquee (sm only) */}
        <motion.div
          ref={mobileBottomRef}
          initial="off"
          animate={mobileBottomInView ? "on" : "off"}
          variants={cardFrom("right")}
          className="md:hidden"
        >
          <MarqueeRow items={rightColumn} direction="right" isActive={mobileBottomInView} duration={20} />
        </motion.div>
      </div>
    </section>
  )
}

export default SocialPromotionsSection
