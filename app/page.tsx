import { Hero } from '@/components/hero'
import { FeaturedMenu } from '@/components/featured-menu'
import { HowToOrder } from '@/components/how-to-order'
import { Features } from '@/components/features'
import { Gallery } from '@/components/gallery'
import { Testimonials } from '@/components/testimonials'
import { Partners } from '@/components/partners'
import { Newsletter } from '@/components/newsletter'
import { Location } from '@/components/location'
import { CTA } from '@/components/cta'
import { Footer } from '@/components/footer'

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedMenu />
      <HowToOrder />
      <Features />
      <Gallery />
      <Testimonials />
      <Partners />
      <Newsletter />
      <Location />
      <CTA />
      <Footer />
    </>
  )
}