"use client"

import Carousel from "@/components/Carousel"
import Clients from "@/components/Clients"
import ContactUs from "@/components/ContactUs"
import { Demo } from "@/components/Demo"
import { Expfood } from "@/components/Expfood"
import FAQSection from "@/components/faq-section"
import FloatingImages from "@/components/FloatingImages"
import { SiteFooter } from "@/components/Footer"
import GeometricBackgroundSection from "@/components/GeometricBackgroundSection"
import Header from "@/components/Header"
import { HeroCard } from "@/components/HeroCard"
import HeroSection from "@/components/HeroSection"
import { Mockup } from "@/components/Mockup"
import Pricing from "@/components/Pricing"
import ShardBackgroundSection from "@/components/ShardBackgroundSection"
import SmoothScrollInit from "@/components/SmoothScrollInit"
import SocialPromotionsSection from "@/components/SocialPromotionSection"
import SpinningWheel from "@/components/SpinningWheel"
import StatsSection from "@/components/StatsSection"
import VideoSection from "@/components/VideoSection"
import WhyFoodoSection from "@/components/WhyFoodoSection"
import { useStickyScale } from "@/hooks/useStickyScaleNew"
import { motion } from "framer-motion"
import { useRef } from "react"

export default function HomePage() {
  const smoothWrapperRef = useRef<HTMLDivElement>(null)
  const smoothContentRef = useRef<HTMLDivElement>(null)
  // Initialize sticky scale behavior
  useStickyScale()

  return (
    <>
      {/* Smooth Scroll Initialization */}
      <SmoothScrollInit />
      {/* Main Content */}
      <motion.div 
        ref={smoothWrapperRef} 
        className="min-h-screen overflow-x-clip bg-black text-white font-sans"
        style={{ 
          scrollBehavior: 'smooth',
          WebkitOverflowScrolling: 'touch' // iOS momentum scrolling
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div ref={smoothContentRef}>
          {/* Navigation Header */}
          <Header />

          {/* Content with padding for fixed header */}
          <div className="pt-20">
            {/* Hero Section */}
            <HeroSection />

            {/* Geometric Background Section */}
            <GeometricBackgroundSection />

            {/* WhyFoodo Section - Mobile and Desktop Layouts */}
            <div id="whyfoodo-section">
              {/* Mobile Layout: WhyFoodoSection first, then FloatingImages */}
              <div className="block md:hidden">
                <WhyFoodoSection />
                <FloatingImages />
              </div>

              {/* Desktop Layout: FloatingImages first, then WhyFoodoSection */}
              <div className="hidden md:block">
                <FloatingImages />
                <div>
                  <WhyFoodoSection />
                </div>
              </div>
            </div>
            <Expfood />
            <section className="hero overflow-x-hidden">
              <Mockup />
            </section>
          <div data-sticky-scale="stats">
            <StatsSection />
          </div>
          
          {/* Clients Section that slides over */}
          <div data-sticky-scale="clients">
            <Clients/>
          </div>
          
          {/* Shard Background Section that slides over clients */}
          <div id="shard-section" data-sticky-scale="shard" className="relative z-50 bg-black rounded-t-[7rem]">
            <ShardBackgroundSection />
            <div className="mx-auto max-w-7xl px-4 py-2 md:py-4">
              <motion.div 
                className="grid  lg:px-8 gap-4 md:grid-cols-2"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.2,
                      delayChildren: 0.1,
                    },
                  },
                }}
              >
                <motion.div
                  variants={{
                    hidden: { y: 50, opacity: 0 },
                    visible: { y: 0, opacity: 1 },
                  }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                >
                  <HeroCard
                    variant="light"
                    label="AI Website"
                    heading="Fast, smart websites that let your guests explore, order, and book"
                    cta="Book a Demo"
                    tag="Smart Menu"
                    imageSrc="/r1.png"
                    smallImageSrc="/smallr1.png"
                  
                  />
                </motion.div>
                <motion.div
                  variants={{
                    hidden: { y: 50, opacity: 0 },
                    visible: { y: 0, opacity: 1 },
                  }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                >
                  <HeroCard
                    variant="dark"
                    label="AI Website"
                    heading="Fast, smart websites that let your guests explore, order, and book"
                    cta="Book a Demo"
                    tag="Simple Payment"
                    imageSrc="/r2.png"
                    smallImageSrc="/smallr2.png"
              
                  />
                </motion.div>
              </motion.div>
            </div>
            <div className="mx-auto lg:px-8 max-w-7xl px-4 py-2 md:py-4">
              <motion.div 
                className="grid gap-4 md:grid-cols-2"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.2,
                      delayChildren: 0.1,
                    },
                  },
                }}
              >
                <motion.div
                  variants={{
                    hidden: { y: 50, opacity: 0 },
                    visible: { y: 0, opacity: 1 },
                  }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                >
                  <HeroCard
                    variant="light"
                    label="AI Website"
                    heading="Fast, smart websites that let your guests explore, order, and book"
                    cta="Book a Demo"
                    tag="Smart Menu"
                    imageSrc="/l1.png"
                    smallImageSrc="/smalll1.png"
          
                  />
                </motion.div>
                <motion.div
                  variants={{
                    hidden: { y: 50, opacity: 0 },
                    visible: { y: 0, opacity: 1 },
                  }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                >
                  <HeroCard
                    variant="dark"
                    label="AI Website"
                    heading="Fast, smart websites that let your guests explore, order, and book"
                    cta="Book a Demo"
                    tag="Simple Payment"
                    imageSrc="/l2.png"
                    smallImageSrc="/smalll2.png"
   
                  />
                </motion.div>
              </motion.div>
            </div>
            <Carousel />
            <Demo />
            <VideoSection />
            <SocialPromotionsSection />
                
      <SpinningWheel />
    
            <div id="pricing-section">
              <Pricing />
            </div>
            <div id="contact-section">
              <ContactUs />
            </div>
            <FAQSection />
            <SiteFooter />
          </div>
          </div> {/* Close content wrapper with padding */}
        </div>
      </motion.div>
    </>
  )
}
