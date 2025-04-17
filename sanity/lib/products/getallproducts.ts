import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live";


export const getallproducts=async () =>{
    const ALL_PRDUCT_QUERY=defineQuery(`
        *[_type=="product"] | order(name asc)
        `)



    try{
        const products=await sanityFetch({
            query:ALL_PRDUCT_QUERY,
        });
        return products.data || [] ;
    }
    catch(err){
        console.error("Error fetching all the products",err);
        return [];  
    }
}