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

  // Floating animation for f1 and f2 (desktop only)
  useEffect(() => {
    const f1 = document.getElementById("f1-float")
    const f2 = document.getElementById("f2-float")
    let frame: number
    let mouseX = 0,
      mouseY = 0
    const f1Base = { x: 0, y: 0 }
    const f2Base = { x: 0, y: 0 }

    function animate() {
      if (f1) {
        const floatX = Math.sin(Date.now() / 1200) * 10 + (mouseX - window.innerWidth / 2) * 0.01
        const floatY = Math.cos(Date.now() / 1500) * 8 + (mouseY - window.innerHeight / 2) * 0.01
        f1.style.transform = `translate(${f1Base.x + floatX}px, ${f1Base.y + floatY}px)`
      }
      if (f2) {
        const floatX = Math.cos(Date.now() / 1000) * 10 + (mouseX - window.innerWidth / 2) * -0.01
        const floatY = Math.sin(Date.now() / 1300) * 8 + (mouseY - window.innerHeight / 2) * 0.01
        f2.style.transform = `translate(${f2Base.x + floatX}px, ${f2Base.y + floatY}px)`
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

  // Parallax effect for f1 and f2 (desktop only)
  useEffect(() => {
    const f1 = document.getElementById("f1-float")
    const f2 = document.getElementById("f2-float")
    function onScroll() {
      const scrollY = window.scrollY
      if (f1) {
        f1.style.transform += ` translateY(${scrollY * 0.08}px)`
      }
      if (f2) {
        f2.style.transform += ` translateY(${scrollY * 0.12}px)`
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
            className="flex-shrink-0 -translate-x-16"
          >
            <img src="/f1.png" alt="FOOGO Float Image 1" className="w-60 h-60 sm:w-60 sm:h-60 object-contain" />
          </motion.div>
          <motion.div
            ref={f2Ref}
            id="f2-mobile"
            initial={{ y: -50, opacity: 0 }}
            animate={f2InView ? { y: 0, opacity: 1, transition: { duration: 0.8, delay: 0.2, ease: [0.33, 1, 0.68, 1] } } : {}}
            className="flex-shrink-0 translate-x-16"
          >
            <img src="/f2.png" alt="FOOGO Float Image 2" className="w-60 h-60 sm:w-60 sm:h-60 object-contain" />
          </motion.div>
          <motion.div
            ref={f3Ref}
            id="f3-mobile"
            initial={{ y: -50, opacity: 0 }}
            animate={f3InView ? { y: 0, opacity: 1, transition: { duration: 0.8, delay: 0.4, ease: [0.33, 1, 0.68, 1] } } : {}}
            className="flex-shrink-0 -translate-x-16"
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
          className="right-0 overflow-x-hidden transform translate-x-50 -translate-y-60 z-6"
        >
          <img src="/f1.png" alt="FOOGO Float Image 1" className="w-90 h-90 object-contain" />
        </motion.div>
        <motion.div
          ref={f2DesktopRef}
          id="f2-float"
          initial={{ x: 150, opacity: 0 }}
          animate={f2DesktopInView ? { x: 0, opacity: 1, transition: { duration: 1.1, ease: [0.33, 1, 0.68, 1] } } : {}}
          className="right-0 transform translate-x-120 -translate-y-35 z-6"
        >
          <img src="/f2.png" alt="FOOGO Float Image 2" className="w-90 h-90 object-contain" />
        </motion.div>
      </div>
    </>
  )
}
