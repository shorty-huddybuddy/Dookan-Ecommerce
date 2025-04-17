"use client";

import { Product } from "@/sanity.types";
import { AnimatePresence, motion } from "framer-motion";
import ProductThumb from "./ProductThumb";

function Productgrid({ products }: { products: Product[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
      {products?.map((product) => (
        <AnimatePresence key={product._id}>
          <motion.div   
            layout
            initial={{ opacity: 0.2 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="h-full w-full flex"
          >
            {/* Ensure full height card */}
            <div className="w-full h-full">
              <ProductThumb product={product} />
            </div>
          </motion.div>
        </AnimatePresence>
      ))}
    </div>
  );
}






export default Productgrid;



// import ProductThumb from '@/components/ui/ProductThumb';

// function Productgrid({ products }) {
//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h1 className="text-2xl font-bold mb-6">Our Products</h1>
      
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
//         {products.map((product) => (
//           <ProductThumb key={product._id} product={product} />
//         ))}
//       </div>
//     </div>
//   );
// }

// export default Productgrid;