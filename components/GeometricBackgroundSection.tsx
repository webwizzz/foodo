"use client"

import { motion, useInView } from "framer-motion"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useEffect, useRef } from "react"

export default function GeometricBackgroundSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const wordsRef = useRef<(HTMLSpanElement | null)[]>([])
  const containerRef = useRef<HTMLDivElement>(null)
  const scanningBeamRef = useRef<HTMLImageElement>(null)
  const scannerRef = useRef<HTMLDivElement>(null)
  const qrRef = useRef<HTMLDivElement>(null)
  const qrMobileRef = useRef<HTMLDivElement>(null)

  const text =
    "Elevate customer experiences and boost sales with AI and AR. Upgrade your dining space with the future of innovation today. Simplify tasks from ordering to inventory management, reducing errors and enhancing service speed."
  const words = text.split(" ")

  const scannerInView = useInView(scannerRef, { once: true, margin: "0px 0px -40% 0px" })
  const qrInView = useInView(qrRef, { once: true, margin: "0px 0px -40% 0px" })
  const qrMobileInView = useInView(qrMobileRef, { once: true, margin: "0px 0px -40% 0px" })

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    createAnimation()
    createScanningBeamAnimation()
  }, [])

  const createAnimation = () => {
    gsap.to(wordsRef.current, {
      scrollTrigger: {
        trigger: containerRef.current,
        scrub: true,
        start: "top bottom",
        end: `+=${window.innerHeight / 1}`,
      },
      opacity: 1,
      ease: "none",
      stagger: 0.1,
    })
  }

  const createScanningBeamAnimation = () => {
    if (scanningBeamRef.current) {
      gsap.set(scanningBeamRef.current, {
        opacity: 0,
        clipPath: "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)",
      })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "top 20%",
          onEnter: () => {
            gsap.to(scanningBeamRef.current, {
              opacity: 1,
              clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
              duration: 2,
              ease: "power2.out",
            })
          },
          onLeaveBack: () => {
            gsap.to(scanningBeamRef.current, {
              opacity: 1,
              clipPath: "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)",
              duration: 2,
              ease: "power2.in",
              onComplete: () => {
                gsap.set(scanningBeamRef.current, { opacity: 0 })
              },
            })
          },
        },
      })

      gsap.to(scanningBeamRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
          end: "bottom top",
          toggleActions: "play none none reverse",
        },
        filter: "brightness(1.2) drop-shadow(0 0 20px rgba(163, 230, 53, 0.5))",
        duration: 1,
        ease: "sine.inOut",
      })
    }
  }

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen lg:min-h-[280vh] py-2 lg:py-32  flex items-center justify-start"
    >
      {/* Background image - only visible on large screens */}
      <div 
        className="absolute inset-0 hidden lg:block bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/foogo-qr-background.png')`,
        }}
      />
      
      {/* Mobile images - only visible on small screens */}
      <div className="absolute top-16 left-0 right-0 z-10 lg:hidden">
        {/* Scanner attached to left edge of screen */}
        <motion.div
          initial={{ x: -100, opacity: 0, scale: 0.8 }}
          animate={{ x: 0, opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.33, 1, 0.68, 1] }}
          className="absolute left-0 top-0"
        >
          <img
            src="/smallscnanner.png"
            alt="QR Scanner"
            className="w-full h-full  object-contain drop-shadow-lg"
          />
        </motion.div>
        
        {/* Phone attached to right edge of screen */}
        <motion.div
          initial={{ x: 100, opacity: 0, scale: 0.8 }}
          animate={{ x: 0, opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.2, ease: [0.33, 1, 0.68, 1] }}
          className="absolute -right-10 -top-20"
        >
          <img
            src="/ScanBeam.png"
            alt="Phone scanning"
            className="w-full h-full  object-contain drop-shadow-lg"
          />
        </motion.div>
        
        {/* Scanning effect line connecting the two devices */}
       
        
        {/* Scanning pulse effect in the center */}

      </div>
      
      {/* Content */}
      <div className="relative z-10 max-w-2xl px-6 text-left ml-0 pt-44 lg:pt-2 lg:ml-30 mt-40 lg:mt-125">
        <div ref={containerRef} className="text-3xl sm:text-2xl lg:text-4xl font-normal leading-snug lg:leading-tighter tracking-tighter text-balance">
          {words.map((word, index) => (
            <span
              key={index}
              ref={(el) => {
                wordsRef.current[index] = el
              }}
              className={`inline-block mr-2 lg:mr-3 opacity-30 ${word === "today." ? "text-lime-400" : ""}`}
            >
              {word}
            </span>
          ))}
        </div>
        
        {/* S2 image after text on mobile */}
        <motion.div
          ref={qrMobileRef}
          initial={{ y: 50, opacity: 0 }}
          animate={qrMobileInView ? { y: 0, opacity: 1, transition: { duration: 1.2, ease: [0.33, 1, 0.68, 1] } } : {}}
          className="flex lg:hidden mt-12 justify-center"
        >
          <img src="/s2.png" alt="FOOGO QR Scanner" className="w-[80%] h-[80%] object-contain" />
        </motion.div>
      </div>

      {/* Enhanced positioning for animated scanning beam - only visible on large screens */}
      <motion.div
        ref={scannerRef}
        initial={{ x: -200, opacity: 0 }}
        animate={scannerInView ? { x: 0, opacity: 1, transition: { duration: 1.2, ease: [0.33, 1, 0.68, 1] } } : {}}
        className="absolute left-1/2 top-0 transform -translate-x-80 translate-y-30 z-5 hidden lg:block"
      >
        <img
          ref={scanningBeamRef}
          src="/scanning-beam.svg"
          alt="Scanning beam"
          className="w-full h-[482px] object-contain"
        />
      </motion.div>

      <motion.div
        ref={qrRef}
        initial={{ x: 200, opacity: 0 }}
        animate={qrInView ? { x: 0, opacity: 1, transition: { duration: 1.4, ease: [0.33, 1, 0.68, 1] } } : {}}
        className="absolute right-0 bottom-40 transform translate-y-8 z-6 hidden lg:block"
      >
        <img src="/s2.png" alt="FOOGO QR Scanner" className="w-180 h-196 object-contain" />
      </motion.div>
    </section>
  )
}
