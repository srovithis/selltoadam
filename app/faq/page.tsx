import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FinalCTA from "@/components/FinalCTA";

export const metadata = { title: "FAQ | Sell To Adam" };

export default function FAQPage() {
  return (
    <main>
      <Header />
      <section className="py-16 md:py-20">
        <div className="container-narrow max-w-3xl">
          <h1 className="section-heading text-center">
            Frequently Asked Questions
          </h1>
          <p className="mt-6 text-center text-gray-700 text-lg">
            FAQ content coming soon. For questions, call{" "}
            <a
              href="tel:+14134231110"
              className="text-brand-green font-bold underline"
            >
              (413) 423-1110
            </a>
            .
          </p>
        </div>
      </section>
      <FinalCTA />
      <Footer />
    </main>
  );
}
