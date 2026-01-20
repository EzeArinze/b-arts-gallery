import { defineType, defineField } from "sanity";

export const orderSchema = defineType({
  name: "order",
  title: "Order",
  type: "document",
  fields: [
    defineField({
      name: "customer",
      title: "Customer",
      type: "object",
      fields: [
        defineField({
          name: "name",
          title: "Full Name",
          type: "string",
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "email",
          title: "Email",
          type: "string",
          validation: (Rule) => Rule.required().email(),
        }),
        defineField({
          name: "phone",
          title: "Phone Number",
          type: "string",
          validation: (Rule) => Rule.required(),
        }),
      ],
    }),

    defineField({
      name: "shippingAddress",
      title: "Shipping Address",
      type: "object",
      fields: [
        defineField({
          name: "state",
          title: "State / Region",
          type: "string",
          validation: (Rule) => Rule.required(),
        }),

        defineField({
          name: "address",
          title: "Street Address",
          type: "string",
          validation: (Rule) => Rule.required(),
        }),
      ],
    }),

    defineField({
      name: "order",
      title: "Order Details",
      type: "object",
      fields: [
        defineField({
          name: "items",
          title: "Artworks",
          type: "array",
          of: [
            {
              type: "reference",
              to: [{ type: "collection" }],
            },
          ],
          validation: (Rule) => Rule.required().min(1),
        }),
        defineField({
          name: "total",
          title: "Total Amount",
          type: "number",
          validation: (Rule) => Rule.required().min(0),
        }),
        defineField({
          name: "currency",
          type: "string",
          options: {
            list: ["NGN"],
          },
          initialValue: "NGN",
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "status",
          title: "Order Status",
          type: "string",
          options: {
            list: [
              { title: "Pending", value: "pending" },
              { title: "Paid", value: "paid" },
              { title: "Shipped", value: "shipped" },
              { title: "Delivered", value: "delivered" },
            ],
          },
          initialValue: "pending",
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "createdAt",
          title: "Created At",
          type: "datetime",
          initialValue: () => new Date().toISOString(),
        }),
      ],
    }),

    defineField({
      name: "payment",
      title: "Payment",
      type: "object",
      fields: [
        defineField({
          name: "reference",
          title: "Payment Reference",
          type: "string",
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "status",
          type: "string",
          options: {
            list: [
              { title: "Success", value: "success" },
              { title: "Failed", value: "failed" },
            ],
          },
          validation: (Rule) => Rule.required(),
        }),
      ],
    }),
  ],

  preview: {
    select: {
      name: "customer.name",
      total: "order.total",
      status: "order.status",
    },
    prepare({ name, total, status }) {
      return {
        title: name,
        subtitle: `₦${total} • ${status}`,
      };
    },
  },
});
