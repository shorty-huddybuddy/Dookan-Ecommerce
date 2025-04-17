import { defineQuery } from "next-sanity"
import { sanityFetch } from "../live"
import { error } from "console";

export const getProductbySlug=async (slug:string)=>{
    const PRODUCT_BYID_QUERY=defineQuery(`
            *[
                _type=="product" && slug.current==$slug
            ] | order(name asc)[0]
        `);



    try{
        const product=await sanityFetch({
            query:PRODUCT_BYID_QUERY,
            params:{
                slug,
            },
        });
        return product.data||null;
    }
    catch(err){
        console.error("erro in fetching  produtc bt id:",err);
        return null;
    }

    
}