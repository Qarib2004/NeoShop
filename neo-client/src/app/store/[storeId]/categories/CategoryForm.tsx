import { Trash } from 'lucide-react'
import React, { FC } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { Button } from '@/components/ui/Button'
import { Heading } from '@/components/ui/Heading'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from '@/components/ui/form-element/Form'
import { Input } from '@/components/ui/form-element/Input'
import { ConfirmModal } from '@/components/ui/modals/ConfirmModal'

import { useCreateCategory } from '@/hooks/queries/categories/useCreateCategory'
import { useDeleteCategory } from '@/hooks/queries/categories/useDeleteCategory'
import { useUpdateCategory } from '@/hooks/queries/categories/useUpdateCategory'

import { ICategory, ICategoryInput } from '@/shared/types/category.interface'
import { Textarea } from '@/components/ui/Textarea'

interface ICategoryForm {
	category?: ICategory | null
}
export function CategoryForm({ category }: ICategoryForm) {
	const { createCategory, isLoadingCreate } = useCreateCategory()
	const { updateCategory, isLoadingUpdate } = useUpdateCategory()
	const { deleteCategory, isLoadingDelete } = useDeleteCategory()

	const title = category ? 'Change data' : 'Create category'
	const description = category
		? 'Change category data'
		: 'Add a new category to the store'
	const action = category ? 'Save' : 'Create'

	const form = useForm<ICategoryInput>({
		mode: 'onChange',
		values: category || {
			title: '',
			description: ''
		}
	})

	const onSubmit: SubmitHandler<ICategoryInput> = data => {
		if (category) updateCategory(data)
		else createCategory(data)
	}

	return (
		<div className='max-w-4xl mx-auto p-6'>
			<div className='flex items-center justify-between mb-8'>
				<Heading title={title} description={description} />
				{category && (
					<ConfirmModal
						handleClick={() => deleteCategory()}
					>
						<Button
							size='icon'
							variant='primary'
							disabled={isLoadingDelete}
							className='h-10 w-10'
						>
							<Trash className='h-4 w-4' />
						</Button>
					</ConfirmModal>
				)}
			</div>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className='space-y-6'
				>
					<FormField
						control={form.control}
						name='title'
						rules={{
							required: 'Title required'
						}}
						render={({ field }) => (
							<FormItem>
								<FormLabel className='text-sm font-medium text-gray-700'>
									Title category:
								</FormLabel>
								<FormControl>
									<Input
										className='bg-transparent border-gray-300 focus:border-blue-500 focus:ring-blue-500'
										placeholder='Title category'
										disabled={
											isLoadingCreate || isLoadingUpdate
										}
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
						rules={{
							required: 'Description required'
						}}
						render={({ field }) => (
							<FormItem>
								<FormLabel className='text-sm font-medium text-gray-700'>
									Description category:
								</FormLabel>
								<FormControl>
									<Textarea
										className='bg-transparent border-gray-300 focus:border-blue-500 focus:ring-blue-500'
										placeholder='Value category'
										disabled={
											isLoadingCreate || isLoadingUpdate
										}
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<Button
						variant='primary'
						disabled={isLoadingCreate || isLoadingUpdate}
						className='w-full sm:w-auto px-8 py-2 mt-6'
					>
						{action}
					</Button>
				</form>
			</Form>
		</div>
	)
}
