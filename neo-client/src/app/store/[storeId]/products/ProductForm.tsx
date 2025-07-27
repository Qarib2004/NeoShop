import { Trash } from 'lucide-react'
import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { Button } from '@/components/ui/Button'
import { Heading } from '@/components/ui/Heading'
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue
} from '@/components/ui/Select'
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

import { useCreateProduct } from '@/hooks/queries/products/useCreateProduct'
import { useDeleteProduct } from '@/hooks/queries/products/useDeleteProduct'
import { useUpdateProduct } from '@/hooks/queries/products/useUpdateProduct'

import { ICategory } from '@/shared/types/category.interface'
import { IColor } from '@/shared/types/color.interface'
import { IProduct, IProductInput } from '@/shared/types/product.interface'
import { Textarea } from '@/components/ui/Textarea'
import { ImageUpload } from '@/components/ui/form-element/image-upload/ImageUpload'

interface ProductFormProps {
	product?: IProduct
	categories: ICategory[]
	colors: IColor[]
}

export function ProductForm({ product, categories, colors }: ProductFormProps) {
	const { createProduct, isLoadingCreate } = useCreateProduct()
	const { updateProduct, isLoadingUpdate } = useUpdateProduct()
	const { deleteProduct, isLoadingDelete } = useDeleteProduct()

	const title = product ? 'Change data' : 'Create goods'
	const description = product
		? 'Change product data'
		: 'Add a new product to the store'
	const action = product ? 'Save' : 'Create'
	const form = useForm<IProductInput>({
		mode: 'onChange',
		values: product
			? {
					title: product.title,
					description: product.description,
					images: product.images,
					price: product.price,
					categoryId: product.category?.id ?? '',
					colorId: product.color?.id ?? ''
				}
			: {
					title: '',
					description: '',
					images: [],
					price: 0,
					categoryId: '',
					colorId: ''
				}
	})

	const onSubmit: SubmitHandler<IProductInput> = data => {
		data.price = Number(data.price)
		if (product) updateProduct(data)
		else createProduct(data)
	}

	return (
		<div className='max-w-4xl mx-auto p-6'>
			<div className='flex items-center justify-between mb-8'>
				<Heading title={title} description={description} />
				{product && (
					<ConfirmModal handleClick={() => deleteProduct()}>
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
						name='images'
						rules={{
							required: 'Dowloand minimum 1 image'
						}}
						render={({ field }) => (
							<FormItem className='mt-4'>
								<FormLabel className='text-sm font-medium text-gray-700'>
									Images
								</FormLabel>
								<FormControl>
									<ImageUpload isDisabled={isLoadingCreate || isLoadingUpdate} onChange={field.onChange} value={field.value}/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='title'
						rules={{
							required: 'Title required'
						}}
						render={({ field }) => (
							<FormItem>
								<FormLabel className='text-sm font-medium text-gray-700'>
									Title store:
								</FormLabel>
								<FormControl>
									<Input
										className='bg-transparent border-gray-300 focus:border-blue-500 focus:ring-blue-500'
										placeholder='Title store'
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
						name='price'
						rules={{
							required: 'Price required'
						}}
						render={({ field }) => (
							<FormItem>
								<FormLabel className='text-sm font-medium text-gray-700'>
									Price store:
								</FormLabel>
								<FormControl>
									<Input
										className='bg-transparent border-gray-300 focus:border-blue-500 focus:ring-blue-500'
										placeholder='Price'
										type='number'
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
						name='categoryId'
						rules={{
							required: 'Category required'
						}}
						render={({ field }) => (
							<FormItem>
								<FormLabel className='text-sm font-medium text-gray-700'>
									Category:
								</FormLabel>
								<Select
									disabled={
										isLoadingCreate || isLoadingUpdate
									}
									onValueChange={field.onChange}
									defaultValue={field.value}
								>
									<FormControl>
										<SelectTrigger className='border-gray-300 focus:border-blue-500 focus:ring-blue-500'>
											<SelectValue placeholder='Category of goods' />
										</SelectTrigger>
									</FormControl>
									<SelectContent className='bg-white border border-gray-200 rounded-md shadow-lg'>
										<SelectGroup>
											{categories.map(category => (
												<SelectItem
													value={category.id}
													key={category.id}
													className='hover:bg-gray-50 cursor-pointer px-3 py-2'
												>
													{category.title}
												</SelectItem>
											))}
										</SelectGroup>
									</SelectContent>
								</Select>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='colorId'
						rules={{
							required: 'Color required'
						}}
						render={({ field }) => (
							<FormItem>
								<FormLabel className='text-sm font-medium text-gray-700'>
									Color:
								</FormLabel>
								<Select
									disabled={
										isLoadingCreate || isLoadingUpdate
									}
									onValueChange={field.onChange}
									defaultValue={field.value}
								>
									<FormControl>
										<SelectTrigger className='border-gray-300 focus:border-blue-500 focus:ring-blue-500'>
											<SelectValue placeholder='Color of goods' />
										</SelectTrigger>
									</FormControl>
									<SelectContent className='bg-white border border-gray-200 rounded-md shadow-lg'>
										<SelectGroup>
											{colors.map(color => (
												<SelectItem
													value={color.id}
													key={color.id}
													className='hover:bg-gray-50 cursor-pointer px-3 py-2'
												>
													{color.name}
												</SelectItem>
											))}
										</SelectGroup>
									</SelectContent>
								</Select>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						rules={{required:"Description required"}}
						name='description'
						render={({ field }) => (
							<FormItem>
								<FormLabel className='text-sm font-medium text-gray-700'>
									Description:
								</FormLabel>
								<FormControl>
									<Textarea
										className='bg-transparent border-gray-300 focus:border-blue-500 focus:ring-blue-500 min-h-[100px] resize-vertical'
										placeholder='Description store'
										disabled={isLoadingCreate || isLoadingUpdate}
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