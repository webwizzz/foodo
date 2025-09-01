"use client"

import { Button } from "@/components/ui/button"
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient"
import SidebarMenu from "./Header/SidebarMenu"

export default function Header() {
  return (
    <header className="flex items-center justify-between px-6 py-4 lg:px-12 relative">
      {/* Logo */}
      <div className="flex items-center">
        <div className="bg-lime-400 text-black px-4 py-2 rounded-xl font-bold text-lg">FOOGO</div>
      </div>

      {/* Navigation Menu - Hidden on mobile, visible on md+ */}
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

      {/* Action Buttons - Hidden on mobile, visible on md+ */}
      <div className="hidden md:flex items-center space-x-2">
        <HoverBorderGradient
          as="a"
          containerClassName="rounded-full"
          className="px-6 py-2 text-sm font-medium"
        >
          Get Started
        </HoverBorderGradient>
        <Button className="bg-white text-black hover:bg-gray-100 rounded-full px-6">Book a Demo</Button>
      </div>

      {/* Mobile Sidebar Menu - Visible on mobile, hidden on md+ */}
      <div className="md:hidden">
        <SidebarMenu />
      </div>
    </header>
  )
}
