import { NO_INDEX_PAGE } from '@/constants/seo.constants'
import { Metadata } from 'next'
import React from 'react'
import { Setting } from './Setting'


export const metadata: Metadata ={
    title:"Settings store",
    ...NO_INDEX_PAGE
}

export default function SettingsPage() {
	return <Setting/>
}
