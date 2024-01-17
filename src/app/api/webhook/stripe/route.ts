import stripe from "stripe";
import { NextResponse } from "next/server";
import config from "@/config";

export async function POST(req: Request) {
  console.log("here");
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
      courseId: metadata?.id || "",
      buyerId: metadata?.buyerId || "",
      amount: amount_total ? Number(amount_total / 100).toString() : "0",
    };

    console.log(order);

    return NextResponse.json({
      message: "Ok",
      success: `Payment Success`,
    });
  }

  return new Response("", {
    status: 200,
  });
}
