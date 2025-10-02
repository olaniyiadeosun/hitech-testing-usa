'use client'

import { motion } from 'framer-motion'
import { Shield, Award, CheckCircle } from 'lucide-react'

interface StandardsStripProps {
  standards: string[]
}

export function StandardsStrip({ standards }: StandardsStripProps) {
  const icons = [Shield, Award, CheckCircle]
  
  return (
    <section className="py-16 bg-card border-y border-muted/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h3 className="text-2xl font-display font-bold text-text mb-2">
            Industry Standards Compliance
          </h3>
          <p className="text-muted">Our equipment meets and exceeds international testing standards</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {standards.map((standard, index) => {
            const Icon = icons[index % icons.length]
            return (
              <motion.div
                key={standard}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex flex-col items-center text-center p-4 rounded-lg bg-surface border border-muted/10 hover:border-brand/30 transition-all duration-300"
              >
                <div className="w-12 h-12 bg-brand/10 rounded-full flex items-center justify-center mb-3">
                  <Icon className="w-6 h-6 text-brand" />
                </div>
                <span className="text-sm font-medium text-text">{standard}</span>
              </motion.div>
            )
          })}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-8 text-center"
        >
          <p className="text-muted text-sm">
            All equipment comes with NIST-traceable calibration certificates and meets ASTM, ISO, and ASME requirements
          </p>
        </motion.div>
      </div>
    </section>
  )
}

