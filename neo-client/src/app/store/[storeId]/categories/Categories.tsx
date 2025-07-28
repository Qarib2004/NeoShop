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

import { useGetCategories } from '@/hooks/queries/categories/useGetCategories'


import { formateDate } from '@/utils/date/format-date'
import { ICategoryColumn,categoryColumns } from './CategoryColumn'

export function Categories() {
	const params = useParams<{ storeId: string }>()
	const { categories, isLoading } = useGetCategories()

	const formattedCategories: ICategoryColumn[] = categories
		? categories.map(category => ({
				id: category.id,
				createdAt:formateDate(category.createdAt),
				title:category.title,
				description:category.description,
				storeId:category.storeId
				
			}))
		: []


      

	return (
		<div className='max-w-7xl mx-auto p-6 space-y-8'>
			{isLoading ? (
				<DataTableLoading />
			) : (
				<>
					<div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-gray-200'>
						<Heading
							title={`Categories (${categories?.length})`}
							description='All goods our store'
						/>
						<div className='flex gap-3'>
							<Link
								href={STORE_URL.categoryCreate(params.storeId)}
								className='inline-block'
							>
								<Button
									variant='primary'
									className='flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-categories font-medium shadow-sm'
								>
									<Plus className='w-4 h-4' />
									Create
								</Button>
							</Link>
						</div>
					</div>

					<div className='bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden'>
						<DataTable
							columns={categoryColumns}
							data={formattedCategories}
							filterKey='title'
						/>
					</div>
				</>
			)}
		</div>
	)
}
