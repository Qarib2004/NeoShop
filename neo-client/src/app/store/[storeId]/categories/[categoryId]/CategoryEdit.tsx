'use client'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import React from 'react'
import { colorService } from '@/services/color.service'
import { CategoryForm } from '../CategoryForm'
import { categoryService } from '@/services/category.service'

export function CategoryEdit(){
    const params = useParams<{categoryId:string}>()

    const {data} = useQuery({
        queryKey:['get color'],
        queryFn:() => categoryService.getById(params.categoryId)
    })


    


  return (
    <CategoryForm category={data}/>
  )
}

