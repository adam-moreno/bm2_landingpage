export interface ContactFormData {
  name: string
  email: string
  selectedCategory: string
  selectedService: string
  otherProjectType?: string
  message: string
  createdAt: string
  status: 'new' | 'contacted' | 'completed'
  source: 'website'
  location?: {
    city?: string
    state?: string
  }
} 