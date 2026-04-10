import Link from "next/link";

export default function VideoSection() {
  return (
    <section className="bg-white py-16 md:py-20">
      <div className="container-narrow">
        <div className="grid md:grid-cols-[55fr_45fr] gap-10 items-center">
          {/* Video — left */}
          <div className="relative w-full pb-[56.25%] h-0 rounded-lg overflow-hidden shadow-lg">
            <iframe
              className="absolute top-0 left-0 w-full h-full"
              src="https://www.youtube.com/embed/AiG4ZbeVkrA"
              title="Sell To Adam - We Buy Houses"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>

          {/* Text — right */}
          <div>
            <h2 className="section-heading">We Buy Houses In MA &amp; CT</h2>
            <p className="mt-3 text-xl italic text-gray-600">
              &ldquo;I Need To Sell My House Fast&rdquo;
            </p>
            <p className="mt-5 text-lg text-gray-700 leading-relaxed">
              Sell Your House Fast for Cash and Close in Days. We buy houses
              AS-IS! No agents, no fees, no repairs.{" "}
              <Link
                href="/how-we-buy-houses"
                className="text-brand-green font-semibold underline hover:text-brand-green-dark"
              >
                Learn how our home buying process works!
              </Link>
            </p>
            <p className="mt-5 text-lg text-gray-700 leading-relaxed">
              Sell To Adam focuses on helping homeowners like you find solutions
              for your problem, whether you&apos;re going through a foreclosure,
              can&apos;t sell your property, or just need to sell your house for
              all kinds of reasons.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
