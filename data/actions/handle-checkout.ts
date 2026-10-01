"use server";

import { orderFormSchema, orderFormType } from "@/schema/check-out-order";
import { getArtForCheckout } from "@/data/checkout/get-art-for-checkout";

type HandleCheckoutResult =
  | { status: "error"; message: string; fieldErrors?: string }
  | { status: "success"; message: string };

export async function handleCheckout({
  value,
  slug,
}: {
  value: orderFormType;
  slug: string;
}): Promise<HandleCheckoutResult> {
  const parsedValue = orderFormSchema.safeParse(value);

  if (!parsedValue.success) {
    return {
      status: "error",
      message: "Please check the highlighted fields",
      fieldErrors: parsedValue.error.message,
    };
  }

  const result = await getArtForCheckout(slug);

  if (!result.ok) {
    return {
      status: "error",
      message:
        result.reason === "not_found"
          ? "We couldn't find that artwork."
          : "Sorry — this piece is no longer available.",
    };
  }

  const { art } = result;
  console.log(parsedValue.data, art.price.amount);

  // TODO: main logic goes here —
  // - create the order record (parsedValue.data + art.price.amount)
  // - kick off the payment step (redirect, client secret, etc.)

  return {
    status: "success",
    message: "checkout initialized",
  };
}
