import { HOME_QUERYResult } from "@/sanity.types";

export type CollectionType = HOME_QUERYResult["HomePageCollections"];
export type CollectionItem = CollectionType[number];

export type OrderMetadata = {
  customer: { name: string; email: string; phone: string };
  shippingAddress: { state: string; address: string };
  items: { artId: string; price: number; currency: string }[];
};
