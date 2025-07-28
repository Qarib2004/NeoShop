import { NO_INDEX_PAGE } from '@/constants/seo.constants'
import { Metadata } from 'next'
import React from 'react'
import { CreateColor } from './CreateColor'


export const metadata:Metadata = {
    title:"Create color",
    ...NO_INDEX_PAGE
}

export default function CreateProductPage(){
  return (
    <CreateColor/>
  )
}

