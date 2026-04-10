import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AboutSection from "@/components/AboutSection";
import FinalCTA from "@/components/FinalCTA";

export const metadata = { title: "Our Company | Sell To Adam" };

export default function OurCompanyPage() {
  return (
    <main>
      <Header />
      <section className="py-16">
        <div className="container-narrow max-w-3xl text-center">
          <h1 className="section-heading">About Sell To Adam</h1>
        </div>
      </section>
      <AboutSection />
      <FinalCTA />
      <Footer />
    </main>
  );
}
