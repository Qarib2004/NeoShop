import { NO_INDEX_PAGE } from '@/constants/seo.constants'
import { Metadata } from 'next'
import React from 'react'
import { ProductEdit } from './ProductEdit'



export const metadata:Metadata = {
    title:"Settings goods",
    ...NO_INDEX_PAGE
}

export default function  ProductEditPage (){
  return <ProductEdit/>
}

