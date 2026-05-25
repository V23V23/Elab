import HeroSection from './sections/HeroSection'
import FeaturesSection from './sections/FeaturesSection'
import ProductShowcase from './sections/ProductShowcase'
import DataDashboard from './sections/DataDashboard'
import AppIntegration from './sections/AppIntegration'
import AboutSection from './sections/AboutSection'
import CTASection from './sections/CTASection'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <ProductShowcase />
      <DataDashboard />
      <AppIntegration />
      <AboutSection />
      <CTASection />
    </>
  )
}
