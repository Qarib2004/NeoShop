'use client'
import React from 'react'

import { useUpdateStore } from '@/hooks/queries/stores/useUpdateStore'
import { useDeleteStore } from '@/hooks/queries/stores/useDeleteStore'
import { SubmitHandler, useForm } from 'react-hook-form'
import { IStoreEdit } from '@/shared/types/store.interface'
import { Heading } from '@/components/ui/Heading'
import { ConfirmModal } from '@/components/ui/modals/ConfirmModal'
import { Button } from '@/components/ui/Button'
import { Trash } from 'lucide-react'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form-element/Form'
import { Input } from '@/components/ui/form-element/Input'
import { Textarea } from '@/components/ui/Textarea'

export function Setting() {
	const { store, updateStore, isLoadingUpdate } = useUpdateStore()
	const { deleteStore, isLoadingDelete } = useDeleteStore()

	const form = useForm<IStoreEdit>({
		mode: 'onChange',
		values: {
			title: store?.title || '',
			description: store?.description || '',
		},
	})

	const onSubmit: SubmitHandler<IStoreEdit> = data => {
		updateStore(data)
	}

	return (
		<div className='p-6'>
			<div className='flex justify-between items-center'>
				<Heading title='Settings' description='Rule settings store' />
				<ConfirmModal handleClick={() => deleteStore()}>
					<Button className='flex items-center gap-x-4' size='icon' variant='primary' disabled={isLoadingDelete}>
						<Trash className='size-4' />
					</Button>
				</ConfirmModal>
			</div>

			<Form  {...form}>
	<form
		onSubmit={form.handleSubmit(onSubmit)}
		className='flex flex-col gap-4 mt-4'
	>
		<FormField
			control={form.control}
			name='title'
			rules={{ required: 'Title required' }}
			render={({ field }) => (
				<FormItem>
					<FormLabel>Title</FormLabel>
					<FormControl>
						<Input
							className='bg-transparent'
							placeholder='Title store'
							disabled={isLoadingUpdate}
							{...field}
						/>
					</FormControl>
					<FormMessage />
				</FormItem>
			)}
		/>

		<FormField
			control={form.control}
			name='description'
			render={({ field }) => (
				<FormItem>
					<FormLabel>Description</FormLabel>
					<FormControl>
						<Textarea
							className='bg-transparent'
							placeholder='Description store'
							disabled={isLoadingUpdate}
							{...field}
						/>
					</FormControl>
					<FormMessage />
				</FormItem>
			)}
		/>

		<Button className='bg-blue-200 w-20 ' variant='primary' disabled={isLoadingUpdate}>
			Save
		</Button>
	</form>
</Form>

		</div>
	)
}
