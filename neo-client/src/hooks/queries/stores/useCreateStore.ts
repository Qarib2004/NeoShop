import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useMemo } from 'react'
import toast from 'react-hot-toast'

import { STORE_URL } from '@/config/url.config'

import { storeService } from '@/services/store.service'

import { IStoreCreated } from '@/shared/types/store.interface'

export function useCreateStore() {
	const router = useRouter()

	const queryClient = useQueryClient()

	const { mutate: createStore, isPending: isLoadingCreate } = useMutation({
		mutationKey: ['create store'],
		mutationFn: (data: IStoreCreated) => storeService.create(data),
		onSuccess(store) {
			queryClient.invalidateQueries({
				queryKey: ['profile']
			})
			toast.success('Store created')
			router.push(STORE_URL.home(store.id))
		},
		onError() {
			toast.error('Error created store')
		}
	})

	return useMemo(
		() => ({ createStore, isLoadingCreate }),
		[createStore, isLoadingCreate]
	)
}
