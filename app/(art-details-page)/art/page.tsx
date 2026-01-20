import Image from "next/image";
import Link from "next/link";

const artworks = Array.from({ length: 6 }).map((_, i) => ({
  slug: `art-${i}`,
  title: "Untitled Form",
  artist: "Bumez",
  image: "/girl-with-pearl.webp",
}));

export default function ArtPage() {
  return (
    <main className="min-h-screen bg-black text-primary px-6 md:px-16 py-20">
      {/* Page Title */}
      <div className="mb-16">
        <h1 className="font-anton text-[14vw] md:text-[5rem] leading-none">
          ALL WORKS
        </h1>
        <div className="mt-4 h-px w-32 bg-primary/40" />
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-x-10 gap-y-20">
        {artworks.map((art) => (
          <Link key={art.slug} href={`/art/${art.slug}`} className="group">
            {/* Image */}
            <div className="relative overflow-hidden border border-primary/30">
              <Image
                src={art.image}
                alt={art.title}
                width={600}
                height={800}
                className="w-full object-contain transition-transform duration-500 group-hover:scale-[1.02]"
              />
            </div>

            {/* Meta */}
            <div className="mt-6 space-y-2">
              <div className="text-xs tracking-[0.3em] uppercase">
                {art.artist}
              </div>
              <h2 className="font-anton text-2xl leading-tight">{art.title}</h2>
            </div>
          </Link>
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-24 flex items-center justify-center gap-8 text-xs tracking-[0.35em] uppercase">
        <button className="opacity-50 hover:opacity-100 transition">
          Prev
        </button>

        <div className="flex gap-6">
          <span className="opacity-100">1</span>
          <span className="opacity-50">2</span>
          <span className="opacity-50">3</span>
        </div>

        <button className="opacity-50 hover:opacity-100 transition">
          Next
        </button>
      </div>
    </main>
  );
}
