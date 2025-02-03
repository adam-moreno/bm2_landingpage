import { Button } from "@/components/ui/button"

export default function Hero() {
  return (
    <section
      className="relative py-32 md:py-48 text-center"
      style={{
        backgroundImage:
          "url(https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-01-27%20at%206.57.09%E2%80%AFPM-X8ORmhr8FBQ4ksvtGiFcbRfAe3smSf.png)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black/40" /> {/* Overlay for better text readability */}
      <div className="container mx-auto px-4 relative z-10">
        {" "}
        {/* z-10 to place content above overlay */}
        <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">Building Your Vision, Exceeding Expectations</h1>
        <p className="text-xl mb-8 text-gray-100">
          Professional construction services for residential and commercial projects
        </p>
        <Button size="lg" className="bg-orange-500 hover:bg-orange-600" asChild>
          <a href="#contact">Get a Free Quote</a>
        </Button>
      </div>
    </section>
  )
}

