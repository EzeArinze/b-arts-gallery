import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { HOME_QUERYResult } from "@/sanity.types";
import { urlFor } from "@/sanity/lib/image";
import { formatCurrency } from "@/utils/format-currency";
import { PortableText } from "next-sanity";

type Collection = HOME_QUERYResult["HomePageCollections"];

const catalogueNo = (i: number) => `Nº ${String(i + 1).padStart(2, "0")}`;
const yearOf = (date?: string | null) =>
  date ? new Date(date).getFullYear() : null;

export default function CollectionSection({
  homePageCollection,
}: {
  homePageCollection: Collection;
}) {
  const firstItem = homePageCollection[0];
  if (!firstItem) return null;

  return (
    <section
      id="shop"
      className="relative w-full bg-background px-6 py-24 md:px-16"
    >
      {/* Everything sits in one capped column so nothing stretches on wide screens */}
      <div className="mx-auto flex w-full max-w-350 flex-col gap-20">
        {/* Header */}
        <div className="flex items-end justify-between gap-6">
          <div className="flex flex-col gap-4">
            <span className="text-xs tracking-[0.35em] text-muted-foreground">
              CURATED ARCHIVE
            </span>
            <h2 className="text-foreground text-5xl font-semibold md:text-7xl">
              COLLECTION
            </h2>
            <div className="h-px w-24 bg-primary" />
          </div>
        </div>

        {/* Main feature.
            The image is sized by height (capped at 70vh / 44rem) and the width
            follows from the ratio, so it can never grow taller than a screen. */}
        <div className="grid items-center gap-10 md:grid-cols-[auto_1fr] md:gap-16">
          <Link
            href={`/art/${firstItem.slug}`}
            className="group relative block aspect-4/5 w-full overflow-hidden md:h-[min(70vh,44rem)] md:w-auto"
          >
            <Image
              src={firstItem.image.url ? urlFor(firstItem.image.url).url() : ""}
              alt={firstItem.image.alt || "Featured collection"}
              fill
              sizes="(min-width: 768px) 40vw, 100vw"
              className="object-cover brightness-95 contrast-110 transition-[transform,filter] duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-[1.02] group-hover:brightness-100"
            />
          </Link>

          <div className="flex flex-col gap-6">
            <h3 className="text-3xl font-medium md:text-4xl">
              {firstItem.name}
            </h3>

            <div className="max-w-md text-muted-foreground">
              <PortableText value={firstItem.about || []} />
            </div>

            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm tracking-widest">
              {yearOf(firstItem.creationDate) && (
                <span className="text-muted-foreground">
                  {yearOf(firstItem.creationDate)} EDITION
                </span>
              )}
              <Link
                href="/art"
                className="text-primary hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
              >
                VIEW COLLECTION →
              </Link>
            </div>
          </div>
        </div>

        {/* Catalogue grid */}
        <div className="flex flex-col gap-12">
          <ul className="grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-3">
            {homePageCollection.map((item, i) => (
              <li key={item.slug ?? i} className="flex flex-col gap-4">
                <Link
                  href={`/art/${item.slug}`}
                  className="group relative block aspect-4/5 overflow-hidden focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
                >
                  <Image
                    src={item.image.url ? urlFor(item.image.url).url() : ""}
                    alt={item.image.alt || "Collection artwork"}
                    fill
                    sizes="(min-width: 768px) 33vw, 50vw"
                    className="object-cover brightness-95 contrast-110 transition-[transform,filter] duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-[1.02] group-hover:brightness-100"
                  />
                </Link>

                {/* Wall label: catalogue number + year, then title */}
                <div className="flex flex-col gap-1">
                  <div className="flex items-baseline justify-between text-sm text-muted-foreground">
                    <span>{catalogueNo(i)}</span>
                    {yearOf(item.creationDate) && (
                      <span>{yearOf(item.creationDate)}</span>
                    )}
                  </div>
                  <h3 className="text-base font-medium md:text-lg">
                    {item.name}
                  </h3>
                </div>

                {/* Price + buy */}
                <div className="flex items-center justify-between gap-3">
                  <span className="text-xs text-muted-foreground md:text-sm">
                    {item.price?.currency?.toUpperCase()}{" "}
                    {item.price?.amount && formatCurrency(item.price.amount)}
                  </span>
                  <Link
                    href="/art/chechout"
                    className={buttonVariants({
                      variant: "ghost",
                      className:
                        "rounded-full border border-primary/30 px-5 text-xs font-semibold tracking-widest text-primary transition-[transform,background-color,border-color] duration-150 ease-out hover:border-primary hover:bg-primary/5 active:scale-[0.97] md:text-sm",
                    })}
                  >
                    BUY
                  </Link>
                </div>
              </li>
            ))}
          </ul>

          {/* Footer row */}
          <div className="flex items-center justify-end gap-4">
            <span className="text-sm text-muted-foreground">View gallery</span>
            <Link
              href="/art"
              aria-label="View gallery"
              className="flex size-12 items-center justify-center rounded-xl border border-border text-foreground transition-[transform,border-color] duration-150 ease-out hover:border-primary active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
            >
              <ArrowUpRight className="size-5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
