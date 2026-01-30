"use server";

import { sanityFetch } from "@/sanity/lib/live";

import { HOME_QUERY } from "../sanity/lib/queries";

export async function getHomePageQuery() {
  const { data } = await sanityFetch({
    query: HOME_QUERY,
  });

  return data;
}
