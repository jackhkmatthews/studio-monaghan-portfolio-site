import { DocumentIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const projectType = defineType({
  name: "project",
  title: "Projects",
  type: "document",
  icon: DocumentIcon,
  fields: [
    defineField({
      name: "title",
      description: "This field is the title of your project.",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
        isUnique: (value, context) => context.defaultIsUnique(value, context),
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "overview",
      description:
        "Used both for the <meta> description tag for SEO, and project subheader.",
      title: "Overview",
      type: "string",
      validation: (rule) => rule.max(155).required(),
    }),
    defineField({
      name: "coverImage",
      title: "Cover Image",
      description:
        "Used on projects list page ans as sharing image on social media.",
      type: "image",
      options: {
        hotspot: true,
      },
      validation: (rule) =>
        rule.custom((value, context) => {
          const parent = context?.parent as { asset?: { _ref?: string } };

          return !value && parent?.asset?._ref
            ? "Alt text is required when an image is present"
            : true;
        }),
      fields: [
        defineField({
          name: "alt",
          type: "string",
          title: "Alternative text",
        }),
      ],
    }),
    defineField({
      name: "sections",
      title: "Content Sections",
      description:
        "Ordered content. Add text blocks or image galleries (1, 2, or 6 images).",
      type: "array",
      of: [
        { type: "gallerySection" },
        {
          type: "object",
          name: "textBlock",
          fields: [{ name: "content", type: "blockContent" }],
          preview: {
            select: {
              content: "content",
            },
            prepare({ content }) {
              return {
                title: "Text Block",
                subtitle: content[0]?.children[0]?.text || "No content",
              };
            },
          },
        },
      ],
      validation: (rule) => rule.min(1),
    }),
  ],
});
