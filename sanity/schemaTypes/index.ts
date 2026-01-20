import { type SchemaTypeDefinition } from "sanity";
import { blockContentType } from "./block-content";
import { collectionSchema } from "./collections";
import { orderSchema } from "./order-schema";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [blockContentType, collectionSchema, orderSchema],
};
