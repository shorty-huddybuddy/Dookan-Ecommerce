import { TagIcon } from "@sanity/icons"; // Replace with any relevant icon for sales import { defineField, defineType } from "sanity";
import { title } from "process";
import { defineField, defineType, Preview } from "sanity";

export const salesType = defineType({
  name: "sale",
  title: "Sale",
  type: "document",
  icon: TagIcon,
  fields: [
    defineField({
        name:"title",
        title:"Sales Title",
        type:"string",
    }),
    defineField({
        name:"description",
        title:"Sales Description",
        type:"text",
    }),
    defineField({
        name:"discountamount",
        title:"Discount Amount",
        type:"number",
        description:"Amount of in percentage or fixed value",
    }),
    defineField({
        name:"couponcode",
        title:"Coupon Code",
        type:"string",
    }),defineField({
        name:"validfrom",
        title:"Valid From",
        type:"datetime",
    }),
    
    defineField({
        name:"validuntil",
        title:"Valid Until",
        type:"datetime",
    }),
    defineField({
        name:"isactive",
        title:"Is Active",
        type:"boolean",
        description:"Toggele to activate/deactivate the sale",
        initialValue:true,
    }),
  ],

  preview:{
    select:{
        title:"title",
        discountamount:"discountamount",
        couponcode:"couponcode",
        isactive:"isactive",
    },
    prepare(Selection){
        const {title,discountamount,couponcode,isactive}=Selection;
        const status = isactive ? "Active" : "Inactive";   
        return{
            title,
            subtitle:`${discountamount}% off - code : ${couponcode} - ${status}`,
        }
    }
  }
});
