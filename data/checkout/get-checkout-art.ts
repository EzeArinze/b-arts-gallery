import "server-only";

// import { getArtForCheckout } from "@/data/checkout/get-art-for-checkout";
import type { SummaryItem } from "@/app/(art-page)/art/checkout/_components/order-summary";
import { getART } from "../get-art";

export async function getCheckoutArt(slug: string) {
  const result = await getART(slug);

  if (!result) {
    return { ok: false, reason: "not-found" };
  }

  if (result.price?.amount == null) {
    return { ok: false, reason: "unavailable" };
  }

  const items: SummaryItem[] = [
    {
      id: result.name ?? "artwork",
      title: result.name ?? "Untitled",
      artist: result.artist ?? undefined,
      price: result.price.amount,
      imageUrl: result.image.url ?? undefined,
    },
  ];

  return { art: result, items };
}

export type getCheckoutArtReturnType = Awaited<
  ReturnType<typeof getCheckoutArt>
>;
