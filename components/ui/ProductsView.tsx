import { Product ,Category } from "@/sanity.types";
import Productgrid from "./Productgrid";
import { CategorySelectorCompnets } from "./category-selector";


interface ProductsViewProps{
    products: Product[];
    categories:Category[]
}

const ProductsView =({products,categories}:ProductsViewProps)=>{
    // const cat=categories._id 
    return (<div className="flex flex-col">
        {/* categories */}

        <div className="w-full sm:w-[200px]">
                <CategorySelectorCompnets categories={categories}></CategorySelectorCompnets>
        </div>





        {/* products  */}
        <div className="flex-1">
            <div>
                <Productgrid products={products}/>
                <hr className="w-1/2 sm:w=3/4"/>
            </div>
        </div>
    </div>
    );
};

export default ProductsView ;