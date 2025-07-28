import React from 'react'
import { Hero } from './hero/Hero'
import { IProduct } from '@/shared/types/product.interface'


interface HomeProps{
  products:IProduct[]
}

export function Home  ({products}:HomeProps) {
  return <>
  <Hero/>
  </>
}

