'use client'

import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Filter, Search, ArrowRight, CheckCircle } from 'lucide-react'

interface Product {
  id: string
  title: string
  category: string
  specs: string[]
  price_hint: string
  description: string
  standards: string[]
  image: string
}

export default function ProductsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [showFilters, setShowFilters] = useState(false)

  // Sample product data - this would be loaded from your CSV file
  const products: Product[] = [
    {
      id: 'HTUS-PR-HT-001',
      title: 'Portable Hardness Tester',
      category: 'Hardness Testing',
      specs: ['HB/HRC/HRB scales', '±1 HRC accuracy', 'Digital display', 'Portable design'],
      price_hint: 'Request a quote',
      description: 'Lightweight, battery-powered hardness tester for field applications.',
      standards: ['ASTM E18', 'ISO 6508'],
      image: '/images/portable-hardness.jpg'
    },
    {
      id: 'HTUS-ROC-022',
      title: 'Rockwell Hardness Tester (Digital)',
      category: 'Hardness Testing',
      specs: ['ASTM E18 / ISO 6508', '0.1 HR resolution', 'Automated testing', 'Touch screen'],
      price_hint: 'Request a quote',
      description: 'High-precision digital Rockwell hardness tester with automated capabilities.',
      standards: ['ASTM E18', 'ISO 6508'],
      image: '/images/rockwell.jpg'
    },
    {
      id: 'HTUS-UTM-050',
      title: '50 kN Universal Testing Machine',
      category: 'UTM',
      specs: ['ASTM E8/E8M compliant', 'Closed-loop control', 'Digital extensometer', 'Software'],
      price_hint: 'Request a quote',
      description: 'Versatile universal testing machine for tensile, compression, and flexural testing.',
      standards: ['ASTM E8', 'ASTM E8M', 'ISO 6892'],
      image: '/images/utm.jpg'
    },
    {
      id: 'HTUS-DYN-040',
      title: 'Dynamic Balancing Machine',
      category: 'Balancing',
      specs: ['Up to 50 kg capacity', 'ISO 2953 accuracy', 'Real-time display', 'Auto correction'],
      price_hint: 'Request a quote',
      description: 'Precision dynamic balancing machine for rotors, fans, and rotating components.',
      standards: ['ISO 2953', 'ISO 1940'],
      image: '/images/balancing.jpg'
    },
    {
      id: 'HTUS-BRI-015',
      title: 'Brinell Hardness Tester',
      category: 'Hardness Testing',
      specs: ['Multiple ball sizes', 'Automated loading', 'Digital display', 'ASTM E10 compliant'],
      price_hint: 'Request a quote',
      description: 'High-precision Brinell hardness tester with automated testing capabilities.',
      standards: ['ASTM E10', 'ISO 6506'],
      image: '/images/brinell.jpg'
    },
    {
      id: 'HTUS-VIC-020',
      title: 'Vickers Hardness Tester',
      category: 'Hardness Testing',
      specs: ['Micro and macro loads', 'High magnification', 'Automated stage', 'ISO compliant'],
      price_hint: 'Request a quote',
      description: 'Advanced Vickers hardness tester for micro and macro hardness testing.',
      standards: ['ASTM E384', 'ISO 6507'],
      image: '/images/vickers.jpg'
    }
  ]

  const categories = ['All', ...Array.from(new Set(products.map(p => p.category)))]
  const allStandards = Array.from(new Set(products.flatMap(p => p.standards))).sort()

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.specs.some(spec => spec.toLowerCase().includes(searchTerm.toLowerCase()))
      
      const matchesCategory = selectedCategory === '' || product.category === selectedCategory
      
      return matchesSearch && matchesCategory
    })
  }, [searchTerm, selectedCategory, products])

  return (
    <div className="min-h-screen pt-16 bg-bg">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-7xl mx-auto"
        >
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-display font-bold text-gradient mb-6">
              Materials Testing Equipment
            </h1>
            <p className="text-lg text-muted max-w-3xl mx-auto">
              Professional-grade testing equipment for laboratories and manufacturing facilities. 
              All equipment meets ASTM, ISO, and ASME standards with NIST-traceable calibration.
            </p>
          </div>

          {/* Search and Filters */}
          <div className="bg-card border border-muted/10 rounded-xl p-6 mb-8">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search */}
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search products, specifications, or standards..."
                  className="input-field w-full pl-12 pr-4"
                />
              </div>

              {/* Category Filter */}
              <div className="lg:w-64">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="input-field w-full"
                >
                  {categories.map(category => (
                    <option key={category} value={category === 'All' ? '' : category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              {/* Filter Toggle */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="btn-secondary flex items-center space-x-2"
              >
                <Filter className="w-4 h-4" />
                <span>Filters</span>
              </button>
            </div>

            {/* Advanced Filters */}
            <motion.div
              initial={false}
              animate={{ height: showFilters ? 'auto' : 0 }}
              className="overflow-hidden"
            >
              <div className="pt-6 border-t border-muted/20 mt-6">
                <h3 className="text-sm font-medium text-text mb-4">Standards Compliance</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {allStandards.map(standard => (
                    <label key={standard} className="flex items-center space-x-2 text-sm">
                      <input
                        type="checkbox"
                        className="w-4 h-4 text-brand bg-surface border-muted rounded focus:ring-brand"
                      />
                      <span className="text-muted">{standard}</span>
                    </label>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Results Count */}
          <div className="flex justify-between items-center mb-6">
            <p className="text-muted">
              Showing {filteredProducts.length} of {products.length} products
            </p>
            <div className="text-sm text-muted">
              All prices USD • Quotes available
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="card hover:scale-105 transition-transform duration-300"
              >
                {/* Product Image */}
                <div className="relative h-48 mb-6 rounded-lg overflow-hidden bg-surface">
                  <div className="absolute inset-0 bg-gradient-to-br from-brand/10 to-brandAccent/10 flex items-center justify-center">
                    <div className="w-16 h-16 bg-brand/20 rounded-full flex items-center justify-center">
                      <span className="text-2xl font-bold text-brand">H</span>
                    </div>
                  </div>
                </div>

                {/* Product Info */}
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-semibold text-text mb-2">
                      {product.title}
                    </h3>
                    <p className="text-sm text-brand font-medium mb-2">
                      {product.category}
                    </p>
                    <p className="text-muted text-sm leading-relaxed">
                      {product.description}
                    </p>
                  </div>

                  {/* Key Specs */}
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium text-text">Key Specifications:</h4>
                    {product.specs.slice(0, 3).map((spec, specIndex) => (
                      <div key={specIndex} className="flex items-center space-x-2 text-sm text-muted">
                        <CheckCircle className="w-4 h-4 text-brand flex-shrink-0" />
                        <span>{spec}</span>
                      </div>
                    ))}
                  </div>

                  {/* Standards */}
                  <div className="flex flex-wrap gap-2">
                    {product.standards.slice(0, 2).map((standard, stdIndex) => (
                      <span
                        key={stdIndex}
                        className="px-2 py-1 bg-brand/10 text-brand text-xs rounded-full"
                      >
                        {standard}
                      </span>
                    ))}
                    {product.standards.length > 2 && (
                      <span className="px-2 py-1 bg-muted/10 text-muted text-xs rounded-full">
                        +{product.standards.length - 2} more
                      </span>
                    )}
                  </div>

                  {/* Price and CTA */}
                  <div className="pt-4 border-t border-muted/20">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-brand font-medium">{product.price_hint}</span>
                      <span className="text-xs text-muted">SKU: {product.id}</span>
                    </div>
                    <button className="btn-primary w-full group">
                      Request Quote
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* No Results */}
          {filteredProducts.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <div className="w-20 h-20 bg-muted/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="w-10 h-10 text-muted" />
              </div>
              <h3 className="text-xl font-semibold text-text mb-2">No products found</h3>
              <p className="text-muted mb-6">
                Try adjusting your search criteria or contact our sales team for assistance.
              </p>
              <button className="btn-primary">
                Contact Sales
              </button>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  )
}

