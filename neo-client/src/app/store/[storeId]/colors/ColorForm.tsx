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

import { useCreateColor } from '@/hooks/queries/colors/useCreateColor'
import { useUpdateColor } from '@/hooks/queries/colors/useUpdateColor'
import { useDeleteColor } from '@/hooks/queries/colors/useDeleteColor'
import { IColor, IColorInput } from '@/shared/types/color.interface'

interface ColorFormProps {
	color?: IColor
	
}

export function ColorForm({ color  }: ColorFormProps) {
	const { createColor, isLoadingCreate } = useCreateColor()
	const { updateColor, isLoadingUpdate } = useUpdateColor()
	const { deleteColor, isLoadingDelete } = useDeleteColor()

	const title = color ? 'Change data' : 'Create color'
	const description = color
		? 'Change color data'
		: 'Add a new color to the store'
	const action = color ? 'Save' : 'Create'
	const form = useForm<IColorInput>({
		mode: 'onChange',
		values: color
			? {
					name: color.name,
					value: color.value,
				}
			: {
					name: '',
					value: '',
					
				}
	})

	const onSubmit: SubmitHandler<IColorInput> = data => {
		if (color) updateColor({ id: color.id, data }) 
		else createColor(data)
	}
	
	  

	return (
		<div className='max-w-4xl mx-auto p-6'>
			<div className='flex items-center justify-between mb-8'>
				<Heading title={title} description={description} />
				{color && (
					<ConfirmModal handleClick={() => deleteColor(color.id)}>
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
						name='name'
						rules={{
							required: 'Name required'
						}}
						render={({ field }) => (
							<FormItem>
								<FormLabel className='text-sm font-medium text-gray-700'>
									Name color:
								</FormLabel>
								<FormControl>
									<Input
										className='bg-transparent border-gray-300 focus:border-blue-500 focus:ring-blue-500'
										placeholder='Name color'
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
						name='value'
						rules={{
							required: 'Value required'
						}}
						render={({ field }) => (
							<FormItem>
								<FormLabel className='text-sm font-medium text-gray-700'>
									Value color:
								</FormLabel>
								<FormControl>
									<Input
										className='bg-transparent border-gray-300 focus:border-blue-500 focus:ring-blue-500'
										placeholder='Value color'
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