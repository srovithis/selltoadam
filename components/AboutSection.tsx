import Link from "next/link";
import Image from "next/image";

export default function AboutSection() {
  return (
    <section className="bg-white py-16 md:py-20">
      <div className="container-narrow grid md:grid-cols-2 gap-10 items-center">
        <div className="order-2 md:order-1">
          <div className="relative w-full aspect-[2/3] max-w-sm mx-auto rounded-lg overflow-hidden">
            <Image
              src="/adam-photo.webp"
              alt="Adam Rovithis, owner of Sell To Adam"
              fill
              className="object-cover object-top"
            />
          </div>
        </div>
        <div className="order-1 md:order-2">
          <p className="section-label">WHO WE ARE</p>
          <h2 className="section-heading mt-2">
            Your Direct Buyer for a Fast, Fair Home Sale
          </h2>
          <p className="mt-6 text-gray-700 leading-relaxed">
            Hi, I&apos;m Adam, the owner of Sell To Adam. After years as a real
            estate agent, I saw firsthand that the traditional listing process
            isn&apos;t right for every homeowner. Many people don&apos;t want
            open houses, months of uncertainty, or costly repairs—they want a
            faster, more certain way to sell, with clear terms and no
            surprises. That&apos;s why I started offering cash solutions. I
            built this company on the same values I practiced as an agent:
            honesty about your options, transparency in the numbers, and
            treating people ethically. The goal was never to replace
            traditional real estate, but to provide a better alternative when
            speed, simplicity, and certainty matter most.
          </p>
          <Link
            href="/get-a-cash-offer-today"
            className="btn-gold mt-8"
          >
            Get Your Cash Offer →
          </Link>
        </div>
      </div>
    </section>
  );
}
