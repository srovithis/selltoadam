import Image from "next/image";

export default function MediaLogos() {
  return (
    <section className="bg-brand-gray py-12">
      <div className="container-narrow text-center">
        <p className="text-gray-600 uppercase tracking-widest text-sm font-semibold mb-8">
          As Seen On
        </p>
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
          {[1, 2, 3].map((n) => (
            <div key={n} className="relative w-40 h-20">
              <Image
                src={`/media${n}.webp`}
                alt={`Media logo ${n}`}
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
