import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

interface BuyAvailableArtProps {
  available: boolean | null;
  slug: string;
  focusRing: string;
}

export default function BuyAvailableArt({
  available,
  focusRing,
  slug,
}: BuyAvailableArtProps) {
  return (
    <>
      {available ? (
        <Link
          href={`/art/checkout?slug=${encodeURIComponent(slug)}`}
          className={`group flex w-fit items-center gap-4 rounded-full bg-zinc-50 py-2 pl-7 pr-2 text-sm font-medium text-zinc-950 transition-[transform,background-color] duration-150 ease-out hover:bg-white active:scale-[0.97] ${focusRing}`}
        >
          Buy artwork
          <span className="flex size-9 items-center justify-center rounded-full bg-zinc-950 text-zinc-50 transition-transform duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
            <ArrowUpRight className="size-4" strokeWidth={1.5} aria-hidden />
          </span>
        </Link>
      ) : (
        <Link
          href="/art"
          className={`w-fit rounded-full border border-white/20 px-7 py-3 text-sm font-medium transition-[transform,border-color] duration-150 ease-out hover:border-white/50 active:scale-[0.97] ${focusRing}`}
        >
          Browse available works
        </Link>
      )}
    </>
  );
}
