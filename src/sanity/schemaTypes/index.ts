import { type SchemaTypeDefinition } from "sanity";
import { settings } from "./singletons/settings";
import { link } from "./objects/link";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [settings, link],
};
