import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { useParams, useRouter } from 'next/navigation'
import { categoryService } from '@/services/category.service'
import { STORE_URL } from '@/config/url.config'

export const useDeleteCategory = () => {
  const params = useParams<{ storeId: string ,categoryId:string}>()
  const queryClient = useQueryClient()
  const router = useRouter()

  const { mutate: deleteCategory, isPending: isLoadingDelete } = useMutation({
    mutationKey: ['delete category'],
    mutationFn: () =>
      categoryService.delete(params.categoryId),
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ['get categories for store dashboard']
      })
      toast.success('Category deleted')
      router.push(STORE_URL.categories(params.storeId))
    },
    onError() {
      toast.error('Error deleting category')
    }
  })

  return { deleteCategory, isLoadingDelete }
}
