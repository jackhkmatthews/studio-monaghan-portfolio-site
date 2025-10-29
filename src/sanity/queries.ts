import { defineQuery } from "next-sanity";

export const SETTINGS_QUERY = defineQuery(`
*[_type == "settings"][0]
`);

export const HOME_QUERY = defineQuery(`
*[_type == "home"][0] {
  ...,
  image {
    ...,
    "blurHash": asset->metadata.blurHash,
    "lqip": asset->metadata.lqip,
  }
}
`);

export const ABOUT_QUERY = defineQuery(`
*[_type == "about"][0]
`);

export const PROJECTS_QUERY = defineQuery(`
*[_type == "project"] | order(_createdAt desc) {
  _id,
  title,
  slug,
  overview,
  coverImage {
    ...,
    "blurHash": asset->metadata.blurHash,
    "lqip": asset->metadata.lqip,
  }
}
`);

export const PROJECT_QUERY = defineQuery(`
*[_type == "project" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  overview,
  sections[] {
    ...,
    _type == "gallerySection" => {
      ...,
      images[] {
        ...,
        "blurHash": asset->metadata.blurHash,
        "lqip": asset->metadata.lqip,
      }
    }
  }
}
`);
