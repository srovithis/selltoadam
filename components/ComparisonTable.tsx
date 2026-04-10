import Image from "next/image";

const ours = [
  "Zero Fees to Sell Your House",
  "Highest Off-Market Price",
  "Sell As-Is. No Cleanup. No Repairs.",
  "Close In As Little As 7 Days",
  "No Closing Costs",
  "No financing contingency, we have the cash",
];

const traditional = [
  "Get cash in 45+ days",
  "5-6% realtor commissions, legal costs",
  "Repairs, remedies for inspection items",
  "Open houses, multiple showings",
  "Pictures and listing are posted on the internet",
  "Deals may fall through 14-21 days in for financing contingency",
];

function XIcon() {
  return (
    <svg
      className="w-6 h-6 text-red-500 flex-shrink-0 mt-0.5"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      viewBox="0 0 24 24"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
    </svg>
  );
}

export default function ComparisonTable() {
  return (
    <section className="bg-white py-16 md:py-20">
      <div className="container-narrow">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="section-heading">
            Sell To Adam Home Selling Solution.
          </h2>
          <p className="mt-4 text-lg text-gray-700">
            Why have other homeowners like you sold their house to Sell To Adam?
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-0 max-w-5xl mx-auto rounded-xl overflow-hidden shadow-xl">
          {/* Sell To Adam */}
          <div className="bg-brand-green flex flex-col">
            <div className="bg-brand-green-dark text-white text-center py-5">
              <h3 className="text-2xl font-bold">Sell To Adam</h3>
            </div>
            <ul className="p-6 space-y-4 flex-1">
              {ours.map((item) => (
                <li key={item} className="flex items-start gap-3 text-white">
                  <Image
                    src="/check-icon.png"
                    alt="check"
                    width={24}
                    height={24}
                    className="flex-shrink-0 mt-0.5"
                  />
                  <span className="font-medium">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Traditional */}
          <div className="bg-gray-100 flex flex-col">
            <div className="bg-gray-300 text-brand-dark text-center py-5">
              <h3 className="text-2xl font-bold">Traditional Process</h3>
            </div>
            <ul className="p-6 space-y-4 flex-1">
              {traditional.map((item) => (
                <li key={item} className="flex items-start gap-3 text-brand-dark">
                  <XIcon />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
