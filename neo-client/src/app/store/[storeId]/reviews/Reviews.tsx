'use client'
import { useParams } from 'next/navigation'
import React from 'react'
import { Heading } from '@/components/ui/Heading'
import { DataTable } from '@/components/ui/data-table/DataTable'
import DataTableLoading from '@/components/ui/data-table/DataTableLoading'
import { useGetReviews } from '@/hooks/queries/reviews/useGetReviews'
import { formateDate } from '@/utils/date/format-date'
import { IReviewColumn, reviewColumns } from './ReviewColumn'

export function Reviews() {
	const params = useParams<{ storeId: string }>()
	const { reviews, isLoading } = useGetReviews()

	const formattedReviews: IReviewColumn[] = reviews
	? reviews.map((review): IReviewColumn => ({
		id: review.id,
		createdAt: formateDate(review.createdAt),
		rating: '⭐'.repeat(review.rating),
		username: review.user.name,
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
							title={`Reviews (${reviews?.length})`}
							description='All reviews our store'
						/>
					</div>

					<div className='bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden'>
						<DataTable
							columns={reviewColumns}
							data={formattedReviews}
						/>
					</div>
				</>
			)}
		</div>
	)
}
