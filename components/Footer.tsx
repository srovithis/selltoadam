import Link from "next/link";

const footerLinks = [
  { href: "/get-a-cash-offer-today", label: "Get A Cash Offer Today" },
  { href: "/contact-us", label: "Contact Us" },
  { href: "/how-we-buy-houses", label: "How It Works" },
  { href: "/faq", label: "FAQ" },
  { href: "/our-company", label: "Our Company" },
  { href: "/resources", label: "Resources" },
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/blog", label: "Blog" },
];

export default function Footer() {
  return (
    <footer className="bg-brand-dark text-white">
      <div className="container-narrow py-14">
        <div className="grid md:grid-cols-2 gap-10">
          <div>
            <h3 className="text-2xl font-extrabold text-brand-gold">
              Sell To Adam
            </h3>
            <p className="mt-4 text-gray-300 leading-relaxed max-w-md">
              We are a real estate solutions and investment firm that
              specializes in helping homeowners get rid of burdensome houses
              fast. We are investors and problem solvers who can buy your
              house fast with a fair all cash offer.
            </p>
            <div className="mt-5">
              <a
                href="tel:+14134231110"
                className="text-xl font-bold text-brand-gold hover:text-white"
              >
                📞 (413) 423-1110
              </a>
            </div>
          </div>
          <div>
            <h4 className="text-sm uppercase tracking-widest text-gray-400 font-bold">
              Quick Links
            </h4>
            <ul className="mt-4 grid grid-cols-2 gap-3">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-brand-gold transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-800">
        <div className="container-narrow py-5 text-center text-sm text-gray-400">
          © 2026 Sell To Adam. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
