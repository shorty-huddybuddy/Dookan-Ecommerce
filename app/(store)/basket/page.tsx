// "use client"

// import { SignInButton, useAuth, useUser } from "@clerk/nextjs";
// import useBasketStore from "../store";
// import { useRouter } from "next/navigation";
// import { useState ,useEffect } from "react";
// import AddtoBasketButton from "@/components/ui/AddtoBasketButton";
// import { imgUrl } from "@/lib/imgUrl";
// import Image from "next/image";
// import createCheckoutSession, { Metadata } from "@/actions/createCheckoutSession";





// function Basketpage() {

//     const getGroupedItems =useBasketStore((state)=>state.getGroupedItems());
//     const {isSignedIn} =useAuth();
//     const {user} =useUser();
//     const router=useRouter();


//     const [isClient,setIsclient]=useState(false);
//     const [isLoading,setIsLoading]=useState(false);

//     useEffect(() => {
//             setIsclient(true);
//         }, []);
    
//         if (!isClient) {
//             return null;
//         }

//     if(getGroupedItems.length===0){
//         return (
//             <div className="container mx-auto p-4 flex flex-col items-center justify-center min-h-[50vh]">
//                 <h1 className="text-2xl font-bold mb-6 text-gray-800">
//                 your Basket
//                 </h1>
//                 <p className="text-gray-600 text-lg ">Your Basket is empty</p>
//             </div>
//         )
//     }

//     console.log("Basket Content",getGroupedItems);

//  const handlecheckout =async ()=>{
//     if(!isSignedIn) return ;
//     setIsLoading(true);


//     try{
//         const metadata:Metadata={
//             orderNumber:crypto.randomUUID(),
//             customerName:user?.fullName ??" Unknown" ,
//             customerEmail:user?.emailAddresses[0].emailAddress ?? "unknown",
//             clerkUserId:user!.id,
//         }

//         const checkouturl=await createCheckoutSession(getGroupedItems,metadata);

//         if(checkouturl){
//             window.location.href=checkouturl ;
//         }
//         console.log(metadata);
        
//     }catch(err){
//         console.error(err);
//     }finally{
//         setIsLoading(false);
//     }
//  }

//   return (
//     <div className="container mx-auto p-4 max-w-6xl">
//         <h1 className="text-2xl font-bold mb-4 ">
//             Your Basket
//         </h1>
//         <div className="flex flex-col lg:flex-row gap-8">
//             <div className="flex-grow">
//                 {getGroupedItems?.map((item)=>(
//                     <div key={item.product._id} className="mb-4 p-4 border rounded flex items-center justify-between">


//                     <div className="flex items-center cursor-pointer flex-1 min-w-0 " onClick={()=>
//                         router.push(`/product/${item.product.slug?.current}`)
//                     } >
//                         <div className="w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0 mr-4">
//                             { item.product.image && 
//                                 (
//                                     <Image 
//                                     src={imgUrl(item.product.image).url()}
//                                     alt={item.product.name ?? "Product Image"}
//                                     className="w-full h-full object-cover rounded" 
//                                     width={96}
//                                     height={96}
//                                     />                                    
//                                 )}
//                         </div>
//                         <div className="min-w-0">
//                                 <h2 className="text-lg sm:text-xl font-semibold truncate">
//                                     {item.product.name}
//                                 </h2>
//                                 <p className="text-sm sm:text-base">
//                                     Price : $
//                                     {((item.product.Price ?? 0)* item.quantity).toFixed(2)}
//                                 </p>
//                         </div>
//                     </div>
                        

//                         <div className="flex items-center ml-4 flex-shrink-0">
//                             <AddtoBasketButton product={item.product}></AddtoBasketButton>
//                         </div>
//                     </div>
//                 ))}
//             </div>

//             <div className="w-full lg:w-80 lg:sticky lg:top-4 h-fit bg-white p-6 border rounded order-first lg:order-last fixed bottom-0 left-0 lg:left-auto ">
//                     <h3 className="text-xl font-semibold">Order summary</h3>

//                     <div className="mt-4 space-y-2 ">
//                         <p className="flex justify-between">
//                             <span>Items:</span>
//                             <span>
//                                 {getGroupedItems.reduce((total,item)=>total+item.quantity,0)}
//                             </span>
//                         </p>
//                         <p className="flex justify-center text-2xl font-bold border-t pt-2">
//                             <span>Total:</span>
//                             <span>
//                                 ${useBasketStore.getState().getTotalPrice().toFixed(2)}
//                             </span>
//                         </p>

//                     </div>

                
//                 {
//                     isSignedIn ?( 
//                     <button 
//                         onClick={handlecheckout}
//                         disabled={isLoading}
//                         className="mt-4 w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
//                         >
//                             {isLoading ? "Processing.." : "Checkout"}
//                         </button>
//                     ):(
//                         <SignInButton mode="modal">
//                             <button className="mt-4 w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-400">
//                                 Sign in to Checkout
//                             </button>
                             
//                         </SignInButton>
//                     )

//                 }

//             </div>

//             <div className="h-64 lg:h-0 ">

//             </div>
//         </div>
//     </div>
//   )
// }

// export default Basketpage;


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


"use client"

import { SignInButton, useAuth, useUser } from "@clerk/nextjs";
import useBasketStore from "../store";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import AddtoBasketButton from "@/components/ui/AddtoBasketButton";
import { imgUrl } from "@/lib/imgUrl";
import Image from "next/image";
import createCheckoutSession, { Metadata } from "@/actions/createCheckoutSession";
import createCashOnDeliveryOrder from "@/actions/createCashOnDeliveryOrder";
// import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

function Basketpage() {
    const getGroupedItems = useBasketStore((state) => state.getGroupedItems());
    const { isSignedIn } = useAuth();
    const { user } = useUser();
    const router = useRouter();

    const [isClient, setIsClient] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState<"stripe" | "cod" | null>(null);

    useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isClient) {
        return null;
    }

    if (getGroupedItems.length === 0) {
        return (
            <div className="container mx-auto p-4 flex flex-col items-center justify-center min-h-[50vh]">
                <h1 className="text-2xl font-bold mb-6 text-gray-800">
                    Your Basket
                </h1>
                <p className="text-gray-600 text-lg ">Your Basket is empty</p>
            </div>
        )
    }

    

    // const handleCheckout = async (method: "stripe" | "cod") => {
    //     if (!isSignedIn) return;
    //     setIsLoading(true);
    //     setPaymentMethod(method);

    //     try {
    //         const metadata: Metadata = {
    //             orderNumber: crypto.randomUUID(),
    //             customerName: user?.fullName ?? "Unknown",
    //             customerEmail: user?.emailAddresses[0].emailAddress ?? "unknown",
    //             clerkUserId: user!.id,
    //         }

    //         if (method === "stripe") {
    //             const checkoutUrl = await createCheckoutSession(getGroupedItems, metadata);
    //             if (checkoutUrl) {
    //                 window.location.href = checkoutUrl;
    //             }
    //         } else {
    //             // Handle COD order
    //             // const result = await createCashOnDeliveryOrder(getGroupedItems, metadata);
    //             // if (result.success) {
    //             //     router.push(`/order-confirmation?orderNumber=${result.orderNumber}`);
    //             //     // Clear basket after successful COD order
    //             //     useBasketStore.getState().clearBasket();
    //             // }

    //             const result = await createCashOnDeliveryOrder(getGroupedItems, metadata);
    
    //                 if (result.success && result.successUrl) {
    //                 // Redirect using window.location like Stripe flow
    //                     window.location.href = result.successUrl;
    //                     // Clear basket after successful order
    //                     useBasketStore.getState().clearBasket();
    //                 }
    //         }
    //     } catch (err) {
    //         console.error(err);
    //     } finally {
    //         setIsLoading(false);
    //         setPaymentMethod(null);
    //     }
    // }


    // const handleCheckout = async (method: "stripe" | "cod") => {
    //     if (!isSignedIn) return;
        
    //     setIsLoading(true);
    //     setPaymentMethod(method);
      
    //     try {
    //       // Validate items first
    //       const invalidItems = getGroupedItems.filter(
    //         item => !item.product.Price || item.quantity <= 0
    //       );
          
    //       if (invalidItems.length > 0) {
    //         throw new Error("Some items have invalid prices or quantities");
    //       }
      
    //       const metadata: Metadata = {
    //         orderNumber: crypto.randomUUID(),
    //         customerName: user?.fullName ?? "Unknown",
    //         customerEmail: user?.emailAddresses[0].emailAddress ?? "unknown",
    //         clerkUserId: user!.id,
    //       };
      
    //       if (method === "stripe") {
    //         const checkoutUrl = await createCheckoutSession(getGroupedItems, metadata);
            
    //         if (!checkoutUrl) {
    //           throw new Error("Failed to create payment session");
    //         }
            
    //         // Use router.push instead of window.location
    //         router.push(checkoutUrl);
    //       } else {
    //         const result = await createCashOnDeliveryOrder(getGroupedItems, metadata);
            
    //         if (!result?.successUrl) {
    //           throw new Error("Failed to create COD order");
    //         }
            
    //         // Clear basket before redirect
    //         useBasketStore.getState().clearBasket();
    //         router.push(result.successUrl);
    //       }
          
    //     } catch (err) {
    //       console.error("Checkout error:", err);
          
    //       // Show user-friendly error
    //       toast.error(
    //         err instanceof Error 
    //           ? err.message 
    //           : "Payment failed. Please try again."
    //       );
          
    //     } finally {
    //       setIsLoading(false);
    //       setPaymentMethod(null);
    //     }
    //   };


    const handleCheckout = async (method: "stripe" | "cod") => {
        if (!isSignedIn) return;
        
        setIsLoading(true);
        setPaymentMethod(method);
      
        try {
          // Validate items first
          const invalidItems = getGroupedItems.filter(
            item => !item.product.Price || item.quantity <= 0
          );
          
          if (invalidItems.length > 0) {
            throw new Error("Some items have invalid prices or quantities");
          }
      
          const metadata: Metadata = {
            orderNumber: crypto.randomUUID(),
            customerName: user?.fullName ?? "Unknown",
            customerEmail: user?.emailAddresses[0].emailAddress ?? "unknown",
            clerkUserId: user!.id,
          };
      
          if (method === "stripe") {
            try {
              // Using window.location.href instead of router.push for Stripe redirect
              const checkoutUrl = await createCheckoutSession(getGroupedItems, metadata);
              
              if (!checkoutUrl) {
                throw new Error("Failed to create payment session - no URL returned");
              }
              
              // Use direct location change for Stripe
              window.location.href = checkoutUrl;
            } catch (stripeErr) {
              console.error("Stripe checkout error:", stripeErr);
              toast.error("Payment processing failed. Please try again later.");
            }
          } else {
            try {
              const result = await createCashOnDeliveryOrder(getGroupedItems, metadata);
              
              if (!result?.successUrl) {
                throw new Error("Failed to create COD order");
              }
              
              // Clear basket before redirect
              useBasketStore.getState().clearBasket();
              window.location.href = result.successUrl;
            } catch (codErr) {
              console.error("COD error:", codErr);
              toast.error("Cash on delivery order failed. Please try again.");
            }
          }
          
        } catch (err) {
          console.error("Checkout error:", err);
          
          // Show user-friendly error
          toast.error(
            err instanceof Error 
              ? err.message 
              : "Payment failed. Please try again."
          );
          
        } finally {
          setIsLoading(false);
          setPaymentMethod(null);
        }
      };

    return (
        <div className="container mx-auto p-4 max-w-6xl">
            <h1 className="text-2xl font-bold mb-4">
                Your Basket
            </h1>
            <div className="flex flex-col lg:flex-row gap-8">
                <div className="flex-grow">
                    {getGroupedItems?.map((item) => (
                        <div key={item.product._id} className="mb-4 p-4 border rounded flex items-center justify-between">
                            <div 
                                className="flex items-center cursor-pointer flex-1 min-w-0" 
                                onClick={() => router.push(`/product/${item.product.slug?.current}`)}
                            >
                                <div className="w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0 mr-4">
                                    {item.product.image && (
                                        <Image
                                            src={imgUrl(item.product.image).url()}
                                            alt={item.product.name ?? "Product Image"}
                                            className="w-full h-full object-cover rounded"
                                            width={96}
                                            height={96}
                                        />
                                    )}
                                </div>
                                <div className="min-w-0">
                                    <h2 className="text-lg sm:text-xl font-semibold truncate">
                                        {item.product.name}
                                    </h2>
                                    <p className="text-sm sm:text-base">
                                        Price: ${((item.product.Price ?? 0) * item.quantity).toFixed(2)}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center ml-4 flex-shrink-0">
                                <AddtoBasketButton product={item.product}></AddtoBasketButton>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="w-full lg:w-80 lg:sticky lg:top-4 h-fit bg-white p-6 border rounded order-first lg:order-last fixed bottom-0 left-0 lg:left-auto">
                    <h3 className="text-xl font-semibold">Order summary</h3>

                    <div className="mt-4 space-y-2">
                        <p className="flex justify-between">
                            <span>Items:</span>
                            <span>
                                {getGroupedItems.reduce((total, item) => total + item.quantity, 0)}
                            </span>
                        </p>
                        <p className="flex justify-center text-2xl font-bold border-t pt-2">
                            <span>Total:</span>
                            <span>
                                ${useBasketStore.getState().getTotalPrice().toFixed(2)}
                            </span>
                        </p>
                    </div>

                    {isSignedIn ? (
                        <div className="mt-4 space-y-2">
                            <h4 className="font-medium">Payment Method:</h4>
                            <div className="flex flex-col gap-2">
                                <button
                                    onClick={() => handleCheckout("stripe")}
                                    disabled={isLoading && paymentMethod !== "stripe"}
                                    className={`w-full px-4 py-2 rounded border ${paymentMethod === "stripe" ? "bg-blue-500 text-white" : "bg-white text-gray-800 border-gray-300"} hover:bg-blue-100 disabled:bg-gray-200 disabled:text-gray-500`}
                                >
                                    {isLoading && paymentMethod === "stripe" ? "Processing..." : "Pay with Card"}
                                </button>
                                <button
                                    onClick={() => handleCheckout("cod")}
                                    disabled={isLoading && paymentMethod !== "cod"}
                                    className={`w-full px-4 py-2 rounded border ${paymentMethod === "cod" ? "bg-green-500 text-white" : "bg-white text-gray-800 border-gray-300"} hover:bg-green-100 disabled:bg-gray-200 disabled:text-gray-500`}
                                >
                                    {isLoading && paymentMethod === "cod" ? "Processing..." : "Cash on Delivery"}
                                </button>
                            </div>
                        </div>
                    ) : (
                        <SignInButton mode="modal">
                            <button className="mt-4 w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-400">
                                Sign in to Checkout
                            </button>
                        </SignInButton>
                    )}
                </div>

                <div className="h-64 lg:h-0"></div>
            </div>
        </div>
    )
}

export default Basketpage;

