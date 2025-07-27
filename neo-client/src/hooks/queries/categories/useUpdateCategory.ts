import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { useParams, useRouter } from 'next/navigation'
import { categoryService } from '@/services/category.service'
import { ICategoryInput } from '@/shared/types/category.interface'
import { STORE_URL } from '@/config/url.config'
import { useMemo } from 'react'

export const useUpdateCategory = () => {
  const params = useParams<{ categoryId: string }>()
  const router = useRouter()
  const queryClient = useQueryClient()

  const { mutate: updateCategory, isPending: isLoadingUpdate } = useMutation({
    mutationKey: ['update category'],
    mutationFn: (data: ICategoryInput) =>
      categoryService.update(params.categoryId, data),
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ['get categories for store dashboard']
      })
      toast.success('Category updated')
    },
    onError() {
      toast.error('Error updating category')
    }
  })

  return useMemo(() => ({
    updateCategory,
    isLoadingUpdate
  }), [updateCategory, isLoadingUpdate])
}
