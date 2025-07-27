import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useParams, useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

import { categoryService } from '@/services/category.service'
import { ICategoryInput } from '@/shared/types/category.interface'
import { STORE_URL } from '@/config/url.config'
import { useMemo } from 'react'

export const useCreateCategory = () => {
  const params = useParams<{ storeId: string }>()
  const router = useRouter()
  const queryClient = useQueryClient()

  const { mutate: createCategory, isPending: isLoadingCreate } = useMutation({
    mutationKey: ['create category'],
    mutationFn: (data: ICategoryInput) =>
      categoryService.create(data, params.storeId),
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ['get categories for store dashboard']
      })
      toast.success('Category created')
      router.push(STORE_URL.categories(params.storeId))
    },
    onError() {
      toast.error('Error creating category')
    }
  })

  return useMemo(() => ({
    createCategory,
    isLoadingCreate
  }), [createCategory, isLoadingCreate])
}
