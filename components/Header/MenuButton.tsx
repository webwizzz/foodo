"use client"

import { motion } from 'framer-motion'

interface ButtonProps {
  isActive: boolean
  toggleMenu: () => void
}

export default function MenuButton({ isActive, toggleMenu }: ButtonProps) {
  return (
    <div className="fixed top-6 right-6 lg:top-12 lg:right-12 z-50">
      <div className="relative w-24 h-10 cursor-pointer rounded-full overflow-hidden">
        <motion.div 
          className="relative w-full h-full"
          animate={{ top: isActive ? "-100%" : "0%" }}
          transition={{ duration: 0.5, type: "tween" as const, ease: [0.76, 0, 0.24, 1] as [number, number, number, number] }}
        >
          <div 
            className="w-full h-full bg-lime-400 flex items-center justify-center group"
            onClick={toggleMenu}
          >
            <PerspectiveText label="Menu" />
          </div>
          <div 
            className="w-full h-full bg-black flex items-center justify-center group"
            onClick={toggleMenu}
          >
            <PerspectiveText label="Close" />
          </div>
        </motion.div>
      </div>
    </div>
  )
}

function PerspectiveText({ label }: { label: string }) {
  return (    
    <div className="flex flex-col justify-center items-center h-full w-full [transform-style:preserve-3d] transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:[transform:rotateX(90deg)]">
      <p className="m-0 text-sm font-medium uppercase text-black transition-all duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] pointer-events-none group-hover:[-translate-y-full] group-hover:opacity-0">
        {label}
      </p>
      <p className="m-0 text-sm font-medium uppercase text-lime-400 transition-all duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] pointer-events-none absolute [transform-origin:bottom_center] [-rotate-x-90] [transform:rotateX(-90deg)_translateY(9px)] opacity-0 group-hover:opacity-100">
        {label}
      </p>
    </div>
  )
}
