import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HowItWorks from "@/components/HowItWorks";
import FinalCTA from "@/components/FinalCTA";

export const metadata = { title: "How We Buy Houses | Sell To Adam" };

export default function HowPage() {
  return (
    <main>
      <Header />
      <section className="py-16 md:py-20">
        <div className="container-narrow max-w-3xl text-center">
          <h1 className="section-heading">How Our Home Buying Process Works</h1>
          <p className="mt-6 text-lg text-gray-700">
            We&apos;ve made selling your home simple, transparent, and fast.
            Here&apos;s exactly what to expect when you work with us.
          </p>
        </div>
      </section>
      <HowItWorks />
      <FinalCTA />
      <Footer />
    </main>
  );
}
