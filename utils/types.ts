import { HOME_QUERYResult } from "@/sanity.types";

export type CollectionType = HOME_QUERYResult["HomePageCollections"];
export type CollectionItem = CollectionType[number];
