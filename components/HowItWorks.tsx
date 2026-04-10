import Image from "next/image";

const steps = [
  {
    num: 1,
    title: "Contact Us",
    desc: "One of our representatives from Sell To Adam will contact you to set up a no-obligation consultation.",
  },
  {
    num: 2,
    title: "Get a Fair Offer",
    desc: "Consult with one of our real estate professionals, to discuss the details of your property.",
  },
  {
    num: 3,
    title: "Get Paid Fast",
    desc: "When you approve our offer. We will close on your timeline and you get paid within days. It's that simple.",
  },
];

export default function HowItWorks() {
  return (
    <section className="bg-brand-gray py-16 md:py-20">
      <div className="container-narrow">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <p className="section-label">HOW IT WORKS</p>
          <h2 className="section-heading mt-2">
            Why Wait Months To Sell Your Home?
          </h2>
          <p className="mt-4 text-gray-700 text-lg">
            To start, simply fill out our short information form on this site
            or give us a call at{" "}
            <a
              href="tel:+14134231110"
              className="text-brand-green font-bold underline"
            >
              (413) 423-1110
            </a>
            . We will present you with the highest cash offer possible within
            24 hours.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {steps.map((step) => (
            <div
              key={step.num}
              className="bg-white rounded-lg p-8 shadow-md text-center"
            >
              <div className="mx-auto w-16 h-16 mb-4 relative">
                <Image
                  src={`/icon-step${step.num}.webp`}
                  alt={`Step ${step.num}`}
                  fill
                  className="object-contain"
                />
              </div>
              <p className="text-brand-green uppercase text-xs tracking-widest font-bold">
                Step {step.num}
              </p>
              <h3 className="text-2xl font-bold text-brand-dark mt-2">
                {step.title}
              </h3>
              <p className="mt-4 text-gray-700 leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
