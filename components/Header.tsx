"use client"

import { Button } from "@/components/ui/button"
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient"
import { motion } from "framer-motion"
import Image from "next/image"
import { useEffect, useState } from "react"
import SidebarMenu from "./Header/SidebarMenu"

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      setIsScrolled(scrollTop > 10)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Enhanced smooth scroll function with easing
  const smoothScrollTo = (targetId: string) => {
    const targetElement = document.getElementById(targetId)
    if (targetElement) {
      const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - 80 // Account for header height
      
      // Use requestAnimationFrame for smoother scrolling
      const startPosition = window.pageYOffset
      const distance = targetPosition - startPosition
      const duration = Math.min(Math.abs(distance) / 2, 1000) // Max 1 second
      let startTime: number | null = null

      function easeInOutCubic(t: number): number {
        return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1
      }

      function animation(currentTime: number) {
        if (startTime === null) startTime = currentTime
        const timeElapsed = currentTime - startTime
        const progress = Math.min(timeElapsed / duration, 1)
        
        window.scrollTo(0, startPosition + distance * easeInOutCubic(progress))
        
        if (progress < 1) {
          requestAnimationFrame(animation)
        }
      }

      requestAnimationFrame(animation)
    }
  }

  return (
    <header 
      className={`
        flex items-center justify-between px-8 py-4 lg:px-16 
        fixed top-0 left-0 right-0 z-50 font-matter
        transition-all duration-300 ease-in-out
        ${isScrolled 
          ? 'bg-black/50 backdrop-blur-lg border-b border-white/10 shadow-lg' 
          : 'bg-transparent'
        }
      `}
    >
      {/* Logo */}
      <div className="flex items-center">
        <Image
          src="/logo.svg"
          alt="Foodo Logo"
          width={120}
          height={40}
          className="h-8 w-auto sm:h-10"
          priority
        />
      </div>

      {/* Navigation Menu - Hidden on mobile, visible on md+ */}
      <nav className="hidden  md:flex pl-48  items-center space-x-10">
        <motion.button
          onClick={() => smoothScrollTo('whyfoodo-section')}
          className="text-[#B4B4B4] hover:text-white transition-colors font-light text-md cursor-pointer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Product
        </motion.button>
        <motion.button
          onClick={() => smoothScrollTo('shard-section')}
          className="text-[#B4B4B4] hover:text-white transition-colors font-light text-md cursor-pointer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          How it Works
        </motion.button>
        <motion.button
          onClick={() => smoothScrollTo('pricing-section')}
          className="text-[#B4B4B4] hover:text-white transition-colors font-light text-md cursor-pointer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Pricing
        </motion.button>
        <motion.button
          onClick={() => smoothScrollTo('contact-section')}
          className="text-[#B4B4B4] hover:text-white transition-colors font-light text-md cursor-pointer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Company
        </motion.button>
      </nav>

      {/* Action Buttons - Hidden on mobile, visible on md+ */}
      <div className="hidden md:flex items-center space-x-4">
        <HoverBorderGradient
          as="a"
          containerClassName="rounded-full"
          className="px-3 py-1 text-sm font-medium"
        >
          Get Started
        </HoverBorderGradient>
        <Button className="bg-white text-black hover:bg-gray-100 rounded-full px-3 py-1 font-medium">Book a Demo</Button>
      </div>

      {/* Mobile Sidebar Menu - Visible on mobile, hidden on md+ */}
      <div className="md:hidden">
        <SidebarMenu />
      </div>
    </header>
  )
}
