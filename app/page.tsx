"use client"

import Carousel from "@/components/Carousel"
import Clients from "@/components/Clients"
import { Demo } from "@/components/Demo"
import { Expfood } from "@/components/Expfood"
import { HeroCard } from "@/components/HeroCard"
import { Mockup } from "@/components/Mockup"
import ShardBackgroundSection from "@/components/ShardBackgroundSection"
import StatsSection from "@/components/StatsSection"
import { Button } from "@/components/ui/button"
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient"
import VideoSection from "@/components/VideoSection"
import WhyFoodoSection from "@/components/WhyFoodoSection"
import { motion, useInView } from "framer-motion"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useEffect, useRef } from "react"

export default function HomePage() {
  const sectionRef = useRef<HTMLElement>(null)
  const wordsRef = useRef<(HTMLSpanElement | null)[]>([])
  const containerRef = useRef<HTMLDivElement>(null)
  const scanningBeamRef = useRef<HTMLImageElement>(null)
  const scannerRef = useRef<HTMLDivElement>(null)
  const f1Ref = useRef<HTMLDivElement>(null)
  const f2Ref = useRef<HTMLDivElement>(null)
  const qrRef = useRef<HTMLDivElement>(null)
  // Smooth scroll refs
  const smoothWrapperRef = useRef<HTMLDivElement>(null)
  const smoothContentRef = useRef<HTMLDivElement>(null)

  const text =
    "Elevate customer experiences and boost sales with AI and AR. Upgrade your dining space with the future of innovation today. Simplify tasks from ordering to inventory management, reducing errors and enhancing service speed."
  const words = text.split(" ")

  const scannerInView = useInView(scannerRef, { once: true, margin: "0px 0px -40% 0px" })
  const f1InView = useInView(f1Ref, { once: true, margin: "0px 0px -40% 0px" })
  const f2InView = useInView(f2Ref, { once: true, margin: "0px 0px -40% 0px" })
  const qrInView = useInView(qrRef, { once: true, margin: "0px 0px -40% 0px" })

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    createAnimation()
    createScanningBeamAnimation()
  }, [])

  // Custom GSAP smooth scroll effect (Locomotive-like) - REMOVED, use native scroll everywhere

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

  // Floating animation for f1 and f2
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
  // Parallax effect for f1 and f2
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
  <div ref={smoothWrapperRef} className="min-h-screen overflow-x-clip bg-black text-white font-sans">
      <div ref={smoothContentRef}>
        {/* Navigation Header */}
        <header className="flex items-center justify-between px-6 py-4 lg:px-12">
          {/* Logo */}
          <div className="flex items-center">
            <div className="bg-lime-400 text-black px-4 py-2 rounded-xl font-bold text-lg">FOOGO</div>
          </div>

          {/* Navigation Menu */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-white hover:text-gray-300 transition-colors">
              Product
            </a>
            <a href="#" className="text-white hover:text-gray-300 transition-colors">
              How it Work
            </a>
            <a href="#" className="text-white hover:text-gray-300 transition-colors">
              Pricing
            </a>
            <a href="#" className="text-white hover:text-gray-300 transition-colors">
              Company
            </a>
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center space-x-2">
            <HoverBorderGradient
              as="a"
              containerClassName="rounded-full"
              className="px-6 py-2 text-sm font-medium"
            >
              Get Started
            </HoverBorderGradient>
            <Button className="bg-white text-black hover:bg-gray-100 rounded-full px-6">Book a Demo</Button>
          </div>
        </header>

        {/* Hero Section */}
        <main className="flex flex-col overflow-x-hidden items-center justify-center text-center px-6 py-20 lg:py-32">
          <div className="max-w-4xl mx-auto">
            {/* Main Heading */}
            <h1 className="text-5xl lg:text-7xl font-bold mb-8 text-balance">
              AI-Powered
              <br />
              AR Dining
            </h1>

            {/* Subtitle */}
            <p className="text-xl lg:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto text-balance leading-relaxed">
              Simplify tasks from ordering to inventory management
              <br />
              reducing errors and enhancing service speed.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button className="bg-white text-black hover:bg-gray-100 rounded-full px-8 py-3 text-sm">
                Book a Demo
              </Button>
              <HoverBorderGradient
              as="a"
              containerClassName="rounded-full"
              className="px-6 py-2 text-sm font-medium"
            >
              Get Started
            </HoverBorderGradient>
            </div>
          </div>
        </main>

        {/* Geometric Background Section */}
        <section
          ref={sectionRef}
          className="relative min-h-[280vh] py-32 bg-cover overflow-x-hidden bg-center bg-no-repeat flex items-center justify-start"
          style={{
            backgroundImage: `url('/foogo-qr-background.png')`,
          }}
        >
          <div className="max-w-2xl px-6 text-left ml-30 mt-125">
            <div ref={containerRef} className="text-2xl lg:text-4xl font-bold leading-tight text-balance">
              {words.map((word, index) => (
                <span
                  key={index}
                  ref={(el) => {
                    wordsRef.current[index] = el
                  }}
                  className={`inline-block mr-3 opacity-30 ${word === "today." ? "text-lime-400" : ""}`}
                >
                  {word}
                </span>
              ))}
            </div>
          </div>

          {/* Enhanced positioning for animated scanning beam */}
          <motion.div
            ref={scannerRef}
            initial={{ x: -200, opacity: 0 }}
            animate={scannerInView ? { x: 0, opacity: 1, transition: { duration: 1.2, ease: [0.33, 1, 0.68, 1] } } : {}}
            className="absolute left-1/2 top-0 transform -translate-x-80 translate-y-30 z-5"
          >
            <img
              ref={scanningBeamRef}
              src="/scanning-beam.svg"
              alt="Scanning beam"
              className="w-[520px] h-[482px] object-contain"
            />
          </motion.div>

          <motion.div
            ref={qrRef}
            initial={{ x: 200, opacity: 0 }}
            animate={qrInView ? { x: 0, opacity: 1, transition: { duration: 1.4, ease: [0.33, 1, 0.68, 1] } } : {}}
            className="absolute right-0 bottom-40 transform translate-y-8 z-6"
          >
            <img src="/s2.png" alt="FOOGO QR Scanner" className="w-180 h-196 object-contain" />
          </motion.div>
        </section>

        <div>
          <motion.div
            ref={f1Ref}
            id="f1-float"
            initial={{ x: -150, opacity: 0 }}
            animate={f1InView ? { x: 0, opacity: 1, transition: { duration: 1.1, ease: [0.33, 1, 0.68, 1] } } : {}}
            className="right-0 overflow-x-hidden transform translate-x-50 -translate-y-60 z-6"
          >
            <img src="/f1.png" alt="FOOGO QR Scanner" className="w-90 h-90 object-contain" />
          </motion.div>
          <motion.div
            ref={f2Ref}
            id="f2-float"
            initial={{ x: 150, opacity: 0 }}
            animate={f2InView ? { x: 0, opacity: 1, transition: { duration: 1.1, ease: [0.33, 1, 0.68, 1] } } : {}}
            className="right-0 transform translate-x-120 -translate-y-35 z-6"
          >
            <img src="/f2.png" alt="FOOGO QR Scanner" className="w-90 h-90 object-contain" />
          </motion.div>
        </div>
        <div>
          <WhyFoodoSection />
        </div>

        <Expfood />
        <section  className="hero overflow-x-hidden">
          <Mockup />
        </section>

        <StatsSection />
  <Clients />
  <div className=" relative z-50 bg-black rounded-t-[7rem] ">
        <ShardBackgroundSection />
        <div className="mx-auto max-w-7xl px-4 py-2 md:py-4">
          <div className="grid gap-4 md:grid-cols-2">
            <HeroCard
              variant="light"
              label="AI Website"
              heading="Fast, smart websites that let your guests explore, order, and book"
              cta="Book a Demo"
              tag="Smart Menu"
              imageSrc="r1.png"
              imageOnly
            />
            <HeroCard
              variant="dark"
              label="AI Website"
              heading="Fast, smart websites that let your guests explore, order, and book"
              cta="Book a Demo"
              tag="Simple Payment"
              imageSrc="/r2.png"
              imageOnly
            />
          </div>
        </div>
        <div className="mx-auto max-w-7xl px-4 py-2 md:py-4">
          <div className="grid gap-4 md:grid-cols-2">
            <HeroCard
              variant="light"
              label="AI Website"
              heading="Fast, smart websites that let your guests explore, order, and book"
              cta="Book a Demo"
              tag="Smart Menu"
              imageSrc="l1.png"
              imageOnly
            />
            <HeroCard
              variant="dark"
              label="AI Website"
              heading="Fast, smart websites that let your guests explore, order, and book"
              cta="Book a Demo"
              tag="Simple Payment"
              imageSrc="/l2.png"
              imageOnly
            />
          </div>
        </div>
        <Carousel />
        <Demo />
        <VideoSection />
      </div>
</div>
    </div>
  )
}
