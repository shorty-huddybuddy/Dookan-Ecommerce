import { Metadata } from "@/actions/createCheckoutSession";
import { backendClient } from "@/sanity/lib/backendClient";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import crypto from "crypto";
// Initialize Stripe with environment variable
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-02-24.acacia"
});

export async function POST(req: NextRequest) {
  // Debug: Verify environment variables are loaded
  console.log("[ENV_DEBUG]", {
    stripeKey: !!process.env.STRIPE_SECRET_KEY,
    webhookSecret: !!process.env.STRIPE_WEBHOOK_SECRET,
  });

  if (!process.env.STRIPE_SECRET_KEY) {
    console.error("Stripe secret key is not set");
    return NextResponse.json(
      { error: "Stripe secret key is not configured" },
      { status: 500 }
    );
  }

  const body = await req.text();
  const sig = (await headers()).get("stripe-signature");

  if (!sig) {
    return NextResponse.json({ error: "No signature" }, { status: 400 });
  }

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!webhookSecret) {
    console.error("Stripe webhook secret is not set");
    return NextResponse.json(
      { error: "Stripe webhook secret is not configured" },
      { status: 500 }
    );
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return NextResponse.json(
      { error: `Webhook Error: ${err}` },
      { status: 400 }
    );
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    try {
      const order = await createOrderInSanity(session);
      console.log("Order created in Sanity:", order);
      return NextResponse.json({ success: true, order });
    } catch (err) {
      console.error("Error creating order in Sanity:", err);
      return NextResponse.json(
        { error: "Error creating order" },
        { status: 500 }
      );
    }
  }

  return NextResponse.json({ received: true });
}




async function createOrderInSanity(session: Stripe.Checkout.Session) {
  const {
    id,
    amount_total,
    currency,
    metadata,
    payment_intent,
    customer,
    total_details,
  } = session;

  const { orderNumber, customerName, customerEmail, clerkUserId } = metadata as Metadata;

  const lineItemsWithProduct = await stripe.checkout.sessions.listLineItems(id, {
    expand: ["data.price.product"],
  });

  const sanityProducts = lineItemsWithProduct.data.map((item) => ({
    _key: crypto.randomUUID(),
    product: {
      _type: "reference",
      _ref: (item.price?.product as Stripe.Product)?.metadata?.id,
    },
    quantity: item.quantity || 0,
  }));

  const order = await backendClient.create({
    _type: "order",
    oderNumber:orderNumber,
    stripecheckoutsessionid: id,
    stripePaymentIntentId: payment_intent,
    customerName:customerName,
    stripeCustomerId: customer,
    clerkUserId: clerkUserId,
    email: customerEmail,
    currency,
    amountdiscount: total_details?.amount_discount ? total_details.amount_discount / 100 : 0,
    products: sanityProducts,
    totalprice: amount_total ? amount_total / 100 : 0,
    status: "paid",
    orderDate: new Date().toISOString(),
  });

  return order;
}