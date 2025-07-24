import { NO_INDEX_PAGE } from '@/constants/seo.constants'
import { Metadata } from 'next'
import React from 'react'
import { Products } from './Products'


export const metadata:Metadata = {
    title:"Goods",
    ...NO_INDEX_PAGE
}

export default function Page(){
  return (
    <Products/>
  )
}

