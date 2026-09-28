"use client";

import { useMemo, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { urlFor } from "@/sanity/lib/image";
import { formatCurrency } from "@/utils/format-currency";
import { CollectionItem, CollectionType } from "@/utils/types";

const BREAKPOINTS = [
  { minWidth: 1024, columns: 3 },
  { minWidth: 640, columns: 2 },
  { minWidth: 0, columns: 1 },
];

// Height : width. Anything taller than this gets cropped via object-cover
// instead of stretching its column — a few extreme portraits were throwing
// off the whole row rhythm.
const MAX_RATIO = 1.4;

function columnsForWidth(width: number) {
  return (BREAKPOINTS.find((b) => width >= b.minWidth) ?? BREAKPOINTS[2])
    .columns;
}

function sizeOf(url: string) {
  const match = url.match(/-(\d+)x(\d+)\.[a-z]+$/i);
  return match
    ? { w: Number(match[1]), h: Number(match[2]) }
    : { w: 1000, h: 1250 };
}

type LaidOutArt = CollectionItem & {
  ratio: number;
  catalogueNo: string;
};

// Attaches the layout-only fields the grid needs — nothing here is part of
// your Sanity data, so it stays out of CollectionType entirely.
function withLayout(items: CollectionType): LaidOutArt[] {
  return items.map((art, i) => {
    const src = art.image?.url;
    const { w, h } = src ? sizeOf(src) : { w: 1000, h: 1250 };

    return {
      ...art,
      ratio: Math.min(h / w, MAX_RATIO),
      catalogueNo: `Nº ${String(i + 1).padStart(2, "0")}`,
    };
  });
}

function useColumnCount() {
  const [columns, setColumns] = useState<number | null>(null);

  useEffect(() => {
    const update = () => setColumns(columnsForWidth(window.innerWidth));
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return columns;
}

function ArtworkTile({
  art,
  priority,
  focusRing,
}: {
  art: LaidOutArt;
  priority: boolean;
  focusRing: string;
}) {
  const src = art.image?.url;

  return (
    <Link
      href={art.slug ? `/art/${art.slug}` : "#"}
      className={`group block ${focusRing}`}
    >
      {/* Artwork — aspect-ratio reserves space (no CLS) and caps how tall
          an extreme portrait is allowed to render; object-cover crops the
          overflow rather than stretching the column. */}
      <div
        className="relative overflow-hidden bg-muted"
        style={{ aspectRatio: `1 / ${art.ratio}` }}
      >
        {src && (
          <Image
            src={urlFor(src).width(1400).auto("format").url()}
            alt={art.image.alt || art.name || "Artwork"}
            fill
            sizes="(min-width: 1024px) 31vw, (min-width: 640px) 48vw, 100vw"
            priority={priority}
            className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-[1.025]"
          />
        )}

        <span className="absolute left-3 top-3 text-[9px] uppercase tracking-[0.16em] mix-blend-difference sm:left-4 sm:top-4">
          {art.catalogueNo}
        </span>

        <div className="absolute inset-0 flex items-end justify-between bg-linear-to-t from-background/45 via-transparent to-transparent p-4 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
          <span className="text-[9px] uppercase tracking-[0.16em] text-white">
            View artwork
          </span>
          <span className="flex size-8 items-center justify-center bg-white text-black transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:-translate-y-0.5">
            <ArrowUpRight className="size-3.5" strokeWidth={1.5} />
          </span>
        </div>
      </div>

      {/* Wall label */}
      <div className="mt-4">
        <div className="flex items-baseline justify-between gap-4">
          <h2 className="min-w-0 text-sm font-medium tracking-tight md:text-base">
            {art.name}
          </h2>
        </div>

        <div className="mt-1.5 flex items-center justify-between gap-4">
          {art.price?.amount ? (
            <span className="shrink-0 text-xs text-muted-foreground">
              {art.price.currency?.toUpperCase()}{" "}
              {formatCurrency(art.price.amount)}
            </span>
          ) : null}
        </div>
      </div>
    </Link>
  );
}

export function MasonryGrid({
  items,
  focusRing,
}: {
  items: CollectionType;
  focusRing: string;
}) {
  const columnCount = useColumnCount();
  // Recomputed only when the underlying data changes, not on every resize.
  const laidOut = useMemo(() => withLayout(items), [items]);

  if (columnCount === null) {
    // Pre-mount fallback — same markup shape as the balanced version below,
    // just single-column, so there's nothing jarring for React to reconcile.
    return (
      <ul className="columns-1 gap-x-6 sm:columns-2 lg:columns-3">
        {laidOut.map((art, i) => (
          <li key={art.slug ?? i} className="mb-14 break-inside-avoid">
            <ArtworkTile art={art} priority={i < 3} focusRing={focusRing} />
          </li>
        ))}
      </ul>
    );
  }

  // Shortest-column-first bin packing, using the clamped ratio so a
  // capped-height image doesn't get treated as taller than it will render.
  const columns: LaidOutArt[][] = Array.from(
    { length: columnCount },
    () => [],
  );
  const heights = new Array(columnCount).fill(0);

  laidOut.forEach((art) => {
    const shortest = heights.indexOf(Math.min(...heights));
    columns[shortest].push(art);
    heights[shortest] += art.ratio;
  });

  return (
    <div className="flex gap-x-6">
      {columns.map((column, colIndex) => (
        <div key={colIndex} className="flex flex-1 flex-col gap-14">
          {column.map((art, i) => (
            <ArtworkTile
              key={art.slug ?? `${colIndex}-${i}`}
              art={art}
              priority={laidOut.indexOf(art) < 3}
              focusRing={focusRing}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
