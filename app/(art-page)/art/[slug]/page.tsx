import { Button } from "@/components/ui/button";
import girlwithpearl from "@/public/girl-with-pearl.webp";
import Image from "next/image";

type Params = Promise<{ slug: string }>;

async function ArtDetailsPage({ params }: { params: Params }) {
  const { slug } = await params;

  // Mock data (replace with real fetch by slug)
  const art = {
    title: `Girl With Pearl ${slug}`,
    artist: "Bumez",
    year: "2024",
    medium: "Oil on Canvas",
    size: "120 × 90 cm",
    price: "$2,400",
    availability: true,
    image: girlwithpearl,
    description:
      "A restrained exploration of form and contrast. The work balances tension and silence, inviting slow observation and spatial awareness.",
  };

  return (
    <main className="min-h-screen bg-black  px-6 md:px-16 py-20">
      <div className="mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-2 gap-16">
        {/* Artwork */}
        <div className="w-full flex items-center justify-center">
          <div className="w-full max-h-[70vh]">
            <Image
              src={art.image}
              alt={art.title}
              className="w-full h-auto max-h-[86vh] object-contain"
            />
          </div>
        </div>

        {/* Details */}
        <div className="flex flex-col justify-center">
          {/* Title */}
          <h1 className="text-[12vw] text-primary md:text-[5rem] leading-[0.9] mb-6">
            {art.title}
          </h1>

          {/* Metadata */}
          <div className="mb-8 space-y-2 text-xs tracking-[0.3em] uppercase ">
            <div>{art.artist}</div>
            <div>{art.year}</div>
            <div>{art.medium}</div>
            <div>{art.size}</div>
          </div>

          {/* Description */}
          <p className="max-w-xl text-sm leading-relaxed  mb-10">
            {art.description}
          </p>

          {/* Divider */}
          <div className="h-px w-full bg-primary/30 mb-8" />

          {/* Purchase */}
          <div className="flex items-center justify-between">
            <div className="text-sm tracking-[0.3em] uppercase">
              {art.price}
            </div>

            <Button
              variant={"outline"}
              className="
                border border-primary
                px-8 py-3
                 text-xs tracking-[0.35em]
                hover:bg-primary hover:text-primary
                transition
                rounded-none

              "
            >
              BUY ARTWORK
            </Button>
          </div>

          {/* Availability */}
          <div className="mt-4 text-[10px] tracking-[0.3em] uppercase text-primary/60">
            {art.availability ? (
              <span className="text-green-700">Available</span>
            ) : (
              <span>Not Available</span>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

export default ArtDetailsPage;
