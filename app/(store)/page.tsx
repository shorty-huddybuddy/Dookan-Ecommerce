// import Image from "next/image";
// import { Button } from "@/components/ui/button";
import { getallproducts } from "@/sanity/lib/products/getallproducts";
import { getallcategories } from "@/sanity/lib/products/getallcategories";
import ProductsView from "@/components/ui/ProductsView";
import BlackFridayBanner from "@/components/ui/BlackFridayBanner";


// export const dynamic="force-static";
// export const revalidate=3600;

export default async function Home() {

  const products=await getallproducts();  
  const categories=await getallcategories();

  // console.log(products)
  return (
    <div>
      <BlackFridayBanner/>


      <div className="flex flex-col items-center justify-top min-h-screen bg-gray-100 p-4" >
        <ProductsView products={products} categories={categories}>

        </ProductsView>
      </div>
    </div>
    
  );
}
