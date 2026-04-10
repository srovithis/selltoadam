import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Testimonials from "@/components/Testimonials";
import FinalCTA from "@/components/FinalCTA";

export const metadata = { title: "Reviews | Sell To Adam" };

export default function ReviewsPage() {
  return (
    <main>
      <Header />
      <section className="py-16">
        <div className="container-narrow max-w-3xl text-center">
          <h1 className="section-heading">What Our Clients Say</h1>
          <p className="mt-4 text-lg text-gray-700">
            Real feedback from homeowners who sold their house to Sell To
            Adam.
          </p>
        </div>
      </section>
      <Testimonials />
      <FinalCTA />
      <Footer />
    </main>
  );
}
