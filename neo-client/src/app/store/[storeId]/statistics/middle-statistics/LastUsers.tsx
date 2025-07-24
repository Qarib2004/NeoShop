import { ILastUsers } from '@/shared/types/statistic.interface'
import React from 'react'

interface LastUsersPropts{
    data:ILastUsers[]
}

export function LastUsers ({data}:LastUsersPropts) {
  return (
    <div>LastUsers</div>
  )
}

