import Image from "next/image";

export default function MediaLogos() {
  return (
    <section className="bg-brand-gray py-12">
      <div className="container-narrow text-center">
        <p className="text-brand-green font-bold italic text-xl mb-8">
          As Seen On TV
        </p>
        <div className="flex flex-wrap justify-center items-center gap-10 md:gap-16">
          {[1, 2, 3].map((n) => (
            <div key={n} className="relative h-[60px] w-40">
              <Image
                src={`/media${n}.png`}
                alt={`TV station logo ${n}`}
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
