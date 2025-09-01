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
import InfiniteMovingCardsDemo from "@/components/infinite-moving-cards-demo"
import { Mockup } from "@/components/Mockup"
import Pricing from "@/components/Pricing"
import ShardBackgroundSection from "@/components/ShardBackgroundSection"
import SocialPromotionsSection from "@/components/SocialPromotionSection"
import StatsSection from "@/components/StatsSection"
import VideoSection from "@/components/VideoSection"
import WhyFoodoSection from "@/components/WhyFoodoSection"
import { useRef } from "react"

export default function HomePage() {
  const smoothWrapperRef = useRef<HTMLDivElement>(null)
  const smoothContentRef = useRef<HTMLDivElement>(null)

  return (
    <div ref={smoothWrapperRef} className="min-h-screen overflow-x-clip bg-black text-white font-sans">
      <div ref={smoothContentRef}>
        {/* Navigation Header */}
        <Header />

        {/* Hero Section */}
        <HeroSection />

        {/* Geometric Background Section */}
        <GeometricBackgroundSection />

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

        <Expfood />
        <section className="hero overflow-x-hidden">
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
          <SocialPromotionsSection />
          <InfiniteMovingCardsDemo />
          <Pricing />
          <ContactUs />
          <FAQSection />
          <SiteFooter />
        </div>
      </div>
    </div>
  )
}
