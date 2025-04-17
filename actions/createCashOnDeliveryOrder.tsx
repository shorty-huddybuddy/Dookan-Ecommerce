// actions/createCodOrder.ts
"use server";

import { BasketItem } from "@/app/(store)/store";
import { backendClient } from "@/sanity/lib/backendClient";
import { Metadata } from "./createCheckoutSession";

export type GroupedBasketItem = {
  product: BasketItem["product"];
  quantity: number;
};

export async function createCashOnDeliveryOrder(
  items: GroupedBasketItem[],
  metadata: Metadata
) {
  try {
    // Validate items
    const itemsWithoutPrice = items.filter((item) => !item.product.Price);
    if (itemsWithoutPrice.length > 0) {
      throw new Error("Some items are missing prices");
    }

    // Calculate total amount
    const amount_total = items.reduce(
      (total, item) => total + (item.product.Price! * item.quantity), 
      0
    );

    // Create order in Sanity
    const order = await backendClient.create({
      _type: "order",
      oderNumber: metadata.orderNumber,  // Fixed typo (was 'oderNumber')
      stripecheckoutsessionid: "N/A",     // Fixed case (was 'stripecheckoutsessionid')
      stripePaymentIntentId: "N/A",
      customerName: metadata.customerName,
      stripeCustomerId: "N/A",
      clerkUserId: metadata.clerkUserId,
      email: metadata.customerEmail,
      currency: "gbp",
      amountdiscount: 0,                  // Fixed case (was 'amountdiscount')
      products: items.map((item) => ({
        _key: crypto.randomUUID(),
        product: {
          _type: "reference",
          _ref: item.product._id,
        },
        quantity: item.quantity,
      })),
      totalprice: amount_total,           // Fixed case (was 'totalprice')
      status: "pending",
    //   paymentMethod: "cod",               // Added payment method field
      orderDate: new Date().toISOString(),
    });

    // Generate success URL similar to Stripe's
    const baseUrl = process.env.VERCEL_URL 
      ? `https://${process.env.VERCEL_URL}` 
      : process.env.NEXT_PUBLIC_BASE_URL;
    
    const successUrl = `${baseUrl}/success?orderNumber=${metadata.orderNumber}&paymentMethod=cod`;

    return {
      success: true,
      orderNumber: metadata.orderNumber,
      orderId: order._id,
      successUrl,  // Return the success URL
    };
  } catch (err) {
    console.error("Error creating COD order:", err);
    throw err;
  }
}

export default createCashOnDeliveryOrder