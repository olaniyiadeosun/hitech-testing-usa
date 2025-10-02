// AI Integration utilities for product recommendations and quote generation

export interface AIProductRecommendation {
  id: string
  title: string
  category: string
  specs: string[]
  price_hint: string
  match_score: number
  reasoning: string
  accessories: string[]
  alternatives?: string[]
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
  line_items: {
    product: string
    quantity: number
    unit_price: number
    total: number
    description: string
  }[]
  accessories: {
    product: string
    quantity: number
    unit_price: number
    total: number
    description: string
    optional: boolean
  }[]
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
  total: number
  valid_until: string
}

// Simulate AI product recommendation
export async function getAIProductRecommendations(
  query: string,
  products: any[]
): Promise<AIProductRecommendation[]> {
  // In a real implementation, this would call your AI API (OpenRouter, OpenAI, etc.)
  // For now, we'll simulate the AI response
  
  await new Promise(resolve => setTimeout(resolve, 1500)) // Simulate API delay
  
  const searchTerms = query.toLowerCase()
  const recommendations: AIProductRecommendation[] = []
  
  // Simple keyword matching for demonstration
  products.forEach(product => {
    let matchScore = 0
    let reasoning = ''
    let accessories: string[] = []
    
    if (searchTerms.includes('hardness')) {
      if (product.category.toLowerCase().includes('hardness')) {
        matchScore = 90
        reasoning = 'Perfect match for hardness testing requirements'
        accessories = ['Test blocks', 'Anvils', 'Indenters']
      }
    }
    
    if (searchTerms.includes('tensile') || searchTerms.includes('utm')) {
      if (product.category.toLowerCase().includes('utm')) {
        matchScore = 95
        reasoning = 'Ideal for tensile testing per your specifications'
        accessories = ['Grips', 'Extensometer', 'Software']
      }
    }
    
    if (searchTerms.includes('aluminum') || searchTerms.includes('steel')) {
      if (product.specs?.capacity && product.specs.capacity.includes('50')) {
        matchScore += 10
        reasoning += ' Suitable capacity for metal testing'
      }
    }
    
    if (searchTerms.includes('astm') || searchTerms.includes('iso')) {
      if (product.specs?.standards?.some((std: string) => 
        std.toLowerCase().includes('astm') || std.toLowerCase().includes('iso')
      )) {
        matchScore += 15
        reasoning += ' Complies with specified standards'
      }
    }
    
    if (matchScore > 0) {
      recommendations.push({
        id: product.id,
        title: product.title,
        category: product.category,
        specs: Object.entries(product.specs || {})
          .filter(([_, value]) => value)
          .map(([key, value]) => `${key}: ${value}`),
        price_hint: product.price_hint,
        match_score: Math.min(matchScore, 100),
        reasoning,
        accessories
      })
    }
  })
  
  return recommendations.sort((a, b) => b.match_score - a.match_score)
}

// Generate quote from selected products
export async function generateQuote(request: QuoteRequest): Promise<GeneratedQuote> {
  // In a real implementation, this would call your AI API to generate a professional quote
  
  await new Promise(resolve => setTimeout(resolve, 2000)) // Simulate API delay
  
  const quoteId = `QUO-${Date.now()}`
  const validUntil = new Date()
  validUntil.setDate(validUntil.getDate() + 30) // 30 days validity
  
  // Sample pricing (in real app, this would come from your pricing system)
  const baseProducts = request.selectedProducts.map(productId => ({
    product: `Product ${productId}`,
    quantity: 1,
    unit_price: 15000,
    total: 15000,
    description: 'Base equipment with standard features'
  }))
  
  const accessories = [
    {
      product: 'Installation & Training',
      quantity: 1,
      unit_price: 2500,
      total: 2500,
      description: 'On-site installation and operator training',
      optional: false
    },
    {
      product: 'Annual Service Plan',
      quantity: 1,
      unit_price: 1800,
      total: 1800,
      description: 'Includes calibration and maintenance',
      optional: true
    }
  ]
  
  const total = [...baseProducts, ...accessories.filter(a => !a.optional)]
    .reduce((sum, item) => sum + item.total, 0)
  
  return {
    id: quoteId,
    customer: request.customer,
    line_items: baseProducts,
    accessories,
    delivery: {
      lead_time: '4-6 weeks',
      shipping: 'FOB Destination',
      installation: 'Included'
    },
    terms: {
      warranty: '2 years parts and labor',
      calibration: 'NIST-traceable certificate included',
      payment: 'Net 30 terms available'
    },
    total,
    valid_until: validUntil.toISOString().split('T')[0]
  }
}

// Send quote via email (placeholder)
export async function sendQuoteEmail(quote: GeneratedQuote): Promise<boolean> {
  // In a real implementation, this would integrate with your email service (Resend, SES, etc.)
  
  await new Promise(resolve => setTimeout(resolve, 1000)) // Simulate API delay
  
  console.log('Quote email sent:', {
    to: quote.customer.email,
    subject: `Quote ${quote.id} - Hitech Testing USA`,
    quote
  })
  
  return true
}

// Create CRM lead (placeholder)
export async function createCRMLead(quote: GeneratedQuote): Promise<string> {
  // In a real implementation, this would integrate with HubSpot, Salesforce, etc.
  
  await new Promise(resolve => setTimeout(resolve, 1000)) // Simulate API delay
  
  const leadId = `LEAD-${Date.now()}`
  
  console.log('CRM lead created:', {
    id: leadId,
    customer: quote.customer,
    quote_id: quote.id
  })
  
  return leadId
}

