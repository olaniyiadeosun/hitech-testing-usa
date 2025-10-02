import Link from 'next/link'
import { Phone, Mail, MapPin, Clock } from 'lucide-react'

export function Footer() {
  const footerLinks = {
    about: [
      { label: 'About', href: '/about' },
      { label: 'Quality & Compliance', href: '/quality' },
      { label: 'Careers', href: '/careers' },
    ],
    support: [
      { label: 'Contact', href: '/contact' },
      { label: 'Sitemap', href: '/sitemap' },
      { label: 'Manuals & Documentation', href: '/resources' },
    ],
    legal: [
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms of Service', href: '/terms' },
      { label: 'W-9 Available', href: '/w9' },
    ],
  }

  return (
    <footer className="bg-surface border-t border-muted/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-brand to-brandAccent rounded-lg flex items-center justify-center">
                <span className="text-bg font-bold text-sm">H</span>
              </div>
              <span className="text-xl font-display font-bold text-gradient">
                Hitech Testing USA
              </span>
            </Link>
            <p className="text-muted text-sm mb-4">
              Professional materials testing equipment for US labs and manufacturers. 
              NIST-traceable calibration and nationwide support since 1990.
            </p>
            <div className="space-y-2 text-sm text-muted">
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4" />
                <span>United States</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4" />
                <span>Mon-Fri 8AM-6PM EST</span>
              </div>
            </div>
          </div>

          {/* About */}
          <div>
            <h3 className="text-text font-semibold mb-4">About</h3>
            <ul className="space-y-2">
              {footerLinks.about.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-muted hover:text-brand transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-text font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-muted hover:text-brand transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-text font-semibold mb-4">Contact</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-sm">
                <Phone className="w-4 h-4 text-brand" />
                <a
                  href="tel:+18005550123"
                  className="text-muted hover:text-brand transition-colors"
                >
                  (800) 555-0123
                </a>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <Mail className="w-4 h-4 text-brand" />
                <a
                  href="mailto:sales@hitechtesting.com"
                  className="text-muted hover:text-brand transition-colors"
                >
                  sales@hitechtesting.com
                </a>
              </div>
            </div>
            
            <div className="mt-6">
              <Link href="/finder" className="btn-primary text-sm">
                Get a Quote
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-muted/20 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="flex flex-wrap gap-4 text-sm text-muted mb-4 md:mb-0">
            {footerLinks.legal.map((link, index) => (
              <Link
                key={link.href}
                href={link.href}
                className="hover:text-brand transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
          <p className="text-sm text-muted">
            © 2024 Hitech Testing USA, Inc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

