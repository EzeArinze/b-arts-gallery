import "server-only";

import { sanityFetch } from "@/sanity/lib/live";
import { stegaClean } from "@sanity/client/stega";
import { HOME_QUERY } from "../sanity/lib/queries";

export async function getHomePageQuery() {
  const { data } = await sanityFetch({
    query: HOME_QUERY,
  });

  const cleanData = stegaClean(data);

  return cleanData;
}
