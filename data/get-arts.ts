import { sanityFetch } from "@/sanity/lib/live";
import { defineQuery } from "next-sanity";

export const HomeQuery = defineQuery(`
{
  "newPostImages": *[_type == "collection"]
    | order(_createdAt desc)[0...4]{
      _id,
      "image": {
        "url": artImage.asset->url,
        "alt": artImage.alt
      }
    },

  "HomePageCollections": *[_type == "collection"][0...4]{
    name,
    "slug": slug.current,
    price{
      amount,
      currency
    },
    creationDate,
    about,
    "image": {
      "url": artImage.asset->url,
      "alt": artImage.alt
    }
  }
}
`);

export async function getHomePageQuery() {
  const { data } = await sanityFetch({
    query: HomeQuery,
  });

  return data;
}
