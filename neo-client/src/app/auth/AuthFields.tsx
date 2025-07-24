import { UseFormReturn } from 'react-hook-form'

import {
	FormControl,
	FormField,
	FormItem,
	FormMessage
} from '@/components/ui/form-element/Form'
import { Input } from '@/components/ui/form-element/Input'

import { validEmail } from '@/shared/regex'
import { IAuthForm } from '@/shared/types/auth.interface'

interface AuthFieldsProps {
	form: UseFormReturn<IAuthForm, any, IAuthForm>
	isPending: boolean
	isReg?: boolean
}

export function AuthFields({
	form,
	isPending,
	isReg = false
}: AuthFieldsProps) {
	return (
		<div className='flex flex-col gap-y-4'>
			{isReg && (
				<FormField
					control={form.control}
					name='name'
					rules={{
						required: 'Name required'
					}}
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<Input
									className='bg-transparent'
									placeholder='name'
									disabled={isPending}
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
			)}

			<FormField
				control={form.control}
				name='email'
				rules={{
					required: 'Email required',
					pattern: {
						value: validEmail,
						message: 'Enter valid email'
					}
				}}
				render={({ field }) => (
					<FormItem>
						<FormControl>
							<Input
								className='bg-transparent'
								placeholder='email'
								disabled={isPending}
								{...field}
							/>
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>

			<FormField
				control={form.control}
				name='password'
				rules={{
					required: 'Password required',
					minLength: {
						value: 6,
						message: 'Min 6 symbols'
					}
				}}
				render={({ field }) => (
					<FormItem>
						<FormControl>
							<Input
								className='bg-transparent'
								placeholder='******'
								disabled={isPending}
								{...field}
								type='password'
							/>
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>
		</div>
	)
}
