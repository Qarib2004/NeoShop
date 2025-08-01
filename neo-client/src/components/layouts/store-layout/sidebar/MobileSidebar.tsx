import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/Sheet'
import { Menu } from 'lucide-react'
import React from 'react'
import Sidebar from './Sidebar'

export function MobileSidebar(){
  return (
    <Sheet>
        <SheetTrigger className='lg:hidden pr-4 hover:opacity-75 transition'><Menu/></SheetTrigger>
        <SheetContent side='left' className='p-0 bg-white'>
            <Sidebar/>
        </SheetContent>
    </Sheet>
  )
}

