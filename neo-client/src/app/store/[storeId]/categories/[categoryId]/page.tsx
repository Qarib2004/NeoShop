import { NO_INDEX_PAGE } from '@/constants/seo.constants'
import { Metadata } from 'next'
import React from 'react'
import { CategoryEdit } from './CategoryEdit'



export const metadata:Metadata = {
    title:"Settings color",
    ...NO_INDEX_PAGE
}

export default function  ColorEditPage (){
  return  <CategoryEdit/>
}

