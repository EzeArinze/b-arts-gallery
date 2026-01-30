"use server";

import { sanityFetch } from "@/sanity/lib/live";
import { ART_DETAILS } from "@/sanity/lib/queries";

export async function getART(slug: string) {
  const { data } = await sanityFetch({
    query: ART_DETAILS,
    params: { slug },
  });

  return data;
}
