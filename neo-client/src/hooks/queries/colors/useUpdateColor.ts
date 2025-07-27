import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useParams, useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

import { STORE_URL } from '@/config/url.config'
import { colorService } from '@/services/color.service'

import { IColorInput } from '@/shared/types/color.interface'
import { useMemo } from 'react'

export const useUpdateColor = () => {
  const params = useParams<{ storeId: string }>()
  const router = useRouter()
  const queryClient = useQueryClient()

  const { mutate: updateColor, isPending: isLoadingUpdate } = useMutation({
    mutationKey: ['update color'],
    mutationFn: ({ id, data }: { id: string; data: IColorInput }) =>
      colorService.update(id, data),
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ['get colors for store dashboard']
      })
      toast.success('Color updated')
      router.push(STORE_URL.colors(params.storeId))
    },
    onError() {
      toast.error('Failed to update color')
    }
  })

  return useMemo(() => ({
    updateColor,
    isLoadingUpdate
  }), [updateColor, isLoadingUpdate])
}
