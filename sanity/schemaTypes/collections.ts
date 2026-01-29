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
      title: "Artist",
      name: "artist",
      type: "string",
      validation: (rule) => rule.required().error("who is the artist"),
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
      validation: (rule) => rule.required().error("An art image is required."),
    }),

    defineField({
      name: "price",
      title: "Price",
      type: "object",
      fields: [
        defineField({
          name: "amount",
          type: "number",
          validation: (Rule) => Rule.required().min(0),
        }),
        defineField({
          name: "currency",
          type: "string",
          options: {
            list: ["NGN", "USD", "EUR"],
          },
          initialValue: "NGN",
        }),
      ],
    }),

    // defineField({
    //   name: "size",
    //   title: "Size",
    //   type: "string",
    //   validation: (rule) =>
    //     rule.required().warning("art size was not provided"),
    // }),
    //
    defineField({
      name: "dimensions",
      title: "Dimensions",
      type: "object",
      fields: [
        { name: "width", type: "number", title: "Width (cm)" },
        { name: "height", type: "number", title: "Height (cm)" },
        {
          name: "unit",
          type: "string",
          options: { list: ["cm", "in"] },
          initialValue: "cm",
        },
      ],
    }),

    defineField({
      name: "available",
      title: "Available",
      type: "boolean",
      description: "Is the art available/in-store ?",
      initialValue: true,
      validation: (rule) =>
        rule.required().warning("art availability was not provided"),
    }),

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
    select: { name: "name", media: "artImage", date: "creationDate" },
    prepare: ({ name, media, date }) => {
      return {
        title: name,
        subtitle: date ? `Created on ${date}` : "No creation date",
        media,
      };
    },
  },
});
