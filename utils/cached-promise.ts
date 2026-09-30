import { getART } from "@/data/get-art";

const cache = new Map();

export function getArtForCheckoutSummary({ slug }: { slug: string }) {
  if (!cache.has(slug)) {
    cache.set(slug, getART(slug));
  }
  return cache.get(slug);
}
