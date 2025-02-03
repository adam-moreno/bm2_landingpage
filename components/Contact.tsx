"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { ToastProvider } from "@/components/ui/toast"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { ContactFormData } from "@/lib/types"

const projectTypes = [
  {
    category: "Residential Construction & Renovation",
    options: [
      "New Home Construction",
      "Home Renovation & Remodeling",
      "Kitchen & Bathroom Remodeling",
      "Room Additions & Expansions",
      "ADU (Accessory Dwelling Unit) Construction",
      "Flooring, Roofing, & Siding Installation",
    ],
  },
  {
    category: "Commercial Construction & Improvements",
    options: [
      "Office Build-Outs & Renovations",
      "Retail Storefront Construction",
      "Restaurant & Hospitality Build-Outs",
      "Warehouse & Industrial Construction",
      "Tenant Improvements",
    ],
  },
  {
    category: "Electrical & Energy Solutions",
    options: [
      "EV Charger Installation",
      "Solar Panel Installation",
      "Smart Home/Business Automation",
      "Electrical System Upgrades",
    ],
  },
  {
    category: "Outdoor & Landscaping Construction",
    options: [
      "Driveways, Patios, & Hardscaping",
      "Swimming Pool Construction",
      "Deck & Pergola Installation",
      "Outdoor Kitchens & Living Spaces",
      "Landscaping & Irrigation Systems",
    ],
  },
  {
    category: "Infrastructure & Specialty Projects",
    options: [
      "Roadwork & Paving Projects",
      "Government & Municipal Construction",
      "Disaster Recovery & Restoration (Fire, Flood, Mold)",
      "Industrial & Manufacturing Facilities",
    ],
  },
]

export default function Contact() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    selectedCategory: "",
    selectedService: "",
    otherProjectType: "",
    message: "",
    createdAt: "",
    status: "new",
    source: "website"
  })
  const { toast } = useToast()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prevState) => ({ ...prevState, [name]: value }))
  }

  const handleCategoryChange = (value: string) => {
    setFormData((prevState) => ({
      ...prevState,
      selectedCategory: value,
      selectedService: "",
    }))
  }

  const handleServiceChange = (value: string) => {
    setFormData((prevState) => ({
      ...prevState,
      selectedService: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const submissionData: ContactFormData = {
        ...formData,
        createdAt: new Date().toISOString(),
        status: "new",
        source: "website"
      }

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submissionData),
      })

      if (!response.ok) {
        throw new Error("Failed to submit form")
      }

      toast({
        title: "Success!",
        description: "Your message has been sent. We'll get back to you soon.",
      })

      // Reset form after submission
      setFormData({
        name: "",
        email: "",
        selectedCategory: "",
        selectedService: "",
        otherProjectType: "",
        message: "",
        createdAt: "",
        status: "new",
        source: "website"
      })
    } catch (error) {
      console.error("Error submitting form:", error)
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      })
    }
  }

  return (
    <ToastProvider>
      <section id="contact" className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Contact Us</h2>
          <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
            <div className="mb-4">
              <Input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-4">
              <Input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Project Type</h3>
              <Select onValueChange={handleCategoryChange} value={formData.selectedCategory}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a project type" />
                </SelectTrigger>
                <SelectContent>
                  {projectTypes.map((category, index) => (
                    <SelectItem key={index} value={category.category}>
                      {category.category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {formData.selectedCategory && (
              <div className="mb-6">
                <h4 className="font-medium mb-2">Select Specific Service</h4>
                <Select onValueChange={handleServiceChange} value={formData.selectedService}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a specific service" />
                  </SelectTrigger>
                  <SelectContent>
                    {projectTypes
                      .find((cat) => cat.category === formData.selectedCategory)
                      ?.options.map((option, index) => (
                        <SelectItem key={index} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>
            )}
            <div className="mb-4">
              <Input
                type="text"
                name="otherProjectType"
                placeholder="Other project type (if applicable)"
                value={formData.otherProjectType}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <Textarea
                name="message"
                placeholder="Your Message"
                value={formData.message}
                onChange={handleChange}
                required
              />
            </div>
            <Button type="submit" className="w-full">
              Send Message
            </Button>
          </form>
        </div>
      </section>
    </ToastProvider>
  )
}

