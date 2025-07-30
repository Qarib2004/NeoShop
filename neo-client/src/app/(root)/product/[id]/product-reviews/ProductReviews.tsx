import { Button } from "@/components/ui/Button"
import { ConfirmModal } from "@/components/ui/modals/ConfirmModal"
import { ReviewModal } from "@/components/ui/modals/ReviewModal"
import { useDeleteReview } from "@/hooks/queries/reviews/useDeleteReview"
import { useProfile } from "@/hooks/useProfile"
import { IProduct } from "@/shared/types/product.interface"
import { Plus, Trash } from "lucide-react"
import Image from "next/image"
import { Rating } from "react-simple-star-rating"

interface ProductReviewProps{
    product:IProduct
}



export function ProductReview({product} : ProductReviewProps){
    const {user} = useProfile()

    const {deleteReview} = useDeleteReview()
    return (
        <>
        <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Reviews</h1>
            {user && (
                <ReviewModal storeId={product?.storeId || ""}>
                    <Button variant='ghost'>
                        <Plus className="size-4 mr-2"/>
                        Add reviews
                    </Button>
                </ReviewModal>
            )}
        </div>
        <div className="grid sm:grid-cols-2  md:grid-cols-2 lg:grid-cols-4 gap-8 mt-4">
            {product.reviews.length ?(
               product.reviews.map(review => (
                <div key={review.id} className="border rounded-lg p-4">
                    <div className="flex justify-between">
                        <div className="flex  items-center gap-x-4 font-medium">
                            <Image 
                            className="rounded-full"
                            src={review.user.picture?.trimEnd() || ""}
                            alt={review.user.name}
                            width={40}
                            height={40}/>
                            {review.user.name}
                        </div>
                        {review.user.id === user?.id && (
                            <ConfirmModal handleClick={() =>deleteReview(review.id)}>
                                <button className="mt-3 text-red-500">
                                    <Trash className="size-5 cursor-pointer"/>
                                </button>
                            </ConfirmModal>
                        )}
                    </div>
                    <Rating readonly initialValue={review.rating} SVGstyle={{display:"inline-block"}} size={18} allowFraction transition/>
                    <div className="text-sm text-muted-foreground mt-1">{review.text}</div>
                </div> 
               ))
            ) : (
                <div className="mt-4">
                    Such a product has no review
                </div>
            )}
        </div>
        </>
    )
}