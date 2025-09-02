"use client"

import { Button } from "@/components/ui/button"
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient"
import Image from "next/image"
import SidebarMenu from "./Header/SidebarMenu"

export default function Header() {
  return (
    <header className="flex items-center justify-between px-4 py-4  lg:px-6 relative font-matter">
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
      <nav className="hidden  md:flex pl-48  items-center space-x-4">
        <a href="#" className="text-[#B4B4B4] hover:text-gray-300 transition-colors font-light text-md">
          Product
        </a>
        <a href="#" className="text-[#B4B4B4] hover:text-gray-300 transition-colors font-light text-md">
          How it Work
        </a>
        <a href="#" className="text-[#B4B4B4] hover:text-gray-300 transition-colors font-light text-md">
          Pricing
        </a>
        <a href="#" className="text-[#B4B4B4] hover:text-gray-300 transition-colors font-light text-md">
          Company
        </a>
      </nav>

      {/* Action Buttons - Hidden on mobile, visible on md+ */}
      <div className="hidden md:flex items-center space-x-2">
        <HoverBorderGradient
          as="a"
          containerClassName="rounded-full"
          className="px-3 py-1 text-sm font-medium"
        >
          Get Started
        </HoverBorderGradient>
        <Button className="bg-white text-black hover:bg-gray-100 rounded-full px-3 py-1 font-medium">Book a Demo</Button>
      </div>

      {/* Mobile Sidebar Menu - Visible on mobile, hidden on md+ */}
      <div className="md:hidden">
        <SidebarMenu />
      </div>
    </header>
  )
}
