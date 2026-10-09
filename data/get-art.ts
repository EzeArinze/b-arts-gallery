import "server-only";

import { sanityFetch } from "@/sanity/lib/live";
import { ART_DETAILS } from "@/sanity/lib/queries";
import { stegaClean } from "next-sanity";

export async function getART(slug: string) {
  const { data } = await sanityFetch({
    query: ART_DETAILS,
    params: { slug },
  });

  const cleanData = stegaClean(data);

  return cleanData;
}

export type ArtType = NonNullable<Awaited<ReturnType<typeof getART>>>;
