"use client"

import { motion, useInView } from "framer-motion"
import { useEffect, useRef } from "react"

export default function FloatingImages() {
  const f1Ref = useRef<HTMLDivElement>(null)
  const f2Ref = useRef<HTMLDivElement>(null)
  const f3Ref = useRef<HTMLDivElement>(null)
  const f1DesktopRef = useRef<HTMLDivElement>(null)
  const f2DesktopRef = useRef<HTMLDivElement>(null)

  const f1InView = useInView(f1Ref, { once: true, margin: "0px 0px -40% 0px" })
  const f2InView = useInView(f2Ref, { once: true, margin: "0px 0px -40% 0px" })
  const f3InView = useInView(f3Ref, { once: true, margin: "0px 0px -40% 0px" })
  const f1DesktopInView = useInView(f1DesktopRef, { once: true, margin: "0px 0px -40% 0px" })
  const f2DesktopInView = useInView(f2DesktopRef, { once: true, margin: "0px 0px -40% 0px" })

  // Slow and smooth floating animation for desktop
  useEffect(() => {
    const f1 = document.getElementById("f1-float")
    const f2 = document.getElementById("f2-float")
    let frame: number
    let mouseX = 0,
      mouseY = 0
    const f1Base = { x: 0, y: 0 }
    const f2Base = { x: 0, y: 0 }
    
    // Random offset seeds for more variation
    const f1Seed = Math.random() * 1000
    const f2Seed = Math.random() * 1000

    function animate() {
      const time = Date.now()
      
      if (f1) {
        // Slow, gentle multi-layered movement with longer periods
        const floatX = Math.sin((time + f1Seed) / 3000) * 12 + 
                      Math.cos((time + f1Seed) / 4500) * 8 + 
                      (mouseX - window.innerWidth / 2) * 0.015
        const floatY = Math.cos((time + f1Seed) / 3500) * 10 + 
                      Math.sin((time + f1Seed) / 5000) * 6 + 
                      (mouseY - window.innerHeight / 2) * 0.015
        const scale = 1 + Math.sin((time + f1Seed) / 6000) * 0.015 + 
                      Math.cos((time + f1Seed) / 7500) * 0.01
        const rot = Math.sin((time + f1Seed) / 8000) * 1.2 + 
                    Math.cos((time + f1Seed) / 9500) * 0.8
        f1.style.transform = `translate(${f1Base.x + floatX}px, ${f1Base.y + floatY}px) scale(${scale}) rotate(${rot}deg)`
      }
      
      if (f2) {
        // Different slow patterns for f2
        const floatX = Math.cos((time + f2Seed) / 2800) * 10 + 
                      Math.sin((time + f2Seed) / 4200) * 9 + 
                      (mouseX - window.innerWidth / 2) * -0.015
        const floatY = Math.sin((time + f2Seed) / 3200) * 8 + 
                      Math.cos((time + f2Seed) / 4800) * 7 + 
                      (mouseY - window.innerHeight / 2) * 0.015
        const scale = 1 + Math.cos((time + f2Seed) / 5500) * 0.012 + 
                      Math.sin((time + f2Seed) / 7000) * 0.008
        const rot = Math.cos((time + f2Seed) / 7500) * -1 + 
                    Math.sin((time + f2Seed) / 9000) * -0.6
        f2.style.transform = `translate(${f2Base.x + floatX}px, ${f2Base.y + floatY}px) scale(${scale}) rotate(${rot}deg)`
      }
      
      frame = requestAnimationFrame(animate)
    }
    
    function onMouseMove(e: MouseEvent) {
      mouseX = e.clientX
      mouseY = e.clientY
    }
    
    window.addEventListener("mousemove", onMouseMove)
    frame = requestAnimationFrame(animate)
    
    return () => {
      window.removeEventListener("mousemove", onMouseMove)
      cancelAnimationFrame(frame)
    }
  }, [])

  // Gentle parallax effect for all images
  useEffect(() => {
    const f1Desktop = document.getElementById("f1-float")
    const f2Desktop = document.getElementById("f2-float")
    const f1Mobile = document.getElementById("f1-mobile")
    const f2Mobile = document.getElementById("f2-mobile")
    const f3Mobile = document.getElementById("f3-mobile")
    
    function onScroll() {
      const scrollY = window.scrollY
      
      // Gentle desktop parallax
      if (f1Desktop) {
        const currentTransform = f1Desktop.style.transform || ''
        f1Desktop.style.transform = currentTransform.replace(/translateY\([^)]*\)/g, '') + ` translateY(${scrollY * 0.06}px)`
      }
      if (f2Desktop) {
        const currentTransform = f2Desktop.style.transform || ''
        f2Desktop.style.transform = currentTransform.replace(/translateY\([^)]*\)/g, '') + ` translateY(${scrollY * 0.08}px)`
      }
      
      // Subtle mobile parallax
      if (f1Mobile) {
        f1Mobile.style.transform = `translateY(${scrollY * 0.04}px)`
      }
      if (f2Mobile) {
        f2Mobile.style.transform = `translateY(${scrollY * -0.03}px)`
      }
      if (f3Mobile) {
        f3Mobile.style.transform = `translateY(${scrollY * 0.05}px)`
      }
    }
    
    window.addEventListener("scroll", onScroll)
    return () => {
      window.removeEventListener("scroll", onScroll)
    }
  }, [])

  return (
    <>
      {/* Mobile/Small screens: Stack images in a column */}
      <div className="block md:hidden">
        <div className="flex flex-col justify-center items-center gap-6 px-4 py-8">
          <motion.div
            ref={f1Ref}
            id="f1-mobile"
            initial={{ y: -50, opacity: 0 }}
              animate={f1InView ? { y: 0, opacity: 1, transition: { duration: 0.8, ease: [0.33, 1, 0.68, 1] } } : {}}
              className="flex-shrink-0 -translate-x-16 float-more"
              style={{ animationDelay: '0s' }}
          >
            <img src="/f1.png" alt="FOOGO Float Image 1" className="w-60 h-60 sm:w-60 sm:h-60 object-contain" />
          </motion.div>
          <motion.div
            ref={f2Ref}
            id="f2-mobile"
            initial={{ y: -50, opacity: 0 }}
            animate={f2InView ? { y: 0, opacity: 1, transition: { duration: 0.8, delay: 0.2, ease: [0.33, 1, 0.68, 1] } } : {}}
            className="flex-shrink-0 translate-x-16 float-more"
            style={{ animationDelay: '4s' }}
          >
            <img src="/f2.png" alt="FOOGO Float Image 2" className="w-60 h-60 sm:w-60 sm:h-60 object-contain" />
          </motion.div>
          <motion.div
            ref={f3Ref}
            id="f3-mobile"
            initial={{ y: -50, opacity: 0 }}
            animate={f3InView ? { y: 0, opacity: 1, transition: { duration: 0.8, delay: 0.4, ease: [0.33, 1, 0.68, 1] } } : {}}
            className="flex-shrink-0 -translate-x-16 float-more"
            style={{ animationDelay: '8s' }}
          >
            <img src="/f3.png" alt="FOOGO Float Image 3" className="w-60 h-60 sm:w-60 sm:h-60 object-contain" />
          </motion.div>
        </div>
      </div>

      {/* Desktop/Large screens: Floating positioned images */}
      <div className="hidden md:block">
        <motion.div
          ref={f1DesktopRef}
          id="f1-float"
          initial={{ x: -150, opacity: 0 }}
          animate={f1DesktopInView ? { x: 0, opacity: 1, transition: { duration: 1.1, ease: [0.33, 1, 0.68, 1] } } : {}}
          className="right-0 overflow-x-hidden transform translate-x-50 -translate-y-60 z-6 float-desktop"
          style={{ animationDelay: '2s' }}
        >
          <img src="/f1.png" alt="FOOGO Float Image 1" className="w-90 h-90 object-contain" />
        </motion.div>
        <motion.div
          ref={f2DesktopRef}
          id="f2-float"
          initial={{ x: 150, opacity: 0 }}
          animate={f2DesktopInView ? { x: 0, opacity: 1, transition: { duration: 1.1, ease: [0.33, 1, 0.68, 1] } } : {}}
          className="right-0 transform translate-x-120 -translate-y-35 z-6 float-desktop"
          style={{ animationDelay: '7s' }}
        >
          <img src="/f2.png" alt="FOOGO Float Image 2" className="w-90 h-90 object-contain" />
        </motion.div>
      </div>
    </>
  )
}
