import { defineQuery } from "next-sanity"
import { sanityFetch } from "../live";

export const searchProductbyName=async (searchParam:string)=>{
    const PRODUCT_QUERY_SEARCH=defineQuery(`
            *[
                _type=='product'
                && name match $searchParam
            ] | order(name asc)
        `);

        try{
            const products=await sanityFetch ({
                query:PRODUCT_QUERY_SEARCH,
                params:{ 
                    searchParam: `${searchParam}`
                },
            });

            return products.data || [];
        
        }
        catch(err){
            console.error("error product fetching by name",err)
            return [];
        }
}