import { Metadata } from 'next'
import React from 'react'
import Home from './Home'


export const metadata:Metadata = {
    title:'You shoping all one place'
}

const HomePage = () => {
  return (
    <Home/>
  )
}

export default HomePage