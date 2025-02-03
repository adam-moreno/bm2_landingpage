import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { db } from "@/lib/firebase"
import { collection, addDoc, serverTimestamp } from "firebase/firestore"
import type { ContactFormData } from "@/lib/types"

function validateContactData(data: any): data is ContactFormData {
  return (
    typeof data.name === "string" &&
    typeof data.email === "string" &&
    typeof data.selectedCategory === "string" &&
    typeof data.selectedService === "string" &&
    typeof data.message === "string"
  )
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    
    if (!validateContactData(data)) {
      return NextResponse.json(
        { message: "Invalid form data" },
        { status: 400 }
      )
    }

    // Enhanced metadata collection
    const metadata = {
      userAgent: request.headers.get("user-agent"),
      ipAddress: request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "unknown",
      referrer: request.headers.get("referer") || "direct",
      timestamp: serverTimestamp(),
      submittedAt: new Date().toISOString(),
      browserLanguage: request.headers.get("accept-language"),
      deviceType: getUserDevice(request.headers.get("user-agent") || ""),
      platform: getPlatform(request.headers.get("user-agent") || ""),
      countryCode: request.headers.get("x-vercel-ip-country") || "unknown"
    }

    // Add to Firestore with enhanced metadata
    await addDoc(collection(db, "contact_submissions"), {
      ...data,
      createdAt: serverTimestamp(),
      status: "new",
      source: "website",
      metadata
    })
    
    return NextResponse.json({ message: "Form submitted successfully" }, { status: 200 })
  } catch (error) {
    console.error("Form submission error:", error)
    return NextResponse.json({ message: "Error submitting form" }, { status: 500 })
  }
}

// Helper functions for metadata
function getUserDevice(userAgent: string): string {
  if (/mobile/i.test(userAgent)) return "mobile"
  if (/tablet/i.test(userAgent)) return "tablet"
  return "desktop"
}

function getPlatform(userAgent: string): string {
  if (/windows/i.test(userAgent)) return "Windows"
  if (/macintosh/i.test(userAgent)) return "MacOS"
  if (/linux/i.test(userAgent)) return "Linux"
  if (/android/i.test(userAgent)) return "Android"
  if (/ios/i.test(userAgent)) return "iOS"
  return "Other"
} 