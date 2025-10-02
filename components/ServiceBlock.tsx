'use client'

import { motion } from 'framer-motion'
import { Wrench, GraduationCap, Award, Truck, Clock, Shield } from 'lucide-react'

interface ServiceBlockProps {
  title: string
  points: string[]
}

export function ServiceBlock({ title, points }: ServiceBlockProps) {
  const icons = [Wrench, GraduationCap, Award, Truck, Clock, Shield]

  return (
    <section className="py-20 bg-surface">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-text mb-6">
              {title}
            </h2>
          </div>

          {/* Service Points */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {points.map((point, index) => {
              const Icon = icons[index % icons.length]
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="w-16 h-16 bg-brand/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Icon className="w-8 h-8 text-brand" />
                  </div>
                  <p className="text-text text-lg leading-relaxed">{point}</p>
                </motion.div>
              )
            })}
          </div>

          {/* Additional Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-16 text-center"
          >
            <div className="bg-card border border-muted/10 rounded-xl p-8">
              <h3 className="text-xl font-semibold text-text mb-4">
                Complete Service Package
              </h3>
              <p className="text-muted leading-relaxed">
                From initial consultation to ongoing maintenance, we provide comprehensive support 
                for all your materials testing needs. Our US-based team ensures fast response times 
                and expert technical assistance.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

