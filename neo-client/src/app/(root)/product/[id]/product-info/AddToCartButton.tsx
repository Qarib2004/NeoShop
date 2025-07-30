import { Button } from '@/components/ui/Button'

import { useAction } from '@/hooks/useAction'
import { useCart } from '@/hooks/useCart'

import { IProduct } from '@/shared/types/product.interface'

interface AddToCartButtonProps {
	product: IProduct
}

export function AddToCartButton({ product }: AddToCartButtonProps) {
	const { addToCart, removeFromCart } = useAction()
	const { items } = useCart()

	const currentElement = items.find(
		cartItem => cartItem.product.id === product.id
	)

	return (
		<Button
			variant='primary'
			size='lg'
			className='w-full bg-blue-400 text-white'
            onClick={() => currentElement ? removeFromCart({id:currentElement.id}) :
        addToCart({product,quantity:1,price:product.price})}
		>
            {currentElement ? "Remove from basket" : "Add to basket"}
        </Button>
	)
}
