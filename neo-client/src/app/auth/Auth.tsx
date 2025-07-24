'use client'

import Image from 'next/image'
import React, { useState } from 'react'

import { Button } from '@/components/ui/Button'
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle
} from '@/components/ui/Card'
import { Form } from '@/components/ui/form-element/Form'

import styles from './Auth.module.css'
import { AuthFields } from './AuthFields'
import Social from './Social'
import { useAuthForm } from './useAuthForm'

const Auth = () => {
	const [isReg, setIsReg] = useState(false)

	const { onSubmit, form, isPending } = useAuthForm(isReg)

	return (
		<div className='min-h-screen border-none grid grid-cols-1 lg:grid-cols-2'>
			<div className='h-full bg-blue-200 hidden lg:flex items-center justify-center'>
				<Image
					src='/images/auth.svg'
					alt='img'
					width={100}
					height={100}
				/>
			</div>
			<div className='h-full flex flex-col items-center justify-center border-none'>
				<Card className='p-6 border-none flex flex-col items-center justify-center w-[400px]'>
					<CardHeader className='text-center p-5 w-2xs'>
						<CardTitle className='pb-1 text-3xl font-bold'>
							{isReg ? 'Register' : 'Login'}
						</CardTitle>
						<CardDescription className='flex flex-col items-center justify-center text-center'>
							Login or create an account to make purchases!
						</CardDescription>
					</CardHeader>
					<CardContent className='p-0 w-full flex flex-col gap-y-4'>
						<Form {...form}>
							<form
								className='flex flex-col gap-y-3'
								onSubmit={form.handleSubmit(onSubmit)}
							>
								<AuthFields
									form={form}
									isPending={isPending}
									isReg={isReg}
								/>
								<Button
									variant='green'
									className='cursor-pointer'
									disabled={isPending}
									type='submit'
								>
									Continue
								</Button>
							</form>
						</Form>
						<Social />
					</CardContent>
					<CardFooter className='p-0 mt-4 text-sm text-muted-foreground flex items-center justify-center'>
						<span className='flex gap-3'>
							{isReg ? 'There is an account?' : 'No account yet?'}
						</span>
						<Button
							variant='link'
							type='button'
							className='ml-2 p-0 h-auto text-blue-500 hover:underline'
							onClick={() => setIsReg(!isReg)}
						>
							{isReg ? 'Login' : 'Create account'}
						</Button>
					</CardFooter>
				</Card>
			</div>
		</div>
	)
}

export default Auth
