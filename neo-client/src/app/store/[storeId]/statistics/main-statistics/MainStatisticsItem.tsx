import { IMainStatistics } from '@/shared/types/statistic.interface'
import React from 'react'
import { getIcon } from './statistics.util'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import CountUp, {} from 'react-countup'
import { formatPriceAZE } from '@/utils/string/format-price'

interface MainStatisticsProps{
    item:IMainStatistics
}

export function MainStatisticsItem ({item} :MainStatisticsProps){
    const Icon = getIcon(item.id)
  return <Card className='drop-shadow-sm' >
    <CardHeader className='p-4 flex-row ite justify-between space-y-0 pb-2'>
        <CardTitle className='text-sm font-m text-slate-500'>{item.name}</CardTitle>
        <Icon className='size-5'/>
    </CardHeader>
    <CardContent className='px-4 py-2'>
          {item.id !== 1 ? (
            <CountUp className='text-2xl font-bold'  end={item.value}/>
          ) : (
            <CountUp end={item.value} formattingFn={formatPriceAZE} />
          )}
    </CardContent>
  </Card>
}

