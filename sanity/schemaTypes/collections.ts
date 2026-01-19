import {
  // defineArrayMember,
  defineField,
  defineType,
} from "sanity";
import { DocumentTextIcon } from "@sanity/icons";

export const collectionSchema = defineType({
  title: "Collections",
  name: "collection",
  type: "document",
  icon: DocumentTextIcon,
  fields: [
    defineField({
      title: "Name",
      name: "name",
      type: "string",
      description: "Be creative",
      validation: (rule) =>
        rule
          .required()
          .error("Please provide the art name")
          .min(3)
          .max(100)
          .warning("Title should be between 3–100 characters."),
    }),

    defineField({
      title: "Slug",
      name: "slug",
      type: "slug",
      options: { source: "name", maxLength: 100 },
      validation: (rule) => rule.required().error("Slug is not provided"),
    }),

    defineField({
      title: "Art Image",
      name: "artImage",
      type: "image",
      options: { hotspot: true },
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alternative text",
        },
      ],
      validation: (rule) => rule.required().error("A art image is required."),
    }),

    // defineField({
    //   title: "Images",
    //   name: "images",
    //   type: "array",
    //   of: [defineArrayMember({ type: "image" })],
    //   validation: (rule) =>
    //     rule
    //       .min(1)
    //       .max(2)
    //       .warning("Add at least 1 and at most 2 supporting images."),
    // }),

    defineField({
      name: "creationDate",
      title: "Created On",
      type: "date",
      description: "What date was the art created/made",
      validation: (Rule) =>
        Rule.required().error("Please provide the date of art creation"),
    }),

    defineField({
      title: "About",
      name: "about",
      type: "blockContent",
      validation: (rule) => rule.required().error("Tell us about your art"),
    }),
  ],
  preview: {
    select: { name: "name", media: "image", date: "creationDate" },
    prepare: ({ name, media, date }) => {
      return {
        title: name,
        subtitle: date ? `Created on ${date}` : "No creation date",
        media,
      };
    },
  },
});
