"use server"
// 'use client';

import { BasketItem } from "@/app/(store)/store";
import { imgUrl } from "@/lib/imgUrl";
import stripe from "@/lib/stripe";
import backendClient from "@/sanity/lib/backendClient";
import { Currency } from "lucide-react";
import Stripe from "stripe";

export type Metadata={
    orderNumber:string;
    customerName:string;
    customerEmail:string;
    clerkUserId:string;

}



export type GroupedBasketItem={
    product:BasketItem["product"];
    quantity:number;
}



// export async function createCheckoutSession(items:GroupedBasketItem[],metadata:Metadata) {


//     try{

//         //check if any grouped item dosnt have a price 
//         const itemsWithoutPrice=items.filter((item)=>!item.product.Price);
//         if(itemsWithoutPrice.length>0){
//             throw new Error("Some items are missing prices");
//         }

//         //search for exsting customer
//         const customers=await stripe.customers.list({
//             email:metadata.customerEmail,
//             limit:1,
//         });

//         let customerId:string|undefined;
//         if(customers.data.length>0){
//             customerId=customers.data[0].id;
//         }

//         const successUrl = `${process.env.VERCEL_URL && `https://${process.env.VERCEL_URL}` || process.env.NEXT_PUBLIC_BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}&orderNumber=${metadata.orderNumber}`;

// const cancelUrl = `${process.env.VERCEL_URL && `https://${process.env.VERCEL_URL}` || process.env.NEXT_PUBLIC_BASE_URL}/basket`;



//         const session = await stripe.checkout.sessions.create({ 
//             customer: customerId, 
//             customer_creation: customerId ? undefined: "always", 
//             customer_email: customerId? metadata.customerEmail: undefined, 
//             metadata,
//             mode: "payment",
//             allow_promotion_codes: true, 
//             success_url: successUrl, 
//             cancel_url: cancelUrl,
//             line_items:items.map((item)=>({
//                 price_data:{
//                     currency:"gbp",
//                     unit_amount:Math.round(item.product.Price!*100),
//                     product_data:{
//                         name:item.product.name || "unnamed product",
//                         description:`Product Id: ${item.product._id}`,
//                         metadata:{
//                             id:item.product._id,
//                         },
//                         images:item.product.image
//                             ?[imgUrl(item.product.image).url()]
//                             :undefined,
//                     },
//                 },
//                 quantity:item.quantity,
//             })),

//         });

//         return session.url;
//     }catch(err){
//         console.error("error while creating checking out session",err);
//         throw err;
//     }
  
// }


export async function createCheckoutSession(items: GroupedBasketItem[], metadata: Metadata) {
    console.log("Starting checkout session creation");
  
    try {
      // Check if any grouped item doesn't have a price 
      const itemsWithoutPrice = items.filter((item) => !item.product.Price);
      if (itemsWithoutPrice.length > 0) {
        throw new Error("Some items are missing prices");
      }
  
      console.log("All items have prices");
  
      // Build URLs properly for Vercel deployment
      const baseUrl = process.env.VERCEL_URL 
        ? `https://${process.env.VERCEL_URL}`
        : process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  
      const successUrl = `${baseUrl}/success?session_id={CHECKOUT_SESSION_ID}&orderNumber=${metadata.orderNumber}`;
      const cancelUrl = `${baseUrl}/basket`;
      
      console.log(`Success URL: ${successUrl}`);
  
      // Search for existing customer
      const customers = await stripe.customers.list({
        email: metadata.customerEmail,
        limit: 1,
      });
  
      let customerId: string | undefined;
      if (customers.data.length > 0) {
        customerId = customers.data[0].id;
      }
  
      const session = await stripe.checkout.sessions.create({ 
        customer: customerId, 
        customer_creation: customerId ? undefined : "always", 
        customer_email: customerId ? undefined : metadata.customerEmail, 
        metadata,
        mode: "payment",
        allow_promotion_codes: true, 
        success_url: successUrl, 
        cancel_url: cancelUrl,
        line_items: items.map((item) => ({
          price_data: {
            currency: "gbp",
            unit_amount: Math.round(item.product.Price! * 100),
            product_data: {
              name: item.product.name || "unnamed product",
              description: `Product Id: ${item.product._id}`,
              metadata: {
                id: item.product._id,
              },
              images: item.product.image
                ? [imgUrl(item.product.image).url()]
                : undefined,
            },
          },
          quantity: item.quantity,
        })),
      });
  
      console.log("Session created successfully:", session.id);
      return session.url;
    } catch (err) {
      console.error("Error while creating checkout session:", err);
      throw new Error(err instanceof Error ? err.message : "Failed to create checkout session");
    }
  }


export default createCheckoutSession;
