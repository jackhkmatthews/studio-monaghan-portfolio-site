import { defineArrayMember, defineField, defineType } from "sanity";
import { DocumentTextIcon } from "@sanity/icons";

export const about = defineType({
  name: "about",
  title: "About",
  type: "document",
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: "section",
      title: "Sections",
      description: "Add sections to the about page",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({
              name: "title",
              title: "Title",
              type: "string",
            }),
            defineField({
              name: "content",
              title: "Content",
              type: "blockContent",
            }),
          ],
        }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "About",
      };
    },
  },
});
