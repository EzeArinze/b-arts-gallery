import { defineQuery } from "next-sanity";

export const HOME_QUERY = defineQuery(`
{
  "newPostImages": *[_type == "collection"]
    | order(_createdAt desc)[0...4]{
      _id,
      "image": {
        "url": artImage.asset->url,
        "alt": artImage.alt
      }
    },

  "HomePageCollections": *[_type == "collection"]| order(_createdAt desc)[0...4]{
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

export const ART_DETAILS =
  defineQuery(`*[_type == "collection" && slug.current == $slug][0]{
  name,
  about,
  dimensions,
  available,
  artist,
  price{
    amount,
    currency
  },
  "image": {
    "url": artImage.asset->url,
    "alt": artImage.alt
  },
  creationDate,
  }`);

export const COLLECTIONS = defineQuery(`
{
  "collections": *[_type == "collection"]
    | order(_createdAt desc)[$start...$end]{
      name,
      artist,
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
    },
  "total": count(*[_type == "collection"])
}
`);

export const PROCESSED_ORDER =
  defineQuery(`*[_type == "order" && payment.reference == $reference][0]{
    _id,
    }
`);
