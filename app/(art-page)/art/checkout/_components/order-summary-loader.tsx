import OrderSummary from "./order-summary";
import { getCheckoutArtReturnType } from "@/data/checkout/get-checkout-art";

export default async function OrderSummaryLoader({
  artPromise,
}: {
  artPromise: Promise<getCheckoutArtReturnType>;
}) {
  const { art, items } = await artPromise;

  return <OrderSummary items={items} currency={art.price.currency ?? "NGN"} />;
}
