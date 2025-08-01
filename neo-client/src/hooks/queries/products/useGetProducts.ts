import { productService } from "@/services/product.service"
import { QueryClient, useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useParams, useRouter } from "next/navigation"
import { useMemo } from "react"










export const useGetProduct = () => {
    const params = useParams<{storeId:string}>()

    const {data:products,isLoading} = useQuery({
        queryKey:['get products for store dashboard'],
        queryFn:() => productService.getByStoreId(params.storeId)
    })

    return useMemo(() => ({
        products,isLoading
    }),[products,isLoading])
}