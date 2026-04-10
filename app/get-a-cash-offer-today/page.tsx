import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LeadForm from "@/components/LeadForm";

export const metadata = {
  title: "Get A Cash Offer Today | Sell To Adam",
  description:
    "Get a no-obligation cash offer for your MA or CT home within 24 hours.",
};

export default function CashOfferPage() {
  return (
    <main>
      <Header />
      <section className="bg-gradient-to-br from-brand-green-darker to-brand-green py-16 md:py-20">
        <div className="container-narrow grid md:grid-cols-2 gap-10 items-center">
          <div className="text-white">
            <h1 className="text-4xl md:text-5xl font-extrabold">
              Get Your Cash Offer Today
            </h1>
            <p className="mt-6 text-lg text-white/90">
              Fill out the form and we&apos;ll get back to you within 24 hours
              with a fair, no-obligation all-cash offer on your property.
            </p>
            <div className="mt-8">
              <a
                href="tel:+14134231110"
                className="text-2xl font-bold text-brand-gold hover:text-white"
              >
                📞 (413) 423-1110
              </a>
            </div>
          </div>
          <LeadForm variant="full" submitLabel="Get My Cash Offer" />
        </div>
      </section>
      <Footer />
    </main>
  );
}
