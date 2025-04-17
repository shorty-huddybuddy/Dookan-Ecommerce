import { Product } from "@/sanity.types";
import {create} from "zustand"
import { persist } from 'zustand/middleware'

export interface BasketItem{
    product:Product;
    quantity:number;
}

interface Basketstate{
    items:BasketItem[];
    addItem:(product:Product)=>void;
    removeItems:(productid:string)=>void;
    clearBasket:()=>void;
    getTotalPrice:()=>number;
    getItemCount:(productid:string)=>number;
    getGroupedItems:()=>BasketItem[];


}


const useBasketStore= create<Basketstate>()(
    persist(
        (set,get)=>({
            items:[],
            addItem:(product)=>set((state)=>{
                const  existItem=state.items.find(item=>item.product._id===product._id);
                if(existItem){
                    return {
                        items:state.items.map(item=>item.product._id===product._id ? { ...item,quantity:item.quantity+1} :item)
                    };
                }else{
                    return {items:[ ...state.items ,{ product,quantity:1}]};
                }
            }),
            removeItems:(productid)=>set((state)=>({
                items:state.items.reduce((acc,item)=>{
                    if(item.product._id===productid){
                        if(item.quantity>1){
                            acc.push({...item,quantity:item.quantity-1});
                        }
                    }else{
                        acc.push(item);
                    }
                    return acc;
                },[] as BasketItem[])
            })),
            clearBasket:()=>set({items:[]}),
            getTotalPrice:()=>{
                return get().items.reduce((total,item)=>total+(item.product.Price ?? 0) * item.quantity,0);
            },
            getItemCount:(productid)=>{
                const item=get().items.find(item=>item.product._id===productid);
                return item?item.quantity:0;
            },
            getGroupedItems:()=>get().items,
    }),
    {
        name:"Basket-Store",
    }
    )

);

export default useBasketStore