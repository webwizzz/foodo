"use client"

import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import MenuButton from './MenuButton'
import Nav from './Nav'

const menu = {
  open: {
    width: "min(480px, 90vw)",
    height: "min(650px, 85vh)",
    top: "-25px",
    right: "-25px",
    transition: { duration: 0.75, type: "tween" as const, ease: [0.76, 0, 0.24, 1] as [number, number, number, number]}
  },
  closed: {
    width: "100px",
    height: "40px",
    top: "0px",
    right: "0px",
    transition: { duration: 0.75, delay: 0.35, type: "tween" as const, ease: [0.76, 0, 0.24, 1] as [number, number, number, number]}
  }
}

export default function SidebarMenu() {
  const [isActive, setIsActive] = useState(false)

  return (
    <div className="fixed right-6 top-6 lg:right-12 lg:top-12 z-40">
      <motion.div 
        className="bg-lime-400 rounded-3xl relative"
        variants={menu}
        animate={isActive ? "open" : "closed"}
        initial="closed"
      >
        <AnimatePresence>
          {isActive && <Nav />}
        </AnimatePresence>
      </motion.div>
      <MenuButton isActive={isActive} toggleMenu={() => setIsActive(!isActive)} />
    </div>
  )
}
