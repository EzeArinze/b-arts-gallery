import Image from "next/image";
import artist from "@/public/hero.png";

export default function AboutArtist() {
  return (
    <section className="relative w-full bg-background px-6 py-12 md:px-16 lg:min-h-screen lg:flex lg:flex-col lg:justify-center">
      {/* Header */}
      <div className="mb-12 lg:mb-10">
        <span className="text-xs tracking-[0.35em] text-muted-foreground">
          ABOUT
        </span>

        <h2 className="mt-2 text-4xl md:text-6xl font-semibold">THE ARTIST</h2>

        <div className="mt-4 h-px w-20 bg-primary" />
      </div>

      {/* Content */}
      <div className="grid items-center gap-10 md:grid-cols-2">
        {/* Portrait */}
        <div className="relative aspect-3/4 max-h-[70vh] lg:w-[40vw]">
          <Image
            src={artist}
            alt="The artist portrait"
            fill
            className="object-cover brightness-95 contrast-110"
          />
        </div>

        {/* Text */}
        <div className="flex max-w-lg flex-col gap-6">
          <h3 className="text-2xl md:text-3xl font-medium">Bumez</h3>

          <p className="text-muted-foreground leading-relaxed">
            My work exists at the intersection of distortion and identity. I
            explore the tension between classical forms and modern rebellion,
            using contrast, texture, and silence to tell stories that resist
            perfection.
          </p>

          <p className="text-muted-foreground leading-relaxed">
            Each piece is an attempt to preserve emotion in its rawest form —
            unpolished, fragile, and unapologetically human.
          </p>

          {/* Signature */}
          <div className="pt-2 text-primary tracking-widest text-sm">
            — BUMEZ
          </div>
        </div>
      </div>
    </section>
  );
}
