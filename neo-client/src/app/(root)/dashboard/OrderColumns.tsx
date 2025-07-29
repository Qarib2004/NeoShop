'use client'

import { Button } from "@/components/ui/Button"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"






export interface IOrderColumn{
    createdAt:string,
    status:string,
    total:string
}



export const orderColumns:ColumnDef<IOrderColumn>[] = [
    {
        accessorKey:'createdAt',
        header:({column}) => {
            return(
                <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                    Date of payment
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        }
    },
    {
        accessorKey:'status',
        header:({column}) => {
            return(
                <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                    Status
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        }
    },
    {
        accessorKey:'total',
        header:({column}) => {
            return(
                <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                    Total
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        }
    }
]