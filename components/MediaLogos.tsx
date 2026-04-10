import Image from "next/image";

const logos = [
  { src: "/media1.png", alt: "TV station logo 1" },
  { src: "/media2.png", alt: "TV station logo 2" },
  { src: "/media3.png", alt: "TV station logo 3" },
  { src: "/massappeal.png", alt: "Mass Appeal logo" },
];

export default function MediaLogos() {
  return (
    <section className="bg-brand-gray py-12">
      <div className="container-narrow text-center">
        <p className="text-brand-green font-bold italic text-xl mb-8">
          As Seen On TV
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 justify-items-center items-center gap-8 md:gap-12">
          {logos.map(({ src, alt }) => (
            <div key={src} className="relative h-[90px] w-48">
              <Image
                src={src}
                alt={alt}
                fill
                className="object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
