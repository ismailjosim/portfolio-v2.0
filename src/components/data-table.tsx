'use client'

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from './ui/table'

import { Eye, Pencil, Trash2 } from 'lucide-react'
import Image from 'next/image'
import { Button } from './ui/button'

export interface Column<T> {
	header: string
	accessor: keyof T
	render?: (row: T) => React.ReactNode
}

interface DataTableProps<T> {
	columns: Column<T>[]
	data: T[]
}

export function DataTable<T extends { id: string }>({
	columns,
	data,
}: DataTableProps<T>) {
	return (
		<div className='rounded-xl border bg-card'>
			<Table>
				<TableHeader>
					<TableRow>
						{columns.map((col, i) => (
							<TableHead key={i}>{col.header}</TableHead>
						))}
						<TableHead className='text-right'>Actions</TableHead>
					</TableRow>
				</TableHeader>

				<TableBody>
					{data.map((row) => (
						<TableRow key={row.id}>
							{columns.map((col, i) => (
								<TableCell key={i}>
									{col.render
										? col.render(row)
										: (row[col.accessor] as React.ReactNode)}
								</TableCell>
							))}

							<TableCell className='text-right space-x-2'>
								<Button size='icon' variant='outline'>
									<Eye className='w-4 h-4' />
								</Button>

								<Button size='icon' variant='outline'>
									<Pencil className='w-4 h-4' />
								</Button>

								<Button size='icon' variant='destructive'>
									<Trash2 className='w-4 h-4' />
								</Button>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	)
}
