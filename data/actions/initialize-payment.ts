import axios from "axios";

type artsOrderData = {
  phone_number: number;
};

type initializePayment = {
  order_Data: artsOrderData;
  email: string;
};

const BASE_URL = process.env.BASE_PAYSTACK_URL!;

export async function initializePayment({}: initializePayment) {
  try {
    const response = await axios.post(`${BASE_URL}/transaction/initialize`, {});

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
