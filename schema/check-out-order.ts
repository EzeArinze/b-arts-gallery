import z from "zod";

export const orderFormSchema = z.object({
  fullName: z
    .string()
    .min(1, "Full name is required")
    .min(3, "Full name must be at least 3 characters"),

  email: z.email("Please enter a valid email address"),

  phone: z
    .string()
    .min(1, "Phone number is required")
    .min(10, "Phone number must be at least 10 digits"),

  state: z.string().min(1, "State is required"),

  address: z
    .string()
    .min(1, "Address is required")
    .min(5, "Address is too short"),

  terms: z.literal(true, {
    message: "Please accept the terms and conditions to continue",
  }),
});

export type orderFormType = z.infer<typeof orderFormSchema>;
