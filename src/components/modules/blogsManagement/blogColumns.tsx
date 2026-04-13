'use client'

import { IBlog } from '../../../types/blog.interface'
import { Column } from '../../data-table'
import Image from 'next/image'

export const blogColumns: Column<IBlog>[] = [
	{
		header: 'Blog',
		accessor: (blog: IBlog) => (
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
		accessor: (blog: IBlog) => (
			<div className='flex flex-col'>
				<span className='text-sm'>{blog.category}</span>
				<span className='text-xs text-gray-500'>{blog.tags?.join(', ')}</span>
			</div>
		),
	},

	{
		header: 'Engagement',
		accessor: (blog: IBlog) => (
			<div className='text-sm flex flex-col'>
				<span>👁 {blog.views}</span>
				<span>❤️ {blog.likesCount}</span>
				<span>💬 {blog.commentsCount}</span>
			</div>
		),
	},

	{
		header: 'Created',
		accessor: (blog: IBlog) => (
			<span className='text-sm'>
				{new Date(blog.createdAt).toLocaleDateString()}
			</span>
		),
		sortKey: 'createdAt',
	},

	{
		header: 'Status',
		accessor: (blog: IBlog) => {
			const statusStyles: Record<IBlog['status'], string> = {
				published: 'bg-green-500/20 text-green-600',
				draft: 'bg-yellow-500/20 text-yellow-600',
				archived: 'bg-gray-500/20 text-gray-500',
			}

			return (
				<span
					className={`px-2 py-1 text-xs rounded-full capitalize ${statusStyles[blog.status]}`}
				>
					{blog.status}
				</span>
			)
		},
	},
]
