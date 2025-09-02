"use client"

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export function Expfood({
  className,
}: {
  className?: string
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "0px 0px -30% 0px" });

  // Split the paragraph into phrases for staggered animation
  const textPhrases = [
    "Elevate customer experiences and boost sales with AI and AR.",
    "Upgrade your dining space with the future of innovation today.",
    "Simplify tasks from ordering to inventory management, reducing",
    "errors and enhancing service speed."
  ];

  return (
    <section
      ref={sectionRef}
      className={`w-full bg-black text-white${className ? ` ${className}` : ''}`}
      aria-label="Experience Food"
    >
      <div className="pl-6 sm:pl-10 md:pl-16 lg:pl-40 max-w-3xl">
        {/* Headline Animation */}
        <motion.h2
          initial={{ y: 50, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-balance font-Matter text-[#F3F0F0] font-semibold text-4xl md:text-5xl lg:text-6xl tracking-tight"
        >
          Experience Food
        </motion.h2>

        {/* Supporting paragraph with staggered animation */}
        <div className="mt-8">
          {textPhrases.map((phrase, index) => (
            <motion.p
              key={index}
              initial={{ y: 30, opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
              transition={{
                duration: 0.6,
                delay: 0.3 + (index * 0.1),
                ease: "easeOut"
              }}
              className="text-pretty font-matter text-[#C3C3C3]0 text-lg md:text-xl leading-tight"
            >
              {phrase}
            </motion.p>
          ))}
        </div>
      </div>
    </section>
  )
}
