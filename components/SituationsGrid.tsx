const situations = [
  { icon: "🏦", title: "Repossession", q: "Are you in repossession or are about to be?" },
  { icon: "😤", title: "Frustrating Tenants", q: "Do you have frustrating tenants living in your home?" },
  { icon: "🔨", title: "Distressed Home", q: "Do you own an unwanted home that needs a lot of work?" },
  { icon: "🏚️", title: "Vacant", q: "Is your home sitting vacant?" },
  { icon: "🎁", title: "Inherit", q: "Did you inherit an unwanted home?" },
  { icon: "🚚", title: "Relocate Quickly", q: "Do you need to relocate quickly and sell your current home fast?" },
  { icon: "💰", title: "Avoid Commissions", q: "Do you want to avoid paying agent commissions?" },
  { icon: "🛠️", title: "Repairs", q: "Does your home need more repairs than you can afford?" },
];

export default function SituationsGrid() {
  return (
    <section className="bg-white py-16 md:py-20">
      <div className="container-narrow">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="section-heading">
            We Buy Houses In MA &amp; CT In ANY Situation
          </h2>
          <p className="mt-4 text-lg text-gray-700">
            If you want to avoid traditional listing hassle or need to sell
            your house fast for any reason, we will get you an offer within 24
            hours. If our offer makes sense, pick the closing date and start
            packing.
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {situations.map((s) => (
            <div
              key={s.title}
              className="bg-brand-gray border border-gray-200 rounded-lg p-5 text-center hover:shadow-md transition-shadow"
            >
              <div className="text-4xl mb-3">{s.icon}</div>
              <h3 className="font-bold text-brand-dark">{s.title}</h3>
              <p className="text-sm text-gray-600 mt-2">{s.q}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
