import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Testimonials from "@/components/Testimonials";
import FinalCTA from "@/components/FinalCTA";

export const metadata = { title: "Reviews | Sell To Adam" };

export default function ReviewsPage() {
  return (
    <main>
      <Header />

      {/* Angled hero */}
      <section
        className="relative h-72 md:h-96"
        style={{ clipPath: "polygon(0 0, 100% 0, 100% 85%, 0 100%)" }}
      >
        <Image
          src="/neighborhood.webp"
          alt="Springfield MA neighborhood"
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative h-full flex flex-col items-center justify-center text-center text-white px-4">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight drop-shadow">
            Our Reviews
          </h1>
          <p className="mt-3 text-lg md:text-2xl font-semibold tracking-widest uppercase text-brand-gold drop-shadow">
            People Love Us And So Will You!
          </p>
          <div className="mt-4 flex gap-1" aria-label="5 star rating">
            {[1, 2, 3, 4, 5].map((i) => (
              <svg
                key={i}
                className="w-8 h-8 text-brand-gold drop-shadow"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
              </svg>
            ))}
          </div>
        </div>
      </section>

      {/* Push content down so it clears the angled clip */}
      <div className="-mt-8 md:-mt-12" />

      <Testimonials />
      <FinalCTA />
      <Footer />
    </main>
  );
}
