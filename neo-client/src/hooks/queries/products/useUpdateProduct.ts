import { STORE_URL } from "@/config/url.config"
import { productService } from "@/services/product.service"
import { IProductInput } from "@/shared/types/product.interface"
import { QueryClient, useMutation, useQueryClient } from "@tanstack/react-query"
import { useParams, useRouter } from "next/navigation"
import { useMemo } from "react"
import toast from "react-hot-toast"










export const useUpdateProduct = () => {
    const params = useParams<{storeId:string}>()

    const router= useRouter()

    const queryClient = useQueryClient()


    const {mutate:updateProduct,isPending:isLoadingUpdate} = useMutation({
         mutationKey:['update product'],
         mutationFn:(data:IProductInput) => 
            productService.update(params.storeId,data),
         onSuccess(){
            queryClient.invalidateQueries({
                queryKey:['get products for store dashboard']
            })
            toast.success("Goods updated")
            router.push(STORE_URL.products(params.storeId))
         },
         onError(){
            toast.error("Error update goods")
         }
    })

    return useMemo(() => ({
        updateProduct,isLoadingUpdate
    }),[updateProduct,isLoadingUpdate])
}