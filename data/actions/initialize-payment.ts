import "server-only";

import axios from "axios";
import { env } from "@/lib/env/server";
import { OrderMetadata } from "@/utils/types";

type InitializePaymentInput = {
  email: string;
  phone: string;
  amount: number;
  metadata: OrderMetadata;
};

type InitializePaymentResult =
  | { ok: true; authorizationUrl: string; reference: string }
  | { ok: false; error: string };

export async function initializePayment({
  email,
  phone,
  amount,
  metadata,
}: InitializePaymentInput): Promise<InitializePaymentResult> {
  try {
    const response = await axios.post(
      `${env.BASE_PAYSTACK_URL}/transaction/initialize`,
      {
        email,
        phone,
        amount: Math.round(amount * 100), // naira -> kobo
        metadata,
        callback_url: `${env.BASE_URL}/checkout/success`,
      },
      {
        headers: {
          Authorization: `Bearer ${env.PAYSTACK_SECRET}`,
          "Content-Type": "application/json",
        },
      },
    );

    const authorizationUrl = response.data?.data?.authorization_url;
    const reference = response.data?.data?.reference;

    if (!authorizationUrl || !reference) {
      return { ok: false, error: "Authorization URL not received" };
    }

    return { ok: true, authorizationUrl, reference };
  } catch (error) {
    console.error("initializing payment:", error);
    return { ok: false, error: "Failed to initialize payment" };
  }
}
