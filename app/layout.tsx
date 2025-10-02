import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { Toaster } from 'react-hot-toast'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Materials Testing Equipment | Hitech Testing USA',
  description: 'UTM, hardness testers, dynamic balancing and civil engineering lab equipment for US labs and manufacturers. Fast quotes, installation, and NIST-traceable calibration.',
  keywords: 'materials testing, UTM, hardness tester, dynamic balancing, ASTM, ISO, NIST calibration',
  authors: [{ name: 'Hitech Testing USA' }],
  openGraph: {
    title: 'Materials Testing Equipment | Hitech Testing USA',
    description: 'Professional materials testing equipment for US labs and manufacturers',
    type: 'website',
    locale: 'en_US',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={inter.className}>
        <Navbar />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
        <Toaster 
          position="top-right"
          toastOptions={{
            style: {
              background: '#121926',
              color: '#E8F1FF',
              border: '1px solid #2BDFFF',
            },
          }}
        />
      </body>
    </html>
  )
}

