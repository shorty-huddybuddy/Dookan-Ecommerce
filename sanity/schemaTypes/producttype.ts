import { TrolleyIcon } from "@sanity/icons";
import { Rule } from "postcss";
import { title } from "process";
import { defineField, defineType, Preview } from "sanity";

export const productType = defineType({
    name: 'product',
    title: 'Products',
    type: 'document',
    icon: TrolleyIcon,
    fields: [
        defineField({
            name:"name",
            title:" Product Name",
            type:"string",
            validation:(Rule)=>Rule.required()
        }),
        defineField({
            name:"slug",
            title:"slug",
            type:"slug",
            options:{
                source:"name",
                maxLength:96,
            },
            validation:(Rule)=>Rule.required(),
        }),
        defineField({
            name:"image",
            title:"Product image",
            type:"image",
            // validation:(Rule)=>Rule.required()
            options:{
                hotspot:true,
            }
        }),
        defineField({
            name:"Description",
            title:"Description",
            type:"blockContent",
            // validation:(Rule)=>Rule.required()
        }),
        defineField({
            name:"Price",
            title:"Price",
            type:"number",
            validation:(Rule)=>Rule.required().min(0),
            
        }),
        defineField({
            name:"category",
            title:"Category",
            type:"array",
            of:[{type:  "reference", to: {type:"category"}}]
            
        }),
        defineField({
            name:"Stock",
            title:"Stock",
            type:"number",
            validation:(Rule)=>Rule.required().min(0),
            
        }),

    ],

    preview:{
        select:{
            title:"name",
            media:"image",
            price:"Price"
        },
        prepare(select){
            return{
                title:select.title,
                subtitle:`$${select.price}`,
                media:select.media,
            }
        }
    },

});