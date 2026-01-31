import { orderFormSchema, orderFormType } from "@/schema/check-out-order";
import { isDisposableEmail } from "@/utils/is-disposable-email";
import z from "zod";

export async function validateOrderForm(input: orderFormType) {
  const parsed = orderFormSchema.safeParse(input);

  if (!parsed.success) {
    return {
      success: false,
      errors: z.flattenError(parsed.error).fieldErrors,
    };
  }

  const { email } = parsed.data;

  if (await isDisposableEmail(email)) {
    return {
      success: false,
      errors: {
        email: ["Temporary email addresses are not supported"],
      },
    };
  }

  return {
    success: true,
    data: parsed.data,
  };
}
