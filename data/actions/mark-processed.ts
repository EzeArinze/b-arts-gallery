"use server";

import { sanityFetch } from "@/sanity/lib/live";
import { PROCESSED_ORDER } from "@/sanity/lib/queries";

export async function isOrderAlreadyProcessed(reference: string) {
  const { data: payment } = await sanityFetch({
    query: PROCESSED_ORDER,
    params: { reference },
  });

  return !!payment;
}

export async function saveOrderAndUpdateArtSold() {}
