import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import ServiceOverview from "@/components/sections/ServiceOverview";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import TestimonialSection from "@/components/sections/TestimonialSection";
import BeforeAfterGallery from "@/components/sections/BeforeAfterGallery";
import CTABanner from "@/components/sections/CTABanner";
import LocationsPreview from "@/components/sections/LocationsPreview";
import FAQ from "@/components/sections/FAQ";
import ExitIntentPopup from "@/components/ui/ExitIntentPopup";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <ServiceOverview />
        <WhyChooseUs />
        <TestimonialSection />
        <BeforeAfterGallery />
        <CTABanner />
        <LocationsPreview />
        <FAQ />
      </main>
      <Footer />
      <ExitIntentPopup />
    </>
  );
}
