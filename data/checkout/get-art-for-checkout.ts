import "server-only";

import { getART } from "@/data/get-art";

type ArtWithPrice = NonNullable<Awaited<ReturnType<typeof getART>>> & {
  price: { amount: number };
};

export type CheckoutArtResult =
  | { ok: true; art: ArtWithPrice }
  | { ok: false; reason: "not_found" | "unavailable" };

export async function getArtForCheckout(
  slug: string,
): Promise<CheckoutArtResult> {
  const art = await getART(slug);

  if (!art) {
    return { ok: false, reason: "not_found" };
  }

  if (art.available === false || art.price?.amount == null) {
    return { ok: false, reason: "unavailable" };
  }

  return { ok: true, art: art as ArtWithPrice };
}
