"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import hero from "@/public/hero.webp";

export default function GothifHero() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setReady(true));
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden bg-black">
      <Image
        src={hero}
        alt="Gothif background"
        fill
        priority
        className={`object-cover contrast-110 motion-safe:transition-transform motion-safe:duration-6000 motion-safe:ease-out ${
          ready ? "scale-100" : "scale-110"
        }`}
      />

      {/* Darker at top (nav) and bottom (meta bar), lighter through the
          middle so the art itself still reads — replaces the old flat
          overlay + brightness-50, which muted the whole image */}
      <div className="absolute inset-0 bg-linear-to-b from-black/70 via-black/20 to-black/70" />

      {/* Content */}
      <div className="relative z-10 flex h-full w-full flex-col items-center justify-center px-6 md:px-16 text-center">
        <div
          className={`motion-safe:transition-all motion-safe:duration-700 motion-safe:ease-out ${
            ready ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <h1 className="text-primary leading-[0.85] text-[22vw] md:text-[18vw]">
            B-ARTS-GALLERY
          </h1>
        </div>

        <div
          className={`absolute bottom-8 left-6 right-6 md:left-16 md:right-16 flex items-center gap-4 text-xs tracking-[0.3em] text-primary motion-safe:transition-opacity motion-safe:duration-700 motion-safe:delay-300 ${
            ready ? "opacity-100" : "opacity-0"
          }`}
        >
          <span className="whitespace-nowrap">AN OLD WAYS STORY</span>

          <div className="h-px flex-1 bg-primary/60" />

          <span className="rounded-full border border-primary/60 px-4 py-1 text-[10px] transition-colors duration-200 hover:border-primary hover:bg-primary/10">
            2025 EDITION
          </span>
        </div>
      </div>
    </section>
  );
}
