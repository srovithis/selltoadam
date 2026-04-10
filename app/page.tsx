import Header from "@/components/Header";
import Hero from "@/components/Hero";
import MediaLogos from "@/components/MediaLogos";
import VideoSection from "@/components/VideoSection";
import Testimonials from "@/components/Testimonials";
import AboutSection from "@/components/AboutSection";
import MiddleForm from "@/components/MiddleForm";
import HowItWorks from "@/components/HowItWorks";
import ComparisonTable from "@/components/ComparisonTable";
import WhyUs from "@/components/WhyUs";
import SituationsGrid from "@/components/SituationsGrid";
import BodyCopy from "@/components/BodyCopy";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <main>
      <Header />
      <Hero />
      <MediaLogos />
      <VideoSection />
      <Testimonials />
      <AboutSection />
      <MiddleForm />
      <HowItWorks />
      <ComparisonTable />
      <WhyUs />
      <SituationsGrid />
      <BodyCopy />
      <FinalCTA />
      <Footer />
    </main>
  );
}
