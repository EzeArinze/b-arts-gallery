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
      case "charge.success": {
        const { reference } = data;

        if (await isOrderAlreadyProcessed(reference)) {
          return NextResponse.json({
            status: "success",
            message: "Already processed",
          });
        }

        const result = await saveOrderTransaction(data);

        if (!result.ok) {

          return NextResponse.json(
            { status: "error", message: "Artwork no longer available" },
            { status: 409 },
          );
        }

        return NextResponse.json({
          status: "success",
          message: "Payment completed",
        });
      }

      case "transfer.failed": {
        const { transfer_code, reason } = data;
        // TODO: send email notification
        console.log(transfer_code, reason);
        break;
      }

      case "transfer.reversed": {
        const { transfer_code } = data;
        // TODO: send email notification
        console.log(transfer_code);
        break;
      }
    }

    return NextResponse.json({ status: "success", message: "Event handled" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ ok: false }, { status: 200 });
  }
}
