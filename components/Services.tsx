import { Home, Building2, Wrench } from "lucide-react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

const services = [
  {
    icon: Home,
    title: "Residential Construction",
    description: "Custom home building and renovations tailored to your needs.",
  },
  {
    icon: Building2,
    title: "Commercial Construction",
    description: "Office buildings, retail spaces, and industrial facilities.",
  },
  {
    icon: Wrench,
    title: "Remodeling",
    description: "Transforming existing spaces to meet your new requirements.",
  },
]

export default function Services() {
  return (
    <section id="services" className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Our Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <service.icon className="h-6 w-6" />
                  <span>{service.title}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>{service.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

