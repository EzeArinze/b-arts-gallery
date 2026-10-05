import "server-only";

import { orderFormSchema, orderFormType } from "@/schema/check-out-order";
import { isDisposableEmail } from "@/utils/is-disposable-email";

export async function validateOrderForm(input: orderFormType) {
  const parsed = orderFormSchema.safeParse(input);

  if (!parsed.success) {
    return {
      status: "error",
      message: "Please provide valid data",
      fieldErrors: parsed.error.message,
    };
  }

  const { email } = parsed.data;

  if (await isDisposableEmail(email)) {
    return {
      status: "error",
      message: "Temporary email addresses are not supported",
    };
  }

  return {
    status: "success",
    message: "validation done",
    data: parsed.data,
  };
}
