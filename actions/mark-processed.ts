import "server-only";

import { randomUUID } from "crypto";
import { backendClient } from "@/sanity/lib/backend-cLient";
import { sanityFetch } from "@/sanity/lib/live";
import { PROCESSED_ORDER } from "@/sanity/lib/queries";
import { OrderMetadata } from "@/utils/types";

export async function isOrderAlreadyProcessed(reference: string) {
  const { data: payment } = await sanityFetch({
    query: PROCESSED_ORDER,
    params: { reference },
  });

  return !!payment;
}

type PaystackChargeData = {
  reference: string;
  metadata: OrderMetadata;
};

function buildOrderDoc({ reference, metadata }: PaystackChargeData) {
  const { customer, shippingAddress, items } = metadata;

  return {
    _type: "order",
    customer,
    shippingAddress,
    order: {
      items: items.map((item) => ({
        _type: "reference",
        _ref: item.artId,
        _key: randomUUID(),
      })),
      total: items.reduce((sum, item) => sum + item.price, 0),
      currency: items[0]?.currency ?? "NGN",
      status: "paid",
      createdAt: new Date().toISOString(),
    },
    payment: {
      reference,
      status: "success",
    },
  };
}

export async function saveOrderTransaction(data: PaystackChargeData) {
  const artworkIds = data.metadata.items.map((item) => item.artId);

  const artworks: { _id: string; available: boolean | null }[] =
    await backendClient.fetch(`*[_id in $ids]{ _id, available }`, {
      ids: artworkIds,
    });

  const alreadySold = artworks.some((art) => art.available === false);

  if (alreadySold) {
    console.error(
      "saveOrderTransaction: artwork already sold, refund required",
      { reference: data.reference, artworkIds },
    );
    return { ok: false as const, reason: "already_sold" as const };
  }

  const orderDoc = buildOrderDoc(data);
  const tx = backendClient.transaction();

  tx.create(orderDoc);
  artworkIds.forEach((id) => {
    tx.patch(id, (patch) =>
      patch.set({ available: false, isSold: true }).unset(["reservedUntil"]),
    );
  });

  await tx.commit();

  return { ok: true as const };
}
