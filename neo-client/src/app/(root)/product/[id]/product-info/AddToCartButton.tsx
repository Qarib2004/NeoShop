import { Button } from "@/components/ui/Button"
import { IProduct } from "@/shared/types/product.interface"

interface AddToCartButtonProps{
product:IProduct
}




export function AddToCartButton({} : AddToCartButtonProps){
    return <Button variant='primary' size='lg' className="w-full bg-blue-400 text-white">
        Add to cart
    </Button>
}