'use client'

import { Eye, Heart, MessageCircleMore } from 'lucide-react'
import { IBlog } from '../../../types/blog.interface'
import Image from 'next/image'

import { DateCell } from '../../shared/DateCell'

export interface Column<T> {
	header: string
	accessor: keyof T | ((row: T) => React.ReactNode)
	sortKey?: keyof T
}

export const blogColumns: Column<IBlog>[] = [
	{
		header: 'Blog',
		accessor: (blog) => (
			<div className='flex items-center gap-3'>
				<Image
					src={
						blog.coverImage?.startsWith('blob')
							? '/placeholder.jpg'
							: blog.coverImage || '/placeholder.jpg'
					}
					alt={blog.title}
					width={40}
					height={40}
					className='rounded-md object-cover'
				/>
				<div className='flex flex-col'>
					<span className='font-medium text-sm'>{blog.title}</span>
					<span className='text-xs text-gray-500'>{blog.slug}</span>
				</div>
			</div>
		),
		sortKey: 'title',
	},

	{
		header: 'Category',
		accessor: (blog) => (
			<div className='flex flex-col'>
				<span className='text-sm'>{blog.category}</span>
				<span className='text-xs text-gray-500'>{blog.tags?.join(', ')}</span>
			</div>
		),
	},

	{
		header: 'Engagement',
		accessor: (blog) => (
			<div className='text-sm flex items-center gap-3'>
				<p className='flex items-center gap-1 text-muted-foreground'>
					<Eye size={18} />
					<span>{blog.views}</span>
				</p>

				<p className='flex items-center gap-1 text-destructive'>
					<Heart fill='currentColor' size={18} />
					<span>{blog.likesCount}</span>
				</p>

				<p className='flex items-center gap-1 text-accent'>
					<MessageCircleMore size={18} />
					<span>{blog.commentsCount}</span>
				</p>
			</div>
		),
		sortKey: 'views',
	},

	{
		header: 'Created',
		accessor: (blog) => <DateCell date={blog.createdAt} />,
		sortKey: 'createdAt',
	},

	{
		header: 'Status',
		accessor: (blog) => {
			const statusStyles: Record<string, string> = {
				review: 'bg-blue-500/20 text-blue-600',
				scheduled: 'bg-purple-500/20 text-purple-600',
				published: 'bg-green-500/20 text-green-600',
				draft: 'bg-yellow-500/20 text-yellow-600',
				archived: 'bg-gray-500/20 text-gray-500',
			}

			return (
				<span
					className={`px-2 py-1 text-xs rounded-full capitalize ${
						statusStyles[blog.status] || 'bg-gray-500/20 text-gray-500'
					}`}
				>
					{blog.status}
				</span>
			)
		},
		sortKey: 'status',
	},
]
