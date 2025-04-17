import Productgrid from "@/components/ui/Productgrid";
import { searchProductbyName } from "@/sanity/lib/products/searchProductbyName";

// this is how we can get query given input to input bar in a page  .
async function SearchPage({searchParams,}:{searchParams:Promise<{query:string;}>;}) {
    const {query}=await searchParams;
    const products =await searchProductbyName(query);


    if(!products.length){
      return (
        <div className="flex flex-col items-center justify-top min-h-screen bg-gray-100 p-4 ">
          <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-4xl">
            <h1 className="text-3xl font-bold mb-6 text-center">
              No product found for :{query}
            </h1>
            <p className="text-gray-500 text-center" >
              Try Searching with different keyword
            </p>
          </div>
        </div>
      )
    }


  return (
  <div className="flex flex-col items-center justify-top min-h-screen bg-gray-100 p-4">
          <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-4xl">
            <h1 className="text-3xl font-bold mb-6 text-center">
                Search result for {query}
            </h1>
            <Productgrid products={products}></Productgrid>
          </div>
      </div>
) ;
}


export default SearchPage;    