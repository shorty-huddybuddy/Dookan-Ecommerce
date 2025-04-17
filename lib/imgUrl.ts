import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { client } from "@/sanity/lib/client";
// import imageUrlBuilder from '@sanity/image-url'
import imageUrlBuilder from '@sanity/image-url'

const builder = imageUrlBuilder(client) ;

export function imgUrl(source:SanityImageSource){
    return builder.image(source) ;
}

