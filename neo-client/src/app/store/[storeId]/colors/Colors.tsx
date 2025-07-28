'use client'

import { Plus } from 'lucide-react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import React from 'react'

import { Button } from '@/components/ui/Button'
import { Heading } from '@/components/ui/Heading'
import { DataTable } from '@/components/ui/data-table/DataTable'
import DataTableLoading from '@/components/ui/data-table/DataTableLoading'

import { STORE_URL } from '@/config/url.config'

import { useGetColors } from '@/hooks/queries/colors/useGetColors'


import { IColor } from '@/shared/types/color.interface'
import { formateDate } from '@/utils/date/format-date'
import { colorColumns } from './ColorColumns'

export function Colors() {
	const params = useParams<{ storeId: string }>()
	const { colors, isLoading } = useGetColors()

	const formattedColors: IColor[] = colors
		? colors.map(color => ({
				id: color.id,
				createdAt:formateDate(color.createdAt),
				name:color.name,
				value:color.value,
				storeId:color.storeId
				
			}))
		: []


		console.log('Colors from useQuery:', colors)
      

	return (
		<div className='max-w-7xl mx-auto p-6 space-y-8'>
			{isLoading ? (
				<DataTableLoading />
			) : (
				<>
					<div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-gray-200'>
						<Heading
							title={`Colors (${colors?.length})`}
							description='All goods our store'
						/>
						<div className='flex gap-3'>
							<Link
								href={STORE_URL.colorCreate(params.storeId)}
								className='inline-block'
							>
								<Button
									variant='primary'
									className='flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium shadow-sm'
								>
									<Plus className='w-4 h-4' />
									Create
								</Button>
							</Link>
						</div>
					</div>

					<div className='bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden'>
						<DataTable
							columns={colorColumns}
							data={formattedColors}
							filterKey='name'
						/>
					</div>
				</>
			)}
		</div>
	)
}
