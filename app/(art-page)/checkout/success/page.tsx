import Image from "next/image";
import { formatCurrency } from "@/utils/format-currency";
import { getOrderByReference } from "@/data/get-order-by-ref";
import { StateLayout } from "../_components/state-layout";
import { BackToGallery } from "../_components/back-to-gallery";
import Link from "next/link";

type SearchParams = Promise<{ reference?: string; trxref?: string }>;

const focusRing =
  "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary";

export default async function CheckoutSuccessful({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const params = await searchParams;
  const reference = params.reference ?? params.trxref;

  if (!reference) {
    return (
      <StateLayout
        eyebrow="Not found"
        heading="We couldn't find that order."
        message="No payment reference was provided. If you just completed a purchase, check your email for confirmation."
      >
        <BackToGallery focusRing={focusRing} />
      </StateLayout>
    );
  }

  const order = await getOrderByReference(reference);

  if (!order) {
    return (
      <StateLayout
        eyebrow="Confirming payment"
        heading="Almost there."
        message="We're still confirming your payment with the gallery's bank. This usually takes a few seconds."
      >
        <Link
          href={`?reference=${reference}`}
          className={`inline-flex items-center gap-2 rounded-none border border-muted/40 px-6 py-3 text-[11px] uppercase tracking-[0.2em] text-foreground transition-colors duration-200 hover:border-primary ${focusRing}`}
        >
          Refresh
        </Link>
      </StateLayout>
    );
  }

  const items = order.order?.items ?? [];
  const total = order.order?.total ?? 0;
  const currency = order.order?.currency ?? "NGN";

  return (
    <main className="min-h-dvh bg-background px-4 pb-24 pt-28 text-foreground md:px-16 md:pt-32">
      <div className="mx-auto w-full max-w-180">
        <div className="motion-safe:animate-[fade-up_600ms_cubic-bezier(0.23,1,0.32,1)_both]">
          <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            Acquisition confirmed
          </span>
          <h1 className="mt-4 font-display text-5xl leading-[0.9] tracking-[-0.03em] sm:text-6xl">
            It&rsquo;s yours.
          </h1>
          <p className="mt-6 max-w-[46ch] text-sm leading-7 text-muted-foreground">
            A confirmation has been sent to {order.customer?.email}. The gallery
            will be in touch about delivery and next steps.
          </p>
        </div>

        <div
          className="mt-14 border-t border-muted/30 pt-10 motion-safe:animate-[fade-up_600ms_cubic-bezier(0.23,1,0.32,1)_both]"
          style={{ animationDelay: "150ms" }}
        >
          <ul className="divide-y divide-muted/30">
            {items.map((item, i) => (
              <li key={item.slug ?? i} className="flex items-center gap-5 py-5">
                <div className="relative size-20 shrink-0 overflow-hidden bg-muted">
                  {item.image?.url && (
                    <Image
                      src={item.image.url}
                      alt={item.image.alt || item.name || "Artwork"}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">{item.name}</p>
                  {item.artist && (
                    <p className="text-xs text-muted-foreground">
                      {item.artist}
                    </p>
                  )}
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-8 flex items-baseline justify-between border-t border-muted/30 pt-6 text-sm">
            <span className="uppercase tracking-[0.16em] text-muted-foreground">
              Total paid
            </span>
            <span className="text-lg tabular-nums">
              {currency.toUpperCase()} {formatCurrency(total)}
            </span>
          </div>

          <p className="mt-3 text-xs tracking-wide text-muted-foreground/70">
            Reference {order.payment?.reference}
          </p>
        </div>

        <div className="mt-14">
          <BackToGallery focusRing={focusRing} />
        </div>
      </div>
    </main>
  );
}
