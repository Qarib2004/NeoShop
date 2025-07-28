import { MainLayout } from '@/components/layouts/main-layout/MainLayout'
import React, { PropsWithChildren } from 'react'


const Layout = ({children}:PropsWithChildren<unknown>) => {
  return (
    <MainLayout>{children}</MainLayout>
  )
}

export default Layout