'use client'
import { LogOut } from 'lucide-react'
import Link from 'next/link'
import { use } from 'react'

import { Button } from '@/components/ui/Button'
import { Loader } from '@/components/ui/Loader'

import { DASHBOARD_URL, PUBLIC_URL, STORE_URL } from '@/config/url.config'

import { useProfile } from '@/hooks/useProfile'

import { HeaderCard } from './header-card/HeaderCard'
import { CreateStoreModal } from '@/components/ui/modals/CreateStoreModal'
import Image from 'next/image'

export function HeaderMenu() {
	const { user, isLoading } = useProfile()

	return (
		<div className='hidden items-center gap-x-2 ml-auto lg:flex'>
			<HeaderCard />
			<Link href={PUBLIC_URL.explorer()}>
				<Button variant='ghost' className='cursor-pointer'>Catalog</Button>
			</Link>
			{isLoading ? (
				<Loader size='sm' />
			) : user ? (
				<>
					<Link href={DASHBOARD_URL.favorites()}>
						<Button variant='ghost' className='cursor-pointer'>
							Favorites
						</Button>
					</Link>
					{user.stores.length ? (
						<Link href={STORE_URL.home(user.stores[0].id)}>
							<Button variant='ghost' className='cursor-pointer'>
								My stores
							</Button>
						</Link>
					) : (
						<CreateStoreModal>
                            <Button variant='ghost' className='cursor-pointer'>Create store</Button>
                        </CreateStoreModal>
					)}
                    <Link href={DASHBOARD_URL.home()}>
                        <Image src={user.picture?.trimEnd() || ""} alt={user.name} width={42} height={42} className='rounded-full'/>
                    </Link>
				</>
			) : (
				<Link href={PUBLIC_URL.auth()}>
					<Button variant='primary' className='cursor-pointer'>
						<LogOut className='size-4 mr-2' /> Enter
					</Button>
				</Link>
			)}
		</div>
	)
}
