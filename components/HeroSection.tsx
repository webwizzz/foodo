"use client"

import { Button } from "@/components/ui/button"
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient"

export default function HeroSection() {
  return (
    <main className="flex flex-col overflow-x-hidden items-center justify-center text-center px-6 py-12 lg:py-32">
      <div className="max-w-4xl mx-auto">
        {/* Main Heading */}
        <h1 className="text-5xl lg:text-6xl font-semibold mb-4 text-balance">
          AI-Powered
          <br />
          AR Dining
        </h1>

        {/* Subtitle */}
        <p className="text-lg lg:text-xl text-gray-300 mb-4 max-w-2xl  lg:max-w-3xl  mx-auto text-balance leading-tight">
          Simplify tasks from ordering to inventory management
          
          reducing errors and enhancing service speed.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-row sm:flex-row items-center justify-center gap-4">
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
  )
}
