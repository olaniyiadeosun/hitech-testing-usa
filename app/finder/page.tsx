'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, Sparkles, Loader2, CheckCircle, ArrowRight } from 'lucide-react'
import toast from 'react-hot-toast'

interface ProductResult {
  id: string
  title: string
  category: string
  specs: string[]
  price_hint: string
  match_score: number
  description: string
}

export default function FinderPage() {
  const [formData, setFormData] = useState({
    material: '',
    test_type: '',
    capacity: '',
    standard: '',
    extras: ''
  })
  const [aiQuery, setAiQuery] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [results, setResults] = useState<ProductResult[]>([])
  const [hasSearched, setHasSearched] = useState(false)

  // Sample product data - this would be loaded from your CSV file
  const sampleProducts: ProductResult[] = [
    {
      id: 'HTUS-PR-HT-001',
      title: 'Portable Hardness Tester',
      category: 'Hardness Testing',
      specs: ['HB/HRC/HRB scales', '±1 HRC accuracy', 'Digital display', 'Portable design'],
      price_hint: 'Request a quote',
      match_score: 95,
      description: 'Lightweight, battery-powered hardness tester for field applications. Ideal for quality control and material verification.'
    },
    {
      id: 'HTUS-ROC-022',
      title: 'Rockwell Hardness Tester (Digital)',
      category: 'Hardness Testing',
      specs: ['ASTM E18 / ISO 6508', '0.1 HR resolution', 'Automated testing', 'Touch screen interface'],
      price_hint: 'Request a quote',
      match_score: 88,
      description: 'High-precision digital Rockwell hardness tester with automated testing capabilities and comprehensive reporting.'
    },
    {
      id: 'HTUS-UTM-050',
      title: '50 kN Universal Testing Machine',
      category: 'UTM',
      specs: ['ASTM E8/E8M compliant', 'Closed-loop control', 'Digital extensometer', 'Advanced software'],
      price_hint: 'Request a quote',
      match_score: 92,
      description: 'Versatile universal testing machine for tensile, compression, and flexural testing of various materials.'
    },
    {
      id: 'HTUS-DYN-040',
      title: 'Dynamic Balancing Machine',
      category: 'Balancing',
      specs: ['Up to 50 kg capacity', 'ISO 2953 accuracy', 'Real-time display', 'Automatic correction'],
      price_hint: 'Request a quote',
      match_score: 85,
      description: 'Precision dynamic balancing machine for rotors, fans, and other rotating components.'
    }
  ]

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setHasSearched(true)

    // Simulate AI processing
    setTimeout(() => {
      const filteredResults = sampleProducts.filter(product => {
        const searchTerms = [
          formData.material.toLowerCase(),
          formData.test_type.toLowerCase(),
          formData.capacity.toLowerCase(),
          formData.standard.toLowerCase()
        ].join(' ')

        return searchTerms.includes('hardness') || 
               searchTerms.includes('tensile') || 
               searchTerms.includes('aluminum') ||
               searchTerms.includes('utm') ||
               searchTerms.includes('balancing')
      })
      
      setResults(filteredResults)
      setIsLoading(false)
      
      if (filteredResults.length === 0) {
        toast.error('No matching equipment found. Please try different specifications.')
      } else {
        toast.success(`Found ${filteredResults.length} matching equipment`)
      }
    }, 2000)
  }

  const handleAiSearch = async () => {
    if (!aiQuery.trim()) {
      toast.error('Please describe what you need to test')
      return
    }

    setIsLoading(true)
    setHasSearched(true)

    // Simulate AI processing
    setTimeout(() => {
      const filteredResults = sampleProducts.filter(product =>
        aiQuery.toLowerCase().includes('hardness') || 
        aiQuery.toLowerCase().includes('tensile') ||
        aiQuery.toLowerCase().includes('aluminum') ||
        aiQuery.toLowerCase().includes('utm') ||
        aiQuery.toLowerCase().includes('balancing')
      )
      
      setResults(filteredResults)
      setIsLoading(false)
      
      if (filteredResults.length === 0) {
        toast.error('No matching equipment found. Please try different keywords.')
      } else {
        toast.success(`Found ${filteredResults.length} matching equipment`)
      }
    }, 2000)
  }

  return (
    <div className="min-h-screen pt-16 bg-bg">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-6xl mx-auto"
        >
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-4">
              <Sparkles className="w-8 h-8 text-brand mr-3" />
              <h1 className="text-4xl md:text-5xl font-display font-bold text-gradient">
                AI Product Finder
              </h1>
            </div>
            <p className="text-lg text-muted max-w-2xl mx-auto">
              Tell us about your testing requirements and we'll recommend the perfect equipment for your needs
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Form Section */}
            <div className="space-y-8">
              {/* Structured Form */}
              <div className="bg-card border border-muted/10 rounded-xl p-8">
                <h2 className="text-2xl font-semibold text-text mb-6">Specification Form</h2>
                <form onSubmit={handleFormSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-text mb-2">
                      Material Type
                    </label>
                    <input
                      type="text"
                      value={formData.material}
                      onChange={(e) => setFormData({...formData, material: e.target.value})}
                      placeholder="e.g., Aluminum, Steel, Plastic"
                      className="input-field w-full"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-text mb-2">
                      Test Type
                    </label>
                    <select
                      value={formData.test_type}
                      onChange={(e) => setFormData({...formData, test_type: e.target.value})}
                      className="input-field w-full"
                    >
                      <option value="">Select test type</option>
                      <option value="Hardness">Hardness</option>
                      <option value="Tensile">Tensile</option>
                      <option value="Compression">Compression</option>
                      <option value="Balancing">Balancing</option>
                      <option value="Aggregate">Aggregate</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-text mb-2">
                      Capacity / Range
                    </label>
                    <input
                      type="text"
                      value={formData.capacity}
                      onChange={(e) => setFormData({...formData, capacity: e.target.value})}
                      placeholder="e.g., 50 kN, Up to 1000 HRC"
                      className="input-field w-full"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-text mb-2">
                      Standard (ASTM/ISO/ASME)
                    </label>
                    <input
                      type="text"
                      value={formData.standard}
                      onChange={(e) => setFormData({...formData, standard: e.target.value})}
                      placeholder="e.g., ASTM E8, ISO 6508"
                      className="input-field w-full"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-text mb-2">
                      Accessories / Extras
                    </label>
                    <textarea
                      value={formData.extras}
                      onChange={(e) => setFormData({...formData, extras: e.target.value})}
                      placeholder="e.g., Grips, extensometer, software"
                      className="input-field w-full h-24 resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="btn-primary w-full flex items-center justify-center space-x-2"
                  >
                    {isLoading ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <>
                        <Search className="w-5 h-5" />
                        <span>Find Equipment</span>
                      </>
                    )}
                  </button>
                </form>
              </div>

              {/* AI Assist */}
              <div className="bg-surface border border-muted/10 rounded-xl p-8">
                <h3 className="text-xl font-semibold text-text mb-4">Or describe your need in plain English</h3>
                <div className="space-y-4">
                  <textarea
                    value={aiQuery}
                    onChange={(e) => setAiQuery(e.target.value)}
                    placeholder="Tell us what you need to test..."
                    className="input-field w-full h-32 resize-none"
                  />
                  <button
                    onClick={handleAiSearch}
                    disabled={isLoading}
                    className="btn-secondary w-full flex items-center justify-center space-x-2"
                  >
                    {isLoading ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <>
                        <Sparkles className="w-5 h-5" />
                        <span>AI Search</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Results Section */}
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-text">Recommended Equipment</h2>
              
              {!hasSearched ? (
                <div className="bg-surface border border-muted/10 rounded-xl p-12 text-center">
                  <div className="w-16 h-16 bg-muted/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Search className="w-8 h-8 text-muted" />
                  </div>
                  <h3 className="text-lg font-semibold text-text mb-2">Ready to help you find equipment</h3>
                  <p className="text-muted">
                    Fill out the form or describe your testing needs to see recommended equipment.
                  </p>
                </div>
              ) : isLoading ? (
                <div className="bg-surface border border-muted/10 rounded-xl p-12 text-center">
                  <Loader2 className="w-8 h-8 animate-spin text-brand mx-auto mb-4" />
                  <p className="text-muted">Analyzing your requirements...</p>
                </div>
              ) : results.length > 0 ? (
                <div className="space-y-6">
                  {results.map((product, index) => (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="card hover:border-brand/50"
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h4 className="text-lg font-semibold text-text mb-1">
                            {product.title}
                          </h4>
                          <p className="text-muted text-sm mb-2">{product.category}</p>
                          <p className="text-muted text-sm">{product.description}</p>
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
                            <CheckCircle className="w-4 h-4 text-brand" />
                            <span>{spec}</span>
                          </div>
                        ))}
                      </div>
                      
                      <div className="flex gap-3">
                        <button className="btn-primary flex-1 group">
                          Request Quote
                          <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                        </button>
                        <button className="btn-secondary">
                          Learn More
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="bg-surface border border-muted/10 rounded-xl p-12 text-center">
                  <div className="w-16 h-16 bg-muted/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Search className="w-8 h-8 text-muted" />
                  </div>
                  <h3 className="text-lg font-semibold text-text mb-2">No matches found</h3>
                  <p className="text-muted">
                    Try different specifications or contact our sales team for assistance.
                  </p>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

