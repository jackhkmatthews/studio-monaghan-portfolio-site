import { defineField, defineType } from "sanity";
import { DocumentTextIcon } from "@sanity/icons";

export const home = defineType({
  name: "home",
  title: "Home",
  type: "document",
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: "description",
      description: "Displayed on the homepage.",
      title: "Description",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "image",
      description: "Displayed on the homepage.",
      title: "Image",
      type: "image",
      validation: (rule) =>
        rule.custom((value, context) => {
          const parent = context?.parent as { asset?: { _ref?: string } };

          return !value && parent?.asset?._ref
            ? "Alt text is required when an image is present"
            : true;
        }),
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: "alt",
          type: "string",
          title: "Alternative text",
        }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "Home",
      };
    },
  },
});
