import { BasketIcon } from "@sanity/icons";
import { Rule } from "postcss";
import { defineArrayMember, defineField, defineType } from "sanity";

export const ordertype =defineType({
    name:"order",
    title:"Order",
    type:"document",
    icon:BasketIcon,
    fields:[
        defineField({
            name:"oderNumber",
            title:"Order Number",
            type:"string",
            validation: (Rule)=>Rule.required(),
        }),
        defineField({
            name:"stripecheckoutsessionid",
            title:"Stripe Checkout Session ID",
            type:"string",
        }),
        defineField({
            name:"stripeCustomerId",
            title:"Stripe Customer Id",
            type:"string",
            validation: (Rule)=>Rule.required(),
        }),
        defineField({
            name:"clerkUserId",
            title:"User Id",
            type:"string",
            validation: (Rule)=>Rule.required(),
        }),
        defineField({
            name:"customerName",
            title:"Customer Name",
            type:"string",
            validation: (Rule)=>Rule.required(),
        }),
        defineField({
            name:"email",
            title:"Costomer Email",
            type:"string",
            validation: (Rule)=>Rule.required(),
        }),
        defineField({
            name:"stripePaymentIntentId",
            title:"Stripe Payment Intent Id",
            type:"string",
            validation: (Rule)=>Rule.required(),
        }),
        defineField({
            name:"products",
            title:"Products",
            type:"array",
            of:[
                defineArrayMember({
                    type:"object",
                    fields:[
                        defineField({
                            name:"product",
                            title:"Product Bought",
                            type:"reference",
                            to:[{type:"product"}],
                        }),
                        defineField({
                            name:"quantity",
                            title:"Quantity Pucrchased",
                            type:"number",
                        }),
                    ],
                    preview:{
                        select:{
                            product:"product.name",
                            quantity:"quantity",
                            image:"product.image",
                            price:"product.Price",
                            currency:"product.currency",
                        },
                        prepare(select){
                            return{
                                title:`${select.product} X ${select.quantity}`,
                                subtitle:`${select.price*select.quantity}`,
                                media:select.image,
                            }
                        }
                    }
                }),
            ]
        }),

        defineField({
            name:"totalprice",
            title:"Total Price",
            type:"number",
        }),
        defineField({
            name:"currency",
            title:"Currency",
            type:"string",
        }),
        defineField({
            name:"amountdiscount",
            title:"Amount Discount",
             type:"number",
             validation: (Rule)=>Rule.min(0),
        }),

        defineField({
            name:"status",
            title:"Order Status",
            type:"string",
            options:{
                list:[
                    {title:"Pending",value:"pending"},
                    {title:"Paid",value:"paid"},
                    {title:"Shipped",value:"shipped"},
                    {title:"Delivered",value:"delivered"},
                    {title:"Cancelled",value:"cancelled"},
                ],
            },
        }),

        defineField({
            name:"orderDate",
            title:"Order Date",
            type:"datetime",
            validation: (Rule)=>Rule.required(),
        }),

    ],

    preview: {
        select:{
            name:"customerName",
            amount:"totalprice",
            currency:"currency",
            orderId:"oderNumber",
            email:"email",

        },

        prepare(select){
            const orderidsnippet=`${select.orderId.slice(0,5)}...${select.orderId.slice(-5)}`;
            return{
                title:`${select.name} (${orderidsnippet})`,
                subtitle:`${select.amount} ${select.currency} ${select.email}`,
                media:BasketIcon,
            };
        },
    },
});