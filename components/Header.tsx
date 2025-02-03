import Link from "next/link"
import { HardHat } from "lucide-react"

export default function Header() {
  return (
    <header className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-6 flex justify-between items-center">
        <Link href="/" className="flex items-center space-x-2">
          <HardHat size={32} className="text-orange-500" />
          <span className="text-2xl font-bold">BM2 Construction</span>
        </Link>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link href="#services" className="hover:underline">
                Services
              </Link>
            </li>
            <li>
              <Link href="#about" className="hover:underline">
                About
              </Link>
            </li>
            <li>
              <Link href="#contact" className="hover:underline">
                Contact
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

