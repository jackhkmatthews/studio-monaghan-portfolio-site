import { defineQuery } from "next-sanity";

export const SETTINGS_QUERY = defineQuery(`
*[_type == "settings"][0]
`);

export const PROJECTS_QUERY = defineQuery(`
*[_type == "project"] | order(_createdAt desc) {
  _id,
  title,
  slug,
  overview,
  coverImage {
    ...,
    asset-> {
      ...,
      metadata
    }
  }
}
`);

export const PROJECT_QUERY = defineQuery(`
*[_type == "project" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  overview,
  coverImage {
    ...,
    asset-> {
      ...,
      metadata
    }
  },
  body
}
`);
