import Image from "next/image";

import musclelisa from "@/public/musclelisa.webp";
import noface from "@/public/ArtShop.webp";
import withpearl from "@/public/girl-with-pearl.webp";
import distorted from "@/public/download.webp";

const newDrops = [
  { id: 1, image: noface },
  { id: 2, image: withpearl },
  { id: 3, image: distorted },
  { id: 4, image: musclelisa },
];

export default function NewDrops() {
  return (
    <section className="relative mx-auto w-full max-w-7xl bg-background lg:min-h-screen lg:flex lg:items-center">
      {/* Image grid */}
      <div className="grid w-full grid-cols-2 lg:max-h-[85vh]">
        {newDrops.map((item) => (
          <div key={item.id} className="relative aspect-3/4">
            <Image
              src={item.image}
              alt="New drop artwork"
              fill
              priority
              className="object-cover contrast-110 brightness-95"
            />
          </div>
        ))}
      </div>

      {/* Center text */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <p className="text-red-600 ring-red-800 ring-1 shadow-2xl text-shadow-red-900 font-medium leading-[0.8] text-[18vw] md:text-[12vw] lg:text-[9vw] tracking-tight">
          NEW
          <br />
          DrOP
        </p>
      </div>
    </section>
  );
}
