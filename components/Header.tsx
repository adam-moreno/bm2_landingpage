"use client"

import { MobileNav } from "@/components/MobileNav"
import { HardHat } from "lucide-react"

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        {/* Left Side Group */}
        <div className="flex items-center flex-1">
          {/* Mobile Navigation */}
          <div className="md:hidden mr-2">
            <MobileNav />
          </div>

          {/* Logo - Always Left */}
          <div className="flex items-center space-x-2">
            <HardHat size={24} className="text-orange-500" />
            <span className="text-lg font-bold">BM2 Construction</span>
          </div>
        </div>

        {/* Desktop Navigation - Right Side */}
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          <a href="#services">Services</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </nav>
      </div>
    </header>
  )
}

