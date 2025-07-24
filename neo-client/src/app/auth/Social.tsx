'use client'

import { useRouter } from 'next/navigation'
import React from 'react'
import { FcGoogle } from 'react-icons/fc'

import { Button } from '@/components/ui/Button'

import { SERVER_URL } from '@/config/api.config'

import styles from './Auth.module.css'

const Social = () => {
	const router = useRouter()
	return (
		<div>
			<Button
				className='w-full cursor-pointer'
				variant='outline'
				onClick={() => router.push(`${SERVER_URL}/auth/google`)}
			>
				<FcGoogle className='size-5 mr-2' />
				Continue through Google
			</Button>
		</div>
	)
}

export default Social
