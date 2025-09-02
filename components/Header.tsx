"use client"

import { Button } from "@/components/ui/button"
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient"
import Image from "next/image"
import SidebarMenu from "./Header/SidebarMenu"

export default function Header() {
  return (
    <header className="flex items-center justify-between px-6 py-4 lg:px-12 relative font-matter">
      {/* Logo */}
      <div className="flex items-center">
        <Image
          src="/logo.svg"
          alt="Foodo Logo"
          width={120}
          height={40}
          className="h-8 w-auto sm:h-10"
          priority
        />
      </div>

      {/* Navigation Menu - Hidden on mobile, visible on md+ */}
      <nav className="hidden md:flex items-center space-x-8">
        <a href="#" className="text-white hover:text-gray-300 transition-colors font-medium">
          Product
        </a>
        <a href="#" className="text-white hover:text-gray-300 transition-colors font-medium">
          How it Work
        </a>
        <a href="#" className="text-white hover:text-gray-300 transition-colors font-medium">
          Pricing
        </a>
        <a href="#" className="text-white hover:text-gray-300 transition-colors font-medium">
          Company
        </a>
      </nav>

      {/* Action Buttons - Hidden on mobile, visible on md+ */}
      <div className="hidden md:flex items-center space-x-2">
        <HoverBorderGradient
          as="a"
          containerClassName="rounded-full"
          className="px-6 py-2 text-sm font-medium"
        >
          Get Started
        </HoverBorderGradient>
        <Button className="bg-white text-black hover:bg-gray-100 rounded-full px-6 font-medium">Book a Demo</Button>
      </div>

      {/* Mobile Sidebar Menu - Visible on mobile, hidden on md+ */}
      <div className="md:hidden">
        <SidebarMenu />
      </div>
    </header>
  )
}
