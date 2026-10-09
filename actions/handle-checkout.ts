"use server";

// import { redirect } from "next/navigation";
import { orderFormSchema, orderFormType } from "@/schema/check-out-order";
import { getArtForCheckout } from "@/data/checkout/get-art-for-checkout";
import { reserveArt, releaseReservation } from "@/actions/reserve-art";
import { initializePayment } from "@/actions/initialize-payment";
import { env } from "@/lib/env/server";

type HandleCheckoutResult =
  | {
      status: "error";
      message: string;
      fieldErrors?: string;
    }
  | {
      status: "success";
      message: string;
      authorizationUrl: string;
    };

export async function handleCheckout({
  values,
  slug,
}: {
  values: orderFormType;
  slug: string;
}): Promise<HandleCheckoutResult> {
  const parsedValue = orderFormSchema.safeParse(values);

  if (!parsedValue.success) {
    return {
      status: "error",
      message: "Please check the highlighted fields",
      fieldErrors: parsedValue.error.message,
    };
  }

  const result = await getArtForCheckout(slug);

  if (!result.ok) {
    const message =
      result.reason === "not_found"
        ? "We couldn't find that artwork."
        : result.reason === "reserved"
          ? "Someone else is checking out with this piece right now — try again in a few minutes."
          : "Sorry — this piece is no longer available.";

    return { status: "error", message };
  }

  const { art } = result;

  // Claim it before talking to Paystack at all — this is what closes the
  // window a second buyer could otherwise slip through.
  const reservation = await reserveArt(art._id);

  if (!reservation.ok) {
    return {
      status: "error",
      message: "This piece was just reserved by another buyer.",
    };
  }

  const { fullName, email, phone, state, address } = parsedValue.data;

  const payment = await initializePayment({
    email,
    phone,
    amount: art.price.amount,
    metadata: {
      customer: { name: fullName, email, phone },
      shippingAddress: { state, address },
      items: [
        {
          artId: art._id,
          price: art.price.amount,
          currency: art.price.currency ?? "NGN",
        },
      ],
      cancel_action: `${env.BASE_URL}/checkout/cancel?slug=${slug}`,
    },
  });

  if (!payment.ok) {
    // Don't hold the reservation for the full window over a dead API call.
    await releaseReservation(art._id);
    return { status: "error", message: payment.error };
  }

  return {
    status: "success",
    message: "Payment initialization successful ",
    authorizationUrl: payment.authorizationUrl,
  };
}
