import React from 'react'
import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'

import { IMonthlySales } from '@/shared/types/statistic.interface'
import { formatPriceAZE } from '@/utils/string/format-price'

const chartConfig = {
	value: {
		label: 'Profit',
		color: '#3B82F6'
	}
} satisfies ChartConfig

interface Overview {
	data: IMonthlySales[]
}

export function Overview({ data }: Overview) {
	return (
		<Card>
			<CardHeader className='flex flex-col items-stretch space-y-0 border-b p-4'>
				<CardTitle className='text-xl font-medium tracking-[0.1px] line-clamp-1'>Profit</CardTitle>
			</CardHeader>
			<CardContent>
				<ChartContainer
					className='aspect-auto h-[310px] w-full'
					config={chartConfig}
				>
					<AreaChart
						accessibilityLayer
						data={data}
						margin={{ left: 12, right: 12 }}
					>
						<CartesianGrid vertical={false} />
						<XAxis
							dataKey='date'
							tickLine={false}
							axisLine={false}
							tickMargin={8}
						/>
                        <ChartTooltip content={
                            <ChartTooltipContent labelFormatter={formatPriceAZE}  indicator='line'/>
                        }/>
                        <Area dataKey='value'  type='natural' fill='var(--color-value' stroke='var(--color-value)'/>
					</AreaChart>
				</ChartContainer>
			</CardContent>
		</Card>
	)
}
