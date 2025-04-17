"use client"


import { Product } from "@/sanity.types"
import useBasketStore from "../../app/(store)/store"
import { useEffect, useState } from "react";

interface AddtoBasketButtonProps {
    product: Product;
    disabled?: boolean;
}

function AddtoBasketButton({ product, disabled }: AddtoBasketButtonProps) {

    const { addItem, removeItems, getItemCount } = useBasketStore();
    const itemcount = getItemCount(product._id);

    const [isClient, setIsclient] = useState(false);

    useEffect(() => {
        setIsclient(true);
    }, []);

    if (!isClient) {
        return null;
    }



    return (
        <div className="flex items-center justify-center space-x-2 ">
            <button
                onClick={() => removeItems(product._id)}
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-200  ${itemcount === 0 ? "bg-gray-100 cursor-not-allowed " : "bg-gray-200 hover:bg-gray-300"}`}
                disabled={itemcount === 0 || disabled}>

                <span className={`text-xl font-bold ${itemcount === 0 ? "text-gray-400" : "text-gray-600"}`}>
                    -
                </span>
            </button>


            <span className="w-8 text-center font-semibold">{itemcount}</span>

            <button
                onClick={() => addItem(product)}
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-200  ${disabled ? "bg-gray-400 cursor-not-allowed " : "bg-blue-500 hover:bg-blue-600"}`}
                disabled={disabled}>
                <span className={`text-xl font-bold text-white`}>
                    +
                </span>

            </button>

        </div>
    )
}

export default AddtoBasketButton
