"use client"

import type React from "react"

import { gsap } from "gsap"
import { Draggable } from "gsap/Draggable"
import { Flip } from "gsap/Flip"
import { useEffect, useRef, useState } from "react"

const testimonials = [
  {
    quote: "To be, or not to be, that is the question: Whether 'tis nobler in the mind to suffer.",
    author: "William Shakespeare",
    source: "Hamlet",
  },
  {
    quote: "It is during our darkest moments that we must focus to see the light.",
    author: "Aristotle",
    source: "Philosopher",
  },
  {
    quote: "The only way to do great work is to love what you do.",
    author: "Steve Jobs",
    source: "Apple Co-founder",
  },
  {
    quote: "In the middle of difficulty lies opportunity.",
    author: "Albert Einstein",
    source: "Physicist",
  },
  {
    quote: "Success is not final, failure is not fatal: it is the courage to continue that counts.",
    author: "Winston Churchill",
    source: "Prime Minister",
  },
  {
    quote: "The future belongs to those who believe in the beauty of their dreams.",
    author: "Eleanor Roosevelt",
    source: "First Lady",
  },
  {
    quote: "It is not the strongest that survives, but the one most responsive to change.",
    author: "Charles Darwin",
    source: "Naturalist",
  },
]

export default function SpinningWheel() {
  const wheelRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const [currentCard, setCurrentCard] = useState<HTMLDivElement | null>(null)
  const cardsRef = useRef<HTMLDivElement[]>([])
  const cardsContentRef = useRef<HTMLDivElement[]>([])

  useEffect(() => {
    // Register GSAP plugins
    gsap.registerPlugin(Draggable, Flip)

    const wheel = wheelRef.current
    const header = headerRef.current
    if (!wheel || !header) return

    const cardContents = cardsContentRef.current
    const cards = cardsRef.current

    function setup() {
      if (!wheel) return
      const radius = wheel.offsetWidth / 2
      const center = radius
      
      // Adjust visible cards based on screen size to maintain spacing
      const screenWidth = window.innerWidth
      let maxVisibleCards
      if (screenWidth < 640) { // sm breakpoint
        maxVisibleCards = 10 // Fewer cards on mobile to maintain spacing with larger card size
      } else if (screenWidth < 768) { // md breakpoint
        maxVisibleCards = 12
      } else if (screenWidth < 1024) { // lg breakpoint
        maxVisibleCards = 14
      } else {
        maxVisibleCards = 16 // Original spacing for desktop
      }
      
      const visibleCards = Math.min(cardContents.length, maxVisibleCards)
      const slice = 360 / visibleCards
      const DEG2RAD = Math.PI / 180

      gsap.set(cardContents, {
        x: (i) => center + radius * Math.sin(i * slice * DEG2RAD),
        y: (i) => center - radius * Math.cos(i * slice * DEG2RAD),
        rotation: (i) => i * slice,
        xPercent: -50,
        yPercent: -50,
      })
    }

    setup()

    // Create infinite rotation animation with very slow smooth movement
    const duration = 60; // Very slow - 60 seconds per rotation

    // Infinite rotation animation with continuous movement
    const timeline = gsap.timeline({ repeat: -1, ease: "none" });
    timeline.to(wheel, {
      rotation: -360,
      duration: duration,
    });

    // Resize handler
    const handleResize = () => setup()
    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
      timeline.kill();
    }
  }, [])

  const closeCurrentCard = () => {
    if (currentCard && headerRef.current) {
      const cardContent = headerRef.current.querySelector(".testimonial-card")
      if (cardContent) {
        const state = Flip.getState(cardContent)
        currentCard.appendChild(cardContent)
        Flip.from(state, {
          ease: "power1.inOut",
          scale: true,
        })
      }
      setCurrentCard(null)
    }
  }

  const onClickCard = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget
    const cardContent = card.querySelector(".testimonial-card")

    if (!cardContent || !headerRef.current) return

    if (card !== currentCard) {
      closeCurrentCard()
      setCurrentCard(card)
      const state = Flip.getState(cardContent)
      headerRef.current.appendChild(cardContent)
      Flip.from(state, {
        duration: 0.6,
        scale: true,
        ease: "power1.inOut",
      })
    } else {
      closeCurrentCard()
    }
  }

  const duplicatedTestimonials = [...testimonials, ...testimonials, ...testimonials, ...testimonials]

  return (
    <div className="relative w-full h-screen bg-[#000] text-white overflow-hidden">
      {/* Header area for enlarged testimonials */}
      <div
        ref={headerRef}
        className="absolute top-0 left-0 w-full h-[20vh] flex items-center justify-center cursor-pointer z-10 p-2"
        onClick={closeCurrentCard}
      >
        {/* Testimonial cards will be dynamically moved here */}
      </div>

      {/* Slider section at bottom */}
      <section className="absolute bottom-4 w-full h-[75vh]">
        <div
          ref={wheelRef}
          className="absolute top-0 left-1/2 transform -translate-x-1/2 flex items-center justify-center w-[300vw] h-[300vw] max-w-[2000px] max-h-[2000px]"
        >
          {duplicatedTestimonials.map((testimonial, index) => (
            <div
              key={index}
              ref={(el) => {
                if (el) cardsRef.current[index] = el
              }}
              className="absolute top-0 left-0 w-[20%] sm:w-[16%] md:w-[14%] lg:w-[12%] max-w-[400px] aspect-[3/4] cursor-pointer"
              onClick={onClickCard}
            >
              <div
                ref={(el) => {
                  if (el) cardsContentRef.current[index] = el
                }}
                className="testimonial-card w-full h-full rounded-2xl  bg-gradient-to-br from-gray-900 to-black px-6 py-8 flex flex-col pointer-events-none absolute will-change-transform cursor-pointer overflow-hidden"
                style={{
                  boxShadow: `
                    0 10px 25px -5px rgba(171, 239, 38, 0.3),
                    0 20px 40px -10px rgba(171, 239, 38, 0.2),
                    0 8px 16px rgba(0, 0, 0, 0.4),
                    inset 0 1px 0 rgba(171, 239, 38, 0.1)
                  `
                }}
                draggable={false}
              >
                <blockquote className="flex h-full flex-col overflow-hidden">
                  <span className="relative z-20 text-sm leading-[1.4] font-medium text-white flex-1 overflow-hidden line-clamp-4">
                    "{testimonial.quote}"
                  </span>
                  <div className="relative z-20 mt-auto pt-4 flex flex-row items-center">
                    <span className="flex flex-col gap-1">
                      <span className="text-sm leading-[1.3] font-medium text-[#ABEF26] truncate">{testimonial.author}</span>
                      <span className="text-xs leading-[1.3] font-medium text-gray-300 truncate">{testimonial.source}</span>
                    </span>
                  </div>
                </blockquote>
              </div>
            </div>
          ))}
        </div>
      </section>

      
    </div>
  )
}
