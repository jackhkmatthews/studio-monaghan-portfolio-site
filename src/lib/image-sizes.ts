export const HOTSPOT_PREVIEW_LABELS = {
  default: "mobile",
  sm: "tablet",
  md: "laptop",
  lg: "desktop",
  xl: "widescreen",
  "2xl": "superwide",
} as const;

/**
 * Banner image dimensions per breakpoint. Aspect ratios match CSS:
 * default: 16:9 (aspect-video), md: 2:1, lg: 3:1
 *
 * Used by BannerPicture component and Sanity bannerImage hotspot previews.
 */
export const BANNER_IMAGE_SIZES = {
  default: { width: 1200, height: 675, label: '16:9' }, // 16:9
  md: { width: 1200, height: 600, label: '2:1' }, // 2:1
  lg: { width: 2400, height: 800, label: '3:1' }, // 3:1
} as const;

/** Aspect ratio previews for Sanity Studio (derived from BANNER_IMAGE_SIZES). */
export const BANNER_HOTSPOT_PREVIEWS = [
  {
    title: `${HOTSPOT_PREVIEW_LABELS.default} (${BANNER_IMAGE_SIZES.default.label})`,
    aspectRatio: BANNER_IMAGE_SIZES.default.width / BANNER_IMAGE_SIZES.default.height,
  },
  {
    title: `${HOTSPOT_PREVIEW_LABELS.md} (${BANNER_IMAGE_SIZES.md.label})`,
    aspectRatio: BANNER_IMAGE_SIZES.md.width / BANNER_IMAGE_SIZES.md.height,
  },
  {
    title: `${HOTSPOT_PREVIEW_LABELS.lg} (${BANNER_IMAGE_SIZES.lg.label})`,
    aspectRatio: BANNER_IMAGE_SIZES.lg.width / BANNER_IMAGE_SIZES.lg.height,
  },
] as const;
