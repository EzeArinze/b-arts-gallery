import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import {
  isOrderAlreadyProcessed,
  saveOrderTransaction,
} from "@/data/actions/mark-processed";

const secret = process.env.PAYSTACK_SECRET!;

export async function POST(req: NextRequest) {
  const body = await req.text();

  const hash = crypto.createHmac("sha512", secret).update(body).digest("hex");

  if (hash !== req.headers.get("x-paystack-signature")) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  try {
    const event = JSON.parse(body);

    const { event: eventType, data } = event;

    switch (eventType) {
      case "transfer.failed": {
        const { transfer_code, reason } = data;
        // do something
        // send email notification
        break;
      }
      case "transfer.reversed": {
        const { transfer_code } = data;
        // do something
        // send email notification
        break;
      }
      default:
        return NextResponse.json({
          status: "success",
          message: "Event ignored",
        });
    }

    if (eventType === "charge.success" || eventType === "transfer.success") {
      const {
        reference,
        // amount,
        // currency,
        // status,
        // customer,
        transfer_code,
      } = data;

      if (await isOrderAlreadyProcessed(reference || transfer_code)) return;

      // save to db and update art to be sold
      await saveOrderTransaction({ orderDoc: {}, artworkIds: [] });

      return NextResponse.json(
        {
          message: "Payment Completed",
        },
        { status: 200 },
      );
    }

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ ok: false }, { status: 200 });
  }
}
