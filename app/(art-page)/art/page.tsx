// import Image from "next/image";
// import Link from "next/link";
// import { getCollection } from "@/data/getCollection";
// import { urlFor } from "@/sanity/lib/image";
// import { formatCurrency } from "@/utils/format-currency";
// import Paginate from "../_components/pagination";

// function sizeOf(url: string) {
//   const m = url.match(/-(\d+)x(\d+)\.[a-z]+$/i);
//   return m ? { w: Number(m[1]), h: Number(m[2]) } : { w: 1000, h: 1250 };
// }

// const focusRing =
//   "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-zinc-100";

// export default async function ArtPage(props: {
//   searchParams?: Promise<{ page?: string }>;
// }) {
//   const params = await props.searchParams;
//   const currentPage = Number(params?.page) || 1;

//   const { totalPages, collections } = await getCollection({
//     page: currentPage,
//   });

//   return (
//     <main className="min-h-dvh bg-zinc-950 px-4 pb-24 pt-24 text-zinc-100 md:px-16">
//       <div className="mx-auto w-full max-w-400">
//         {/* Header */}
//         <header className="flex items-end justify-between gap-6 border-b border-white/10 pb-8">
//           <h1 className="font-anton text-6xl leading-none text-primary md:text-8xl">
//             ALL WORKS
//           </h1>
//           {totalPages > 1 && (
//             <p className="pb-1 text-sm text-zinc-500">
//               Page {currentPage} of {totalPages}
//             </p>
//           )}
//         </header>

//         {collections.length === 0 ? (
//           <div className="flex flex-col items-start gap-6 py-24">
//             <p className="max-w-[40ch] text-zinc-400">
//               Nothing is on view on this page. Go back to the first page to see
//               the collection.
//             </p>
//             <Link
//               href="/art"
//               className={`rounded-full border border-white/20 px-7 py-3 text-sm font-medium transition-[transform,border-color] duration-150 ease-out hover:border-white/50 active:scale-[0.97] ${focusRing}`}
//             >
//               Back to all works
//             </Link>
//           </div>
//         ) : (
//           /* Masonry */
//           <ul className="mt-14 columns-1 gap-x-10 md:columns-2 lg:columns-3">
//             {collections.map((art, i) => {
//               const src = art.image?.url;
//               const { w, h } = src ? sizeOf(src) : { w: 1000, h: 1250 };

//               return (
//                 <li
//                   key={art.slug}
//                   className="mb-16 break-inside-avoid motion-safe:transition-[opacity,transform] motion-safe:duration-500 motion-safe:ease-[cubic-bezier(0.23,1,0.32,1)] starting:opacity-0 starting:translate-y-2"
//                   // Short stagger on load only, capped so late items never wait
//                   style={{ transitionDelay: `${Math.min(i, 5) * 50}ms` }}
//                 >
//                   <Link
//                     href={`/art/${art.slug}`}
//                     className={`group block ${focusRing}`}
//                   >
//                     {/* Shell + mat, same recipe as the details page */}
//                     <div className="rounded-xl bg-white/3 p-1.5 ring-1 ring-white/10 transition-shadow duration-200 ease-out group-hover:ring-white/25">
//                       <div className="overflow-hidden rounded-md bg-zinc-900 p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] md:p-4">
//                         {src && (
//                           <Image
//                             src={urlFor(src).width(1200).auto("format").url()}
//                             alt={art.image.alt || art.name || ""}
//                             width={w}
//                             height={h}
//                             sizes="(min-width: 1024px) 30vw, (min-width: 768px) 45vw, 100vw"
//                             priority={i < 3}
//                             className="h-auto w-full transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-[1.02]"
//                           />
//                         )}
//                       </div>
//                     </div>

//                     {/* Wall label */}
//                     <div className="mt-5 flex items-start justify-between gap-4 px-1">
//                       <div className="min-w-0">
//                         <h2 className="font-anton text-2xl leading-tight">
//                           {art.name}
//                         </h2>
//                         {art.artist && (
//                           <p className="mt-1 text-sm text-zinc-400">
//                             {art.artist}
//                           </p>
//                         )}
//                       </div>

//                       {art.price?.amount && (
//                         <p className="shrink-0 pt-1 text-sm text-zinc-300">
//                           {formatCurrency(art.price.amount)}
//                           {art.price.currency && (
//                             <span className="ml-1.5 text-zinc-500">
//                               {art.price.currency.toUpperCase()}
//                             </span>
//                           )}
//                         </p>
//                       )}
//                     </div>
//                   </Link>
//                 </li>
//               );
//             })}
//           </ul>
//         )}

//         {/* Pagination */}
//         {totalPages > 1 && (
//           <div className="mt-8 border-t border-white/10 pt-10">
//             <Paginate currentPage={currentPage} totalPages={totalPages} />
//           </div>
//         )}
//       </div>
//     </main>
//   );
// }

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getCollection } from "@/data/getCollection";
import Paginate from "../_components/pagination";
import { MasonryGrid } from "../_components/mansory-grid";


function sizeOf(url: string) {
  const match = url.match(/-(\d+)x(\d+)\.[a-z]+$/i);
  return match
    ? { w: Number(match[1]), h: Number(match[2]) }
    : { w: 1000, h: 1250 };
}

const MAX_RATIO = 1.4;

const focusRing =
  "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground";

const yearOf = (date?: string | null) =>
  date ? new Date(date).getFullYear() : null;

const catalogueNo = (index: number) =>
  `Nº ${String(index + 1).padStart(2, "0")}`;

export default async function ArtPage(props: {
  searchParams?: Promise<{ page?: string }>;
}) {
  const params = await props.searchParams;
  const currentPage = Number(params?.page) || 1;

  const { totalPages, collections } = await getCollection({
    page: currentPage,
  });

  const items = collections.map((art, i) => {
    const src = art.image?.url;
    const { w, h } = src ? sizeOf(src) : { w: 1000, h: 1250 };

    return {
      ...art,
      width: w,
      height: h,
      ratio: Math.min(h / w, MAX_RATIO),
      year: yearOf(art.creationDate),
      catalogueNo: catalogueNo((currentPage - 1) * collections.length + i),
    };
  });

  return (
    <main className="min-h-dvh px-4 pb-24 pt-16  md:px-16">
      <div className="mx-auto w-full max-w-360 px-4 pb-24 pt-8 sm:px-6 md:pb-32 md:pt-12 lg:px-10">
        {/* Header */}
        <header className="border-b border-foreground/10 pb-6">
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <div>
              <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
                Curated archive
              </span>

              <h1 className="mt-4 font-display text-6xl leading-[0.85] tracking-[-0.05em] sm:text-7xl md:text-8xl lg:text-9xl">
                All works
              </h1>
            </div>

            <div className="flex items-end gap-8">
              <div className="text-right">
                <span className="block text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                  Works
                </span>
                <span className="mt-1 block text-sm">
                  {String(collections.length).padStart(2, "0")}
                </span>
              </div>

              {totalPages > 1 && (
                <div className="text-right">
                  <span className="block text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                    Page
                  </span>
                  <span className="mt-1 block text-sm">
                    {String(currentPage).padStart(2, "0")}{" "}
                    <span className="text-muted-foreground">
                      / {String(totalPages).padStart(2, "0")}
                    </span>
                  </span>
                </div>
              )}
            </div>
          </div>
        </header>

        {items.length === 0 ? (
          <div className="flex min-h-[50vh] flex-col items-start justify-center gap-6">
            <div>
              <span className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                Archive
              </span>
              <p className="mt-4 max-w-[40ch] text-sm leading-7 text-muted-foreground">
                Nothing is on view on this page. Return to the first page to
                explore the collection.
              </p>
            </div>

            <Link
              href="/art"
              className={`group inline-flex items-center gap-3 text-[10px] font-medium uppercase tracking-[0.18em] transition-colors hover:text-muted-foreground ${focusRing}`}
            >
              Back to all works
              <span className="flex size-8 items-center justify-center border border-foreground/15 transition-colors duration-300 group-hover:border-foreground">
                <ArrowUpRight
                  className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  strokeWidth={1.5}
                />
              </span>
            </Link>
          </div>
        ) : (
          <section className="mt-12 md:mt-16">
            <div className="mb-8 flex items-center justify-between border-b border-foreground/10 pb-4">
              <span className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                The archive
              </span>
              <span className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                {catalogueNo((currentPage - 1) * collections.length)}
              </span>
            </div>

            <MasonryGrid items={items} focusRing={focusRing} />
          </section>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-6 border-t border-foreground/10 pt-8">
            <Paginate currentPage={currentPage} totalPages={totalPages} />
          </div>
        )}
      </div>
    </main>
  );
}
