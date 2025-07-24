import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useParams, useRouter } from 'next/navigation'
import { useMemo } from 'react'
import toast from 'react-hot-toast'

import { PUBLIC_URL, STORE_URL } from '@/config/url.config'

import { storeService } from '@/services/store.service'

import { IStoreCreated } from '@/shared/types/store.interface'

export function useDeleteStore() {
	const router = useRouter()

    const params = useParams<{storeId:string}>()


	const { mutate: deleteStore, isPending: isLoadingDelete } = useMutation({
		mutationKey: ['delete store'],
		mutationFn: () => storeService.delete(params.storeId),
		onSuccess() {
		
			toast.success('Store deleted'),
            router.push(PUBLIC_URL.home())
		},
		onError() {
			toast.error('Error deleted store')
		}
	})

	return useMemo(
		() => ({ deleteStore, isLoadingDelete }),
		[deleteStore, isLoadingDelete]
	)
}
