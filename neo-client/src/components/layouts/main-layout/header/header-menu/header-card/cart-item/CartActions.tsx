import { Button } from "@/components/ui/Button"
import { useAction } from "@/hooks/useAction"
import { useCart } from "@/hooks/useCart"
import { ICartItem } from "@/shared/types/cart.interface"
import { Minus, Plus } from "lucide-react"

interface CartActionsProps{
    item:ICartItem
}




export function CartActions({item}:CartActionsProps){
    const {changeQuantity} = useAction()
    const {items} = useCart()
    const quantity = items.find(cartItem => cartItem.id === item.id)?.quantity
    return (
        <div className="flex items-center mt-1">
            <Button className="size-7" onClick={() => changeQuantity({id:item.id,type:'minus'})}
            variant='ghost' size='icon' disabled={quantity === 1}>
                <Minus className="size-4"/>
            </Button>

            <input className="w-10 text-center text-sm"  disabled readOnly value={quantity}/>

            <Button className="size-7" onClick={() => changeQuantity({id:item.id,type:"plus"})} variant='ghost' size='icon'>
                <Plus className="size-4"/>
            </Button>
        </div>
    )
}