'use client'
import { saveTokenStorage } from '@/services/auth/auth-token.service'
import { useSearchParams } from 'next/navigation'
import React, { useEffect } from 'react'

const Dashboard = () => {
    const searchParams = useSearchParams()

    useEffect(() => {
        const accessToken = searchParams.get('accessToken')

        if(accessToken) saveTokenStorage(accessToken)
    }, [searchParams])
  return (
    <div>Dashboard</div>
  )
}

export default Dashboard