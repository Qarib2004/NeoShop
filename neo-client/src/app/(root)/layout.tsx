import React, { PropsWithChildren } from 'react'


const Layout = ({children}:PropsWithChildren<unknown>) => {
  return (
    <div>{children}</div>
  )
}

export default Layout