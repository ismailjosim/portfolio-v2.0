'use client'

import Image from 'next/image'
import { Column } from '../../data-table'
import { IBlog } from '../../../types/blog.interface'
import { useRouter } from 'next/navigation'
import { useState, useTransition } from 'react'
import { toast } from 'sonner'
import { deleteBlog } from '../../../services/blog-management'
import AddBlogModal from './BlogFormDialog'
import DeleteConfirmationDialog from '../../shared/DeleteConfirmationDialog'
import ManagementTable from '../../shared/ManagementTable'
import { blogColumns } from './blogColumns'

interface BlogTableProps {
	blogs: IBlog[]
}

const BlogTable = ({ blogs }: BlogTableProps) => {
	const router = useRouter()
	const [, startTransition] = useTransition()

	const [deletingBlog, setDeletingBlog] = useState<IBlog | null>(null)
	const [viewingBlog, setViewingBlog] = useState<IBlog | null>(null)
	const [editingBlog, setEditingBlog] = useState<IBlog | null>(null)
	const [isDeleting, setIsDeleting] = useState(false)

	// handle functions
	// * refresh data
	const handleRefresh = () => {
		startTransition(() => {
			router.refresh()
		})
	}

	//* view
	const handleView = (blog: IBlog) => {
		setViewingBlog(blog)
	}

	// * Edit
	const handleEdit = (blog: IBlog) => {
		setEditingBlog(blog)
	}

	// * Delete
	const handleDelete = (blog: IBlog) => {
		setDeletingBlog(blog)
	}

	const confirmDelete = async () => {
		if (!deletingBlog) return
		setIsDeleting(true)
		const result = await deleteBlog(deletingBlog.slug as string)
		setIsDeleting(false)
		if (result.success) {
			toast.success(result.message || 'Blog deleted successfully')
			setDeletingBlog(null)
			handleRefresh()
		} else {
			toast.error(result.message || 'Failed to delete blog')
		}
	}

	const columns: Column<IBlog>[] = [
		{
			header: 'Cover',
			accessor: 'coverImage',
			render: (row) => (
				<Image
					src={row.coverImage as string}
					alt={row.title}
					width={40}
					height={40}
					className='rounded-md object-cover'
				/>
			),
		},
		{
			header: 'Title',
			accessor: 'title',
		},
		{
			header: 'Category',
			accessor: 'category',
		},
		{
			header: 'Tags',
			accessor: 'tags',
			render: (row) => (
				<div className='flex flex-wrap gap-1'>
					{row.tags.map((tag) => (
						<span
							key={tag}
							className='px-2 py-0.5 text-xs rounded-full bg-blue-500/10 text-blue-600'
						>
							{tag}
						</span>
					))}
				</div>
			),
		},
		{
			header: 'Views',
			accessor: 'views',
		},
		{
			header: 'Likes',
			accessor: 'likesCount',
		},
		{
			header: 'Comments',
			accessor: 'commentsCount',
		},
		{
			header: 'Created At',
			accessor: 'createdAt',
			render: (row) => (
				<span>
					{new Date(row?.createdAt as string).toLocaleDateString('en-US', {
						year: 'numeric',
						month: 'short',
						day: '2-digit',
					})}
				</span>
			),
		},
	]

	return (
		<>
			<ManagementTable
				data={blogs}
				columns={blogColumns}
				onView={handleView}
				onEdit={handleEdit}
				onDelete={handleDelete}
				getRowKey={(blog) => blog._id!}
				emptyMessage='No blogs found'
			/>
			{/* Edit Blog Form Dialog */}
			<AddBlogModal
				open={!!editingBlog}
				onClose={() => setEditingBlog(null)}
				blog={editingBlog!}
				onSuccess={() => {
					setEditingBlog(null)
					handleRefresh()
				}}
			/>

			{/* Delete Confirmation Dialog */}
			<DeleteConfirmationDialog
				open={!!deletingBlog}
				onOpenChange={(open) => !open && setDeletingBlog(null)}
				onConfirm={confirmDelete}
				title='Delete Blog'
				description={`Are you sure you want to delete "${deletingBlog?.title}"? This action cannot be undone.`}
				isDeleting={isDeleting}
			/>
		</>
	)
}

export default BlogTable
