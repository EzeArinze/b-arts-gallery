import { buttonVariants } from "@/components/ui/button";
import { getART } from "@/data/get-art";
import { urlFor } from "@/sanity/lib/image";
import { formatCurrency } from "@/utils/format-currency";
import { PortableText } from "next-sanity";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

type Params = Promise<{ slug: string }>;

async function ArtDetailsPage({ params }: { params: Params }) {
  const { slug } = await params;

  const art = await getART(slug);

  if (!art) return notFound();

  return (
    <main className="min-h-screen bg-black  px-6 md:px-16 py-20">
      <div className="mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-2 gap-16">
        {/* Artwork */}
        <div className="w-full flex items-center justify-center">
          <div className="w-full max-h-[70vh]">
            {art.image.url && (
              <Image
                src={urlFor(art.image?.url).url()}
                alt={art.image.alt || ""}
                width={400}
                height={400}
                className="w-full h-auto max-h-[86vh] object-contain"
              />
            )}
          </div>
        </div>

        {/* Details */}
        <div className="flex flex-col justify-center">
          {/* Title */}
          <h1 className="text-[12vw] text-primary md:text-[5rem] leading-[0.9] mb-6">
            {art.name}
          </h1>

          {/* Metadata */}
          <div className="mb-8 space-y-2 text-xs tracking-[0.3em] uppercase ">
            <div>{art.artist}</div>
            <div>
              {art?.creationDate && new Date(art.creationDate).getFullYear()}
            </div>
            {/*<div>{art.medium}</div>*/}
            <div>
              {art.dimensions?.width} * {art.dimensions?.width}
              {art.dimensions?.unit}
            </div>
          </div>

          {/* Description */}
          <span className="max-w-xl text-sm leading-relaxed  mb-10">
            <PortableText value={art.about || []} />
          </span>

          {/* Divider */}
          <div className="h-px w-full bg-primary/30 mb-8" />

          {/* Purchase */}
          <div className="flex items-center justify-between">
            <div className="tracking-tight text-sm md:tracking-[0.3em] uppercase">
              {art.price?.currency?.toUpperCase()}:{" "}
              {art.price?.amount && formatCurrency(art.price.amount)}
            </div>

            <Link
              href={"/art/checkout"}
              className={buttonVariants({
                variant: "outline",
                className:
                  " border border-primary px-8 py-3 text-xs tracking-[0.35em] hover:bg-primary hover:text-white transition rounded-none",
              })}
            >
              BUY ARTWORK
            </Link>
          </div>

          {/* Availability */}
          <div className="mt-4 text-[10px] tracking-[0.3em] uppercase text-primary/60">
            {art.available ? (
              <span className="text-green-700 font-bold">Available</span>
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
