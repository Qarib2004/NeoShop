import { reviewService } from "@/services/review.service"
import { IReview } from "@/shared/types/review.interface"
import { useQuery } from "@tanstack/react-query"
import { useParams } from "next/navigation"
import { useMemo } from "react"





export const useGetReviews = () => {
	const params = useParams<{ storeId: string }>()

	const storeId = params?.storeId

	const { data: reviews, isLoading } = useQuery<IReview[]>({
		queryKey: ['get reviews for store dashboard', storeId],
		queryFn: () => reviewService.getByStoreId(storeId),
		enabled: !!storeId // важный момент!
	})

	return useMemo(
		() => ({
			reviews,
			isLoading
		}),
		[reviews, isLoading]
	)
}
