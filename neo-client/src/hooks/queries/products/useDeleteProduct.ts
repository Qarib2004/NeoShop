import { STORE_URL } from "@/config/url.config"
import { productService } from "@/services/product.service"
import { IProductInput } from "@/shared/types/product.interface"
import { QueryClient, useMutation, useQueryClient } from "@tanstack/react-query"
import { useParams, useRouter } from "next/navigation"
import { useMemo } from "react"
import toast from "react-hot-toast"










export const useDeleteProduct = () => {
    const params = useParams<{ storeId: string }>()
    const router = useRouter()
    const queryClient = useQueryClient()
  
    const { mutate: deleteProduct, isPending: isLoadingDelete } = useMutation({
      mutationKey: ['delete product'],
      mutationFn: (productId: string) => 
        productService.delete(productId),
      onSuccess() {
        queryClient.invalidateQueries({
          queryKey: ['get products for store dashboard']
        })
        toast.success("Goods deleted")
        router.push(STORE_URL.products(params.storeId))
      },
      onError() {
        toast.error("Error delete goods")
      }
    })
  
    return useMemo(() => ({
      deleteProduct, isLoadingDelete
    }), [deleteProduct, isLoadingDelete])
  }
  