// import Image from "next/image";
// import Link from "next/link";
// import { notFound } from "next/navigation";
// import { PortableText } from "next-sanity";
// import { getART } from "@/data/get-art";
// import { urlFor } from "@/sanity/lib/image";
// import { formatCurrency } from "@/utils/format-currency";
// import BuyAvailableArt from "./_components/buy-available-art";

// type Params = Promise<{ slug: string }>;

// const ENTER =
//   "motion-safe:transition-[opacity,transform] motion-safe:duration-500 motion-safe:ease-[cubic-bezier(0.23,1,0.32,1)] starting:opacity-0 starting:translate-y-2";

// const focusRing =
//   "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-zinc-100";

// async function ArtDetailsPage({ params }: { params: Params }) {
//   const { slug } = await params;
//   const art = await getART(slug);

//   if (!art) return notFound();

//   const year = art.creationDate
//     ? new Date(art.creationDate).getFullYear()
//     : null;
//   const { width, height, unit } = art.dimensions ?? {};

//   // Only rows that have data. `medium` can join this list once it's in the query.
//   const specs = [
//     { label: "Artist", value: art.artist },
//     { label: "Year", value: year },
//     {
//       label: "Dimensions",
//       value:
//         width && height ? `${width} × ${height} ${unit ?? ""}`.trim() : null,
//     },
//   ].filter((s) => s.value);

//   return (
//     <main className="relative min-h-dvh overflow-hidden bg-zinc-950 px-4 pb-20 pt-24 text-zinc-100 md:px-16">
//       {/* Wall wash: a faint pool of light behind the work, like a picture light */}
//       <div
//         aria-hidden
//         className="pointer-events-none absolute inset-0 bg-[radial-gradient(55%_60%_at_32%_42%,rgba(255,255,255,0.07),transparent_70%)]"
//       />

//       <div className="relative mx-auto flex w-full max-w-7xl flex-col gap-10">
//         <Link
//           href="/art"
//           className={`w-fit text-sm text-zinc-400 transition-colors duration-150 hover:text-zinc-100 ${focusRing}`}
//         >
//           ← All works
//         </Link>

//         <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-10">
//           {/* Artwork: shell + mat, sized to the work so nothing is cropped */}
//           <div className="flex justify-center lg:justify-start">
//             {art.image.url && (
//               <div
//                 className={`w-fit max-w-full rounded-[14px] ${ENTER} starting:scale-[0.985]`}
//               >
//                 <div className="rounded-md bg-zinc-900 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
//                   <Image
//                     src={urlFor(art.image.url).width(1600).auto("format").url()}
//                     alt={art.image.alt || art.name || ""}
//                     width={1600}
//                     height={1600}
//                     sizes="(min-width: 1024px) 55vw, 100vw"
//                     priority
//                     className="h-auto max-h-[72vh] w-auto max-w-full object-contain"
//                   />
//                 </div>
//               </div>
//             )}
//           </div>

//           {/* Details */}
//           <div className="flex max-w-xl flex-col">
//             <div className={`${ENTER} motion-safe:delay-100`}>
//               <h1 className="text-4xl leading-[1.02] tracking-tight text-primary md:text-6xl">
//                 {art.name}
//               </h1>
//             </div>

//             <div
//               className={`mt-8 max-w-[65ch] text-base leading-relaxed text-zinc-400 [&_p+p]:mt-4 ${ENTER} motion-safe:delay-150`}
//             >
//               <PortableText value={art.about || []} />
//             </div>

//             {/* Wall label: hairlines instead of a box */}
//             {specs.length > 0 && (
//               <dl
//                 className={`mt-10 divide-y divide-white/10 border-y border-white/10 text-sm ${ENTER} motion-safe:delay-200`}
//               >
//                 {specs.map((s) => (
//                   <div
//                     key={s.label}
//                     className="flex items-baseline justify-between gap-6 py-3.5"
//                   >
//                     <dt className="text-zinc-500">{s.label}</dt>
//                     <dd className="text-right text-zinc-100">{s.value}</dd>
//                   </div>
//                 ))}
//               </dl>
//             )}

//             {/* Purchase */}
//             <div
//               className={`mt-10 flex flex-col gap-6 ${ENTER} motion-safe:delay-[250ms]`}
//             >
//               <div className="flex items-baseline gap-3">
//                 <span className="text-3xl tracking-tight md:text-4xl">
//                   {art.price?.amount
//                     ? formatCurrency(art.price.amount)
//                     : "Price on request"}
//                 </span>
//                 {art.price?.currency && (
//                   <span className="text-sm text-zinc-500">
//                     {art.price.currency.toUpperCase()}
//                   </span>
//                 )}
//               </div>

//               <BuyAvailableArt
//                 available={art.available}
//                 focusRing={focusRing}
//                 slug={slug}
//               />

//               {/* Status: filled dot in the accent when available, hollow when not */}
//               <p className="flex items-center gap-2.5 text-sm text-zinc-400">
//                 <span
//                   aria-hidden
//                   className={`size-2 rounded-full ${
//                     art.available ? "bg-primary" : "border border-zinc-500"
//                   }`}
//                 />
//                 {art.available ? "Available" : "This work has found a home"}
//               </p>
//             </div>
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
import { PortableText } from "next-sanity";
import { getART } from "@/data/get-art";
import { urlFor } from "@/sanity/lib/image";
import { formatCurrency } from "@/utils/format-currency";
import BuyAvailableArt from "./_components/buy-available-art";

type Params = Promise<{ slug: string }>;

const ENTER =
  "motion-safe:transition-[opacity,transform] motion-safe:duration-500 motion-safe:ease-[cubic-bezier(0.23,1,0.32,1)] starting:opacity-0 starting:translate-y-2";

const focusRing =
  "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-zinc-100";

function sizeOf(url: string) {
  const m = url.match(/-(\d+)x(\d+)\.[a-z]+$/i);
  return m ? { w: Number(m[1]), h: Number(m[2]) } : { w: 1600, h: 1600 };
}

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

  const imgSize = art.image?.url ? sizeOf(art.image.url) : null;
  const available = art.available && !art.isSold;

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

        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-10">
          {/* Artwork: shell + mat, sized to the work so nothing is cropped */}
          <div className="flex justify-center lg:justify-start">
            {art.image.url && imgSize && (
              <div className="w-fit max-w-full rounded-[14px]">
                <div className="rounded-md bg-zinc-900 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
                  <Image
                    src={urlFor(art.image.url).width(1600).auto("format").url()}
                    alt={art.image.alt || art.name || ""}
                    width={imgSize.w}
                    height={imgSize.h}
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

              <BuyAvailableArt
                available={art.available}
                focusRing={focusRing}
                slug={slug}
              />

              {/* Status: filled dot in the accent when available, hollow when not */}
              <p className="flex items-center gap-2.5 text-sm text-zinc-400">
                <span
                  aria-hidden
                  className={`size-2 rounded-full ${
                    available ? "bg-primary" : "border border-zinc-500"
                  }`}
                />
                {available ? "Available" : "This work has found a home"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default ArtDetailsPage;
