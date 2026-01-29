import { sanityFetch } from "@/sanity/lib/live";
import { COLLECTIONS } from "@/sanity/lib/queries";
import { PAGE_SIZE } from "@/utils/constant";

type GetCollectionType = {
  page?: number;
  limit?: number;
};

export async function getCollection({
  page = 1,
  limit = PAGE_SIZE,
}: GetCollectionType) {
  const start = (page - 1) * limit;
  const end = start + limit;

  const { data } = await sanityFetch({
    query: COLLECTIONS,
    params: { start, end },
  });

  const { collections, total } = data;

  const totalPages = Math.ceil(total / limit);

  return {
    collections,
    totalPages,
  };
}
