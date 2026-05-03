'use client'

import Image from 'next/image'

import { DateCell } from '../../shared/DateCell'
import { IProject } from '@/src/types/project.interface'

export interface Column<T> {
	header: string
	accessor: keyof T | ((row: T) => React.ReactNode)
	sortKey?: keyof T
}

const projectColumns: Column<IProject>[] = [
	{
		header: 'Project',
		accessor: (project) => (
			<div className='flex items-center gap-3'>
				<div className='relative w-10 h-10 shrink-0'>
					<Image
						src={
							project.image?.startsWith('blob')
								? '/placeholder.jpg'
								: project.image || '/placeholder.jpg'
						}
						alt={project.title}
						fill
						className='rounded-md object-cover'
						sizes='40px'
					/>
				</div>
				<div className='flex flex-col'>
					<span className='font-medium text-sm'>{project.title}</span>
					<span className='text-xs text-gray-500'>{project.type}</span>
				</div>
			</div>
		),
		sortKey: 'title',
	},

	{
		header: 'Description',
		accessor: (project) => (
			<div className='flex flex-col'>
				<span className='text-sm'>{project.subtitle}</span>
				<span className='text-xs text-gray-500'>
					{project.description?.substring(0, 50)}...
				</span>
			</div>
		),
	},

	{
		header: 'Technologies',
		accessor: (project) => (
			<div className='text-sm flex flex-wrap gap-1'>
				{project.technologies?.slice(0, 3).map((tech, idx) => (
					<span
						key={idx}
						className='bg-gray-200 text-gray-800 px-2 py-1 rounded text-xs'
					>
						{tech}
					</span>
				))}
				{project.technologies && project.technologies.length > 3 && (
					<span className='text-gray-500 text-xs'>
						+{project.technologies.length - 3}
					</span>
				)}
			</div>
		),
	},

	{
		header: 'Featured',
		accessor: (project) => (
			<span
				className={`px-2 py-1 text-xs rounded-full ${project.featured ? 'bg-green-500/20 text-green-600' : 'bg-gray-500/20 text-gray-500'}`}
			>
				{project.featured ? 'Yes' : 'No'}
			</span>
		),
		sortKey: 'featured',
	},

	{
		header: 'Published',
		accessor: (project) => (
			<span
				className={`px-2 py-1 text-xs rounded-full ${project.isPublished ? 'bg-green-500/20 text-green-600' : 'bg-gray-500/20 text-gray-500'}`}
			>
				{project.isPublished ? 'Published' : 'Draft'}
			</span>
		),
		sortKey: 'isPublished',
	},

	{
		header: 'Created',
		accessor: (project) => <DateCell date={project.createdAt} />,
		sortKey: 'createdAt',
	},
]
export default projectColumns
