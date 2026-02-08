import { type SchemaTypeDefinition } from "sanity";
import { settings } from "./singletons/settings";
import { link } from "./objects/link";
import { blockContentType } from "./objects/block-content-type";
import { projectType } from "./documents/project-type";
import { gallerySection } from "./objects/gallery-section";
import { about } from "./singletons/about";
import { home } from "./singletons/home";
import { work } from "./singletons/work";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    settings,
    link,
    blockContentType,
    gallerySection,
    projectType,
    about,
    home,
    work,
  ],
};
