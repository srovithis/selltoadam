import Link from "next/link";

export default function VideoSection() {
  return (
    <section className="bg-white py-16 md:py-20">
      <div className="container-narrow">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="section-heading">We Buy Houses In MA &amp; CT</h2>
          <p className="mt-3 text-xl md:text-2xl italic text-gray-700">
            I Need To Sell My House Fast
          </p>
          <p className="mt-6 text-lg text-gray-700 leading-relaxed">
            Sell Your House Fast for Cash and Close in Days. We buy houses
            AS-IS! No agents, no fees, no repairs, and it&apos;s completely
            FREE!{" "}
            <Link
              href="/how-we-buy-houses"
              className="text-brand-green font-semibold underline hover:text-brand-green-dark"
            >
              Learn how our home buying process works!
            </Link>
          </p>
        </div>

        <hr className="my-10 border-gray-200" />

        <div className="max-w-4xl mx-auto">
          <div className="relative w-full pb-[56.25%] h-0 rounded-lg overflow-hidden shadow-lg">
            <iframe
              className="absolute top-0 left-0 w-full h-full"
              src="https://www.youtube.com/embed/AiG4ZbeVkrA"
              title="Sell To Adam - We Buy Houses"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>

        <p className="mt-10 text-center text-lg text-gray-700 leading-relaxed max-w-3xl mx-auto">
          Sell To Adam focuses on helping homeowners like you find solutions
          for your problem, whether you&apos;re going through a foreclosure,
          can&apos;t sell your property, or just need to sell your house for
          all kinds of reasons.
        </p>
      </div>
    </section>
  );
}
