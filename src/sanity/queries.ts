import { defineQuery } from "next-sanity";

export const SETTINGS_QUERY = defineQuery(`
*[_type == "settings"][0] {
  ...,
  'homepageImageDimenstions': homepageImage.asset->metadata.dimensions
}
`);
