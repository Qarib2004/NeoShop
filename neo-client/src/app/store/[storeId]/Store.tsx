'use client'
import { Heading } from '@/components/ui/Heading'
import React from 'react'
import { MainStatistics } from './statistics/main-statistics/MainStatistics'
import { MiddleStatistics } from './statistics/middle-statistics/MiddleStatistics'

const Store = () => {
  return (
    <div className='wrapper'>
      <Heading title='Statistics' />
      <MainStatistics/>
      <MiddleStatistics/>
    </div>
  )
}

export default Store