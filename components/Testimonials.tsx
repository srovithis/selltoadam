import Image from "next/image";

const testimonials = [
  {
    name: "Tina Nascembeni",
    text: "I would highly recommend working with Adam. While assisting a friend sell his home of over 40 years, Adam and his team provided the best cash offer right from the start. Adam provided great communication and answered all questions we had without hesitation. Truly a great experience – 'take what you need, leave behind what you don't' was a great added benefit. You can't go wrong with Adam!",
  },
  {
    name: "Debora Winiarski",
    text: "My husband and I needed to sell our house quickly, so we called Adam. He came over the next day. Adam viewed our property and the next day made a fair price and guided us through the process of selling. He's not just your average 'house flipper', he cares about you. He treated us like family. I was so impressed!! Please make that first call to Sell to Adam. He is class all the way. Big thumbs up and five stars!!",
  },
  {
    name: "Jacqui Copperwheat",
    text: "Adam made it very easy for us to sell our parents house during an emotional time. We received a fair price. He also was good about communicating and assisting us through out the process. I would strongly recommend 'Sell to Adam'.",
  },
];

function Stars() {
  return (
    <Image
      src="/stars.png"
      alt="5 star rating"
      width={120}
      height={24}
      className="h-6 w-auto"
    />
  );
}

export default function Testimonials() {
  return (
    <section className="bg-brand-gray py-16 md:py-20">
      <div className="container-narrow">
        <div className="text-center mb-12">
          <p className="section-label">TESTIMONIALS</p>
          <h2 className="section-heading mt-2">
            Our Clients Love Working With Us, So Will You!
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="bg-white rounded-lg shadow-md p-6 flex flex-col"
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold text-brand-dark">{t.name}</h3>
                <Image
                  src="/google-reviews.webp"
                  alt="Google Reviews"
                  width={80}
                  height={32}
                  className="h-8 w-auto object-contain"
                />
              </div>
              <p className="text-gray-700 text-sm leading-relaxed flex-1">
                {t.text}
              </p>
              <div className="mt-4">
                <Stars />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
