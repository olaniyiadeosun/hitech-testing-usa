'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Phone, Mail, MapPin, Clock, Send, CheckCircle } from 'lucide-react'
import toast from 'react-hot-toast'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    city: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      toast.success('Thank you! We\'ll get back to you within 24 hours.')
      setFormData({
        name: '',
        company: '',
        email: '',
        phone: '',
        city: '',
        message: ''
      })
    }, 2000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
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
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-display font-bold text-gradient mb-6">
              Contact Us
            </h1>
            <p className="text-lg text-muted max-w-3xl mx-auto">
              Ready to discuss your materials testing needs? Get in touch with our technical experts 
              for personalized equipment recommendations and quotes.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-card border border-muted/10 rounded-xl p-8"
            >
              <h2 className="text-2xl font-semibold text-text mb-6">Get a Quote</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-text mb-2">
                      Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="input-field w-full"
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text mb-2">
                      Company
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="input-field w-full"
                      placeholder="Your company name"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-text mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="input-field w-full"
                      placeholder="your.email@company.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text mb-2">
                      Phone
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="input-field w-full"
                      placeholder="(555) 123-4567"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-text mb-2">
                    City, State
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className="input-field w-full"
                    placeholder="City, State"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-text mb-2">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="input-field w-full resize-none"
                    placeholder="Describe your testing requirements, materials, standards, or any specific questions..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary w-full flex items-center justify-center space-x-2"
                >
                  {isSubmitting ? (
                    <div className="w-5 h-5 border-2 border-bg border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </form>
            </motion.div>

            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="space-y-8"
            >
              {/* Contact Methods */}
              <div className="bg-surface border border-muted/10 rounded-xl p-8">
                <h3 className="text-xl font-semibold text-text mb-6">Contact Information</h3>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-brand/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Phone className="w-6 h-6 text-brand" />
                    </div>
                    <div>
                      <h4 className="text-text font-medium mb-1">Phone</h4>
                      <a href="tel:+18005550123" className="text-muted hover:text-brand transition-colors">
                        (800) 555-0123
                      </a>
                      <p className="text-sm text-muted mt-1">Mon-Fri 8AM-6PM EST</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-brandAccent/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Mail className="w-6 h-6 text-brandAccent" />
                    </div>
                    <div>
                      <h4 className="text-text font-medium mb-1">Email</h4>
                      <a href="mailto:sales@hitechtesting.com" className="text-muted hover:text-brand transition-colors">
                        sales@hitechtesting.com
                      </a>
                      <p className="text-sm text-muted mt-1">24-hour response time</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-warning/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6 text-warning" />
                    </div>
                    <div>
                      <h4 className="text-text font-medium mb-1">Location</h4>
                      <p className="text-muted">United States</p>
                      <p className="text-sm text-muted mt-1">Nationwide service coverage</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-muted/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Clock className="w-6 h-6 text-muted" />
                    </div>
                    <div>
                      <h4 className="text-text font-medium mb-1">Business Hours</h4>
                      <p className="text-muted">Monday - Friday: 8:00 AM - 6:00 PM EST</p>
                      <p className="text-sm text-muted mt-1">Emergency support available</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Why Choose Us */}
              <div className="bg-card border border-muted/10 rounded-xl p-8">
                <h3 className="text-xl font-semibold text-text mb-6">Why Choose Hitech Testing USA?</h3>
                <div className="space-y-4">
                  {[
                    'US-based technical support and service',
                    'NIST-traceable calibration certificates',
                    'ASTM, ISO, and ASME compliant equipment',
                    'Fast shipping and installation nationwide',
                    'Comprehensive operator training included',
                    'Annual service plans available'
                  ].map((benefit, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-brand flex-shrink-0" />
                      <span className="text-muted">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-gradient-to-br from-brand/5 to-brandAccent/5 border border-muted/10 rounded-xl p-8">
                <h3 className="text-xl font-semibold text-text mb-6">Quick Actions</h3>
                <div className="space-y-4">
                  <button className="w-full btn-primary">
                    Schedule a Demo
                  </button>
                  <button className="w-full btn-secondary">
                    Download Catalog
                  </button>
                  <button className="w-full btn-secondary">
                    Request W-9
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

