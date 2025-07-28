'use client'

import { ImagePlus } from 'lucide-react'
import Image from 'next/image'

import { cn } from '@/utils/clsx'

import { Button } from '../../Button'

import { useUpload } from './useUpload'
import { useState } from 'react'

interface ImageUploadProps {
	isDisabled: boolean
	onChange: (value: string[]) => void
	value: string[]
}

export function ImageUpload({ isDisabled, onChange, value }: ImageUploadProps) {
	const { handleButtonClick, isUploading, fileInputRef, handleFileChange } =
		useUpload(onChange)

		const [images, setImages] = useState<string[]>([])

	return (
		<div>
			<div className='grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-4'>
				{value.map(url => (
					<div
						key={url}
						className='relative w-[200px] h-[200px] rounded-md overflow-hidden'
					>
						<Image
							className='object-cover'
							src={url}
							alt='image'
							fill
							sizes="200px"
						/>
					</div>
				))}
			</div>
			<Button
				type='button'
				disabled={isDisabled || isUploading}
				variant='secondary'
				onClick={handleButtonClick}
				className={cn('', { 'mt-4': value.length })}
			>
				<ImagePlus className='size-4 mr-2' />
				Upload image
			</Button>
			<input
				type='file'
				multiple
				className='hidden'
				ref={fileInputRef}
				onChange={handleFileChange}
				disabled={isDisabled}
			/>
		</div>
	)
}
