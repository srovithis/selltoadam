import Link from "next/link";

export default function FinalCTA() {
  return (
    <section className="bg-brand-green py-16 md:py-20">
      <div className="container-narrow text-center text-white">
        <h2 className="text-3xl md:text-5xl font-bold">
          Ready to Sell Your MA &amp; CT Home?
        </h2>
        <p className="mt-6 text-xl text-white/90">
          Let us take the stress out of selling your property.
        </p>
        <Link
          href="/get-a-cash-offer-today"
          className="btn-gold text-lg md:text-xl mt-10 px-10 py-5"
        >
          Get Your Free Offer →
        </Link>
        <div className="mt-8">
          <a
            href="tel:+14134231110"
            className="text-lg text-white/90 hover:text-brand-gold"
          >
            Or call us: <span className="font-bold">(413) 423-1110</span>
          </a>
        </div>
      </div>
    </section>
  );
}
