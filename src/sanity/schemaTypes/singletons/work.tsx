import { defineArrayMember, defineField, defineType } from "sanity";
import { DocumentTextIcon } from "@sanity/icons";

export const work = defineType({
  name: "work",
  title: "Work",
  type: "document",
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: "projectRows",
      title: "Project Rows",
      description: "Configure rows of projects with custom layouts",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "projectRow",
          title: "Project Row",
          fields: [
            defineField({
              name: "projects",
              title: "Projects",
              description: "Add 2 or 3 projects for this row",
              type: "array",
              of: [
                defineArrayMember({
                  type: "reference",
                  to: [{ type: "project" }],
                }),
              ],
              validation: (rule) =>
                rule
                  .required()
                  .min(2)
                  .max(3)
                  .custom((projects) => {
                    if (!projects || projects.length < 2) {
                      return "Each row must have at least 2 projects";
                    }
                    if (projects.length > 3) {
                      return "Each row can have a maximum of 3 projects";
                    }
                    return true;
                  }),
            }),
            defineField({
              name: "layout",
              title: "Layout",
              description:
                "Column width distribution (only applies to 3-project rows)",
              type: "string",
              options: {
                list: [
                  { title: "Equal Columns", value: "equal" },
                  { title: "Left Weighted", value: "left" },
                  { title: "Right Weighted", value: "right" },
                ],
                layout: "radio",
              },
              initialValue: "equal",
              hidden: ({ parent }) => {
                const projects = parent?.projects as unknown[] | undefined;
                return !projects || projects.length !== 3;
              },
            }),
          ],
          preview: {
            select: {
              project0: "projects.0.title",
              project1: "projects.1.title",
              project2: "projects.2.title",
              layout: "layout",
            },
            prepare({ project0, project1, project2, layout }) {
              const projectCount = [project0, project1, project2].filter(
                Boolean,
              ).length;
              const layoutInfo = projectCount === 3 ? ` (${layout})` : "";
              return {
                title: `Row with ${projectCount} projects${layoutInfo}`,
                subtitle: [project0, project1, project2]
                  .filter(Boolean)
                  .join(", "),
              };
            },
          },
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
