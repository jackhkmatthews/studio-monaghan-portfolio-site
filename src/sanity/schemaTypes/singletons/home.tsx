import { defineArrayMember, defineField, defineType } from "sanity";
import { DocumentTextIcon, ImageIcon } from "@sanity/icons";

export const home = defineType({
  name: "home",
  title: "Home",
  type: "document",
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: "carouselImages",
      title: "Carousel Images",
      type: "array",
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
            }),
            defineField({
              name: "project",
              type: "reference",
              title: "Project",
              to: [{ type: "project" }],
            }),
            defineField({
              name: "photographer",
              type: "string",
              title: "Photographer",
            }),
          ],
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
