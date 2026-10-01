import Link from "next/link";
import CheckOutForm from "./_components/check-out-form";
import { Suspense } from "react";
import OrderSummaryLoader from "./_components/order-summary-loader";
import { OrderSummarySkeleton } from "./_components/order-summary-skeleton";
import { notFound } from "next/navigation";
import { requireUser } from "@/data/get-user";
import { getCheckoutArt } from "@/data/checkout/get-checkout-art";

type SearchParams = Promise<{ slug?: string | string[] }>;

const STEPS = ["Details", "Payment"];
const CURRENT_STEP = 0;

async function CheckOutPage({ searchParams }: { searchParams: SearchParams }) {
  const { slug: rawSlug } = await searchParams;
  const slug = Array.isArray(rawSlug) ? rawSlug[0] : rawSlug;
  if (!slug) notFound();

  const plainUser = await requireUser();

  const artPromise = getCheckoutArt(slug);

  return (
    <main className="min-h-screen w-full px-6 pb-16 pt-28 md:px-16 md:pt-32">
      <div className="mx-auto w-full max-w-6xl">
        <Link
          href="/art"
          className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground transition-colors duration-200 hover:text-primary"
        >
          &larr; Back to collection
        </Link>

        <ol
          aria-label="Checkout progress"
          className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-[10px] uppercase tracking-[0.25em]"
        >
          {STEPS.map((step, i) => (
            <li
              key={step}
              aria-current={i === CURRENT_STEP ? "step" : undefined}
              className={
                i === CURRENT_STEP ? "text-primary" : "text-muted-foreground/60"
              }
            >
              <span className="mr-2 tabular-nums">0{i + 1}</span>
              {step}
            </li>
          ))}
        </ol>

        <div className="mt-10 grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_380px] lg:gap-16">
          <CheckOutForm user={plainUser} slug={slug} />

          {/* Summary sits above the form on mobile, sticky beside it on lg */}
          <aside className="order-first lg:sticky lg:top-28 lg:order-last">
            <Suspense fallback={<OrderSummarySkeleton />}>
              <OrderSummaryLoader artPromise={artPromise} />
            </Suspense>
            {/*<OrderSummary items={items} currency={art.price.currency ?? "NGN"} />;*/}
          </aside>
        </div>
      </div>
    </main>
  );
}

export default CheckOutPage;
