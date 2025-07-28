'use client'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import React from 'react'
import { ColorForm } from '../ColorForm'
import { colorService } from '@/services/color.service'

export function ColorEdit(){
    const params = useParams<{colorId:string}>()

    const {data} = useQuery({
        queryKey:['get color'],
        queryFn:() => colorService.getById(params.colorId)
    })


    


  return (
    <ColorForm color={data}/>
  )
}

