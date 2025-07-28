import { Metadata } from 'next'
import { NO_INDEX_PAGE } from '@/constants/seo.constants'
import Link from 'next/link'
import { PUBLIC_URL } from '@/config/url.config'
import { Button } from '@/components/ui/Button'
import { ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
	title: 'Thanks for the purchase',
	...NO_INDEX_PAGE
}

export default function ThanksPage() {
	return (
		<div className="min-h-screen flex flex-col items-center justify-center px-4 text-center bg-muted">
			<div className="max-w-md bg-background p-8 rounded-2xl shadow-lg">
				<h1 className="text-3xl font-bold mb-4 text-primary">Thanks for the purchase</h1>
				<p className="text-muted-foreground mb-6">
					Thanks for your order! We value your trust and will do everything
					possible to deliver your order as soon as possible.
				</p>
				<Link href={PUBLIC_URL.home()} className="inline-block">
					<Button variant="default" className="group">
						On the main one
						<ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
					</Button>
				</Link>
			</div>
		</div>
	)
}
