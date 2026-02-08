import { defineQuery } from "next-sanity";

export const SETTINGS_QUERY = defineQuery(`
*[_type == "settings"][0]
`);

export const HOME_QUERY = defineQuery(`
*[_type == "home"][0] {
  ...,
  carouselImages[] {
    ...,
    "blurHash": asset->metadata.blurHash,
    "lqip": asset->metadata.lqip,
    "project": {
      "label": project->title,
      "slug": project->slug
    }
  }
}
`);

export const ABOUT_QUERY = defineQuery(`
*[_type == "about"][0]
`);

export const WORK_QUERY = defineQuery(`
*[_type == "work"][0] {
  ...,
  projects[]-> {
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
}
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

export const PROJECTS_SLUGS_QUERY = defineQuery(`
*[_type == "project"] | order(_createdAt desc) {
  slug
}
`);

export const PROJECT_QUERY = defineQuery(`
*[_type == "project" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  overview,
  bannerImage {
    ...,
    "blurHash": asset->metadata.blurHash,
    "lqip": asset->metadata.lqip,
  },
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
