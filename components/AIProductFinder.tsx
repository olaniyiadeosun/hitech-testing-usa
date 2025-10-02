'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Sparkles, Loader2 } from 'lucide-react'
import toast from 'react-hot-toast'
import { productApi, ProductRecommendation } from '@/lib/api'

interface AIProductFinderProps {
  title: string
  placeholder: string
  cta: { label: string }
}

// ProductResult is now imported from api.ts

export function AIProductFinder({ title, placeholder, cta }: AIProductFinderProps) {
  const [query, setQuery] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [results, setResults] = useState<ProductRecommendation[]>([])
  const [hasSearched, setHasSearched] = useState(false)

  const handleSearch = async () => {
    if (!query.trim()) {
      toast.error('Please describe what you need to test')
      return
    }

    setIsLoading(true)
    setHasSearched(true)

    try {
      // Call Flask backend API
      const response = await productApi.search(query)
      
      setResults(response.recommendations)
      setIsLoading(false)
      
      if (response.recommendations.length === 0) {
        toast.error('No matching equipment found. Please try different keywords.')
      } else {
        toast.success(`Found ${response.recommendations.length} matching equipment`)
      }
    } catch (error) {
      console.error('Search error:', error)
      setIsLoading(false)
      toast.error('Search failed. Please try again or contact our sales team.')
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  return (
    <section className="py-20 bg-bg">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-4">
              <Sparkles className="w-8 h-8 text-brand mr-3" />
              <h2 className="text-3xl md:text-4xl font-display font-bold text-text">
                {title}
              </h2>
            </div>
            <p className="text-muted text-lg">
              Our AI analyzes your testing requirements and recommends the perfect equipment
            </p>
          </div>

          {/* Search Input */}
          <div className="relative mb-8">
            <div className="flex gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder={placeholder}
                  className="input-field w-full pl-12 pr-4 py-4 text-lg"
                />
              </div>
              <button
                onClick={handleSearch}
                disabled={isLoading}
                className="btn-primary px-8 py-4 flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    <span>{cta.label}</span>
                    <Search className="w-5 h-5" />
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Results */}
          <AnimatePresence>
            {hasSearched && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
              >
                {isLoading ? (
                  <div className="text-center py-12">
                    <Loader2 className="w-8 h-8 animate-spin text-brand mx-auto mb-4" />
                    <p className="text-muted">Analyzing your requirements...</p>
                  </div>
                ) : results.length > 0 ? (
                  <>
                    <h3 className="text-xl font-semibold text-text mb-6">
                      Recommended Equipment ({results.length})
                    </h3>
                    <div className="grid gap-6">
                      {results.map((product, index) => (
                        <motion.div
                          key={product.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                          className="card hover:border-brand/50"
                        >
                          <div className="flex justify-between items-start mb-4">
                            <div>
                              <h4 className="text-lg font-semibold text-text mb-1">
                                {product.title}
                              </h4>
                              <p className="text-muted text-sm mb-2">{product.category}</p>
                              <p className="text-muted text-sm">{product.reasoning}</p>
                            </div>
                            <div className="text-right">
                              <div className="text-brand font-medium">{product.price_hint}</div>
                              <div className="text-xs text-muted">
                                {product.match_score}% match
                              </div>
                            </div>
                          </div>
                          
                          <div className="space-y-2 mb-4">
                            {product.specs.map((spec, specIndex) => (
                              <div key={specIndex} className="flex items-center space-x-2 text-sm text-muted">
                                <div className="w-1.5 h-1.5 bg-brand rounded-full"></div>
                                <span>{spec}</span>
                              </div>
                            ))}
                          </div>

                          {product.accessories.length > 0 && (
                            <div className="mb-4">
                              <h5 className="text-sm font-medium text-text mb-2">Recommended Accessories:</h5>
                              <div className="flex flex-wrap gap-2">
                                {product.accessories.slice(0, 3).map((accessory, accIndex) => (
                                  <span key={accIndex} className="px-2 py-1 bg-brand/10 text-brand text-xs rounded-full">
                                    {accessory}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                          
                          <div className="flex gap-3">
                            <button className="btn-primary flex-1">
                              Request Quote
                            </button>
                            <button className="btn-secondary">
                              Learn More
                            </button>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </>
                ) : (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-muted/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Search className="w-8 h-8 text-muted" />
                    </div>
                    <h3 className="text-lg font-semibold text-text mb-2">No matches found</h3>
                    <p className="text-muted">
                      Try describing your testing needs in different words, or contact our sales team for assistance.
                    </p>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
