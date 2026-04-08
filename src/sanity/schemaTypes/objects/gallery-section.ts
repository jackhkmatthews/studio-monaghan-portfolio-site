import { defineArrayMember, defineField, defineType } from "sanity";
import { ImageIcon } from "@sanity/icons";

export const gallerySection = defineType({
  name: "gallerySection",
  title: "Image Gallery",
  type: "object",
  fields: [
    defineField({
      name: "images",
      title: "Images",
      type: "array",
      options: { layout: "grid" },
      of: [
        defineArrayMember({
          type: "image",
          icon: ImageIcon,
          options: { hotspot: true },
          fields: [
            defineField({
              name: "alt",
              type: "string",
              title: "Alternative text",
              validation: (rule) =>
                rule.custom((alt, context) => {
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  const hasAsset = (context?.parent as any)?.asset?._ref;
                  return hasAsset && !alt
                    ? "Alt text is required when an image is present"
                    : true;
                }),
            }),
          ],
        }),
      ],
      validation: (rule) =>
        rule.custom((arr) => {
          if (!arr) return true;
          const allowed = [1, 2, 4];
          return allowed.includes(arr.length)
            ? true
            : "Gallery must contain 1, 2 or 4 images";
        }),
    }),
    defineField({
      name: "orientation",
      title: "Orientation",
      type: "string",
      description: "Image orientation for this gallery section",
      options: {
        list: [
          { title: "Landscape", value: "landscape" },
          { title: "Portrait", value: "portrait" },
        ],
        layout: "radio",
      },
      initialValue: "landscape",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "oneImagePosition",
      title: "1-Image Position",
      type: "string",
      description:
        "Where the image sits in the 4-column layout (full width, or the left or right half)",
      options: {
        list: [
          { title: "Center (4 columns in 4-column grid)", value: "center" },
          { title: "Left (2 columns in 4-column grid)", value: "left" },
          { title: "Right (2 columns in 4-column grid)", value: "right" },
        ],
        layout: "dropdown",
      },
      initialValue: "center",
      hidden: ({ parent }) => parent?.images?.length !== 1,
    }),
    defineField({
      name: "twoImagePosition",
      title: "2-Image Position",
      type: "string",
      description: "Position of images in a 2-image gallery",
      options: {
        list: [
          { title: "Left (2 columns in 4-column grid)", value: "left" },
          { title: "Center (2-column grid)", value: "center" },
          { title: "Right (2 columns in 4-column grid)", value: "right" },
        ],
        layout: "dropdown",
      },
      initialValue: "center",
      hidden: ({ parent }) => parent?.images?.length !== 2,
    }),
    defineField({
      name: "fourImagePosition",
      title: "4-Image Position",
      type: "string",
      description:
        "Where the 2×2 grid sits in the 4-column layout (full width, or the left or right half)",
      options: {
        list: [
          { title: "Center (4 columns in 4-column grid)", value: "center" },
          { title: "Left (2 columns in 4-column grid)", value: "left" },
          { title: "Right (2 columns in 4-column grid)", value: "right" },
        ],
        layout: "dropdown",
      },
      initialValue: "center",
      hidden: ({ parent }) => parent?.images?.length !== 4,
    }),
  ],
  preview: {
    select: {
      images: "images",
      orientation: "orientation",
      oneImagePosition: "oneImagePosition",
      twoImagePosition: "twoImagePosition",
      fourImagePosition: "fourImagePosition",
    },
    prepare({
      images,
      orientation,
      oneImagePosition,
      twoImagePosition,
      fourImagePosition,
    }) {
      const imagesArray = (images || []).filter(Boolean);
      const orientationLabel =
        orientation === "portrait" ? "Portrait" : "Landscape";

      const positionLabel = (value: string | undefined) =>
        value === "left"
          ? "Left"
          : value === "right"
            ? "Right"
            : "Center";

      const count = imagesArray.length;
      let layoutInfo = "";
      if (count === 4) {
        layoutInfo = `4-up split — ${positionLabel(fourImagePosition)}`;
      } else if (count === 2) {
        layoutInfo = `2-up split — ${positionLabel(twoImagePosition)}`;
      } else if (count === 1) {
        layoutInfo = `Single image — ${positionLabel(oneImagePosition)}`;
      }

      return {
        title: `Gallery (${count} image${count === 1 ? "" : "s"}) - ${orientationLabel}`,
        subtitle: layoutInfo,
        media: imagesArray[0],
      };
    },
  },
});
