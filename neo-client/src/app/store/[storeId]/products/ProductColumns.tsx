import { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown, ExternalLink, MoreHorizontal, Pencil } from 'lucide-react'

import { Button } from '@/components/ui/Button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/DropdownMenu'
import { PUBLIC_URL, STORE_URL } from '@/config/url.config'
import Link from 'next/link'

export interface IProductColumn {
	id: string
	title: string
	color: string
	price: string
	category: string
	storeId: string
}

export const productColumns: ColumnDef<IProductColumn>[] = [
	{
		accessorKey: 'title',

		header: ({ column }) => {
			return (
				<Button
					variant='ghost'
					onClick={() =>
						column.toggleSorting(column.getIsSorted() === 'asc')
					}
				>
					Title
					<ArrowUpDown className='ml-2 size-4' />
				</Button>
			)
		}
	},
	{
		accessorKey: 'price',

		header: ({ column }) => {
			return (
				<Button
					variant='ghost'
					onClick={() =>
						column.toggleSorting(column.getIsSorted() === 'asc')
					}
				>
					Price
					<ArrowUpDown className='ml-2 size-4' />
				</Button>
			)
		}
	},
	{
		accessorKey: 'category',

		header: ({ column }) => {
			return (
				<Button
					variant='ghost'
					onClick={() =>
						column.toggleSorting(column.getIsSorted() === 'asc')
					}
				>
					Category
					<ArrowUpDown className='ml-2 size-4' />
				</Button>
			)
		}
	},
	{
		accessorKey: 'color',

		header: ({ column }) => {
			return (
				<Button
					variant='ghost'
					onClick={() =>
						column.toggleSorting(column.getIsSorted() === 'asc')
					}
				>
					Color
					<ArrowUpDown className='ml-2 size-4' />
				</Button>
			)
		},
		cell: ({ row }) => (
			<div className='flex items-center gap-x-3'>
				{row.original.color}
				<div
					className='size-4 rounded-full border'
					style={{ backgroundColor: row.original.color }}
				/>
			</div>
		)
	},
    {
        accessorKey:'actions',
		header:"Actions",
		cell:({row}) => (
			<DropdownMenu>
			<DropdownMenuTrigger asChild>
			  <button>
				<MoreHorizontal className="size-4" />
			  </button>
			</DropdownMenuTrigger>
	
			<DropdownMenuContent align="end">
			  <DropdownMenuLabel>Действия</DropdownMenuLabel>
	
			  <Link href={PUBLIC_URL.product(row.original.id)} target="_blank">
				<DropdownMenuItem>
				  <ExternalLink className="size-4 mr-2" />
				 Page with the product
				</DropdownMenuItem>
			  </Link>
	
			  <Link
				href={STORE_URL.productEdit(
				  row.original.storeId,
				  row.original.id
				)}
			  >
				<DropdownMenuItem>
				  <Pencil className="size-4 mr-2" />
				  Change
				</DropdownMenuItem>
			  </Link>
			</DropdownMenuContent>
		  </DropdownMenu>
		)
    }
]
