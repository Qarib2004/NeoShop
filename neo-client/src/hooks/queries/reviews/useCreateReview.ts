import { reviewService } from "@/services/review.service"
import { IReviewInput } from "@/shared/types/review.interface"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useParams } from "next/navigation"
import { useMemo } from "react"
import toast from "react-hot-toast"



export const useCreateReview = (storeId:string) => {
    const params = useParams<{id:string}>()

    const queryClient = useQueryClient()


    const {mutate:createReview,isPending:isLoadingCreate} = useMutation({
        mutationKey:['create review'],
        mutationFn:(data:IReviewInput) => reviewService.create(data,params.id,storeId),
        onSuccess(){
            queryClient.invalidateQueries({
                queryKey:['product']
            })
            toast.success("Review created")
        },
        onError(){
            toast.error("Error created review")
        }

    })

    return useMemo(() =>({createReview,isLoadingCreate}),[createReview,isLoadingCreate] )
}