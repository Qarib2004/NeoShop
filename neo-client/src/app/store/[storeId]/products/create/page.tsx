import { NO_INDEX_PAGE } from '@/constants/seo.constants'
import { Metadata } from 'next'
import React from 'react'
import { CreateProduct } from './CreateProduct'


export const metadata:Metadata = {
    title:"Create goods",
    ...NO_INDEX_PAGE
}

export default function CreateProductPage(){
  return (
    <CreateProduct/>
  )
}

