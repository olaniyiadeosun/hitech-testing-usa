import { Hero } from '@/components/Hero'
import { CategoryGrid } from '@/components/CategoryGrid'
import { StandardsStrip } from '@/components/StandardsStrip'
import { AIProductFinder } from '@/components/AIProductFinder'
import { ServiceBlock } from '@/components/ServiceBlock'
import { ContactCta } from '@/components/ContactCta'

export default function HomePage() {
  return (
    <>
      <Hero
        headline="Materials Testing Equipment for US Labs & Manufacturers."
        subheadline="UTM, Rockwell/Brinell/Vickers hardness testers, dynamic balancing, and civil engineering lab systems—ASTM/ISO compliant with NIST-traceable calibration."
        primaryCta={{ label: "Find the right machine", to: "/finder" }}
        secondaryCta={{ label: "Talk to Sales", tel: "+1-800-555-0123" }}
        badges={["US-Based Support", "NIST-Traceable Calibration", "Since 1990"]}
      />

      <CategoryGrid
        title="Popular categories"
        items={[
          {
            title: "Portable Hardness Tester",
            slug: "portable-hardness",
            price_hint: "Request a quote",
            img: "/images/portable-hardness.jpg"
          },
          {
            title: "Rockwell Hardness Tester (HRC/HRB)",
            slug: "rockwell",
            price_hint: "Request a quote",
            img: "/images/rockwell.jpg"
          },
          {
            title: "Universal Testing Machine (UTM)",
            slug: "utm",
            price_hint: "Request a quote",
            img: "/images/utm.jpg"
          },
          {
            title: "Dynamic Balancing Machine",
            slug: "balancing",
            price_hint: "Request a quote",
            img: "/images/balancing.jpg"
          }
        ]}
        cta={{ label: "See all products", to: "/products" }}
      />

      <StandardsStrip
        standards={["ASTM E18", "ASTM E8/E8M", "ISO 6508", "ASTM D638", "ASME (as applicable)"]}
      />

      <AIProductFinder
        title="Describe your test — get the right machine"
        placeholder="e.g., Tensile test for aluminum coupons per ASTM E8 up to 50 kN, digital extensometer"
        cta={{ label: "Find my match" }}
      />

      <ServiceBlock
        title="Install • Train • Calibrate"
        points={[
          "Nationwide installation and operator training",
          "Annual service plans with NIST-traceable certificates",
          "Stocked US parts and fast turnaround"
        ]}
      />

      <ContactCta
        title="Need pricing or lead time?"
        subtitle="Get a formal USD quote with options and delivery estimates."
        primaryCta={{ label: "Request a Quote", to: "/contact" }}
        secondaryCta={{ label: "Call (800) 555-0123", tel: "+1-800-555-0123" }}
      />
    </>
  )
}

