'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Phone, Mail, ArrowRight } from 'lucide-react'

interface ContactCtaProps {
  title: string
  subtitle: string
  primaryCta: { label: string; to: string }
  secondaryCta: { label: string; tel: string }
}

export function ContactCta({ title, subtitle, primaryCta, secondaryCta }: ContactCtaProps) {
  return (
    <section className="py-20 bg-gradient-to-br from-brand/5 to-brandAccent/5">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center"
        >
          {/* Content */}
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-text mb-6">
              {title}
            </h2>
            <p className="text-lg text-muted leading-relaxed">
              {subtitle}
            </p>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Link href={primaryCta.to} className="btn-primary group">
              {primaryCta.label}
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
            <a
              href={`tel:${secondaryCta.tel}`}
              className="btn-secondary group"
            >
              <Phone className="w-4 h-4 mr-2" />
              {secondaryCta.label}
            </a>
          </div>

          {/* Contact Methods */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            <div className="bg-card border border-muted/10 rounded-xl p-6">
              <div className="flex items-center justify-center mb-4">
                <div className="w-12 h-12 bg-brand/10 rounded-full flex items-center justify-center">
                  <Phone className="w-6 h-6 text-brand" />
                </div>
              </div>
              <h3 className="text-lg font-semibold text-text mb-2">Phone Support</h3>
              <p className="text-muted text-sm mb-4">
                Speak directly with our technical experts
              </p>
              <a
                href="tel:+18005550123"
                className="text-brand hover:text-brandAccent transition-colors font-medium"
              >
                (800) 555-0123
              </a>
            </div>

            <div className="bg-card border border-muted/10 rounded-xl p-6">
              <div className="flex items-center justify-center mb-4">
                <div className="w-12 h-12 bg-brandAccent/10 rounded-full flex items-center justify-center">
                  <Mail className="w-6 h-6 text-brandAccent" />
                </div>
              </div>
              <h3 className="text-lg font-semibold text-text mb-2">Email Support</h3>
              <p className="text-muted text-sm mb-4">
                Get detailed quotes and technical information
              </p>
              <a
                href="mailto:sales@hitechtesting.com"
                className="text-brand hover:text-brandAccent transition-colors font-medium"
              >
                sales@hitechtesting.com
              </a>
            </div>
          </motion.div>

          {/* Additional Info */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-12 pt-8 border-t border-muted/20"
          >
            <p className="text-sm text-muted">
              Response time: Same business day for quotes • W-9 available on request • Net 30 terms available
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

