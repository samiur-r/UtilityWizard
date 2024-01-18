import stripe from "stripe";
import { NextResponse } from "next/server";
import config from "@/config";
import { createPayment } from "@/services/payment";

export async function POST(req: Request) {
  console.log("webhook");
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
      userId: metadata?.buyerId || "",
      courseId: metadata?.id || "",
      amount: amount_total ? Number(amount_total / 100).toString() : "0",
      status: "Completed",
      paymentMethod: "Card",
    };

    await createPayment(order);

    console.log("here");

    return NextResponse.json({
      message: "Ok",
      success: `Payment Success`,
    });
  }

  return new Response("", {
    status: 200,
  });
}
