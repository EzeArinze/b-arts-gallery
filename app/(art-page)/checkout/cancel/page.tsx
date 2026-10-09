import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

type SearchParams = Promise<{ slug?: string }>;

const focusRing =
  "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary";

async function CancelCheckoutPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { slug } = await searchParams;

  const retryHref = slug
    ? `/art/checkout?slug=${encodeURIComponent(slug)}`
    : "/art";

  return (
    <main className="flex min-h-dvh flex-col items-center justify-center bg-background px-6 text-center text-foreground">
      <div className="max-w-[46ch] motion-safe:animate-[fade-up_600ms_cubic-bezier(0.23,1,0.32,1)_both]">
        <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
          Payment cancelled
        </span>

        <h1 className="mt-4 font-display text-4xl leading-[0.95] tracking-[-0.03em] sm:text-5xl">
          Nothing was charged.
        </h1>

        <p className="mt-5 text-sm leading-7 text-muted-foreground">
          You left before completing payment, so your card was not billed. The
          piece is held for you for a few more minutes if you&rsquo;d like to
          pick up where you left off.
        </p>

        <div className="mt-10 flex flex-col items-center gap-6 sm:flex-row sm:justify-center">
          <Link
            href={retryHref}
            className={`inline-flex h-12 items-center justify-center rounded-none border border-muted/40 px-8 text-xs tracking-[0.3em] text-foreground transition-[transform,border-color] duration-150 ease-out hover:border-primary active:scale-[0.97] motion-reduce:active:scale-100 ${focusRing}`}
          >
            TRY AGAIN
          </Link>

          <Link
            href="/art"
            className={`group inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.2em] text-foreground transition-colors duration-200 hover:text-muted-foreground ${focusRing}`}
          >
            Back to gallery
            <span className="flex size-8 items-center justify-center rounded-none border border-muted/40 transition-colors duration-300 group-hover:border-primary">
              <ArrowUpRight
                className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                strokeWidth={1.5}
              />
            </span>
          </Link>
        </div>
      </div>
    </main>
  );
}

export default CancelCheckoutPage;
