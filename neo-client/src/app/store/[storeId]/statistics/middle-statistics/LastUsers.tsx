import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { ILastUsers } from '@/shared/types/statistic.interface'
import { formatPriceAZE } from '@/utils/string/format-price'
import Image from 'next/image'
import React from 'react'

interface LastUsersPropts{
    data:ILastUsers[]
}

export function LastUsers ({data}:LastUsersPropts) {
  return (
    <Card>
			<CardHeader className='flex flex-col items-stretch space-y-0 border-b p-4'>
				<CardTitle className='text-xl font-medium tracking-[0.1px] line-clamp-1'>Profit</CardTitle>
			</CardHeader>
      <CardContent>
        {data.length ? data.map(user => (
          <div className='user'>
                      <Image src={user.picture} alt={user.name} width={40} height={40}/>
                      <div className='info'>
                        <p className='name'>{user.name}</p>
                      </div>
                      <div className='total'>
                      +{formatPriceAZE(Number(user.total))}
                      </div>
          </div>
        )):(
          <div>{`This store has no buyers`}</div>
        )}
      </CardContent>
      </Card>
  )
}

