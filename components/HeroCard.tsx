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
  smallImageSrc?: string
  imageOnly?: boolean
  overlayContent?: {
    badge: string
    title: string
    description?: string
    buttonText: string
    overlayImage?: string
  }
}

export function HeroCard({ variant = "light", label, heading, cta, tag, imageSrc, smallImageSrc, imageOnly = false, overlayContent }: HeroCardProps) {
  const isDark = variant === "dark"
  const { ref, controls } = useScrollAnimation()

  // Create style object for responsive background images
  const backgroundStyle = smallImageSrc ? {
    '--bg-mobile': `url(${smallImageSrc})`,
    '--bg-desktop': `url(${imageSrc})`,
    backgroundImage: 'var(--bg-mobile)',
  } as React.CSSProperties : {
    backgroundImage: `url(${imageSrc || "/placeholder.svg?height=600&width=600&query=card%20background"})`
  }

  if (imageOnly) {
    return (
      <motion.section
        ref={ref}
        initial="hidden"
        animate={controls}
        variants={scaleIn}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className={cn(
          "relative overflow-hidden rounded-[32px]  min-h-[28rem] md:min-h-[36rem] lg:min-h-[40rem]",
          "bg-cover bg-center bg-no-repeat",
          smallImageSrc && "md:[background-image:var(--bg-desktop)]",
          "ring-1",
          isDark ? "ring-white/10" : "ring-black/10",
          "shadow-2xl",
        )}
        style={backgroundStyle}
        aria-hidden="true"
      >
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
        "relative overflow-hidden rounded-[20px] p-8 md:p-8 min-h-[28rem] md:min-h-[36rem] lg:min-h-[40rem]",
        "bg-cover bg-center bg-no-repeat",
        smallImageSrc && "md:[background-image:var(--bg-desktop)]",
        isDark ? "text-white" : "text-white",
        "ring-1",
        isDark ? "ring-white/10" : "ring-black/10",
        "shadow-2xl",
      )}
      style={backgroundStyle}
      aria-label={heading}
    >
      {/* lighting/vignette overlay above image for contrast */}
 

      {/* Dark overlay for better text contrast */}
      <motion.div
        aria-hidden="true"
        className="absolute inset-0 -z-5 bg-black/40"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
      />

      {/* content */}
      {overlayContent ? (
        /* Overlay content layout */
        <div className="relative z-10 h-full">
          {/* Left side text content */}
          <div className="absolute top-8 left-8 md:left-12 lg:left-16 max-w-lg z-30">
            <div className="mb-4">
              <span className="inline-block px-3 py-1 text-sm font-medium text-white bg-black/20 backdrop-blur-sm rounded-full">
                {overlayContent.badge}
              </span>
            </div>
            <h2 className="text-sm md:text-xl lg:text-2xl font-light font-matter lg:font-semibold text-white mb-4 leading-tighter">
              {overlayContent.title}
            </h2>
            {overlayContent.description && (
              <p className="text-white/80 mb-6 text-sm md:text-base">
                {overlayContent.description}
              </p>
            )}
            <button className="px-6 py-3 bg-white text-black font-medium rounded-full hover:bg-gray-100 transition-colors">
              {overlayContent.buttonText}
            </button>
          </div>
          
          {/* Center bottom overlay image if provided */}
          {overlayContent.overlayImage && (
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 z-30">
              <div className="absolute inset-0 bg-white/10 backdrop-blur-md rounded-lg -z-10"></div>
              <img
                src={overlayContent.overlayImage}
                alt="Overlay content"
                className="w-48 md:w-64 lg:w-80 h-auto object-contain"
                draggable={false}
              />
            </div>
          )}
        </div>
      ) : (
        /* Original content layout */
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
            className="mt-6 text-pretty text-xl md:text-2xl font-matter font-semibold leading-tight"
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
      )}

      {/* bottom-left tag pill (only show for original content) */}
      {!overlayContent && (
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
      )}
    </motion.section>
  )
}
