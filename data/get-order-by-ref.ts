import "server-only";

import { sanityFetch } from "@/sanity/lib/live";
import { ORDER_BY_REFERENCE } from "@/sanity/lib/queries";
import { stegaClean } from "next-sanity";

export async function getOrderByReference(reference: string) {
  const { data: order } = await sanityFetch({
    query: ORDER_BY_REFERENCE,
    params: { reference },
  });

  const cleanOrder = stegaClean(order);

  return cleanOrder ?? null;
}
