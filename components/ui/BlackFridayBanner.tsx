import { getAllSaleByCouponCode } from "@/sanity/lib/sales/getAllSaleByCouponCode";

async function BlackFridayBanner() {
    const sale =await getAllSaleByCouponCode('BFRIDAY');
    // console.log(sale?.isactive)

    if(!sale?.isactive){
        return null;
    }

    
    return <div className="bg-gradient-to-r from-red-600 to-black text-white px-6 py-10 mx-4 mt-2 rounded-lg shadow-lg">
        {/* Black Friday is Live */}
            <div className="container mx-auto flex items-center justify-between">
                <div className="flex-1">
                    <h2 className="text-3xl text-left sm:text-5xl font-extrabold mb-6">
                        {sale.title}
                    </h2>
                    <p className="text-left text-xl sm:text-3xl font-semibold mb-6">
                        {sale.description}
                    </p>
                    <div className="flex">
                        <div className="bg-white text-black py-4 px-6 rounded-full shadow-md transform hover:scale-105 transition duration-300">
                            <span className="font-bold text-base sm:text-xl">
                                Use Code:{" "}
                                <span  className="text-red-600 ">
                                    {sale.couponcode}
                                </span>
                                
                            </span>
                            <span className="ml-2  font-bold text-base sm:text-xl">
                                for {sale.discountamount}% OFF
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>;
}

export default BlackFridayBanner;