import { env } from "@/lib/env/server";
import axios from "axios";

type initializePaymentArtsOrderData = {
  buyer_details: {
    phone_number: string;
    email: string;
    terms_agreed: boolean;
    address: string;
    state: string;
  };
  art_detail: {
    name: string;
    price: number;
  };
};

export async function initializePayment({
  buyer_details,
  art_detail,
}: initializePaymentArtsOrderData) {
  const { email, phone_number } = buyer_details;
  const { price } = art_detail;
  try {
    const response = await axios.post(
      `${env.PAYSTACK_URL}/transaction/initialize`,
      {
        email,
        phone: phone_number,
        amount: Math.round(price * 100), // Convert to kobo
        // metadata,
        callback_url: `${env.BASE_URL}/commerce/success`,
      },
      {
        headers: {
          Authorization: `Bearer ${env.PAYSTACK_SECRET}`,
          "Content-Type": "application/json",
        },
      },
    );

    if (!response.data) {
      throw new Error("Failed to initialize payment");
    }

    const data = response.data;

    if (data.data && data.data.authorization_url) {
      window.location.href = data.data.authorization_url;
    } else {
      throw new Error("Authorization URL not received");
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error("initializing payment:", error.message);
    }
  }
}
