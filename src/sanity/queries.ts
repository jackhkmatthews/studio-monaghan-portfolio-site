import { defineQuery } from "next-sanity";

export const SETTINGS_QUERY = defineQuery(`
*[_type == "settings"][0]
`);

export const HOME_QUERY = defineQuery(`
*[_type == "home"][0]
`);

export const ABOUT_QUERY = defineQuery(`
*[_type == "about"][0]
`);

// TODO: remove dimensions from the query, use getImageDimensions to get the dimensions instead

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
  sections[] {
    ...,
    _type == "gallerySection" => {
      _type,
      images[] {
        ...,
        asset-> { ..., metadata }
      }
    }
  }
}
`);
