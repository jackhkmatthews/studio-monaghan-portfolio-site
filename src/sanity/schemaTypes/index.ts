import { type SchemaTypeDefinition } from "sanity";
import { settings } from "./singletons/settings";
import { link } from "./objects/link";
import { blockContentType } from "./objects/block-content-type";
import { projectType } from "./documents/project-type";
import { about } from "./singletons/about";
import { home } from "./singletons/home";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [settings, link, blockContentType, projectType, about, home],
};
