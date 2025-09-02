"use client"

import { fadeInUp, scaleIn, useScrollAnimation } from "@/hooks/useScrollAnimation"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

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
  const { ref, controls } = useScrollAnimation()

  if (imageOnly) {
    return (
      <motion.section
        ref={ref}
        initial="hidden"
        animate={controls}
        variants={scaleIn}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className={cn(
          "relative overflow-hidden rounded-[32px] min-h-[28rem] md:min-h-[36rem] lg:min-h-[40rem]",
          isDark ? "bg-neutral-900" : "bg-neutral-200",
          "ring-1",
          isDark ? "ring-white/10" : "ring-black/10",
          "shadow-2xl",
        )}
        aria-hidden="true"
      >
        <motion.img
          src={imageSrc || "/placeholder.svg?height=600&width=600&query=card%20background"}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover object-center pointer-events-none select-none"
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        />
      </motion.section>
    )
  }

  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={fadeInUp}
      transition={{ duration: 0.8, ease: "easeOut" }}
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
      <motion.img
        src={imageSrc || "/placeholder.svg?height=600&width=600&query=card%20background"}
        alt=""
        aria-hidden="true"
        className={cn(
          "absolute inset-0 -z-10 h-full w-full object-cover object-center pointer-events-none select-none",
          isDark ? "opacity-95" : "opacity-100",
        )}
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: isDark ? 0.95 : 1 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
      />

      {/* lighting/vignette overlay above image for contrast */}
      <motion.div
        aria-hidden="true"
        className={cn(
          "absolute inset-0 -z-10",
          isDark
            ? "bg-[radial-gradient(110%_60%_at_20%_10%,rgba(255,255,255,0.08),transparent_60%)]"
            : "bg-[radial-gradient(120%_70%_at_10%_5%,rgba(255,255,255,0.65),transparent_55%)]",
        )}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
      />

      {/* Dark overlay for better text contrast */}
      <motion.div
        aria-hidden="true"
        className="absolute inset-0 -z-5 bg-black/40"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
      />

      {/* content */}
      <div className="relative z-10">
        <motion.p 
          className="text-sm font-medium text-white/80"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.5 }}
        >
          {label}
        </motion.p>

        <motion.h2 
          className="mt-6 text-pretty text-3xl md:text-5xl font-semibold leading-tight"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.6 }}
        >
          {heading}
        </motion.h2>

        <motion.button
          className={cn(
            "mt-8 inline-flex items-center justify-center rounded-full px-5 py-2 text-sm font-medium bg-white text-neutral-900 shadow",
            "focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
            isDark
              ? "focus-visible:ring-white/60 focus-visible:ring-offset-neutral-900"
              : "focus-visible:ring-black/20 focus-visible:ring-offset-neutral-200",
          )}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.8 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {cta}
          <span className="sr-only">{` – ${label}`}</span>
        </motion.button>
      </div>

      {/* bottom-left tag pill (above overlay) */}
      <motion.div
        className={cn(
          "absolute left-6 bottom-6 md:left-8 md:bottom-8 z-20 inline-flex items-center rounded-full px-5 py-2 text-sm font-medium backdrop-blur",
          isDark ? "text-white/90 border border-white/30 bg-white/5" : "text-white border border-white/40 bg-white/10",
        )}
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.7 }}
      >
        {tag}
      </motion.div>
    </motion.section>
  )
}
