'use client'
import React from 'react'
import { IMenuItem } from './menu.interface'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { cn } from '@/utils/clsx'
import styles from "./Navigation.module.scss"


interface MenuItemProps{
    route:IMenuItem
}


export function MenuItem({route}:MenuItemProps) {
    const pathname = usePathname()
    return (
        <Link
          href={route.link}
          className={cn(
           'flex items-center gap-x-3  text-slate-500 text-sm font-medium py-2.5 rounded-lg  hover:bg-blue-200/20  hover:text-blue-500 hover:drop-shadow-sm bg-tra  transition-all duration-200',
            { 'text-sm text-blue-500 bg-blue-200/20 hover:bg-blue-200/20': pathname === route.link }
          )}
        >
          <route.icon className='size-5'/>
          {route.value}
        </Link>
      )
      }

