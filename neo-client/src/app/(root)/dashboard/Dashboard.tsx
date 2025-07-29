'use client'

import { useMutation } from '@tanstack/react-query'
import { LogOut } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect } from 'react'

import { Button } from '@/components/ui/Button'
import { DataTable } from '@/components/ui/data-table/DataTable'

import { useProfile } from '@/hooks/useProfile'

import { saveTokenStorage } from '@/services/auth/auth-token.service'
import { authService } from '@/services/auth/auth.service'

import { EnumOrderStatus } from '@/shared/types/order.interface'

import { formateDate } from '@/utils/date/format-date'
import { formatPriceAZE } from '@/utils/string/format-price'

import { IOrderColumn, orderColumns } from './OrderColumns'

const Dashboard = () => {
	const router = useRouter()
	const searchParams = useSearchParams()
	const { user } = useProfile()

	useEffect(() => {
		const accessToken = searchParams.get('accessToken')

		if (accessToken) saveTokenStorage(accessToken)
	}, [searchParams])

	const { mutate: logout } = useMutation({
		mutationKey: ['logout'],
		mutationFn: () => authService.logout(),
		onSuccess: () => router.push('/auth')
	})

	if (!user) return null

	const formattedOrders: IOrderColumn[] = user.orders.map(order => ({
		createdAt: formateDate(order.createdAt),
		status:
			order.status === EnumOrderStatus.PENDING ? 'Pending' : 'Completed',
		total: formatPriceAZE(order.total)
	}))

	return (
		<div className='my-6'>
			<div className='flex items-center justify-between mb-4'>
				<h1 className='text-2xl  font-bold'>Your orders</h1>
				<Button variant='ghost' onClick={() => logout()}>
					<LogOut className='size-4 mr-2' />
					Exit
				</Button>
			</div>
			<DataTable columns={orderColumns} data={formattedOrders} />
		</div>
	)
}

export default Dashboard
