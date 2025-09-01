"use client"

import { Button } from "@/components/ui/button"
import { motion } from 'framer-motion'
import { perspective, slideIn } from './anim'
import { footerLinks, links } from './data'

export default function Nav() {
  return (
    <div className="flex flex-col justify-between p-8 lg:p-16 pb-8 lg:pb-12 h-full box-border">
      <div className="flex gap-4 flex-col">
        {links.map((link, i) => {
          const { title, href } = link
          return (
            <div key={`b_${i}`} className="[perspective:120px] [perspective-origin:bottom]">
              <motion.div
                custom={i}
                variants={perspective}
                initial="initial"
                animate="enter"
                exit="exit"
              >
                <a 
                  href={href}
                  className="no-underline text-black text-2xl sm:text-3xl lg:text-4xl font-medium hover:text-gray-700 transition-colors block"
                >
                  {title}
                </a>
              </motion.div>
            </div>
          )
        })}
        
        {/* Action Buttons for Mobile */}
        <motion.div 
          className="flex flex-col gap-3 mt-8"
          variants={perspective}
          custom={links.length}
          initial="initial"
          animate="enter"
          exit="exit"
        >
          <Button className="bg-black text-lime-400 hover:bg-gray-800 rounded-full px-6 py-3 text-sm w-full">
            Book a Demo
          </Button>
          <button className="border-2 border-black text-black hover:bg-black hover:text-lime-400 transition-colors rounded-full px-6 py-3 text-sm font-medium w-full">
            Get Started
          </button>
        </motion.div>
      </div>
      
      <motion.div className="flex flex-wrap">
        {footerLinks.map((link, i) => {
          const { title, href } = link
          return (
            <motion.a 
              href={href}
              variants={slideIn}
              custom={i} 
              initial="initial"
              animate="enter"
              exit="exit"
              key={`f_${i}`}
              className="w-1/2 mt-2 no-underline text-black text-xs sm:text-sm hover:text-gray-700 transition-colors"
            >
              {title}
            </motion.a>
          )
        })}
      </motion.div>
    </div>
  )
}
