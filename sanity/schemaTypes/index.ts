import { type SchemaTypeDefinition } from "sanity";
import { blockContentType } from "./block-content";
import { collectionSchema } from "./collections";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [blockContentType, collectionSchema],
};
