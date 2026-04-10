"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

const navLinks = [
  { href: "/how-we-buy-houses", label: "How It Works" },
  { href: "/reviews", label: "Reviews" },
  { href: "/our-company", label: "Our Company" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      {/* Top bar */}
      <div className="container-narrow py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/logo.webp"
            alt="Sell To Adam logo"
            width={160}
            height={60}
            className="h-12 w-auto object-contain"
            priority
          />
          <span className="text-xs text-gray-600 hidden sm:block">
            Need To Sell Your House Fast? We Buy Houses!
          </span>
        </Link>

        <div className="hidden lg:flex items-center gap-4">
          <div className="text-right">
            <div className="text-xs text-gray-500 uppercase">Call Us!</div>
            <a
              href="tel:+14134231110"
              className="text-xl font-bold text-brand-green hover:text-brand-green-dark"
            >
              (413) 423-1110
            </a>
          </div>
          <Link href="/get-a-cash-offer-today" className="btn-gold text-sm">
            Get Your Cash Offer
          </Link>
          <Link href="/contact-us" className="btn-outline text-sm">
            Contact Us
          </Link>
        </div>

        {/* Mobile phone + hamburger */}
        <div className="flex lg:hidden items-center gap-3">
          <a
            href="tel:+14134231110"
            className="text-sm font-bold text-brand-green"
          >
            (413) 423-1110
          </a>
          <button
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
            className="text-brand-dark p-2"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={open ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Nav bar */}
      <nav className="hidden lg:block bg-brand-green">
        <div className="container-narrow flex items-center justify-between">
          <ul className="flex gap-8 text-white font-semibold">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="block py-3 font-medium relative group transition-all duration-200 hover:text-brand-gold hover:-translate-y-0.5"
                >
                  {link.label}
                  <span className="absolute bottom-2 left-0 h-0.5 w-0 bg-brand-gold transition-all duration-300 group-hover:w-full" />
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href="/get-a-cash-offer-today"
            className="bg-brand-gold hover:bg-brand-gold-dark text-brand-dark font-bold px-6 py-3 uppercase text-sm tracking-wide rounded-lg transition-colors"
          >
            Sell Your House Fast
          </Link>
        </div>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden bg-brand-green text-white">
          <ul className="flex flex-col">
            {navLinks.map((link) => (
              <li key={link.href} className="border-b border-brand-green-dark">
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block px-6 py-4 font-semibold"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/get-a-cash-offer-today"
                onClick={() => setOpen(false)}
                className="block px-6 py-4 bg-brand-gold text-brand-dark font-bold uppercase text-center"
              >
                Sell Your House Fast
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
