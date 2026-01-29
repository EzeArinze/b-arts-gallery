import { getCollection } from "@/data/getCollection";
import Image from "next/image";
import Link from "next/link";
import Paginate from "../_components/pagination";
import { urlFor } from "@/sanity/lib/image";
import { formatCurrency } from "@/utils/format-currency";

export default async function ArtPage(props: {
  searchParams?: Promise<{ page?: string }>;
}) {
  const params = await props.searchParams;
  const currentPage = Number(params?.page) || 1;

  const { totalPages, collections } = await getCollection({
    page: currentPage,
  });

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
        {collections.map((art) => (
          <Link key={art.slug} href={`/art/${art.slug}`} className="group">
            {/* Image */}
            <div className="relative overflow-hidden border border-primary/30">
              {art.image.url && (
                <Image
                  src={urlFor(art.image.url).url()}
                  alt={art.image.alt || ""}
                  width={600}
                  height={800}
                  className="w-full h-auto max-h-[86vh] object-contain transition-transform duration-500 group-hover:scale-[1.02]"
                />
              )}
            </div>

            {/* Meta */}
            <div className="mt-6 space-y-2">
              <div className="text-xs tracking-[0.3em] uppercase">
                {art.artist}
              </div>
              <span className="flex items-center justify-between">
                <h2 className="font-anton text-2xl leading-tight">
                  {art.name}
                </h2>
                {art.price?.amount && (
                  <p className="text-sm font-semibold tracking-tight md:tracking-[0.3em] text-muted-foreground">
                    {art.price?.currency}:{formatCurrency(art.price?.amount)}
                  </p>
                )}
              </span>
            </div>
          </Link>
        ))}
      </div>

      {/* Pagination */}
      <Paginate currentPage={currentPage} totalPages={totalPages} />
    </main>
  );
}
