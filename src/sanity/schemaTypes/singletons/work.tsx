import { defineArrayMember, defineField, defineType } from "sanity";
import { DocumentTextIcon } from "@sanity/icons";

export const work = defineType({
  name: "work",
  title: "Work",
  type: "document",
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: "projects",
      title: "Projects list",
      description: "Select and order the projects to display on the work list page",
      type: "array",
      of: [
        defineArrayMember({
          type: "reference",
          to: [{ type: "project" }],
        }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "Work",
      };
    },
  },
});
