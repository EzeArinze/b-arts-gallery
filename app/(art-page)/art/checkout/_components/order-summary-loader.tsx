import { notFound } from "next/navigation";
import OrderSummary, { type SummaryItem } from "./order-summary";
import { ArtType } from "@/data/get-art";

export default async function OrderSummaryLoader({
  artPromise,
}: {
  artPromise: Promise<ArtType | null>;
}) {
  const art = await artPromise;

  if (!art || art.available === false || art.price?.amount == null) {
    notFound();
  }

  const items: SummaryItem[] = [
    {
      id: art.name ?? "artwork",
      title: art.name ?? "Untitled",
      artist: art.artist ?? undefined,
      price: art.price.amount,
      imageUrl: art.image.url ?? undefined,
    },
  ];

  return <OrderSummary items={items} currency={art.price.currency ?? "NGN"} />;
}
