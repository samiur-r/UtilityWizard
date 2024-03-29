import stripe from "stripe";
import { NextResponse } from "next/server";
import config from "@/config";
import { createPayment } from "@/services/payment";
import { updateBillPaymentStatus } from "@/services/bills";

export async function POST(req: Request) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature");
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig as string,
      config.stripeWebhookSecret
    );
  } catch (err: any) {
    return NextResponse.json({
      message: "Webhook Error",
      error: `${err.message}`,
    });
  }

  if (event.type === "checkout.session.completed") {
    const { id, amount_total, metadata } = event.data.object;

    const order = {
      stripeId: id,
      amount: amount_total ? Number(amount_total / 100).toString() : "0",
      status: "Completed",
      paymentMethod: "Card",
      user: {
        connect: {
          id: metadata?.buyerId ?? "",
        },
      },
      bill: {
        connect: {
          id: metadata?.orderId ?? "",
        },
      },
    };

    await createPayment(order);

    await updateBillPaymentStatus(metadata?.orderId as string, true);

    return NextResponse.json({
      message: "Ok",
      success: `Payment Success`,
    });
  }

  return new Response("", {
    status: 200,
  });
}
