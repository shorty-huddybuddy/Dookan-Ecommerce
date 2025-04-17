import { Product } from "@/sanity.types";
import Link from "next/link";
import Image from "next/image";
import { imgUrl } from "@/lib/imgUrl";

function ProductThumb({product}:{product:Product}){
    const isOutofstock=product.Stock !=null && product.Stock<=0 ;


    return (
        // <div>
            
//         <Link
//             href={`/product/${product.slug?.current}`}
//             className={`group flex flex-col bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden ${isOutofstock ? "opacity-50" : ""} `} 
//         >
//             <div className="relative aspect-square w-full h-full overflow-hidden">

//                 {product.image &&( 
//             <Image
//             className="object-contain transition-transform duration-300 group-hover:scale-105"
//             // src={imgUrl(product.image).url() }
//             src={product.image ? imgUrl(product.image).url() : "/default-image.jpg"}
//             alt={product.name || "Product image"}
//             fill
//             sizes="(max-width: 768px) 100vw, (max-width: 1400px) 50vw,33vw"
//           />
//           )} 
//           {/* <Image
//   className="object-contain w-full h-auto transition-transform duration-300 group-hover:scale-105"
//   src={imgUrl(product.image).url()}
//   alt={product.name || "Product image"}
//   width={500}
//   height={500}
// /> */}


//                 {isOutofstock && (
//                         <div className=" absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 ">
//                             <span className="text-white font-bold text-lg">Out  of stock</span> 
//                         </div>
//                     )
//                 }
//             </div>


//             <div className="p-4 ">
//                 <h2 className="text-lg font-semibold text-gray-800 truncate">
//                     {product.name}
//                 </h2>
//                 <p className="mt-2 text-sm text-gray-600 line-clamp-2">
//                     {product.Description?.map((block)=>
//                       block._type=="block"
//                         ? block.children?.map((child)=>child.text).join("")
//                         :""
//                     )
//                     .join(" ") || "No Description Available"}
//                 </p>
//                 <p className="mt-2 text-lg font-bold text-gray-900">
//                     ${product.Price?.toFixed(2)}
//                 </p>
//             </div>
        
//         </Link>


<Link
  href={`/product/${product.slug?.current}`}
  className={`group flex flex-col bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden ${isOutofstock ? "opacity-50" : ""}`}
>
  {/* This makes all product cards the same height */}
  <div className="flex flex-col justify-between h-full">
    {/* image wrapper */}
    {/* <div className="relative aspect-square w-full overflow-hidden"> */}
    <div className="relative w-full pt-[100%] overflow-hidden">
      {product.image && ( 
        <Image
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          src={product.image ? imgUrl(product.image).url() : "/default-image.jpg"}
          alt={product.name || "Product image"}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1400px) 50vw, 33vw"
        />
      )}
      {isOutofstock && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <span className="text-white font-bold text-lg">Out of stock</span>
        </div>
      )}
    </div>

    {/* content */}
    <div className="p-4 flex flex-col justify-between flex-grow">
      <h2 className="text-lg font-semibold text-gray-800 truncate">
        {product.name}
      </h2>
      <p className=" mt-2 text-sm text-gray-600 line-clamp-1">
        {product.Description?.map((block) =>
          block._type === "block"
            ? block.children?.map((child) => child.text).join("")
            : ""
        ).join(" ") || "No Description Available"}
      </p>
      <p className="mt-2 text-lg font-bold text-gray-900">
        ${product.Price?.toFixed(2)}
      </p>
    </div>
  </div>
</Link>

        // </div>

    )
}
 
export default ProductThumb;






