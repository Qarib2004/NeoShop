import { useQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import { categoryService } from '@/services/category.service'
import { useMemo } from 'react'

export const useGetCategories = () => {
  const params = useParams<{ storeId: string }>()

  const { data: categories, isLoading,  } = useQuery(
   {queryKey: ['get categories for store dashboard'],
    queryFn:() => categoryService.getStoredById(params.storeId)
   }
  )

  return useMemo(() => ({
    categories,
    isLoading,
    
  }), [categories, isLoading])
}
