import { NO_INDEX_PAGE } from '@/constants/seo.constants'
import { Metadata } from 'next'
import React from 'react'
import { ColorEdit } from './ColorEdit'



export const metadata:Metadata = {
    title:"Settings color",
    ...NO_INDEX_PAGE
}

export default function  ColorEditPage (){
  return  <ColorEdit/>
}

