"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, FormEvent } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FinalCTA from "@/components/FinalCTA";

/* ── inline hero form ─────────────────────────────────────────── */
function HeroForm() {
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("loading");
    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        access_key: "761a948d-2cba-415e-bddb-acbc23921868",
        subject: "New Cash Offer Request – How We Buy Houses",
        address,
        phone,
      }),
    });
    setStatus(res.ok ? "success" : "error");
  }

  if (status === "success") {
    return (
      <div className="bg-white/10 border border-white/30 rounded-lg p-6 text-white text-center font-semibold">
        We received your request! We'll be in touch shortly.
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 mt-6 max-w-xl mx-auto">
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          required
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Property Address"
          className="flex-1 px-4 py-3 rounded-md text-brand-dark placeholder-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-brand-gold"
        />
        <input
          required
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Phone Number"
          className="flex-1 px-4 py-3 rounded-md text-brand-dark placeholder-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-brand-gold"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="bg-brand-gold hover:bg-brand-gold-dark text-brand-dark font-bold uppercase tracking-wide px-6 py-3 rounded-md whitespace-nowrap text-sm transition-colors"
        >
          {status === "loading" ? "Sending…" : "Get My Free Offer →"}
        </button>
      </div>
      {status === "error" && (
        <p className="mt-3 text-red-300 text-sm text-center">Something went wrong. Please try again.</p>
      )}
    </form>
  );
}

/* ── step cards ───────────────────────────────────────────────── */
const steps = [
  {
    label: "Step 1",
    title: "Tell Us About Your Home",
    desc: "Call and tell us about your home, your situation, and your selling goals.",
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
      </svg>
    ),
  },
  {
    label: "Step 2",
    title: "Receive Your Offer",
    desc: "We will make an offer right away. Sometimes even over the phone!",
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.05 4.575a1.575 1.575 0 1 0-3.15 0v3m3.15-3v-1.5a1.575 1.575 0 0 1 3.15 0v1.5m-3.15 0 .075 5.925m3.075.75V4.575m0 0a1.575 1.575 0 0 1 3.15 0V15M6.9 7.575a1.575 1.575 0 1 0-3.15 0v8.175a6.75 6.75 0 0 0 6.75 6.75h2.018a5.25 5.25 0 0 0 3.712-1.538l1.732-1.732a5.25 5.25 0 0 0 1.538-3.712l.003-2.024a.668.668 0 0 1 .198-.471 1.575 1.575 0 1 0-2.228-2.228 3.818 3.818 0 0 0-1.12 2.687M6.9 7.575V12m6.27 4.318A4.49 4.49 0 0 1 16.35 15m.002 0h-.002" />
      </svg>
    ),
  },
  {
    label: "Step 3",
    title: "Consider Your Options",
    desc: "You can take some time to weigh your options to decide what is right for you.",
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z" />
      </svg>
    ),
  },
  {
    label: "Step 4",
    title: "Get Paid Fast",
    desc: "If you accept, we will handle everything and close in a matter of days!",
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z" />
      </svg>
    ),
  },
];

/* ── numbered questions ───────────────────────────────────────── */
const questions = [
  {
    q: "How much can you afford to spend on the sale?",
    a: "If you don't want to spend anything, choose a direct sale. Putting your home on the market will likely require cleaning, repairs, and maintenance...even for the most well-kept homes.",
  },
  {
    q: "How much time do you have to sell?",
    a: "If you need to sell quickly, a direct sale is the best route. If time is not a concern, and you are comfortable with the costs up front and the costs of continued ownership, a listing will be your best bet. If you know the market well and have experience in the real estate industry, you can try to sell on your own. But be forewarned, selling on your own can turn into a full-time job. You'll have to clean, repair, market, show, and handle all aspects of the sale.",
  },
  {
    q: "Who should you ask for help?",
    a: "Someone who understands the home market in MA & CT. Sell To Adam is a team of home buying specialists who are happy to answer all of your questions and provide you with guidance when it is time to sell. We will help you understand your selling options and how they will impact you!",
  },
];

/* ── difference benefits ──────────────────────────────────────── */
const benefits = [
  { label: "NO COMMISSIONS", desc: "And we'll pay closing costs! We don't charge commissions. Our profit comes from fixing up your house and going through the hassle of selling it ourselves." },
  { label: "PRIVATE HOME SALE", desc: "Fully confidential – Avoid having to share your information with agents, dozens of buyers, and the world on the MLS. Our process is entirely private and discreet." },
  { label: "SELL AS-IS CONDITION", desc: "When we say we buy houses as-is, we mean it. Does your house need repairs you don't want to make? Great! We'll do the repairs for you." },
  { label: "NO REPAIRS NEEDED", desc: "We deal with repairs ourselves when we buy your house. We'll make it our responsibility to fix everything from leaking roofs to complete remodels." },
  { label: "FAST CASH SALE", desc: "We'll know very quickly if we can help and, unlike selling through an agent, you don't have to wait to see if the buyer can get financing – we're ready to buy right now!" },
  { label: "NO CLEANING NEEDED", desc: "We'll clean the house – You never have to worry about cleaning it up for daily showings and open houses." },
];

/* ── page ─────────────────────────────────────────────────────── */
export default function HowPage() {
  return (
    <main>
      <Header />

      {/* 1 — Diagonal Hero Banner */}
      <section
        className="relative pb-24 pt-16 md:pt-24 md:pb-32"
        style={{ clipPath: "polygon(0 0, 100% 0, 100% 85%, 0 100%)" }}
      >
        <Image
          src="/hero-bg.webp"
          alt="How we buy houses hero"
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative container-narrow text-center text-white">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight drop-shadow">
            How The Process Works
          </h1>
          <p className="mt-3 text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
            Our process is fair, works on your timeline, and is easy to follow.
          </p>
          <HeroForm />
        </div>
      </section>

      {/* spacer to clear clip-path */}
      <div className="h-10 md:h-16" />

      {/* 2 — We Buy MA & CT Houses For Cash */}
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
            <h2 className="section-heading">
              We Buy MA &amp; CT Houses For Cash
            </h2>
            <p className="mt-3 text-xl font-semibold italic text-brand-green">
              &ldquo;I Need To Sell My House Fast&rdquo;
            </p>
            <p className="mt-6 text-gray-700 leading-relaxed text-lg">
              Sell To Adam buys houses in MA &amp; CT. We&apos;re not listing your house, we&apos;re
              actually the ones buying your home. Because we pay cash and are buying your MA &amp; CT
              home directly from you, we&apos;re able to close quickly (or on your schedule).
            </p>
          </div>
        </div>
      </section>

      {/* 3 — How It Works — 4 Step Cards */}
      <section className="bg-brand-gray py-16 md:py-20">
        <div className="container-narrow">
          <div className="text-center mb-12">
            <p className="section-label">HOW IT WORKS</p>
            <h2 className="section-heading mt-2">Sell To Adam Has Your Back</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step) => (
              <div
                key={step.label}
                className="bg-white rounded-xl p-8 shadow-md text-center border-2 border-transparent hover:border-brand-green transition-colors"
              >
                <div className="mx-auto w-16 h-16 rounded-full border-2 border-brand-green text-brand-green flex items-center justify-center mb-4">
                  {step.icon}
                </div>
                <p className="text-brand-green uppercase text-xs tracking-widest font-bold">{step.label}</p>
                <h3 className="text-lg font-bold text-brand-dark mt-2">{step.title}</h3>
                <p className="mt-3 text-gray-600 text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
          <p className="mt-10 text-center text-gray-600 italic max-w-3xl mx-auto leading-relaxed">
            <span className="font-semibold not-italic text-brand-dark">Timeframe:</span> After you tell
            us a bit about your home, we will get to work creating a customized offer. If you choose to
            accept, we are able to close as quickly as 7 days! Of course, if you need longer, we will
            always work on your schedule.
          </p>
        </div>
      </section>

      {/* 4 — We're Home-buying Specialists */}
      <section className="bg-white py-16 md:py-20">
        <div className="container-narrow max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="section-heading">We&apos;re Home-buying Specialists!</h2>
            <p className="mt-3 text-xl font-bold text-brand-dark">
              And we&apos;ve created fast and efficient ways for you to sell!
            </p>
            <p className="mt-4 text-gray-700 text-lg">
              When selling your MA &amp; CT home, ask yourself these questions:
            </p>
          </div>
          <div className="space-y-6">
            {questions.map((item, i) => (
              <div
                key={i}
                className="flex gap-6 bg-white rounded-xl overflow-hidden shadow-sm border-l-4"
                style={{ borderLeftColor: "#2d6a2d" }}
              >
                <div className="flex-shrink-0 w-24 flex items-center justify-center py-6 pl-4">
                  <span
                    className="text-7xl font-extrabold leading-none select-none"
                    style={{ color: "#f5a623" }}
                  >
                    {i + 1}
                  </span>
                </div>
                <div className="py-6 pr-6">
                  <h3 className="font-bold text-brand-dark text-lg">{item.q}</h3>
                  <p className="mt-2 text-gray-500 leading-relaxed">{item.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5 — Experience The Difference */}
      <section className="bg-white py-16 md:py-20 border-t border-gray-100">
        <div className="container-narrow">
          <div className="text-center mb-12 max-w-3xl mx-auto">
            <h2 className="section-heading">Experience The Difference With Us</h2>
            <p className="mt-3 text-xl font-semibold text-brand-green">
              A Quicker Way To Sell Your House In MA &amp; CT
            </p>
            <p className="mt-5 text-gray-800 font-semibold leading-relaxed">
              Is there a solution to skip the uncertainty and lengthy process of a traditional home
              sale? Yes, there is! Sell directly to Sell To Adam. We buy houses directly from MA &amp; CT
              homeowners for cash. Sell your house fast and without having to pay an agent&apos;s
              commission.
            </p>
            <p className="mt-4 text-gray-700">
              When we buy your house with our local Cash Home Buyer program...
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {benefits.map((b) => (
              <div key={b.label} className="flex gap-4 items-start">
                <svg
                  className="w-6 h-6 text-brand-green flex-shrink-0 mt-0.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2.5}
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                </svg>
                <p className="text-gray-700 leading-relaxed">
                  <span className="font-bold text-brand-green">{b.label}</span>
                  {" – "}
                  {b.desc}
                </p>
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
