import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import CheckOutForm from "../../_components/check-out-form";
import OrderSummary, { type SummaryItem } from "../../_components/order-summary";

const STEPS = ["Details", "Payment"];
const CURRENT_STEP = 0;

// TODO: replace with the real cart (Sanity artworks / cart store)
const placeholderItems: SummaryItem[] = [
  { id: "1", title: "Artwork title", artist: "Artist name", price: 1200 },
];

async function CheckOutPage() {
  const user = await currentUser();

  if (!user) {
    redirect("/sign-in");
  }

  const plainUser = {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    emailAddress: user.emailAddresses[0]?.emailAddress,
    imageUrl: user.imageUrl,
    fullName: user.fullName,
  };

  return (
    // pt-28+ clears the fixed navigation; no more vertical centring, which
    // clipped the form on short phones.
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
                i === CURRENT_STEP
                  ? "text-primary"
                  : "text-muted-foreground/60"
              }
            >
              <span className="mr-2 tabular-nums">0{i + 1}</span>
              {step}
            </li>
          ))}
        </ol>

        <div className="mt-10 grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_380px] lg:gap-16">
          <CheckOutForm user={plainUser} />

          {/* Summary sits above the form on mobile, sticky beside it on lg */}
          <aside className="order-first lg:sticky lg:top-28 lg:order-last">
            <OrderSummary items={placeholderItems} />
          </aside>
        </div>
      </div>
    </main>
  );
}

export default CheckOutPage;
