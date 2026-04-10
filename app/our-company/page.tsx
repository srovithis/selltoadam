import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FinalCTA from "@/components/FinalCTA";

export const metadata = { title: "Our Company | Sell To Adam" };

const checkItems = {
  left: [
    "Zero Fees to Sell Your House",
    "Highest Off-Market Price",
    "Sell As-Is. No Cleanup. No Repairs.",
  ],
  right: [
    "Close In As Little As 7 Days",
    "No Closing Costs",
    "No financing contingency, we have the cash",
  ],
};

const values = [
  {
    title: "PEOPLE FIRST, ALWAYS",
    desc: "Every seller's situation is different. We listen first, explain options clearly, and never push a deal that doesn't make sense.",
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z" />
      </svg>
    ),
  },
  {
    title: "HONESTY OVER HYPE",
    desc: "No low-ball games, no pressure tactics, no surprises at closing. If we're not the best fit, we'll tell you.",
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.05 4.575a1.575 1.575 0 1 0-3.15 0v3m3.15-3v-1.5a1.575 1.575 0 0 1 3.15 0v1.5m-3.15 0 .075 5.925m3.075.75V4.575m0 0a1.575 1.575 0 0 1 3.15 0V15M6.9 7.575a1.575 1.575 0 1 0-3.15 0v8.175a6.75 6.75 0 0 0 6.75 6.75h2.018a5.25 5.25 0 0 0 3.712-1.538l1.732-1.732a5.25 5.25 0 0 0 1.538-3.712l.003-2.024a.668.668 0 0 1 .198-.471 1.575 1.575 0 1 0-2.228-2.228 3.818 3.818 0 0 0-1.12 2.687M6.9 7.575V12m6.27 4.318A4.49 4.49 0 0 1 16.35 15m.002 0h-.002" />
      </svg>
    ),
  },
  {
    title: "RESPECT FOR YOUR TIME AND PROPERTY",
    desc: "We show up when we say we will, communicate clearly, and treat every home with respect—no matter its condition.",
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
      </svg>
    ),
  },
  {
    title: "SOLUTIONS, NOT SALES",
    desc: "Our job isn't to buy houses. It's to help people move forward, whether that means selling to us or choosing another path.",
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
      </svg>
    ),
  },
  {
    title: "DO THE RIGHT THING (EVEN WHEN IT COSTS US)",
    desc: "Long-term reputation matters more than any single deal.",
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
      </svg>
    ),
  },
];

export default function OurCompanyPage() {
  return (
    <main>
      <Header />

      {/* 1 — Diagonal Hero Banner */}
      <section
        className="relative h-72 md:h-96"
        style={{ clipPath: "polygon(0 0, 100% 0, 100% 85%, 0 100%)" }}
      >
        <Image
          src="/hero-bg.webp"
          alt="Sell To Adam hero"
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative h-full flex flex-col items-center justify-center text-center text-white px-4">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight drop-shadow">
            We Are Sell To Adam
          </h1>
          <p className="mt-3 text-base md:text-xl font-semibold tracking-[0.25em] uppercase text-brand-gold drop-shadow">
            Local. Trustworthy. Reliable.
          </p>
        </div>
      </section>

      {/* spacer to clear clip-path overlap */}
      <div className="h-10 md:h-16" />

      {/* 2 — About Us */}
      <section className="bg-white py-16 md:py-20">
        <div className="container-narrow grid md:grid-cols-2 gap-12 items-center">
          <div className="flex justify-center">
            <div className="relative w-56 h-56 md:w-72 md:h-72">
              <Image
                src="/logo.webp"
                alt="Sell To Adam logo"
                fill
                className="object-contain"
              />
            </div>
          </div>
          <div>
            <p className="section-label">ABOUT US</p>
            <h2 className="section-heading mt-2">
              Your Direct Buyer for a Fast, Fair Home Sale
            </h2>
            <p className="mt-6 text-gray-700 leading-relaxed">
              Our mission is simple: to give homeowners a fair, fast, and stress-free way to sell their property, regardless of condition or circumstance. Built on years of real estate experience, we understand that not every home is suited for the traditional market—and not every seller wants to deal with repairs, showings, delays, or uncertainty.
            </p>
            <p className="mt-4 text-gray-700 leading-relaxed">
              We focus on honest solutions, transparent offers, and a process designed around your needs and timeline. Whether a home is well-maintained, outdated, or facing significant challenges, we provide clear alternatives rooted in integrity, respect, and straightforward communication.
            </p>
            <p className="mt-4 text-gray-700 leading-relaxed">
              With access to reliable cash buyers and a commitment to doing what's right, we're here to help homeowners move forward with confidence—quickly, clearly, and without unnecessary stress.
            </p>
            <Link href="/get-a-cash-offer-today" className="btn-gold mt-8">
              GET YOUR CASH OFFER →
            </Link>
          </div>
        </div>
      </section>

      {/* 3 — Meet Our Founder */}
      <section className="bg-brand-gray">
        <div className="bg-brand-green py-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Meet Our Founder
          </h2>
        </div>
        <div className="container-narrow grid md:grid-cols-2 gap-12 items-start py-16 md:py-20">
          <div className="relative w-full aspect-[2/3] max-w-sm mx-auto rounded-lg overflow-hidden">
            <Image
              src="/adam-photo.webp"
              alt="Adam Rovithis, founder of Sell To Adam"
              fill
              className="object-cover object-top"
            />
          </div>
          <div>
            <h3 className="text-2xl md:text-3xl font-extrabold text-brand-green">
              Adam Rovithis
            </h3>
            <p className="mt-6 text-gray-700 leading-relaxed">
              I started this company to help homeowners move forward during difficult or transitional moments by making the process of selling a home clear, honest, and pressure-free. I believe people should always come before transactions. That means slowing the process down, listening before advising, and explaining every option in plain English—even when that means I'm not the right fit.
            </p>
            <p className="mt-4 text-gray-700 leading-relaxed">
              After years as a real estate agent, I saw firsthand that the traditional listing process isn't right for everyone. Some homeowners weren't looking for open houses, months of uncertainty, or costly repairs—they wanted a faster, more certain path forward with clear terms and real guarantees. That's what led me to begin offering cash solutions.
            </p>
            <p className="mt-4 text-gray-700 leading-relaxed">
              I built this company around the same values I had as an agent: being honest about options, transparent about the numbers, and ethical in how I treat people. I don't rely on pressure, confusion, or rushed decisions. My focus is on fairness and clarity so sellers can make confident choices at their own pace. The goal was never to replace traditional real estate. It was to create a better alternative for situations where speed, simplicity, and certainty matter most—and to leave people better off, whether or not we ever close a deal.
            </p>
          </div>
        </div>
      </section>

      {/* 4 — Why Choose Sell To Adam */}
      <section className="bg-brand-green py-16 md:py-20">
        <div className="container-narrow">
          <p className="section-label text-brand-gold text-center">WHY US?</p>
          <h2 className="section-heading mt-2 text-white text-center">
            Why Choose Sell To Adam?
          </h2>
          <div className="mt-10 grid md:grid-cols-2 gap-x-16 gap-y-5 max-w-3xl mx-auto">
            {checkItems.left.map((item) => (
              <div key={item} className="flex items-start gap-3 text-white">
                <Image
                  src="/check-icon.png"
                  alt="check"
                  width={22}
                  height={22}
                  className="flex-shrink-0 mt-1"
                />
                <span className="font-medium text-lg">{item}</span>
              </div>
            ))}
            {checkItems.right.map((item) => (
              <div key={item} className="flex items-start gap-3 text-white">
                <Image
                  src="/check-icon.png"
                  alt="check"
                  width={22}
                  height={22}
                  className="flex-shrink-0 mt-1"
                />
                <span className="font-medium text-lg">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5 — Our Values */}
      <section className="bg-white py-16 md:py-20">
        <div className="container-narrow">
          <h2 className="section-heading text-center">Our Values</h2>
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((v) => (
              <div
                key={v.title}
                className="border-2 border-brand-gold rounded-xl p-8 flex flex-col items-center text-center"
              >
                <div className="text-brand-gold mb-4">{v.icon}</div>
                <h3 className="font-extrabold text-brand-dark text-sm tracking-widest uppercase mb-3">
                  {v.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6 — Final CTA */}
      <FinalCTA />
      <Footer />
    </main>
  );
}
