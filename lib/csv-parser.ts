import Papa from 'papaparse'

export interface ProductData {
  id: string
  title: string
  category: string
  subcategory?: string
  specs: {
    capacity?: string
    accuracy?: string
    standards?: string[]
    power?: string
    warranty?: string
    display?: string
    control?: string
    resolution?: string
    scale?: string
  }
  description: string
  price_hint: string
  image?: string
  sku?: string
}

export function parseProductCSV(csvContent: string): ProductData[] {
  try {
    const results = Papa.parse(csvContent, {
      header: true,
      skipEmptyLines: true,
      transformHeader: (header) => header.toLowerCase().trim()
    })

    return results.data.map((row: any, index: number) => {
      // Parse standards from string to array
      const standards = row.standards ? 
        row.standards.split(',').map((s: string) => s.trim()).filter(Boolean) : 
        []

      return {
        id: row.id || row.sku || `product-${index}`,
        title: row.title || row.name || 'Untitled Product',
        category: row.category || 'General',
        subcategory: row.subcategory,
        specs: {
          capacity: row.capacity,
          accuracy: row.accuracy,
          standards,
          power: row.power,
          warranty: row.warranty,
          display: row.display,
          control: row.control,
          resolution: row.resolution,
          scale: row.scale,
        },
        description: row.description || '',
        price_hint: row.price_hint || 'Request a quote',
        image: row.image,
        sku: row.sku || row.id
      }
    })
  } catch (error) {
    console.error('Error parsing CSV:', error)
    return []
  }
}

export function searchProducts(products: ProductData[], query: string): ProductData[] {
  if (!query.trim()) return products

  const searchTerm = query.toLowerCase()
  
  return products.filter(product => {
    // Search in title, description, category, and specs
    const searchableText = [
      product.title,
      product.description,
      product.category,
      product.subcategory,
      ...product.specs.standards || [],
      product.specs.capacity,
      product.specs.accuracy,
      product.specs.control,
      product.specs.scale
    ].filter(Boolean).join(' ').toLowerCase()

    return searchableText.includes(searchTerm)
  })
}

export function filterProductsByCategory(products: ProductData[], category: string): ProductData[] {
  if (!category || category === 'All') return products
  return products.filter(product => product.category === category)
}

export function calculateMatchScore(product: ProductData, query: string): number {
  const searchTerm = query.toLowerCase()
  let score = 0

  // Title match (highest weight)
  if (product.title.toLowerCase().includes(searchTerm)) score += 40
  
  // Category match
  if (product.category.toLowerCase().includes(searchTerm)) score += 30
  
  // Description match
  if (product.description.toLowerCase().includes(searchTerm)) score += 20
  
  // Specs match
  const specsText = Object.values(product.specs).flat().join(' ').toLowerCase()
  if (specsText.includes(searchTerm)) score += 10

  return Math.min(score, 100)
}

