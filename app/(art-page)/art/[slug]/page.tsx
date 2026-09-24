// import { buttonVariants } from "@/components/ui/button";
// import { getART } from "@/data/get-art";
// import { urlFor } from "@/sanity/lib/image";
// import { formatCurrency } from "@/utils/format-currency";
// import { PortableText } from "next-sanity";
// import Image from "next/image";
// import Link from "next/link";
// import { notFound } from "next/navigation";

// type Params = Promise<{ slug: string }>;

// async function ArtDetailsPage({ params }: { params: Params }) {
//   const { slug } = await params;

//   const art = await getART(slug);

//   if (!art) return notFound();

//   return (
//     <main className="min-h-screen bg-black  px-6 md:px-16 py-20">
//       <div className="mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-2 gap-16">
//         {/* Artwork */}
//         <div className="w-full flex items-center justify-center">
//           <div className="w-full max-h-[70vh]">
//             {art.image.url && (
//               <Image
//                 src={urlFor(art.image?.url).url()}
//                 alt={art.image.alt || ""}
//                 width={400}
//                 height={400}
//                 className="w-full h-auto max-h-[86vh] object-contain"
//               />
//             )}
//           </div>
//         </div>

//         {/* Details */}
//         <div className="flex flex-col justify-center">
//           {/* Title */}
//           <h1 className="text-[12vw] text-primary md:text-[5rem] leading-[0.9] mb-6">
//             {art.name}
//           </h1>

//           {/* Metadata */}
//           <div className="mb-8 space-y-2 text-xs tracking-[0.3em] uppercase ">
//             <div>{art.artist}</div>
//             <div>
//               {art?.creationDate && new Date(art.creationDate).getFullYear()}
//             </div>
//             {/*<div>{art.medium}</div>*/}
//             <div>
//               {art.dimensions?.width} * {art.dimensions?.width}
//               {art.dimensions?.unit}
//             </div>
//           </div>

//           {/* Description */}
//           <span className="max-w-xl text-sm leading-relaxed  mb-10">
//             <PortableText value={art.about || []} />
//           </span>

//           {/* Divider */}
//           <div className="h-px w-full bg-primary/30 mb-8" />

//           {/* Purchase */}
//           <div className="flex items-center justify-between">
//             <div className="tracking-tight text-sm md:tracking-[0.3em] uppercase">
//               {art.price?.currency?.toUpperCase()}:{" "}
//               {art.price?.amount && formatCurrency(art.price.amount)}
//             </div>

//             <Link
//               href={"/art/checkout"}
//               className={buttonVariants({
//                 variant: "outline",
//                 className:
//                   " border border-primary px-8 py-3 text-xs tracking-[0.35em] hover:bg-primary hover:text-white transition rounded-none",
//               })}
//             >
//               BUY ARTWORK
//             </Link>
//           </div>

//           {/* Availability */}
//           <div className="mt-4 text-[10px] tracking-[0.3em] uppercase text-primary/60">
//             {art.available ? (
//               <span className="text-green-700 font-bold">Available</span>
//             ) : (
//               <span>Not Available</span>
//             )}
//           </div>
//         </div>
//       </div>
//     </main>
//   );
// }

// export default ArtDetailsPage;

import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { PortableText } from "next-sanity";
import { getART } from "@/data/get-art";
import { urlFor } from "@/sanity/lib/image";
import { formatCurrency } from "@/utils/format-currency";

type Params = Promise<{ slug: string }>;

const ENTER =
  "motion-safe:transition-[opacity,transform] motion-safe:duration-500 motion-safe:ease-[cubic-bezier(0.23,1,0.32,1)] starting:opacity-0 starting:translate-y-2";

const focusRing =
  "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-zinc-100";

async function ArtDetailsPage({ params }: { params: Params }) {
  const { slug } = await params;
  const art = await getART(slug);

  if (!art) return notFound();

  const year = art.creationDate
    ? new Date(art.creationDate).getFullYear()
    : null;
  const { width, height, unit } = art.dimensions ?? {};

  // Only rows that have data. `medium` can join this list once it's in the query.
  const specs = [
    { label: "Artist", value: art.artist },
    { label: "Year", value: year },
    {
      label: "Dimensions",
      value:
        width && height ? `${width} × ${height} ${unit ?? ""}`.trim() : null,
    },
  ].filter((s) => s.value);

  return (
    <main className="relative min-h-dvh overflow-hidden bg-zinc-950 px-4 pb-20 pt-24 text-zinc-100 md:px-16">
      {/* Wall wash: a faint pool of light behind the work, like a picture light */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(55%_60%_at_32%_42%,rgba(255,255,255,0.07),transparent_70%)]"
      />

      <div className="relative mx-auto flex w-full max-w-7xl flex-col gap-10">
        <Link
          href="/art"
          className={`w-fit text-sm text-zinc-400 transition-colors duration-150 hover:text-zinc-100 ${focusRing}`}
        >
          ← All works
        </Link>

        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-20">
          {/* Artwork: shell + mat, sized to the work so nothing is cropped */}
          <div className="flex justify-center lg:justify-start">
            {art.image.url && (
              <div
                className={`w-fit max-w-full rounded-[14px] bg-white/3 p-2 ring-1 ring-white/10 shadow-[0_50px_100px_-40px_rgba(0,0,0,0.7)] ${ENTER} starting:scale-[0.985]`}
              >
                <div className="rounded-md bg-zinc-900 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] md:p-6">
                  <Image
                    src={urlFor(art.image.url).width(1600).auto("format").url()}
                    alt={art.image.alt || art.name || ""}
                    width={1600}
                    height={1600}
                    sizes="(min-width: 1024px) 55vw, 100vw"
                    priority
                    className="h-auto max-h-[72vh] w-auto max-w-full object-contain"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Details */}
          <div className="flex max-w-xl flex-col">
            <div className={`${ENTER} motion-safe:delay-100`}>
              <h1 className="text-4xl leading-[1.02] tracking-tight text-primary md:text-6xl">
                {art.name}
              </h1>
            </div>

            <div
              className={`mt-8 max-w-[65ch] text-base leading-relaxed text-zinc-400 [&_p+p]:mt-4 ${ENTER} motion-safe:delay-150`}
            >
              <PortableText value={art.about || []} />
            </div>

            {/* Wall label: hairlines instead of a box */}
            {specs.length > 0 && (
              <dl
                className={`mt-10 divide-y divide-white/10 border-y border-white/10 text-sm ${ENTER} motion-safe:delay-200`}
              >
                {specs.map((s) => (
                  <div
                    key={s.label}
                    className="flex items-baseline justify-between gap-6 py-3.5"
                  >
                    <dt className="text-zinc-500">{s.label}</dt>
                    <dd className="text-right text-zinc-100">{s.value}</dd>
                  </div>
                ))}
              </dl>
            )}

            {/* Purchase */}
            <div
              className={`mt-10 flex flex-col gap-6 ${ENTER} motion-safe:delay-[250ms]`}
            >
              <div className="flex items-baseline gap-3">
                <span className="text-3xl tracking-tight md:text-4xl">
                  {art.price?.amount
                    ? formatCurrency(art.price.amount)
                    : "Price on request"}
                </span>
                {art.price?.currency && (
                  <span className="text-sm text-zinc-500">
                    {art.price.currency.toUpperCase()}
                  </span>
                )}
              </div>

              {art.available ? (
                <Link
                  href="/art/checkout"
                  className={`group flex w-fit items-center gap-4 rounded-full bg-zinc-50 py-2 pl-7 pr-2 text-sm font-medium text-zinc-950 transition-[transform,background-color] duration-150 ease-out hover:bg-white active:scale-[0.97] ${focusRing}`}
                >
                  Buy artwork
                  <span className="flex size-9 items-center justify-center rounded-full bg-zinc-950 text-zinc-50 transition-transform duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                    <ArrowUpRight
                      className="size-4"
                      strokeWidth={1.5}
                      aria-hidden
                    />
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

              {/* Status: filled dot in the accent when available, hollow when not */}
              <p className="flex items-center gap-2.5 text-sm text-zinc-400">
                <span
                  aria-hidden
                  className={`size-2 rounded-full ${
                    art.available ? "bg-primary" : "border border-zinc-500"
                  }`}
                />
                {art.available ? "Available" : "This work has found a home"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default ArtDetailsPage;
