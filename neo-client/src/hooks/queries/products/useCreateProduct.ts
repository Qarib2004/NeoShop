import { STORE_URL } from "@/config/url.config"
import { productService } from "@/services/product.service"
import { IProductInput } from "@/shared/types/product.interface"
import { QueryClient, useMutation, useQueryClient } from "@tanstack/react-query"
import { useParams, useRouter } from "next/navigation"
import { useMemo } from "react"
import toast from "react-hot-toast"










export const useCreateProduct = () => {
    const params = useParams<{storeId:string}>()

    const router= useRouter()

    const queryClient = useQueryClient()


    const {mutate:createProduct,isPending:isLoadingCreate} = useMutation({
         mutationKey:['create product'],
         mutationFn:(data:IProductInput) => 
            productService.create(data,params.storeId),
         onSuccess(){
            queryClient.invalidateQueries({
                queryKey:['get products for store dashboard']
            })
            toast.success("Goods created")
            router.push(STORE_URL.products(params.storeId))
         },
         onError(){
            toast.error("Error create goods")
         }
    })

    return useMemo(() => ({
        createProduct,isLoadingCreate
    }),[createProduct,isLoadingCreate])
}