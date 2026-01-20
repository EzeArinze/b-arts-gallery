import Image from "next/image";

import collectionHero from "@/public/ArtShop.webp";
import img1 from "@/public/musclelisa.webp";
import img2 from "@/public/girl-with-pearl.webp";
import img3 from "@/public/download.webp";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const collectionItems = [img1, img2, img3];

export default function CollectionSection() {
  return (
    <section className="relative w-full bg-background px-6 py-24 md:px-16">
      {/* Header */}
      <div className="mb-16 flex flex-col gap-4">
        <span className="text-xs tracking-[0.35em] text-muted-foreground">
          CURATED ARCHIVE
        </span>

        <h2 className="text-foreground text-5xl md:text-7xl font-semibold">
          COLLECTION
        </h2>

        <div className="h-px w-24 bg-primary" />
      </div>

      {/* Main feature */}
      <div className="grid gap-12 md:grid-cols-2">
        {/* Image */}
        <div className="relative aspect-3/4">
          <Image
            src={collectionHero}
            alt="Featured collection"
            fill
            className="object-cover brightness-95 contrast-110"
          />
        </div>

        {/* Text */}
        <div className="flex flex-col justify-center gap-6">
          <h3 className="text-3xl md:text-4xl font-medium">
            Gothic Expressions
          </h3>

          <p className="text-muted-foreground max-w-md">
            A dark editorial exploration of distorted beauty, classical forms,
            and modern rebellion. Each piece exists between art and fashion.
          </p>

          <div className="flex items-center gap-6 text-sm tracking-widest">
            <span className="text-muted-foreground">2025 EDITION</span>

            <Link href={"/art"} className="text-primary hover:underline">
              VIEW COLLECTION →
            </Link>
          </div>
        </div>
      </div>

      {/* Secondary grid */}
      <div className="mt-24 grid grid-cols-2 gap-6 md:grid-cols-3">
        {collectionItems.map((img, i) => (
          <div key={i} className="relative flex flex-col gap-2">
            <div className="relative aspect-3/4">
              <Image
                src={img}
                alt="Collection artwork"
                fill
                className="object-cover brightness-95 contrast-110"
              />
            </div>
            <span className="relative flex items-center gap-2">
              <h3 className="text-sm tracking-[0.3em] text-muted-foreground">
                {/*PRICE*/}
                $400
                {/*<span className=" text-foreground tracking-normal">$400</span>*/}
              </h3>
              <Button
                variant={"ghost"}
                className="md:text-sm font-semibold rounded-none hover:border-2 transition-all duration-100 ease-out  border border-transparent px-4 py-1 text-xs tracking-widest hover:flex-1 hover:bg-none hover:border-primary hover:text-primary"
              >
                BUY
              </Button>
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
