import { getProductbySlug } from "@/sanity/lib/products/getProductbySlug";
import { notFound } from "next/navigation";
import Image from "next/image";
import { imgUrl } from "@/lib/imgUrl";
import { PortableText } from "next-sanity";
// import { Button } from "@/components/ui/button";
import AddtoBasketButton from "@/components/ui/AddtoBasketButton";


// export const dynamic="force-static";
// export const revalidate=3600;


async function Productpage({params}:{params:Promise<{slug:string}>;}) {

const {slug} =await params ;
const product=await getProductbySlug(slug);


if(!product){
    return notFound();
}   
// console.log("Stripe Key:", process.env.STRIPE_SECRET_KEY ? "Set" : "Not Set");
const isoutodstock=product.Stock!=null && product.Stock<=0;

return (
        

<div className="container mx-auto px-4 py-8 ">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className={`relative aspect-square overflow-hidden rounded-lg shadow-lg ${isoutodstock ? "opacity-50" : ""}`}>
                <Image
                            className="object-contain transition-transform duration-300 group-hover:scale-105"
                            // src={imgUrl(product.image).url()}
                            src={product.image ? imgUrl(product.image).url() : "/default-image.jpg"}
                            alt={product.name || "Product image"}
                            fill
                            sizes="(max-width: 786px) 100vw, (max-width: 1200px) 50vw,33vw"
                          />

                        {isoutodstock && (
                        <div className=" absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 ">
                            <span className="text-white font-bold text-lg">Out  of stock</span> 
                        </div>
                    )
                }
            </div>

                <div className="flex flex-col justify-between">
                    <div>
                        <h1 className="text-3xl font-bold mb-4 ">{product.name}</h1>
                        <div className="text-xl font-semibold mb-4">
                            ${product.Price?.toFixed(2)}
                        </div>
                    </div>
                


            <div className="flex flex-col justify-between">
                {
                    Array.isArray(product.Description) &&(
                        <PortableText value={product.Description}></PortableText>       
                    )
                }
                </div>

                <div>
                    {/* <Button>Add to Basket</Button> */}
                    <AddtoBasketButton product={product} disabled={isoutodstock}></AddtoBasketButton>
                </div>
            </div>
        </div>
    </div>
    );
}


export default Productpage ;