"use client"

import * as React from "react"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"

export function MobileNav() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" className="md:hidden">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[300px] sm:w-[400px]">
        <nav className="flex flex-col gap-4">
          <a href="/" className="block px-2 py-1 text-lg">
            Home
          </a>
          <a href="#services" className="block px-2 py-1 text-lg">
            Services
          </a>
          <a href="#about" className="block px-2 py-1 text-lg">
            About
          </a>
          <a href="#contact" className="block px-2 py-1 text-lg">
            Contact
          </a>
        </nav>
      </SheetContent>
    </Sheet>
  )
} 