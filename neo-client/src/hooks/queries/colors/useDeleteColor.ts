import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useParams, useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

import { STORE_URL } from '@/config/url.config'
import { colorService } from '@/services/color.service'

import { useMemo } from 'react'

export const useDeleteColor = () => {
  const params = useParams<{ storeId: string }>()
  const router = useRouter()
  const queryClient = useQueryClient()

  const { mutate: deleteColor, isPending: isLoadingDelete } = useMutation({
    mutationKey: ['delete color'],
    mutationFn: (colorId: string) => colorService.delete(colorId),
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ['get colors for store dashboard']
      })
      toast.success('Color deleted')
      // При необходимости можно сделать редирект или обновить страницу:
      router.push(STORE_URL.colors(params.storeId))
    },
    onError() {
      toast.error('Failed to delete color')
    }
  })

  return useMemo(() => ({
    deleteColor,
    isLoadingDelete
  }), [deleteColor, isLoadingDelete])
}
