import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LeadForm from "@/components/LeadForm";

export const metadata = { title: "Contact Us | Sell To Adam" };

export default function ContactPage() {
  return (
    <main>
      <Header />
      <section className="py-16 md:py-20">
        <div className="container-narrow max-w-3xl">
          <h1 className="section-heading text-center">Contact Sell To Adam</h1>
          <p className="mt-4 text-lg text-center text-gray-700">
            Have a question or want to talk to Adam directly? Call us or
            send a message below.
          </p>
          <div className="mt-8 text-center">
            <a
              href="tel:+14134231110"
              className="text-3xl font-bold text-brand-green hover:text-brand-green-dark"
            >
              📞 (413) 423-1110
            </a>
          </div>
          <div className="mt-10">
            <LeadForm variant="full" submitLabel="Send Message" />
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
