import { NextResponse } from "next/server";
import Stripe from "stripe";

import config from "@/config";

export async function POST(req: Request) {
  const stripe = new Stripe(`${config.stripeSecretKey}`);

  const { id, price, buyerId } = await req.json();

  try {
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: "bdt",
            unit_amount: Number(price) * 100,
            product_data: {
              name: id,
            },
          },
          quantity: 1,
        },
      ],
      metadata: {
        orderId: id,
        buyerId: buyerId,
      },
      mode: "payment",
      success_url: `${config.appUrl}/dashboard?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${config.appUrl}/dashboard?canceled=true`,
    });
    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.log(error);
    return new NextResponse("Error processing payment", {
      status: 500,
      statusText: "ERROR",
    });
  }
}
