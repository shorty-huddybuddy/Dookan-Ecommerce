import { defineQuery } from "next-sanity"
import { CouponCode } from "./couponCodes"
import { sanityFetch } from "../live";
import { error } from "console";

export const getAllSaleByCouponCode= async (couponCode:CouponCode)=>{

    const ACTIVE_SALE_BY_COUPON_QUERY=defineQuery(`
        *[
            _type=="sale" 
            && isactive==true
            && couponcode==$couponCode
        ] |order(validfrom desc)[0]
        `);

    try{
        const activeSale=await sanityFetch({
            query:ACTIVE_SALE_BY_COUPON_QUERY,
            params:{
                couponCode,
            },
        });

        return activeSale ?activeSale.data:null;
    }
    catch(error){
        console.error("error fetching sale by couoncode",error)
        return null;
    }

}