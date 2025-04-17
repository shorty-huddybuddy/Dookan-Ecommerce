"use client"

import { Category } from "@/sanity.types";
import { Popover, PopoverContent, PopoverTrigger } from "@radix-ui/react-popover";
import { useRouter } from "next/navigation";
//this matters (not next/router)
import { useState } from "react";
import { Button } from "./button";
// import { ValueError } from "sanity";
import { Check, ChevronsUpDown,  } from "lucide-react";
// import { CommandInput, CommandItem } from "cmdk";
// import { CommandGroup,CommandEmpty } from "cmdk";
import { cn } from "@/lib/utils";
import {
    Command,
    CommandInput,
    CommandList,
    CommandItem,
    CommandGroup,
    CommandEmpty
  } from "@/components/ui/command";



// import { CommandList } from "@/components/ui/command";

interface CategorySelectorProps{
    categories:Category[] ,
}

export function CategorySelectorCompnets({
    categories,
}:CategorySelectorProps){
    const [open ,setOpen] =useState(false);
    const [value,setValue] =useState<string>("");
    const router =useRouter();

    return(
        <Popover open={open} onOpenChange={setOpen}  >

        <PopoverTrigger asChild>
                <Button variant="outline" role="combobox" aria-expanded={open} className="w-full max-w-full relative flex justify-center sm:justify-start sm:flex-none items-center space-x-2 bg-blue-500 hover:bg-blue-700 hover:text-white text-white font-bold py-2 px-4 rounded "
                >
                
                {
                    value ? categories.find((categories)=>categories._id==value)?.title :"filter by Category"
                }

                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0">

                </ChevronsUpDown>       
                </Button>
        </PopoverTrigger>
        <PopoverContent className= "w-full p-0 z-50"> 
                <Command>
                    <CommandInput 
                        placeholder="Search History....."
                        className="h-9"
                        onKeyDown={(e)=>{
                            if(e.key==="Enter"){
                                const selectedcat=categories.find((c)=>{
                                    c.title ?.toLowerCase().includes(e.currentTarget.value.toLowerCase())

                                });

                            if(selectedcat?.slug?.current){
                                setValue(selectedcat._id);
                                router.push(`/categories/${selectedcat.slug.current}`);
                                setOpen(false)
                            }
                            }
                        }}
                    >
                    </CommandInput>
                        <CommandList>
                            <CommandEmpty> category found</CommandEmpty>
                            <CommandGroup>
                                {categories.map((category)=>(
                                    <CommandItem
                                    key={category._id}
                                    value={category.title}
                                    onSelect={()=>{
                                        setValue(value===category._id ? "" :category._id);
                                        router.push(`/categories/${category.slug?.current}`);
                                    }}
                                    >
                                        {category.title}
                                        <Check 
                                            className={cn("ml-auto h-4 w-4",
                                                value===category._id ? "opacity-100 " :"opacity-0"
                                )}
                                        />
                                 </CommandItem>
                                ))}
                            </CommandGroup>
                        </CommandList>    
                </Command>
        </PopoverContent>
    </Popover>
    );
    
}