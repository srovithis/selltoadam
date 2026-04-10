import LeadForm from "./LeadForm";

export default function MiddleForm() {
  return (
    <section className="bg-brand-green py-16 md:py-20">
      <div className="container-narrow grid md:grid-cols-2 gap-10 items-center">
        <div className="text-white">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
            Get Your No Obligation Offer in 24 Hours or Less!
          </h2>
          <p className="mt-6 text-lg text-white/90">
            Our goal is to make selling your home as smooth and stress-free as
            possible, so you can move forward with peace of mind.
          </p>
          <div className="mt-8 hidden md:block">
            <a
              href="tel:+14134231110"
              className="text-2xl font-bold text-brand-gold hover:text-white"
            >
              📞 (413) 423-1110
            </a>
          </div>
        </div>
        <div>
          <LeadForm variant="middle" submitLabel="Get My Free Offer" />
        </div>
      </div>
    </section>
  );
}
