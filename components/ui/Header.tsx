"use client";

import { ClerkLoaded, SignInButton, UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
import Form from 'next/form';
import { PackageIcon, TrolleyIcon } from "@sanity/icons";
import useBasketStore from "@/app/(store)/store";

function Header(){
    const {user} = useUser();

    const itemcount =useBasketStore((state)=>
        state.items.reduce((total,item)=>total+item.quantity,0)
    );


    const createClerkPasskey=async ()=>{
        try{
            const response=await user?.createPasskey();
            console.log(response);
        }catch(err){
            console.error("Error:",JSON.stringify(err,null,2));
        }
    }

    // console.log(user);
    return <header className="flex flex-wrap justify-between items-center px-4 py-2">
        {/* top row */}
        <div className="flex w-full flex-wrap justify-between items-center">
            <Link href="/"
                className="
                text-2xl
                font-bold
                text-blue-500
                cursor-pointer
                mx-auto
                sm:mx-0
                "

            >Dookan</Link>
            <Form action="/search" className="w-full sm:w-auto sm:flex-1 sm:mx-4 mt-2 sm:mt-0">
                <input type="text" name="query" placeholder="Search for product" 
                    className="bg-gray-200 text-gray-800 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 border w-full max-w-4xl "
                />
            </Form>

            <div className="flex items-center space-x-4 mt-4 sm:mt-0 flex-1 sm:flex-none">
                <Link href="/basket"
                className="flex-1 relative flex justify-center sm:justify-center sm:flex-none items-center space-x-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ">
                    <TrolleyIcon className="w-6 h-6"></TrolleyIcon>
                    {/* span item count once global state is implemented  */}

                    <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs ">
                    {itemcount}
                    </span>

                    <span>My Basket</span>
                </Link>


                {/* User Area */}

                <ClerkLoaded>
                    {user &&(
                        <Link href="/orders" className="flex-1 relative flex justify-center sm:justify-center sm:flex-none items-center space-x-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded "> 
                            <PackageIcon className="w-6 h-6"></PackageIcon>
                            <span>My Order</span>
                        </Link>
                    )}



                    {user ?(
                        <div className="flex space-x-2 items-center">
                            <UserButton></UserButton>

                            <div className="hidden sm:block text:xs">
                                <p className="text-gray-400">Welcome back</p>
                                <p className="font-bold">{user.fullName}</p>
                            </div>
                        </div>
                        
                    ):(
                        <SignInButton mode="modal"></SignInButton>
                    )}

                    {user ?.passkeys.length===0 && (
                        <button onClick={createClerkPasskey}
                            className="bg-white hover:bg-blue-700 hover:text-white animate-pulse text-blue-500 font-bold py-2 px-4 rounded border-blue-300 border cursor-grab"
                        >
                            Create a passkey
                        </button>
                    )
                    
                }

                </ClerkLoaded>
            </div>
        </div>
        
        
        </header>
}

export default Header;