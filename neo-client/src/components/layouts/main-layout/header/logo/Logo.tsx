import { PUBLIC_URL } from '@/config/url.config'
import { SITE_NAME } from '@/constants/seo.constants'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Logo = () => {
	return (
		<Link href={PUBLIC_URL.home()} className='flex items-center gap-x-3 hover:opacity-75 transition-opacity'>
			<Image src='/images/logo.svg' alt={SITE_NAME} width={35} height={35}/>
            <div className='text-2xl font-bold text-blue-600'>
                    {SITE_NAME} 
            </div>
		</Link>
	)
}

export default Logo
