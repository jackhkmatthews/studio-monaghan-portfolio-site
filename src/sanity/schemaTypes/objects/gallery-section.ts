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
  ],
  preview: {
    select: {
      images: "images",
    },
    prepare({ images }) {
      const imagesArray = images.filter(Boolean);
      return {
        title: `Gallery (${images.length} image${images.length === 1 ? "" : "s"})`,
        subtitle:
          images.length === 4
            ? "4-up split"
            : images.length === 2
              ? "2-up split"
              : images.length === 1
                ? "Single image"
                : "",
        media: imagesArray[0],
      };
    },
  },
});
