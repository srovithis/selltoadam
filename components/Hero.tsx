import Image from "next/image";
import LeadForm from "./LeadForm";

export default function Hero() {
  return (
    <section className="relative py-16 md:py-24">
      <Image
        src="/hero-bg.webp"
        alt="Springfield MA neighborhood"
        fill
        className="object-cover object-center"
        priority
      />
      <div className="absolute inset-0 bg-black/50" />
      <div className="container-narrow relative grid md:grid-cols-2 gap-10 items-center">
        <div className="text-white">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight">
            Sell Your House Fast In MA &amp; CT
          </h1>
          <p className="mt-6 text-lg md:text-xl text-white/90 max-w-xl">
            No Fees, No Commissions, No Stress. Sell Your House Fast To A Cash
            Home Buyer.
          </p>
          <div className="mt-8 hidden md:flex items-center gap-3 text-white/80">
            <svg className="w-5 h-5 text-brand-gold" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
            </svg>
            <span>Fair cash offer within 24 hours</span>
          </div>
        </div>
        <div>
          <LeadForm variant="hero" submitLabel="Get My Cash Offer" />
        </div>
      </div>
    </section>
  );
}
