import { LucideIcon, Plus } from 'lucide-react'
import { Button } from '../ui/button'
import React from 'react'

interface ManagementPageHeaderPros {
	title: string
	description?: string
	action?: {
		label: string
		icon?: LucideIcon
		onClick: () => void
	}
	children?: React.ReactNode
}

const ManagementPageHeader = ({
	title,
	description,
	action,
	children,
}: ManagementPageHeaderPros) => {
	const Icon = action?.icon || Plus
	return (
		<div className='flex items-center justify-between'>
			<div>
				<h1 className='text-3xl font-bold'>{title}</h1>
				{description && (
					<p className='text-muted-foreground mt-1'>{description}</p>
				)}
			</div>
			{action && (
				<Button onClick={action?.onClick}>
					<Icon className='mr-2 h-4 w-4' />
					{action?.label}
				</Button>
			)}
			{children}
		</div>
	)
}

export default ManagementPageHeader
