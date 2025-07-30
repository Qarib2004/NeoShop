import { Button } from "@/components/ui/Button";
import { Heading } from "@/components/ui/Heading";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/Sheet";
import { useCart } from "@/hooks/useCart";
import { formatPriceAZE } from "@/utils/string/format-price";
import { CartItem } from "./cart-item/CartItem";
import { useRouter } from "next/navigation";
import { useCheckout } from "./cart-item/useCheckout";
import { useProfile } from "@/hooks/useProfile";
import { PUBLIC_URL } from "@/config/url.config";




export function HeaderCard(){
    const router = useRouter()
    const {createPayment,isLoadingCreate} = useCheckout()
    const {user} = useProfile()
    const {items,total} = useCart()

    const handleClick = () => {
        user ? createPayment() : router.push(PUBLIC_URL.auth())
    }
    return <Sheet>
        <SheetTrigger asChild>
            <Button variant='ghost' className='cursor-pointer'>Basket</Button>
        </SheetTrigger>
        <SheetContent className="h-full flex flex-col">
            <Heading title="Basket of goods" className="text-xl" />
            <div className="h-full flex flex-col">
                {items.length ? (
                    items.map(item => (
                        <CartItem  item={item} key={item.id}/>
                    ))
                ):(
                    <div className="text-sm text-muted-foreground">The basket is empty!</div>
                )}
            </div>
            {items.length ? (
                <>
                <div className="text-lg font-medium">
                    Total for payment:{formatPriceAZE(total)}
                </div>
                <Button className="w-full" onClick={handleClick} variant='primary' disabled={isLoadingCreate}>
                    Go to payment
                </Button>
                </>
            ):null}
        </SheetContent>
    </Sheet>
}