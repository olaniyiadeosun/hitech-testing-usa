// API client for Flask backend integration

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'

export interface Product {
  id: string
  title: string
  category: string
  subcategory?: string
  description: string
  capacity: string
  accuracy: string
  standards: string[]
  power: string
  warranty: string
  display: string
  control: string
  resolution: string
  scale: string
  price_hint: string
  image: string
}

export interface ProductRecommendation {
  id: string
  title: string
  category: string
  description: string
  specs: string[]
  price_hint: string
  match_score: number
  reasoning: string
  accessories: string[]
  image: string
}

export interface QuoteRequest {
  customer: {
    name: string
    company: string
    email: string
    phone: string
    city: string
  }
  requirements: {
    material: string
    test_type: string
    capacity: string
    standard: string
    extras: string
  }
  selectedProducts: string[]
}

export interface GeneratedQuote {
  id: string
  customer: QuoteRequest['customer']
  requirements: QuoteRequest['requirements']
  selected_products: string[]
  line_items: Array<{
    product_id: string
    description: string
    quantity: number
    unit_price: number
    total: number
    category: string
  }>
  accessories: {
    mandatory: Array<{
      description: string
      quantity: number
      unit_price: number
      total: number
      category: string
      notes: string
    }>
    optional: Array<{
      description: string
      quantity: number
      unit_price: number
      total: number
      category: string
      notes: string
    }>
  }
  delivery: {
    lead_time: string
    shipping: string
    installation: string
  }
  terms: {
    warranty: string
    calibration: string
    payment: string
  }
  total: {
    equipment_subtotal: number
    mandatory_accessories: number
    optional_accessories: number
    subtotal: number
    tax_rate: number
    tax_amount: number
    total: number
  }
  valid_until: string
  ai_generated_content: string
  created_at: string
}

class ApiClient {
  private baseUrl: string

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    }

    try {
      const response = await fetch(url, config)
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      
      if (!data.success) {
        throw new Error(data.error || 'API request failed')
      }

      return data
    } catch (error) {
      console.error('API request failed:', error)
      throw error
    }
  }

  // Health check
  async healthCheck() {
    return this.request<{
      status: string
      timestamp: string
      products_loaded: number
    }>('/health')
  }

  // Get all products
  async getProducts(): Promise<{
    success: boolean
    products: Product[]
    total: number
  }> {
    return this.request('/products')
  }

  // Search products with AI
  async searchProducts(query: string): Promise<{
    success: boolean
    query: string
    recommendations: ProductRecommendation[]
    total: number
  }> {
    return this.request('/products/search', {
      method: 'POST',
      body: JSON.stringify({ query }),
    })
  }

  // Generate quote
  async generateQuote(quoteRequest: QuoteRequest): Promise<{
    success: boolean
    quote: GeneratedQuote
  }> {
    return this.request('/quote/generate', {
      method: 'POST',
      body: JSON.stringify(quoteRequest),
    })
  }

  // Send quote
  async sendQuote(quoteId: string): Promise<{
    success: boolean
    result: {
      quote_id: string
      email_sent: boolean
      crm_lead_created: boolean
      sms_sent: boolean
      timestamp: string
    }
  }> {
    return this.request('/quote/send', {
      method: 'POST',
      body: JSON.stringify({ quote_id: quoteId }),
    })
  }
}

// Create singleton instance
export const apiClient = new ApiClient()

// Utility functions for frontend components
export const productApi = {
  // Get all products
  getAll: () => apiClient.getProducts(),
  
  // Search products with AI
  search: (query: string) => apiClient.searchProducts(query),
}

export const quoteApi = {
  // Generate quote
  generate: (request: QuoteRequest) => apiClient.generateQuote(request),
  
  // Send quote
  send: (quoteId: string) => apiClient.sendQuote(quoteId),
}

export const systemApi = {
  // Health check
  health: () => apiClient.healthCheck(),
}

