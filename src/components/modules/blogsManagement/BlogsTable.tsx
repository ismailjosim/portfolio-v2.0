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
import BlogViewDetailDialog from './BlogViewDetailDialog'

interface BlogTableProps {
	blogs: IBlog[]
}

const BlogsTable = ({ blogs }: BlogTableProps) => {
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

			{/* view blog details dialog */}
			<BlogViewDetailDialog
				open={!!viewingBlog}
				onClose={() => setViewingBlog(null)}
				blog={viewingBlog}
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

export default BlogsTable
