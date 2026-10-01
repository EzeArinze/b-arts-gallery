import "server-only";

import { notFound } from "next/navigation";
import { getArtForCheckout } from "@/data/checkout/get-art-for-checkout";
import type { SummaryItem } from "@/app/(art-page)/art/checkout/_components/order-summary";

export async function getCheckoutArt(slug: string) {
  const result = await getArtForCheckout(slug);

  if (!result.ok) {
    notFound();
  }

  const { art } = result;

  const items: SummaryItem[] = [
    {
      id: art.name ?? "artwork",
      title: art.name ?? "Untitled",
      artist: art.artist ?? undefined,
      price: art.price.amount,
      imageUrl: art.image.url ?? undefined,
    },
  ];

  return { art, items };
}

export type getCheckoutArtReturnType = Awaited<
  ReturnType<typeof getCheckoutArt>
>;
