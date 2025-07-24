import React from 'react'
import Dashboard from './Dashboard'
import { Metadata } from 'next'
import { NO_INDEX_PAGE } from '@/constants/seo.constants'

export const metadata:Metadata = {
    title:"Personal office",
    ...NO_INDEX_PAGE
}

const DashboardPage = () => {
  return (
    <Dashboard/>
  )
}

export default DashboardPage