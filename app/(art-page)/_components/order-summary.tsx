import Image from "next/image";

export type SummaryItem = {
  id: string;
  title: string;
  artist?: string;
  price: number;
  imageUrl?: string;
};

interface OrderSummaryProps {
  items: SummaryItem[];
  shipping?: number | null; // null = "calculated at next step"
  currency?: string;
}

export default function OrderSummary({
  items,
  shipping = null,
  currency = "NGN",
}: OrderSummaryProps) {
  const format = (n: number) =>
    new Intl.NumberFormat("en", { style: "currency", currency }).format(n);

  const subtotal = items.reduce((sum, item) => sum + item.price, 0);
  const total = subtotal + (shipping ?? 0);

  return (
    <section
      aria-label="Order summary"
      className="border border-muted/40 bg-background/80 p-6 backdrop-blur-sm"
    >
      <h2 className="text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
        Your order
      </h2>

      <ul className="mt-6 divide-y divide-muted/30">
        {items.map((item) => (
          <li key={item.id} className="flex gap-4 py-4 first:pt-0 last:pb-0">
            <div className="relative h-20 w-16 shrink-0 overflow-hidden bg-muted/30">
              {item.imageUrl && (
                <Image
                  src={item.imageUrl}
                  alt={item.title}
                  fill
                  sizes="64px"
                  className="object-cover"
                />
              )}
            </div>

            <div className="flex min-w-0 flex-1 flex-col justify-between">
              <div>
                <p className="truncate text-sm font-medium">{item.title}</p>
                {item.artist && (
                  <p className="truncate text-xs text-muted-foreground">
                    {item.artist}
                  </p>
                )}
              </div>
              <p className="text-sm tabular-nums">{format(item.price)}</p>
            </div>
          </li>
        ))}
      </ul>

      <dl className="mt-6 space-y-3 border-t border-muted/30 pt-6 text-sm">
        <div className="flex justify-between">
          <dt className="text-muted-foreground">Subtotal</dt>
          <dd className="tabular-nums">{format(subtotal)}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-muted-foreground">Shipping</dt>
          <dd className="tabular-nums text-muted-foreground">
            {shipping === null ? "Calculated next" : format(shipping)}
          </dd>
        </div>
        <div className="flex justify-between border-t border-muted/30 pt-3 text-base font-medium">
          <dt>Total</dt>
          <dd className="tabular-nums">{format(total)}</dd>
        </div>
      </dl>

      {/* TODO: replace with your real policies before launch */}
      <ul className="mt-6 space-y-2 text-[11px] tracking-wide text-muted-foreground">
        <li>Certificate of authenticity with every original</li>
        <li>Packed and insured for delivery</li>
        <li>Questions? Contact the gallery</li>
      </ul>
    </section>
  );
}
