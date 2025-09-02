"use client"

import { Button } from "@/components/ui/button"
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient"
import { motion } from "framer-motion"

export default function HeroSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  }

  const slideInFromLeft = {
    hidden: { 
      x: -100, 
      opacity: 0 
    },
    visible: {
      x: 0,
      opacity: 1,
    },
  }

  const slideInFromLeftDelayed = {
    hidden: { 
      x: -120, 
      opacity: 0 
    },
    visible: {
      x: 0,
      opacity: 1,
    },
  }

  const fadeInUp = {
    hidden: { 
      y: 50, 
      opacity: 0 
    },
    visible: {
      y: 0,
      opacity: 1,
    },
  }

  const buttonVariants = {
    hidden: { 
      y: 30, 
      opacity: 0 
    },
    visible: {
      y: 0,
      opacity: 1,
    },
  }

  return (
    <motion.main 
      className="flex flex-col overflow-x-hidden items-center justify-center text-center px-6 py-12 lg:py-32"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="max-w-4xl mx-auto">
        {/* Main Heading with split animation */}
        <div className="text-5xl lg:text-6xl font-semibold mb-4 text-[#F3F0F0] font-matter">
          <motion.div
            variants={slideInFromLeft}
            className="overflow-hidden"
            transition={{ duration: 0.8, ease: "easeOut" }}
            data-scroll
            data-scroll-speed="0.5"
          >
            <motion.span 
              className="inline-block"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              AI-Powered
            </motion.span>
          </motion.div>
          <motion.div
            variants={slideInFromLeftDelayed}
            className="overflow-hidden"
            transition={{ duration: 1.0, ease: "easeOut", delay: 0.3 }}
            data-scroll
            data-scroll-speed="0.3"
          >
            <motion.span 
              className="inline-block"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              AR Dining
            </motion.span>
          </motion.div>
        </div>

        {/* Subtitle */}
        <motion.p 
          className="text-lg lg:text-xl text-[#C3C3C3] mb-4 max-w-2xl lg:max-w-3xl mx-auto text-balance leading-tight"
          variants={fadeInUp}
          transition={{ duration: 0.8, ease: "easeOut" }}
          data-scroll
          data-scroll-speed="0.2"
        >
          Simplify tasks from ordering to inventory management
          reducing errors and enhancing service speed.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div 
          className="flex flex-row sm:flex-row items-center justify-center gap-4"
          variants={containerVariants}
          data-scroll
          data-scroll-speed="0.1"
        >
          <motion.div 
            variants={buttonVariants}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <Button className="bg-white text-black hover:bg-gray-100 rounded-full px-8 py-3 text-sm font-matter">
              Book a Demo
            </Button>
          </motion.div>
          <motion.div 
            variants={buttonVariants}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
          >
            <HoverBorderGradient
              as="a"
              containerClassName="rounded-full"
              className="px-6 py-2 text-sm font-medium font-matter"
            >
              Get Started
            </HoverBorderGradient>
          </motion.div>
        </motion.div>
      </div>
    </motion.main>
  )
}
