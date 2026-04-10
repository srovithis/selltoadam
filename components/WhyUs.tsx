const benefits = [
  {
    icon: "💵",
    title: "We Pay All Cash",
    desc: "Because we pay cash, we can be flexible and close on your time frame.",
  },
  {
    icon: "📋",
    title: "Easy & Clear Terms",
    desc: "We make this a simple, straight forward and easy to understand process for you.",
  },
  {
    icon: "📝",
    title: "We Do The Paperwork",
    desc: "We use a licensed and insured title company and we make sure the details are taken care of.",
  },
  {
    icon: "🚫",
    title: "Zero Fees",
    desc: "You won't have to pay any title or closing costs. We take care of the fees 100%.",
  },
  {
    icon: "🏠",
    title: "Sell AS-IS",
    desc: "You won't have to fix or clean anything! We will buy your home the way it is.",
  },
  {
    icon: "⚡",
    title: "Close in Days",
    desc: "We can close in as little as 3 days or on your own schedule.",
  },
];

export default function WhyUs() {
  return (
    <section className="bg-brand-gray py-16 md:py-20">
      <div className="container-narrow grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <div className="w-full aspect-[4/3] bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg flex items-center justify-center text-gray-500 font-semibold">
            Springfield, MA Neighborhood Photo
          </div>
        </div>
        <div>
          <p className="section-label">WHY US?</p>
          <h2 className="section-heading mt-2">Sell To Adam Has Your Back</h2>
          <div className="mt-8 space-y-6">
            {benefits.map((b) => (
              <div key={b.title} className="flex gap-4">
                <div className="text-3xl flex-shrink-0">{b.icon}</div>
                <div>
                  <h3 className="font-bold text-lg text-brand-dark">
                    {b.title}
                  </h3>
                  <p className="text-gray-700 mt-1">{b.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
