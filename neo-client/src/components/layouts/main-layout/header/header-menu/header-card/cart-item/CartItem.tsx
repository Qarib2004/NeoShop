import { PUBLIC_URL } from "@/config/url.config"
import { ICartItem } from "@/shared/types/cart.interface"
import { formatPriceAZE } from "@/utils/string/format-price"
import Image from "next/image"
import Link from "next/link"
import { CartActions } from "./CartActions"

interface CartItemProps{
    item:ICartItem
}




export function CartItem({item}:CartItemProps){
    return(
        <div className="flex items-center mb-5">
            <Link href={PUBLIC_URL.product(item.product.id)} className="relative h-28 w-28 rounded-md overflow-hidden">
                <Image className="object-cover" src={item.product.images[0]} alt={item.product.title} fill/>
            </Link>
            <div className="ml-6">
                <h2 className="font-medium line-clamp-1">{item.product.id}</h2>
                <p className="text-sm text-muted-foreground mt-1">{formatPriceAZE(item.product.price)}</p>
                <CartActions item={item}/>
            </div>
        </div>
    )
}