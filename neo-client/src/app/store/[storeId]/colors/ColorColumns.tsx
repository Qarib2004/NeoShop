import { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown, ExternalLink, MoreHorizontal, Pencil } from 'lucide-react'
import Link from 'next/link'

import { Button } from '@/components/ui/Button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuTrigger
} from '@/components/ui/DropdownMenu'

import { PUBLIC_URL, STORE_URL } from '@/config/url.config'

import { IColor } from '@/shared/types/color.interface'

export const colorColumns: ColumnDef<IColor>[] = [
	{
		accessorKey: 'name',

		header: ({ column }) => {
			return (
				<Button
					variant='ghost'
					onClick={() =>
						column.toggleSorting(column.getIsSorted() === 'asc')
					}
				>
					Name
					<ArrowUpDown className='ml-2 size-4' />
				</Button>
			)
		}
	},
	{
		accessorKey: 'value',

		header: ({ column }) => {
			return (
				<Button
					variant='ghost'
					onClick={() =>
						column.toggleSorting(column.getIsSorted() === 'asc')
					}
				>
					Value
					<ArrowUpDown className='ml-2 size-4' />
				</Button>
			)
		},
		cell: ({ row }) => (
			<div className='flex items-center gap-x-3'>
				{row.original.value}
				<div
					className='size-4 rounded-full border'
					style={{ backgroundColor: row.original.value }}
				/>
			</div>
		)
	},
	{
		accessorKey: 'createdAt',
		header: ({ column }) => {
			return (
				<Button
					variant='ghost'
					onClick={() =>
						column.toggleSorting(column.getIsSorted() === 'asc')
					}
				>
					The date of creation
					<ArrowUpDown className='ml-2 h-4 w-4' />
				</Button>
			)
		}
	},
	{
		accessorKey: 'actions',
		header: 'Actions',
		cell: ({ row }) => (
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<button>
						<MoreHorizontal className='size-4' />
					</button>
				</DropdownMenuTrigger>

				<DropdownMenuContent align='end'>
					<DropdownMenuLabel>Actions</DropdownMenuLabel>

					<Link
						href={STORE_URL.colorEdit(row.original.storeId,row.original.id)}
						target='_blank'
					>
						<DropdownMenuItem>
							<ExternalLink className='size-4 mr-2' />
							Change
						</DropdownMenuItem>
					</Link>
				</DropdownMenuContent>
			</DropdownMenu>
		)
	}
]
